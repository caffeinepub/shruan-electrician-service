import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Shield, Zap } from "lucide-react";
import { useState } from "react";

const ADMIN_PASSWORD = "shruan@123";
const ADMIN_SESSION_KEY = "shruan_admin_logged_in";

export function setAdminSession() {
  localStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password.trim()) return;
    setLoading(true);
    setError("");

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 500));

    if (password === ADMIN_PASSWORD) {
      setAdminSession();
      void router.navigate({ to: "/admin/dashboard" });
    } else {
      setError("Galat password hai. Dobara try karein.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center hero-gradient px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary electric-glow">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-black text-white">
              Shruan Electrician
            </h1>
            <p className="mt-1 text-sm text-white/60">Admin Portal</p>
          </div>

          {/* Login Form */}
          <div className="rounded-xl border border-white/10 bg-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-white">
                  Admin Login
                </h2>
                <p className="text-xs text-white/60">Password daalkein</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Input
                  data-ocid="admin.input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password daalkein..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="h-11 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {error && (
                <p
                  data-ocid="admin.error_state"
                  className="text-xs text-red-400 font-medium"
                >
                  {error}
                </p>
              )}

              <Button
                data-ocid="admin.primary_button"
                onClick={handleLogin}
                disabled={loading || !password.trim()}
                className="w-full h-11 bg-primary font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Login ho raha hai...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Login Karein
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              data-ocid="admin.link"
              href="/"
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              Main site pe wapas jaiye
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
