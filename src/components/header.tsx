import Link from "next/link";
import { AuthButton } from "@/components/auth/auth-button";
import { IconSkottie } from "@/components/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex w-full items-center gap-6 text-lg font-medium md:text-sm">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <IconSkottie className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl">Skottie Viewer</span>
        </Link>
        <Link href="/admin" className="text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
        </Link>
        <Link href="/admin/templates-db" className="text-muted-foreground transition-colors hover:text-foreground">
            Templates DB
        </Link>
        <Link href="/admin/templates-db-new" className="text-muted-foreground transition-colors hover:text-foreground">
            Templates DB New
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {/* The UploadTemplateButton will be rendered by the specific page */}
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}
