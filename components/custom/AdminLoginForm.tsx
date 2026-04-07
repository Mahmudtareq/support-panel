"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { routes } from "@/config/routes";
// import { ROLE_REDIRECTS, Role } from "@/config/roleConfig";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Step 1: call NextAuth signIn (hits your authorize() in auth.ts)
      const res = await signIn("admin-login", {
        email,
        password,
        redirect: false, // we handle redirect manually
      });
      console.log("response", res);

      // Step 2: handle auth errors
      if (res?.error) {
        setError(
          res.error === "CredentialsSignin"
            ? "Invalid email or password"
            : res.error, // shows real backend message
        );
        return;
      }

      // Step 3: fetch fresh session to get role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      console.log("session admin", session);

      router.push(routes.privateRoutes.admin.dashboard);
      // Step 4: redirect to role-specific dashboard
      //   if (role && ROLE_REDIRECTS[role]) {
      //     router.push(ROLE_REDIRECTS[role]);
      //     router.refresh();           // ensure layout re-renders with session
      //   } else {
      //     setError("Unrecognized role. Please contact support.");
      //   }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the support panel
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@support.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
