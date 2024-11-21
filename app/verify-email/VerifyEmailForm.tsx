"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "../actions/verify-email";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VerifyEmailForm() {
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmailToken(token);
    } else {
      setError("No verification token found");
      setIsVerifying(false);
    }
  }, [token]);

  const verifyEmailToken = async (token: string) => {
    const result = await verifyEmail(token);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred");
      setIsVerifying(false);
    }
  };

  if (isVerifying) {
    return <p>Verifying your email...</p>;
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button onClick={() => router.push("/login")} className="w-full">
        Go to Login
      </Button>
    </div>
  );
}
