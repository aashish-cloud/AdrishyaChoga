"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Smooch } from "next/font/google";

const font = Smooch({
  subsets: ["latin"],
  weight: "400",
});

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    email: "",
    username: "",
  });

  const [loading, isLoading] = useState(false);

  const onSignup = async () => {
    try {
      isLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Some error occured", error.message);
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
            {loading ? "Processing" : "Join the club!"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Wear your Adrishya Choga now.
          </p>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-col">
            <label htmlFor="username" className="my-1 font-semibold">
              Email
            </label>
            <input
              placeholder="Enter your work email"
              className="px-4 py-3 text-black rounded-md border"
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="code" className="my-1 font-semibold">
              Code
            </label>
            <input
              placeholder="Enter your code"
              className="px-4 py-3 text-black rounded-md border"
              type="text"
              name="code"
              id="code"
              value={user.password}
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <Button onClick={onSignup}>Sign up</Button>
          <Link href={"/sign-in"}>Already signed up? Login now!</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
