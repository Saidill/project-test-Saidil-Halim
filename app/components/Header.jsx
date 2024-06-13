import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      setIsVisible(currentScrollTop < lastScrollTop || currentScrollTop === 0);
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <header className={`text-white bg-accent fixed top-0 w-full z-50 transition-all duration-300 ${!isVisible ? 'bg-opacity-75' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="w-20 h-20 relative">
            <Image src="/assets/suitmedia.png" layout="fill" objectFit="contain" alt="Suitmedia Logo" />
          </div>
        </Link>
        {/* Nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
