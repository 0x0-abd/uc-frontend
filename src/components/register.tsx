import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { useState } from "react"
import axios from "../api/axios"
import { LoggedInUserData } from "../lib/data"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const REG_URL = '/auth/register'

const formSchema = z.object({
  firstname: z.string().trim().min(1, {
    message: "First Name cannot be empty",
  }),
  lastname: z.string().trim(),
  username: z.string().trim().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  }),
})

export function RegisterForm({ setUser }: { setUser: (object: LoggedInUserData) => void }) {
  const [isLogging, setIsLogging] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLogging(true)
    try {
      const response = await axios.post(REG_URL, {
        username: values.username,
        password: values.password,
        name: `${values.firstname} ${values.lastname}`
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
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
      setError(e.response.data.message)
      setTimeout(() => {setError(undefined)}, 3000 )
    }
    // console.log(`${values.firstname} ${values.lastname}`)
    setIsLogging(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your username.
                  </FormDescription>
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
                  <FormDescription>
                    Password should be at least 6 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLogging}>Sign Up</Button>
            { error && <FormDescription className="text-red-500 text-md">{error}</FormDescription>}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
