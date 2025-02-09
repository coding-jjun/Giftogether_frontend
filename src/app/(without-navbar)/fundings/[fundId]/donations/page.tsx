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

export default function DonationsPage({ params }: DonationsPageProps) {
  const fundUuid = params.fundId;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["donations", fundUuid],
    queryFn: () => fetchDonations(fundUuid),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutWithPrev title="후원내역">
        <DonationList fundUuid={params.fundId} />
      </LayoutWithPrev>
    </HydrationBoundary>
  );
}
