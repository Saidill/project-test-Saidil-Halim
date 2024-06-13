"use client"
import Image from "next/image";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ListPost from "./components/ListPost";

export default function Home() {
  return (
    <div>
      <Header/>
      <Banner/>
      <ListPost/>
    </div>
  );
}
