import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"


export const Popular: React.FC = () => {
  return (
    <Card>
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">Popular Tags</h3>
      </CardHeader>
      <CardContent className="p-4 grid gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">JavaScript</Badge>
          <Badge variant="outline">CSS</Badge>
          <Badge variant="outline">Tailwind</Badge>
          <Badge variant="outline">Performance</Badge>
          <Badge variant="outline">Accessibility</Badge>
          <Badge variant="outline">Serverless</Badge>
          <Badge variant="outline">Metaverse</Badge>
        </div>
      </CardContent>
    </Card>
  )
}