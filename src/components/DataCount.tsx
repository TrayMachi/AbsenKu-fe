import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "../context/context";

function DataCount() {
  const [data, setData] = useData();

  const presentCount = data.filter((item) => item.present).length;
  const absentCount = data.filter((item) => !item.present).length;

  return (
    <main className="grid md:grid-cols-2 grid-cols-1 w-[80vw] md:w-[40vw] gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Total <span className="text-[#a9f0a9]">Present</span>
          </CardTitle>
          <CardDescription>Total Present in your class</CardDescription>
        </CardHeader>
        <CardContent>{presentCount}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Total <span className="text-[#ff6961]">Absent</span>
          </CardTitle>
          <CardDescription>Total Absent in your class</CardDescription>
        </CardHeader>
        <CardContent>{absentCount}</CardContent>
      </Card>
    </main>
  );
}

export default DataCount;
