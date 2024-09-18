import { Metadata } from "next";
import { HomeDashboard } from "@/app/_components";

export const metadata: Metadata = {
  title: "GOTA D' SOL - Home",
  description: "Home page",
}

export default function HomePage(){
  return(
    <HomeDashboard/>
  )
}