import { useEffect, useRef } from 'react';
import Image from "next/image";

const Banner = ({ imageUrl }) => {
  const bannerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      bannerRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mt-20 relative overflow-hidden" style={{ height: "500px", clipPath: "polygon(0 0, 100% 0, 100% 65%, 0 100%)" }}>
      <Image src="/assets/banner.jpeg" alt="Background" layout="fill" objectFit="cover" objectPosition="center" className="opacity-60" ref={bannerRef} />
      <div className="relative h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10" style={{ transformOrigin: "top left" }} ref={textRef}>
          <h1 className="text-4xl font-bold">Ideas</h1>
          <p className="text-xl">Where all our great things begin</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
