export default interface GiftDto {
  id: string;
  giftImg?: string | null;
  giftOrd: number;
  giftTitle: string;
  giftUrl: string;
  giftOpt?: string;
  giftCont?: string;
}

export interface ResponseGiftDto {
  giftId: number;
  fundId: number;
  giftUrl: string;
  giftOrd: number;
  giftTitle: string;
  giftOpt: string;
  giftCont: string;
  giftImg: string;
}
