import { UserLoginForm } from "@/components/custom/UserLoginForm";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Support Panel</h1>
          <p className="text-muted-foreground mt-2">User Login</p>
        </div>
        <UserLoginForm />
      </div>
    </div>
  );
}
