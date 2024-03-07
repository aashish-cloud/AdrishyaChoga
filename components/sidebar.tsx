"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Tag from "./tags";
import { CameraIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/ui/spinner";
import { SignUpButton, UserButton, SignInButton } from "@clerk/clerk-react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";

export const Sidebar = () => {
  const tags = [
    "Techspardha",
    "Technobyte",
    "Mexperts",
    "Codecats",
    "Volleyball",
    "CSE Department",
  ];

  const { isAuthenticated, isLoading } = useConvexAuth();
  const {user} = useUser();

  const [tag, setTag] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createPost = useMutation(api.documents.createPost);

  const makePost = async () => {

    try {
      await createPost({ tag, description, title,userName:user?.username!});
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <aside className="w-60 flex flex-col h-full pt-[100px] text-black px-4 border">
      <div className="flex flex-col items-center justify-center mb-4">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <SignUpButton mode="modal" redirectUrl="/profile">
            <Button variant="default">Get Your Adrishya Choga</Button>
          </SignUpButton>
        )}
        {isAuthenticated && !isLoading && (
          <UserButton afterSignOutUrl="/">
            <Button variant="outline" size="lg">Profile</Button>
          </UserButton>
        )}
      </div>

      {isAuthenticated && (<AlertDialog>
        <AlertDialogTrigger asChild={true}>
          <Button>Write a Post</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Post</AlertDialogTitle>
            <AlertDialogDescription>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                  <Input placeholder="Select a tag" className="mb-4 w-full" value={tag} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {tags.map((name, i) => {
                    return <DropdownMenuItem key={i} onSelect={(e) => { setTag(name) }}>{name}</DropdownMenuItem>
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Input placeholder="Enter post title" className="mb-4" value={title} onChange={(e) => { setTitle(e.target.value) }} />
              <Textarea placeholder="Enter your post content" value={description} onChange={(e) => { setDescription(e.target.value) }} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex items-center justify-between w-full">
              <CameraIcon className=""></CameraIcon>
              <div className="space-x-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={makePost}>Publish</AlertDialogAction>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>)}

      <p className="text-sm text-muted-foreground uppercase my-4">
        Trending Tags
      </p>
      <div className="space-y-2">
        {tags.map((name, i) => {
          return <Tag name={name} key={i} />
        })}
      </div>
    </aside>
  );
};
