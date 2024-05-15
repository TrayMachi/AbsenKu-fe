import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AbsenKu | Dashboard",
  description: "Created by Tristan.A",
};

export default function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
