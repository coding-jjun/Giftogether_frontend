import { Funding } from "@/types/Funding";
import { User } from "@/types/User";
import { DonationStatus } from "@/types/DonationStatus";

export interface Donation {
  donId: number;
  funding: Funding;
  user: User;
  donationStatus: DonationStatus;
  orderId: string;
  donAmnt: number;
  regAt: Date;
  delAt: Date;
}

export interface DonationListDto {
  donId: number;
  donUserId: number;
  donUserNick: string;
  donUserImg: string;
  orderId: string;
  donStat: DonationStatus;
  donAmnt: number;
  regAt: string;
}

export interface MyDonationListDto {
  donId: number;
  fundUuid: string;
  fundTitle: string;
  donUserId: number;
  fundUserId: number;
  fundUserNick: string;
  fundUserImg: string;
  orderId: string;
  donStat: DonationStatus;
  donAmnt: number;
  regAt: Date;
}
