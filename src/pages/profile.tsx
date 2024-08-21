import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
// import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../api/axios"
import { LoggedInUserData } from "../lib/data"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "../components/ui/use-toast"

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "First Name cannot be empty",
    }),
    // email: z.string().min(1, {message:"Email required."}).email("This is not a valid email."),
    username: z.string().trim().min(4, {
        message: "Username must be at least 4 characters.",
    })
})



export function ProfilePage({ user, setUser }: { user: LoggedInUserData | undefined, setUser: (object: LoggedInUserData) => void }) {
    const [isLogging, setIsLogging] = useState<boolean>(false)
    // const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string | undefined>()
    const { toast } = useToast()
    // const navigate = useNavigate();
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        username: "",
      },
    })

    const { reset } = form;
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLogging(true)
      try {
        const response = await axios.post("auth/profile", {
          oldUsername: user?.username,
          username: values.username,
          name: values.name,
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
          console.log("Profile Details changed")
          toast({
            description: "Profile details changed"
          })
        }
      } catch (e: any) {
        // console.log(e?.response?.data)
        setError(e.response.data.message)
        setTimeout(() => {setError(undefined)}, 3000 )
      }
      // console.log(`${values.firstname} ${values.lastname}`)
      setIsLogging(false)
    }

    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/auth/getUser', { withCredentials: true });
                if (response.data.success) {
                  setUser(response.data.user);
                  setEmail(response.data.user.email)
                  setIsFetching(false)
                //   console.log(response.data.user.email)
                    reset({
                        name: response.data.user.name || '',
                        username: response.data.user.username || ''
                    });
                }
            } catch(e) {
                setEmail("Unable to verify user, please login again");
                setIsFetching(false)
            }
        }
        fetchUserData();
    }, [])

    return (
        <div className="w-full flex flex-col items-center mt-6">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl text-center">{isFetching? "Validating user, please wait" : email}</CardTitle>
                    <CardDescription className="text-center">
                        View and update profile details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                            This is your unique username.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            {/* <FormField
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
                            /> */}
                            <Button type="submit" className="w-full" disabled={isLogging}>Update</Button>
                            {error && <FormDescription className="text-red-500 text-md">{error}</FormDescription>}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}