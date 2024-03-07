'use client';

import { PostCardExpanded } from "@/components/post-expanded";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import CommentBox from "../_components/comment-box";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface postPageInterface {
  params: {
    post_id: Id<'posts'>
  }
}

const PostPage = ({ params }: postPageInterface) => {
  
  const id = params.post_id;
  const post = useQuery(api.documents.getPostById, { id });
  
  return (
    <ScrollArea className="h-full px-4">
      <PostCardExpanded isBookmark={true} data={post!}></PostCardExpanded>
      <Separator className="my-4" />
      <Textarea placeholder="Type your comment here" />
      <div className="flex">
        <Button className="mt-4 ml-auto">Comment</Button>
      </div>
      <Separator className="my-4" />
      <CommentBox />
    </ScrollArea>
  );
};

export default PostPage;
