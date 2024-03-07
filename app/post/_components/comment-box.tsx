import { Separator } from "@/components/ui/separator";
import { Comment } from "./comment";

const CommentBox = () => {
  return (
    <div className="w-full border rounded-md p-4">
      <h1 className="font-semibold text-2xl">Comments</h1>
      <Separator className="my-4" />
      {[...Array(3)].map((_, i) => {
        return <Comment />;
      })}
    </div>
  );
};

export default CommentBox;
