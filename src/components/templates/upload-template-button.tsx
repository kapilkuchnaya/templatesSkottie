
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UploadTemplate } from "./upload-template";
import { uploadTemplate, uploadTemplateDb, uploadTemplateDbNew } from "@/lib/actions";

interface UploadTemplateButtonProps {
    db: 'main' | 'db' | 'db-new';
}

export function UploadTemplateButton({ db }: UploadTemplateButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const actionMap = {
    'main': uploadTemplate,
    'db': uploadTemplateDb,
    'db-new': uploadTemplateDbNew,
  };

  const formAction = actionMap[db];

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Template
        </Button>
      </DialogTrigger>
      <UploadTemplate 
        formAction={formAction} 
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </Dialog>
  );
}
