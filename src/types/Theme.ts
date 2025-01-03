export enum Theme {
  Birthday = "Birthday",
  Anniversary = "Anniversary",
  Donation = "Donation",
}

export const themeOptions = [
  {
    label: "생일",
    value: Theme.Birthday,
    icon: "/icons/themes/birthday.webp",
  },
  {
    label: "기념일",
    value: Theme.Anniversary,
    icon: "/icons/themes/anniversary.webp",
  },
  {
    label: "후원",
    value: Theme.Donation,
    icon: "/icons/themes/donation.webp",
  },
];
