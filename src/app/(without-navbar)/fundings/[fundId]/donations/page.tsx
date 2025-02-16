import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/react-query";
import { fetchDonations } from "@/query/useFundingDonationsQuery";
import { DonationList } from "@/app/(without-navbar)/fundings/[fundId]/donations/client";
import LayoutWithPrev from "@/components/layout/layout-with-prev";

interface DonationsPageProps {
  params: {
    fundId: string;
  };
}

export default async function DonationsPage({ params }: DonationsPageProps) {
  const fundUuid = params.fundId;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["donations", fundUuid],
    queryFn: () => fetchDonations(fundUuid),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.lastId,
    pages: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutWithPrev title="후원내역">
        <DonationList fundUuid={params.fundId} />
      </LayoutWithPrev>
    </HydrationBoundary>
  );
}
