"use client";

import { Smooch } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Smooch({
  subsets: ["latin"],
  weight: "400",
});

export default function loginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const [loading, isLoading] = useState(false);

  const onLogin = async () => {
    try {
      isLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data.success);
      response.data.success ? router.push("/profile") : router.push("/login");
    } catch (error: any) {
      console.log("Error logging in", error.message);
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-2/3 space-y-8">
        <div>
          {/* <h1 className={cn("text-6xl font-bold", font.className)}>
            Adrishya Choga!
          </h1> */}
          <h1 className="text-4xl font-semibold">
            {loading ? "Processing" : "Welcome Back!"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Please login to your account.
          </p>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-col">
            <label htmlFor="username" className="my-1 font-semibold">
              Username
            </label>
            <input
              placeholder="Enter your username"
              className="px-4 py-3 text-black rounded-md border"
              type="text"
              name="username"
              id="username"
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="my-1 font-semibold">
              Password
            </label>
            <input
              placeholder="Enter your password"
              className="px-4 py-3 text-black rounded-md border"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <Button onClick={onLogin}>Login</Button>
          <Link href={"/sign-up"}>Haven't got your Adrishya Choga yet? Sign up!</Link>
        </div>
      </div>
    </div>
  );
}
