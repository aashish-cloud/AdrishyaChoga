"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  const updateProfile = useMutation(api.documents.updateProfile);
  const getUserProfile = useQuery(api.documents.getUserProfile, { name: (user?.username)! });

  const [isSaving, setIsSaving] = useState(false);

  const [college, setCollege] = useState(getUserProfile?.college);
  const [bio, setBio] = useState(getUserProfile?.bio);

  const router = useRouter()

  useEffect(() => {
    setCollege(getUserProfile?.college);
    setBio(getUserProfile?.bio);
  }, [getUserProfile?.college, getUserProfile?.bio]);

  const saveChanges = async () => {
    setIsSaving(true);
      await updateProfile({ name: (user?.username)!, college, bio});
    setIsSaving(false);
    router.push("/home")
  }

  return (
    <div className="flex items-center justify-center pt-24">
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="icon"/>
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <div className="w-full flex items-center justify-center">
          <h1 className="text-3xl font-bold">You need to login to view this page</h1>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <div className="flex flex-col space-y-8 w-1/2 justify-center">
          <div>
            <h1 className="font-bold text-4xl">Profile</h1>
            <p className="text-sm text-muted-foreground">
              Manage your profile and set preferences
            </p>
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Enter the username here" value={user?.username || ''} disabled />
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="company">College</Label>
            <Input type="text" id="company" placeholder="Enter the college you are in" value={college}
              onChange={(e) => { setCollege(e.target.value) }} disabled={isSaving} />
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Add a bio here" value={bio} onChange={(e) => { setBio(e.target.value) }}
              disabled={isSaving} />
          </div>

          <Separator className="my-4" />

          {
            isSaving ?
              <div className="ml-auto">
                <Spinner />
              </div>
              :
              <Button className="ml-auto" onClick={saveChanges}>Save</Button>

          }
        </div>
      )}
    </div>
  );
};

export default Profile;
