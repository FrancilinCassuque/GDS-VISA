'use client'

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"
import { CategoryHome } from "./feed/category"
import { Popular } from "./feed/popular"
import HomeCardList from "./feed/cardHome"
import Image from "next/image"
import { homeStore } from "@/store"
import { useSession } from "next-auth/react"

export default function HomeFeed() {
  const casas = homeStore()
  const { status } = useSession()


  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 grid grid-cols-1  gap-8 p-4 md:p-6">
        <div className="space-y-8">
          <div className="">
          </div>
          <HomeCardList />
          {/* <HomePosts/> */}
          <div className="flex justify-center">
            {/* <Pagination /> */}
          </div>
        </div>


        {((casas.casas.length > 0) && (status == 'authenticated')) && (
          <>
            <div className="space-y-8">

              {/* <CategoryHome /> */}
              {/* <Popular /> */}

              {
                /* <Card>
              <CardHeader className="p-4">
                <h3 className="text-lg font-semibold">Related Posts</h3>
              </CardHeader>
              <CardContent className="p-4 grid gap-4">
                <div className="flex gap-4">
                  <Image
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Article Image"
                    className="rounded-md object-cover aspect-square"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Mastering React Hooks</h4>
                    <p className="text-sm text-muted-foreground">
                      Dive into the power of React Hooks and learn how to leverage them.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Article Image"
                    className="rounded-md object-cover aspect-square"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Building a Serverless Application</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn how to build a scalable and cost-effective serverless app.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Image
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Article Image"
                    className="rounded-md object-cover aspect-square"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Optimizing Website Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Improve your website's speed and user experience with these tips.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */
              }

            </div>
          </>
        )}

      </main>
    </div>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}