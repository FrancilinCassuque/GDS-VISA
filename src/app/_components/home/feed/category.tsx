import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"


export const CategoryHome: React.FC = () => {

  return (
    <Card>
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">Categories</h3>
      </CardHeader>
      <CardContent className="p-4 grid gap-2">
        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
          Web Development
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
          Design
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
          Programming
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
          Tutorials
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
          Productivity
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
          Technology
        </Link>
      </CardContent>
    </Card>
  )
} 