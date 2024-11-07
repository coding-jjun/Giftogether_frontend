export default interface GiftDto {
  id: number;
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
  giftOpt: string;
  giftCont: string;
  giftImg: string;
}
