"use client";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoMdClipboard } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "@/components/context/context";

function NavBar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [user, setUser] = useAuth();

  const router = useRouter();

  const fetchUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
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
      <div className="flex items-center">
        <IoMdClipboard size={"50px"} />
        <span className="px-4 text-m md:text-lg font-bold">AbsenKu</span>
      </div>
      <div className="flex items-center space-x-4 lg:space-x-6">
        {user ? (
          <>
            <p className="text-sm">
              Welcome,{" "}
              <span className="text-primary font-medium transition-colors">
                {user.displayName}
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
