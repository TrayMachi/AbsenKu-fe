"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useData } from "@/components/context/context";
import FetchService from "@/service/fetch.service";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please fill the name.",
    })
    .min(4, "Name must be at least 4 characters long.")
    .max(24, "Name must be no more than 24 characters long."),
  role: z.string({
    required_error: "Please fill the role.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const PersonForm: NextPage = () => {
  const [data, setData] = useData();
  const fetchService = FetchService.getInstance();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    fetchService.createResource(data).then((data) => {
      setData((prevData) => [...prevData, data]);
      toast.success("Successfully added a new person");
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="The person name..." {...field} />
              </FormControl>
              <FormDescription>Please enter the person name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role for this person" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Dosen">Dosen</SelectItem>
                  <SelectItem value="Asdos">Asdos</SelectItem>
                  <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What is the role of the person?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PersonForm;
