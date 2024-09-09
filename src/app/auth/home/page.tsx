import { Metadata } from "next";
import { HomeDashboard } from "@/app/_components";

const metadata: Metadata = {
  title: "S A R A - Home",
  description: "Home page",
}

export default function HomePage(){
  return(
    <HomeDashboard/>
  )
}