import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconBell, IconBolt, IconCircleHelp, IconCpu, IconCreditCard, IconHome, IconLayers, IconLock, IconLogOut, IconMoveHorizontal, IconSettings, IconShield, IconUser } from "../icons"

export default function Footer2() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-background shadow-t">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="#" className="group flex items-center gap-2" prefetch={false}>
            <IconHome className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
              Home
            </span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="group">
                <IconLayers className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="sr-only">Features</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Features</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconBolt className="h-4 w-4 text-muted-foreground" />
                  <span>Performance</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconShield className="h-4 w-4 text-muted-foreground" />
                  <span>Security</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconCpu className="h-4 w-4 text-muted-foreground" />
                  <span>Scalability</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="group">
                <IconSettings className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconUser className="h-4 w-4 text-muted-foreground" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconBell className="h-4 w-4 text-muted-foreground" />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconLock className="h-4 w-4 text-muted-foreground" />
                  <span>Security</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="#" className="group flex items-center gap-2" prefetch={false}>
            <IconCreditCard className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
              Pricing
            </span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="group">
                <IconMoveHorizontal className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>More</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconCircleHelp className="h-4 w-4 text-muted-foreground" />
                  <span>Help</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" className="flex w-full items-center gap-2" prefetch={false}>
                  <IconLogOut Iconclass="h-4 w-4 text-muted-foreground" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  )
}