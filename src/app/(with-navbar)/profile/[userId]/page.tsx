import dynamic from "next/dynamic";
import ProfilePageSkeleton from "@/app/(with-navbar)/profile/[userId]/page.skeleton";
import { getUserId } from "@/utils/auth/session";

const MyPageContent = dynamic(
  () => import("@/app/(with-navbar)/profile/[userId]/page.suspense"),
  {
    ssr: false,
    loading: () => <ProfilePageSkeleton />,
  },
);

interface Params {
  params: {
    userId: string;
  };
}

export default async function MyPagePage({ params }: Params) {
  const myId = await getUserId();

  return <MyPageContent myId={myId} friendId={Number(params.userId)} />;
}
