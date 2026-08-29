"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginFormData } from "@/schemas/auth.schema";
import axios from "axios";

export function useLogin() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown>(null);

  const mutate = async (formData: LoginFormData) => {
    setIsPending(true);
    setIsError(false);
    setError(null);

    try {
      // API call to backend auth endpoint
      const response = await axios.post<{ message?: string }>("/api/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        validateStatus: (status) => status < 500,
      });

      if (response.status >= 200 && response.status < 300) {
        setIsSuccess(true);
        setData(response.data);
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        const errorMsg = response.data?.message || "Invalid email or password";
        const err = new Error(errorMsg);
        setIsError(true);
        setError(err);
        toast.error(errorMsg);
      }
    } catch (err: unknown) {
      let errorMsg = "An unexpected error occurred during login";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }
      const errorObj = new Error(errorMsg);
      setIsError(true);
      setError(errorObj);
      toast.error(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
}
