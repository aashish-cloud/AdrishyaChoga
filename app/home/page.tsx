'use client';

import { PostCard } from "@/components/post-collapsed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import {  useQuery } from "convex/react";
import { useConvexAuth } from "convex/react";

const MainPage =  () => {

  const {isLoading,isAuthenticated} = useConvexAuth();
  const posts = useQuery(api.documents.getPosts); 

  return (
    <ScrollArea className="h-full px-4">
      <h1 className="text-2xl font-bold">Whisper Wall</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Express yourself anonymously
      </p>
      <div className="space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center w-full">
            <Spinner size="icon"/>
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <h1 className="text-3xl font-bold text-center">You need to login to view this page</h1>
        )}
        {isAuthenticated && !isLoading && (
          posts?.map((data, i) => {
            return <PostCard isBookmark={false} key={i} data={data}  />
          })
        )}
      </div>
    </ScrollArea>
  );
};

export default MainPage;
