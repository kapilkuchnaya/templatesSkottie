import { LoginForm } from "@/components/login-form";
import { IconSkottie } from "@/components/icons";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <IconSkottie className="h-16 w-16 text-primary" />
          <h1 className="mt-4 text-3xl font-headline font-bold text-center">
            Skottie Viewer
          </h1>
          <p className="text-muted-foreground text-center">
            Admin Login
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
