import { logout } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function AuthButton() {
  return (
    <form action={logout}>
      <Button variant="ghost" size="icon" aria-label="Sign Out">
        <LogOut className="h-5 w-5" />
      </Button>
    </form>
  );
}
