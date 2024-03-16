"use client";
import React from "react";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableAbsen from "@/components/TableAbsen";
import PersonForm from "@/components/CreateForm";
import DataCount from "@/components/DataCount";
import { DataProvider } from "@/components/context";

function page() {
  return (
    <DataProvider>
    <div>
      <NavBar />
      <div className="flex justify-center mt-[15vh]">
        <DataCount />
      </div>
      <div className="flex justify-center mt-12">
        <Tabs defaultValue="attendance" className="w-[80vw] md:w-[40vw]">
          <TabsList className="w-full">
            <TabsTrigger value="attendance" className="w-full">
              Attendance
            </TabsTrigger>
            <TabsTrigger value="create" className="w-full">
              Add a Person
            </TabsTrigger>
          </TabsList>
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Table</CardTitle>
                <CardDescription>
                  See who&apos;s coming into your class.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <TableAbsen />
                <CardDescription className="my-6">
                  *Tap the row to change the attendance status
                </CardDescription>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Add a New Person</CardTitle>
                <CardDescription>
                  Add a new person to your class.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <PersonForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </DataProvider>
  );
}

export default page;
