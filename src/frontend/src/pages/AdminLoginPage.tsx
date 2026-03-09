import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Key,
  Loader2,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";
import { storeSessionParameter } from "../utils/urlParams";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, clear, isLoggingIn, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenValue, setTokenValue] = useState("");

  // Redirect as soon as identity + admin status is confirmed — no need to wait for fresh login
  useEffect(() => {
    if (identity && isAdmin === true && !adminLoading) {
      void router.navigate({ to: "/admin/dashboard" });
    }
  }, [identity, isAdmin, adminLoading, router]);

  const handleLogin = () => {
    login();
  };

  const handleSaveToken = () => {
    if (tokenValue.trim()) {
      storeSessionParameter("caffeineAdminToken", tokenValue.trim());
      // Reload page so actor is recreated with new token
      window.location.reload();
    }
  };

  const isLoggedIn = !!identity;
  // Show access denied only when we have a definitive false from backend
  const showAccessDenied = isLoggedIn && !adminLoading && isAdmin === false;
  // Show loading when: logging in, initializing, OR logged in but still waiting for admin check
  const loading = isLoggingIn || isInitializing || (isLoggedIn && adminLoading);
  // Show the loading state inside the card (after login, while checking admin role)
  const showAdminCheckLoading = isLoggedIn && adminLoading;

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
                <p className="text-xs text-white/60">Shruan Admin Panel</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showAdminCheckLoading ? (
                /* Loading state while checking admin role after login */
                <motion.div
                  key="admin-check"
                  data-ocid="admin.loading_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center gap-4 py-4"
                >
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">
                      Admin role check ho raha hai...
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Thoda wait karein, aapka role verify ho raha hai
                    </p>
                  </div>
                </motion.div>
              ) : showAccessDenied ? (
                /* Access Denied state — logged in but not admin */
                <motion.div
                  key="access-denied"
                  data-ocid="admin.error_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  {/* Error banner */}
                  <div className="flex items-start gap-3 rounded-lg bg-destructive/20 border border-destructive/30 p-4">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-destructive text-sm">
                        Access Denied — Admin Token Chahiye
                      </p>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">
                        Admin banne ke liye aapko{" "}
                        <strong className="text-white">Admin Token</strong>{" "}
                        chahiye. Neeche diye option se token enter karein.
                      </p>
                    </div>
                  </div>

                  {/* Token input option */}
                  <div className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-3">
                    <button
                      type="button"
                      data-ocid="admin.toggle"
                      onClick={() => setShowTokenInput(!showTokenInput)}
                      className="w-full flex items-center justify-between text-xs font-bold text-white hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Key className="h-3.5 w-3.5 text-primary" />
                        Admin Token Enter Karein
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${showTokenInput ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {showTokenInput && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-2"
                        >
                          <p className="text-xs text-white/60 leading-relaxed">
                            Caffeine dashboard (caffeine.ai) pe jaiye → apna
                            project kholen →{" "}
                            <strong className="text-white">Settings</strong>{" "}
                            mein{" "}
                            <strong className="text-white">Admin Token</strong>{" "}
                            copy karein aur yahan paste karein.
                          </p>
                          <div className="flex gap-2">
                            <Input
                              data-ocid="admin.input"
                              type="password"
                              placeholder="Admin token yahan paste karein..."
                              value={tokenValue}
                              onChange={(e) => setTokenValue(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleSaveToken()
                              }
                              className="flex-1 h-9 text-xs bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-primary"
                            />
                            <Button
                              data-ocid="admin.submit_button"
                              size="sm"
                              onClick={handleSaveToken}
                              disabled={!tokenValue.trim()}
                              className="h-9 bg-primary text-primary-foreground hover:opacity-90 px-3"
                            >
                              Save
                            </Button>
                          </div>
                          <div className="rounded-lg bg-white/5 border border-white/10 p-3 space-y-2">
                            <p className="text-xs font-bold text-white flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                              Token kahan milega:
                            </p>
                            <ol className="space-y-1.5">
                              {[
                                {
                                  step: "1",
                                  text: "caffeine.ai dashboard pe jaiye",
                                },
                                {
                                  step: "2",
                                  text: "Shruan Electrician project select karein",
                                },
                                {
                                  step: "3",
                                  text: '"Open App" button dabayein — woh link mein token hoga',
                                },
                                {
                                  step: "4",
                                  text: "URL se caffeineAdminToken=XXXX wala part copy karein",
                                },
                              ].map(({ step, text }) => (
                                <li
                                  key={step}
                                  className="flex items-start gap-2"
                                >
                                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">
                                    {step}
                                  </span>
                                  <span className="text-xs text-white/60 leading-relaxed pt-0.5">
                                    {text}
                                  </span>
                                </li>
                              ))}
                            </ol>
                            <a
                              data-ocid="admin.link"
                              href="https://caffeine.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              caffeine.ai Dashboard kholen →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    data-ocid="admin.secondary_button"
                    variant="outline"
                    onClick={clear}
                    className="w-full border-white/20 bg-white/5 text-white hover:bg-white/15"
                  >
                    Sign Out aur dobara try karein
                  </Button>
                </motion.div>
              ) : (
                /* Default login state */
                <motion.div
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-white/70">
                    Sirf authorized Shruan admins hi yahan login kar sakte hain.
                    Internet Identity se apni identity verify karein.
                  </p>
                  <Button
                    data-ocid="admin.primary_button"
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-primary py-5 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isInitializing
                          ? "Shuruaat ho rahi hai..."
                          : "Verify ho raha hai..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Login with Internet Identity
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-white/40">
                    Sirf authorized personnel ke liye. Restricted access.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 text-center">
            <a
              data-ocid="admin.link"
              href="/"
              className="text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              ← Main site pe wapas jaiye
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
