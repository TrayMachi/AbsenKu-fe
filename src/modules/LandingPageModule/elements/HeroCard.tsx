"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisForm";

export const HeroCard = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  return (
    <article>
      <Card className="h-[550px] md:w-[550px]">
        <CardHeader className="text-center">
          <CardTitle>
            Enjoy your experience at{" "}
            <span className="text-violet-400">AbsenKu</span>
          </CardTitle>
          <CardDescription>Make your attendance data easier</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`transition-opacity duration-1000 ${
              showRegisterForm ? "opacity-100" : "opacity-0"
            }`}
          >
            {showRegisterForm && <RegisterForm />}
          </div>
          <div
            className={`transition-opacity duration-1000 ${
              showLoginForm ? "opacity-100" : "opacity-0"
            }`}
          >
            {showLoginForm && <LoginForm />}
          </div>
        </CardContent>
        <CardFooter>
          {showLoginForm && (
            <CardDescription>
              Don&apos;t have an account yet?{" "}
              <span
                className="text-violet-400 cursor-pointer"
                onClick={handleRegisterClick}
              >
                Register here
              </span>
            </CardDescription>
          )}
          {showRegisterForm && (
            <CardDescription>
              Already have an account?{" "}
              <span
                className="text-violet-400 cursor-pointer"
                onClick={handleLoginClick}
              >
                Login here
              </span>
            </CardDescription>
          )}
        </CardFooter>
      </Card>
    </article>
  );
};
