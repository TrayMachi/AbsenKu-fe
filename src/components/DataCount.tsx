import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "./context";
import FetchService from "@/service/fetch.service";

function DataCount() {
  const [data, setData] = useData();
  const [user, setUser] = useState<any>(null);
  const fetchService = FetchService.getInstance();

  const fetchUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchData = async (user: any) => {
    fetchService
      .getDocuments(user)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Failed to fetch: ", error));
  };

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user]);

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