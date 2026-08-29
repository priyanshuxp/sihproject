"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, type UpdatePasswordFormData } from "@/schemas/auth.schema";
import { Loader, KeyRound, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async () => {
    setIsPending(true);
    try {
      // Mock / API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
      toast.success("Password updated successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-primary/5">
      <div className={cn("w-full max-w-md")}>
        <Card className="p-6 md:p-8 border shadow-lg">
          <CardContent className="p-0 flex flex-col gap-6">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="size-6" />
                </div>
                <h1 className="text-2xl font-bold">Password Updated</h1>
                <p className="text-muted-foreground text-sm">
                  Your password has been changed successfully. Redirecting to login...
                </p>
                <Button
                  className="w-full mt-4"
                  render={<Link href="/login" />}
                >
                  Sign In Now
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2 text-center mb-2">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                    <KeyRound className="size-5" />
                  </div>
                  <h1 className="text-2xl font-bold">Set new password</h1>
                  <p className="text-muted-foreground text-sm">
                    Must be at least 6 characters long
                  </p>
                </div>

                <FieldGroup className="flex flex-col gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" className="font-semibold">
                      New Password
                    </FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword" className="font-semibold">
                      Confirm New Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>

                  <Field className="mt-2">
                    <Button
                      type="submit"
                      className="w-full h-11 text-base font-semibold"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </Field>
                </FieldGroup>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground font-medium transition"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <FieldDescription className="mt-6 px-6 text-center">
          Need help? <Link href="/support" className="underline hover:text-foreground">Contact Support</Link>
        </FieldDescription>
      </div>
    </main>
  );
}
