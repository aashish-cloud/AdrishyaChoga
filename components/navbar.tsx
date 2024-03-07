"use client";
import { Smooch } from "next/font/google";
import { SearchBar } from "./searchbar";
import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { SignInButton,UserButton,SignUpButton} from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const smooch = Smooch({
  weight: "400",
  subsets: ["latin"],
});

export const Navbar = () => {
  const {isAuthenticated,isLoading} = useConvexAuth()

  return (
    <div className="z-50 bg-background fixed top-0 flex items-center w-full px-6 py-4 border-b shadow-sm">
      <div className="w-full flex items-center justify-between">
        <div className={`${smooch.className} text-4xl`}><Link href={"/home"}>Adrishya Choga!</Link></div>
        {isAuthenticated && !isLoading && <SearchBar />}
        <div className="flex gap-4">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignUpButton mode="modal" redirectUrl="/profile">
                <Button variant="default" >Sign Up</Button>
              </SignUpButton>
              <SignInButton mode="modal" redirectUrl="/home">
                <Button variant="outline">Login</Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <UserButton afterSignOutUrl="/">
                <Button variant="outline">Profile</Button>
              </UserButton>
              <Profile/>
            </>
          )}
          {/* <Button variant="ghost">
            <Plus className="h-5 w-5" />
          </Button> */}
          {/* <Button variant="ghost">
            <Bell className="h-5 w-5" />
          </Button> */}
          
          {/* <Profile /> */}
        </div>
      </div>
    </div>
  );
};
