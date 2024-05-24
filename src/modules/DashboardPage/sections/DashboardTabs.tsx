"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SelectRe from "../elements/SelectRe";
import { attendanceType, roleType } from "../constant";
import { TableAbsen } from "../elements/TableAbsen";
import PersonForm from "../elements/CreateForm";

export const DashboardTabs = () => {
  const [filterRole, setFilterRole] = useState<string>("All");
  const [filterAttendance, setFilterAttendance] = useState<string>("All");
  const handleFilterRole = (e: string) => {
    setFilterRole(e);
  };
  const handleFilterAttendance = (e: string) => {
    setFilterAttendance(e);
  };
  return (
    <section className="flex justify-center my-12">
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
              <CardDescription className="flex flex-col gap-4">
                See who&apos;s coming into your class.
              </CardDescription>
              <div className="flex flex-row gap-4">
                <SelectRe
                  options={roleType}
                  group={[
                    { key: "all", label: "" },
                    { key: "role", label: "Role" },
                  ]}
                  handleChange={(e) => {
                    handleFilterRole(e);
                  }}
                  placeholder="All"
                />
                <SelectRe
                  options={attendanceType}
                  group={[
                    { key: "all", label: "" },
                    { key: "attendance", label: "Attendance" },
                  ]}
                  handleChange={(e) => {
                    handleFilterAttendance(e);
                  }}
                  placeholder="All"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <TableAbsen
                filterRole={filterRole}
                filterAttendance={filterAttendance}
              />
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
              <CardDescription>Add a new person to your class.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <PersonForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
