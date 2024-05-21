import { CircleUser, Menu, Package2 } from "lucide-react"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
// import { Input } from "./ui/input"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { ModeToggle } from "./mode-toggle"
import { Link, useNavigate } from "react-router-dom"
import { LoggedInUserData } from "../lib/data"
import axios from "../api/axios"

const LOGOUT_URL = '/auth/signout'

export function Navbar({ user, setUser }: { user: LoggedInUserData | undefined, setUser: (object?: LoggedInUserData) => void }) {

  const navigate = useNavigate()

  const handleSignOut = async () => {

    try {
      const res = await axios.post(LOGOUT_URL, {}, {
        withCredentials: true
      })
      console.log(res.data.message)
    } catch (e) {
      console.log(e)
    }
    setUser(undefined)
    navigate("/")
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Universal Chat</span>
        </Link>
        <Link
          to="/chat"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          ChatRoom
        </Link>
        <Link
          to="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          About
        </Link>
        {/* <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </a>
          <a
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </a> */}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Universal Chat</span>
            </Link>
            <Link
              to="/chat"
              className="text-muted-foreground hover:text-foreground"
            >
              ChatRoom
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            {/* <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </a>
              <a href="#" className="hover:text-foreground">
                Settings
              </a> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form> */}
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative float-end">
            <ModeToggle />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{!user ? "Visitor" : `${user.name}`}</DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
              <DropdownMenuItem>Login</DropdownMenuItem>
              <DropdownMenuItem>About</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {!user ?
              <DropdownMenuItem onClick={() => navigate("/")}>Login</DropdownMenuItem>
              :
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}