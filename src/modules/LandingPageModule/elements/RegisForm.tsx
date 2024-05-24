"use client";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { toast } from "sonner";

// Define the form schema using zod
const FormSchema = z.object({
  name: z
    .string({
      required_error: "",
    })
    .min(4),
  email: z.string({
    required_error: "",
  }),
  password: z.string({
    required_error: "",
  }).min(8),
});

type FormValues = z.infer<typeof FormSchema>;

export const RegisterForm: NextPage = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: data.name });
        toast.message("Registration Successful", {
          description: "Welcome to AbsenKu",
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username..." {...field} />
              </FormControl>
              <FormDescription>Please enter your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email..." {...field} />
              </FormControl>
              <FormDescription>Please enter your email address</FormDescription>
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
                <Input
                  type="password"
                  placeholder="Your password..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};
