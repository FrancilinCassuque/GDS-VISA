import { Metadata } from "next";
import HomeFeed from "../../_components/home/feedHome";

const metadata: Metadata = {
  title: "S A R A - Feed",
  description: "Feed page",
}

export default function HomePage(){
  return(
    <HomeFeed/>
  )
}