import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { AlertCircle, Loader2, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    login,
    clear,
    isLoggingIn,
    isLoginSuccess,
    identity,
    isInitializing,
  } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  // If already logged in and admin, redirect to dashboard
  useEffect(() => {
    if (isLoginSuccess && identity && isAdmin === true) {
      void router.navigate({ to: "/admin/dashboard" });
    }
  }, [isLoginSuccess, identity, isAdmin, router]);

  const handleLogin = () => {
    login();
  };

  const isLoggedIn = !!identity;
  const showAccessDenied = isLoggedIn && !adminLoading && isAdmin === false;
  const loading = isLoggingIn || isInitializing || (isLoggedIn && adminLoading);

  return (
    <div className="flex min-h-screen items-center justify-center hero-gradient px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
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

          {/* Card body */}
          <div className="rounded-xl border border-white/10 bg-white/10 p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-white">
                  Admin Access
                </h2>
                <p className="text-xs text-white/60">
                  Login with Internet Identity
                </p>
              </div>
            </div>

            {showAccessDenied ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3 rounded-lg bg-destructive/20 border border-destructive/30 p-4">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive text-sm">
                      Access Denied
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      Your account does not have admin privileges. Please
                      contact the system administrator.
                    </p>
                  </div>
                </div>
                <Button
                  data-ocid="admin.logout_button"
                  variant="outline"
                  onClick={clear}
                  className="w-full border-white/20 bg-white/5 text-white hover:bg-white/15"
                >
                  Sign Out
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-white/70">
                  Secure access for Shruan admins only. Use your Internet
                  Identity to authenticate.
                </p>
                <Button
                  data-ocid="admin.login_button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-primary py-5 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isInitializing ? "Initializing..." : "Authenticating..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Login with Internet Identity
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-white/40">
                  Restricted access. Authorized personnel only.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              ← Back to main site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
