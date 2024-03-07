"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { SignUpButton } from "@clerk/clerk-react";
import { Logo } from "./logo";
import { redirect, useRouter } from "next/navigation";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const router = useRouter();

  return (
    <div className="mx-w-3xl pt-28 space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Embrace Your Voice in the Shadows.
      </h1>
      <div className="flex justify-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Welcome to
        </h1>
        &nbsp;&nbsp;&nbsp;
        <Logo />
      </div>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        An Anonymous Platform for Authentic Expression
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button onClick={() => { router.push('/home'); }}>
          Go Anonymous
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignUpButton mode="modal" redirectUrl="/profile">
          <Button>
            Get Your Adrishya Choga
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignUpButton>
      )}
    </div>
  );
};
