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
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth.schema";
import { Loader, ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    setIsPending(true);
    try {
      // Mock / API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      toast.success("Password reset instructions sent to your email!");
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-primary/5">
      <div className={cn("w-full max-w-md")}>
        <Card className="p-6 md:p-8 border shadow-lg">
          <CardContent className="p-0 flex flex-col gap-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MailCheck className="size-6" />
                </div>
                <h1 className="text-2xl font-bold">Check your email</h1>
                <p className="text-muted-foreground text-sm">
                  We have sent password recovery instructions to your email address.
                </p>
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  render={<Link href="/login" />}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2 text-center mb-2">
                  <h1 className="text-2xl font-bold">Forgot password?</h1>
                  <p className="text-muted-foreground text-sm">
                    Enter your email to receive a password reset link
                  </p>
                </div>

                <FieldGroup className="flex flex-col gap-4">
                  <Field>
                    <FieldLabel htmlFor="email" className="font-semibold">
                      Email Address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email.message}
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
                        "Send Reset Link"
                      )}
                    </Button>
                  </Field>
                </FieldGroup>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium transition"
                  >
                    <ArrowLeft className="h-4 w-4" />
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
