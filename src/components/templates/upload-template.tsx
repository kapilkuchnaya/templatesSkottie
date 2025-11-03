
"use client";

import { useActionState, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

type Action = (prevState: any, formData: FormData) => Promise<any>;

interface UploadTemplateProps {
    formAction: Action;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function UploadTemplate({ formAction, dialogOpen, setDialogOpen }: UploadTemplateProps) {
  const [state, dispatch] = useActionState(formAction, undefined);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const jsonFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: state.error,
      });
    }
    if (state?.message) {
      toast({
        title: "Success",
        description: state.message,
      });
      formRef.current?.reset();
      jsonFormRef.current?.reset();
      setDialogOpen(false);
    }
  }, [state, toast, setDialogOpen]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a New Template</DialogTitle>
          <DialogDescription>
            Choose to upload a JSON file or paste the JSON content directly.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="json">Paste JSON</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <form action={dispatch} ref={formRef}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="templateFile" className="text-right">
                    JSON File
                  </Label>
                  <Input
                    id="templateFile"
                    name="templateFile"
                    type="file"
                    className="col-span-3"
                    accept=".json"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <SubmitButton />
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="json">
             <form action={dispatch} ref={jsonFormRef}>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="templateJson">Template JSON</Label>
                    <Textarea
                      id="templateJson"
                      name="templateJson"
                      className="col-span-4 h-48"
                      required
                      placeholder='Paste a single template object or an array of template objects. e.g., { "name": "..." } or [ { "name": "..." }, ... ]'
                    />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <SubmitButton />
                </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload"}
    </Button>
  );
}
