import { Button } from "@/components/ui/button"
import { IconFacebook, IconMail } from "../icons"

interface ISocialProps {
  action?: () => void
  secundeAction?: () => void
}

export const SocialAuth:React.FC<ISocialProps> = ({ action, secundeAction }) => {
  return (
    <div>
      <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" onClick={() => action?.()}>
              <IconMail className="mr-2 h-4 w-4" />
              E-mail
            </Button>
            <Button variant="outline" className="w-full" onClick={() => secundeAction?.()}>
              <IconFacebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
    </div>
  )
}