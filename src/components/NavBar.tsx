"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoMdClipboard } from "react-icons/io";
import { useRouter, usePathname, useParams } from "next/navigation";
import { toast } from "sonner";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

function NavBar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const fetchUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser(null);
        router.push("/");
      }
    });
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Logout Successful", {
          description: "You have been logged out",
        });
        router.push("/");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-30 flex w-full items-center justify-between px-2 md:px-6 backdrop-blur-md overflow-hidden py-4",
        className
      )}
      {...props}
    >
      {/* Logo on the left */}
      <div className="flex items-center">
        <IoMdClipboard size={"50px"} />
        <span className="px-4 text-m md:text-lg font-bold">AbsenKu</span>
      </div>

      {/* Navigation links on the right */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        {user ? (
          <>
            <p className="text-sm">
              Welcome,{" "}
              <span className="text-primary font-medium transition-colors">
                {user}
              </span>
            </p>
            <button
              onClick={() => logOut()}
              className={`hover:text-[#a03f3f] font-medium text-sm transition-colors`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/"
              className="hover:text-primary text-sm font-medium transition-colors md:block hidden"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
