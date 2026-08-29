//src/app/(auth)/login/page.tsx
"use client";

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
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/useLogin";
import Link from "next/link";
import { Loader, ArrowRight, Zap, Users } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-primary/5">
      <div className={cn("w-full max-w-4xl")}>
        <Card className="p-0 border shadow-lg overflow-hidden">
          <CardContent className="p-0 grid md:grid-cols-5 gap-0">
            {/* IMAGE SECTION */}
            <div className="hidden md:flex md:col-span-2 bg-gradient-to-br from-primary/10 to-primary/20 items-center justify-center p-8">
              <Image
                src="/img2.png"
                alt="CRM Dashboard"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit((data) => login.mutate(data))}
              className="p-6 md:p-8 flex flex-col md:col-span-3"
            >
              <FieldGroup className="flex flex-col gap-5">
                {/* HEADER */}
                <div className="flex flex-col items-center gap-2 text-center mb-2">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-sm">
                    Sign in to your account
                  </p>
                </div>

                {/* EMAIL */}
                <Field>
                  <FieldLabel htmlFor="email" className="font-semibold">Email Address</FieldLabel>
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

                {/* PASSWORD */}
                <Field>
                  <div className="flex items-center gap-2">
                    <FieldLabel htmlFor="password" className="font-semibold">Password</FieldLabel>
                    <Link
                      href="/forget-password"
                      className="ml-auto text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

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

                {/* API ERROR */}
                {login.isError && (
                  <p className="text-xs text-destructive text-center">
                    {login.error?.message || "Login failed. Please try again."}
                  </p>
                )}

                {/* SUBMIT */}
                <Field className="mt-2">
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold"
                    disabled={login.isPending}
                  >
                    {login.isPending ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Field>

                {/* DIVIDER */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                </div>

                {/* SIGN UP SECTION */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Don&apos;t have an account yet?
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition font-semibold text-sm"
                  >
                    Get started free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* HELPFUL RESOURCES */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/quickstart" className="group p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-primary" />
                        <p className="text-xs font-semibold group-hover:text-primary">Quick Start</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Get up and running in 5 min</p>
                    </Link>
                    <Link href="/support" className="group p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="text-xs font-semibold group-hover:text-primary">Support</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Chat with our team</p>
                    </Link>
                  </div>
                </div>
              </FieldGroup>
            </form>

          </CardContent>
        </Card>

        <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>{" "}
        and <Link href="/privacypolicy" className="underline hover:text-foreground">Privacy Policy</Link>.
      </FieldDescription>
      </div>
    </main>
  );
}
