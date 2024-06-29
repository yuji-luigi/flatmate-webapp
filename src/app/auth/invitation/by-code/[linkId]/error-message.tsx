"use client";

import { useEffect } from "react";
import InvitationByCodePage from "./page";
import { PinForm } from "./form";

export default function ErrorMessage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <h2 className="text-center">{error.message || "Something went wrong!"} </h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
      <PinForm />
    </>
  );
}
