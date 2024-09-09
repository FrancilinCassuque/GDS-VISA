import { Metadata } from "next";
import HomeFeed from "../../_components/home/feedHome";
import { HomeDashboard } from "@/app/_components";

const metadata: Metadata = {
  title: "S A R A - Feed",
  description: "Feed page",
}

export default function HomePage(){
  return(
    // <HomeFeed/>
    <HomeDashboard/>
  )
}