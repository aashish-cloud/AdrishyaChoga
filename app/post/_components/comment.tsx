import { ThumbsUp, MessagesSquare, Timer } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export function Comment() {
  return (
    <Card className="border-0 border-b rounded-none shadow-none last:border-b-0">
      <CardHeader className="grid items-start gap-4 space-y-0">
        <div className="text-xs text-muted-foreground flex items-center">
          Google &middot; username
        </div>
        <div className="space-y-2">
          <CardDescription className="text-primary">
            Beautifully designed components that you can copy and paste into
            your apps. Accessible. Customizable. Open Source.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-muted-foreground">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <Timer className="mr-1 h-3 w-3" />
              3d
            </div>
            <div className="flex items-center">
              <ThumbsUp className="mr-1 h-3 w-3" />
              20k
            </div>
            <div className="flex items-center">
              <MessagesSquare className="mr-1 h-3 w-3" />
              436
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
