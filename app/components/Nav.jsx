"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Work",
    path: "/",
  },
  {
    name: "About",
    path: "/",
  },
  {
    name: "Services",
    path: "/",
  },
  {
    name: "Ideas",
    path: "/",
  },
  {
      name: "Contact",
      path: "/",
    },
];

const Nav = () => {
  const pathname = usePathname();
  console.log(pathname);
  
  return (
    <div className="flex gap-8">
      {links.map((link, index) => (
        <Link href={link.path} key={index} className={`${link.path === pathname && " text-white hover:border-b-2"}
        capitalize font-medium transition-all`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
