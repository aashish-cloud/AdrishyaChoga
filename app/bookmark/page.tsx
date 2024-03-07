import { PostCard } from "@/components/post-collapsed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Bookmark = () => {
  return (
    <ScrollArea className="h-full px-4">
      <h1 className="font-bold text-2xl">Bookmarks</h1>
      <p className="text-sm text-muted-foreground mb-6">Rediscover Your Treasures</p>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => {
          return (
            <div className="">
              <PostCard isBookmark={true}></PostCard>
              {/* <Separator className="my-4" /> */}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default Bookmark;
