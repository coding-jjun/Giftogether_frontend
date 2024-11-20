import calculateDate from "@/utils/calculateDate";

export default function getDeadlineStatus(deadlineDate: string) {
  const remainingDays = calculateDate(new Date(), deadlineDate);

  if (remainingDays > 0) return `${remainingDays}`;
  else if (remainingDays === 0) return "오늘 마감";
  else return "만료됨";
}
