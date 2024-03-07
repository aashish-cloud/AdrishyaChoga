import { Smooch } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Smooch({
  subsets: ["latin"],
  weight: "400",
});

export const Logo = () => {
  return (
    <span className={cn("flex flex-col items-center font-xl", font.className)}>
      <p className="text-6xl font-semibold">Adrishya Choga!</p>
    </span>
  );
};
