import LayoutWithLogo from "@/components/layout/layout-with-logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutWithLogo>{children}</LayoutWithLogo>;
}
