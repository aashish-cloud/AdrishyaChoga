'use client';

import {
  ThumbsUp,
  MessagesSquare,
  BookmarkCheck,
  CircleIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "./ui/badge";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface PostCardExpandedInterface {
  isBookmark: boolean;
  data: Doc<"posts">
}

export function PostCardExpanded({ isBookmark, data }: PostCardExpandedInterface) {

  const userDetails = useQuery(api.documents.getUser, { id: data?.user_id })

  return (
    <Card>
      <CardHeader className="grid items-start gap-4 space-y-0">
        <div className="space-y-2">
          <Badge>{data?.tag}</Badge>
          <CardTitle>{data?.title}</CardTitle>
          <CardDescription>
            {data?.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground w-full h-full mb-8">
          <Image
            src="/test.jpeg"
            alt=""
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex items-center text-muted-foreground">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              {userDetails?.college} &middot; {userDetails?.name}
            </div>
            <div className="flex items-center">
              <ThumbsUp className="mr-1 h-3 w-3" />
              {data?.likes}
            </div>
            <div className="flex items-center">
              <MessagesSquare className="mr-1 h-3 w-3" />
              {data?.comments.length}
            </div>
          </div>
          {isBookmark && (
            <div className="flex items-center ml-auto">
              <BookmarkCheck className="h-4 w-4" />
            </div>
          )}
          {/* {isLiked && (
            <div className="flex items-center ml-auto">
              <BookmarkCheck className="h-4 w-4" />
              <p className="text-sm">You liked this post</p>
            </div>
          )}
          {isCommented && (
            <div className="flex items-center ml-auto">
              <BookmarkCheck className="h-4 w-4" />
              <p className="text-sm">You commented on this post</p>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}
