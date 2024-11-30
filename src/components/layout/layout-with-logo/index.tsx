import { Header } from "@/components/layout/layout-with-logo/Header";
import { NavigationBar } from "@/components/layout/layout-with-logo/NavigationBar";
import { container, content } from "./layout.css";

interface Props {
  children: React.ReactNode;
}

export default function LayoutWithLogo({ children }: Props) {
  return (
    <div className={container}>
      <Header />
      <div className={content}>{children}</div>
      <NavigationBar />
    </div>
  );
}
