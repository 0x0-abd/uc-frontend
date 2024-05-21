import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { LoggedInUserData } from "../lib/data"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

const LOGIN_URL = '/auth/login'

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  }),
})

export function LoginForm({ setUser }: { setUser: (object: LoggedInUserData) => void }) {
  const [ isLogging, setIsLogging ] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLogging(true)
    try {
      const response = await axios.post(LOGIN_URL, values, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      // console.log(response.data)
      if (response.data.success) {
        setUser({
          id: response.data.id,
          name: response.data.name,
          username: response.data.username,
          role: response.data.role
        })
        console.log("Signed In")
        navigate("/chat")
      }
    } catch (e: any) {
      // console.log(e?.response?.data)
      setError(e.response?.data?.message)
      setTimeout(() => {setError(undefined)}, 3000 )
    }
    setIsLogging(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="w-full text-center">
          Enter your credentials to login to your account.
          
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Password should be at least 6 characters long.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLogging}>Login</Button>
            { error && <FormDescription className="text-red-500 text-md">{error}</FormDescription>}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="grid gap-2 w-full">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </CardFooter>

    </Card>
  )
}