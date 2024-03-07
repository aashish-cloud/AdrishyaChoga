import { PostCard } from "@/components/post-collapsed";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const TagPage = () => {
  return (
    <ScrollArea className="h-full px-4">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Tag Name</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Illuminate Ideas, Masked in Anonymity
          </p>
        </div>
        <Button>Follow</Button>
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => {
          return (
            <div className="">
              <PostCard isBookmark={false}></PostCard>
              {/* <Separator className="my-4" /> */}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default TagPage;
