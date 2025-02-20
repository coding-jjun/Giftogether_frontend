import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

export const NextLink = ({ href, children }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
};
