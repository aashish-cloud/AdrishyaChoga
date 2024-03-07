import { PostCard } from "@/components/post-collapsed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const ActivityHistory = () => {
  return (
    <ScrollArea className="h-full px-4">
      <h1 className="font-bold text-2xl">Activity</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Explore Your Digital Footprint
      </p>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => {
          return <PostCard isBookmark={false} data={{
            likes: 0,
            title: "",
            comments: [],
            tag: "",
            description: ""
          }}></PostCard>;
        })}
      </div>
    </ScrollArea>
  );
};

export default ActivityHistory;
