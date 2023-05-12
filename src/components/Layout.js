import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FooterSticky from "./FooterSticky";

export default function Layout({ children }) {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 768); // 768 is the breakpoint for tablet size
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header showNav={!isTabletOrSmaller} />
      <div className="md:pb-60">{children}</div>
      {!isTabletOrSmaller && <FooterSticky />}
      {isTabletOrSmaller && <Footer />}
    </div>
  );
}
