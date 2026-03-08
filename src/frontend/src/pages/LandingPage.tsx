import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Home,
  Lightbulb,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Power,
  Settings,
  Star,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateBooking } from "../hooks/useQueries";

const SERVICES = [
  {
    name: "Electrical Wiring",
    icon: Zap,
    desc: "Complete home and office wiring solutions with certified materials",
    color: "text-yellow-500",
  },
  {
    name: "Fan/AC Installation",
    icon: Wind,
    desc: "Professional installation and repair of fans, ACs and exhausts",
    color: "text-blue-400",
  },
  {
    name: "MCB Repair",
    icon: Settings,
    desc: "Miniature circuit breaker installation, repair and replacement",
    color: "text-purple-400",
  },
  {
    name: "Switchboard Repair",
    icon: Power,
    desc: "Faulty switchboard diagnosis, repair and modular upgrades",
    color: "text-orange-400",
  },
  {
    name: "Generator Setup",
    icon: Zap,
    desc: "Generator installation, maintenance and power backup systems",
    color: "text-green-400",
  },
  {
    name: "Light Fitting",
    icon: Lightbulb,
    desc: "LED, chandelier, spotlights and decorative light installations",
    color: "text-yellow-400",
  },
  {
    name: "Short Circuit Fix",
    icon: AlertTriangle,
    desc: "Emergency short circuit detection and rapid safe repair",
    color: "text-red-400",
  },
  {
    name: "Home Rewiring",
    icon: Home,
    desc: "Full-house rewiring for old properties or renovation projects",
    color: "text-cyan-400",
  },
  {
    name: "Panel Upgrades",
    icon: Wrench,
    desc: "Electrical panel upgrades for modern load requirements",
    color: "text-indigo-400",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    area: "Andheri West",
    rating: 5,
    text: "Shruan team fixed our short circuit within 2 hours. Very professional and affordable!",
  },
  {
    name: "Priya Mehta",
    area: "Bandra",
    rating: 5,
    text: "Got all 4 ACs installed perfectly. Clean work, no mess, very punctual.",
  },
  {
    name: "Vikram Patil",
    area: "Powai",
    rating: 5,
    text: "Full home rewiring done in 3 days. Excellent quality and great pricing.",
  },
];

export default function LandingPage() {
  const bookingRef = useRef<HTMLDivElement>(null);
  const createBooking = useCreateBooking();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    service: "",
    dateTime: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.phone ||
      !form.address ||
      !form.service ||
      !form.dateTime
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await createBooking.mutateAsync(form);
      setSubmitted(true);
      setForm({
        customerName: "",
        phone: "",
        address: "",
        service: "",
        dateTime: "",
        notes: "",
      });
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header Nav ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold leading-tight text-foreground">
                Shruan
              </p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Electrician Service
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#services"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#booking"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Book Now
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a
              href="https://wa.me/919628469060"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </nav>
          <button
            type="button"
            data-ocid="nav.booking_link"
            onClick={scrollToBooking}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity md:hidden"
          >
            <Zap className="h-3.5 w-3.5" />
            Book
          </button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-gradient">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/assets/generated/hero-electrician.dim_1200x600.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.08_260/0.95)] via-[oklch(0.22_0.09_255/0.8)] to-transparent" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                <MapPin className="h-3 w-3" />
                Mumbai, Maharashtra
              </div>
              <h1 className="font-heading text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                Shruan
                <span className="block text-[oklch(0.84_0.16_80)]">
                  Electrician
                </span>
                Service
              </h1>
              <p className="mt-4 text-base text-white/75 md:text-lg md:max-w-lg">
                Mumbai's trusted electrical experts. From emergency repairs to
                complete wiring solutions — available 24/7 across the city.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.button
                  data-ocid="hero.primary_button"
                  onClick={scrollToBooking}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="electric-glow flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all"
                >
                  <Zap className="h-5 w-5" />
                  Book Service Now
                </motion.button>
                <a
                  href="https://wa.me/919628469060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <MessageCircle className="h-5 w-5 text-green-400" />
                  WhatsApp Us
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { val: "500+", label: "Happy Clients" },
                  { val: "10+", label: "Years Experience" },
                  { val: "24/7", label: "Emergency Service" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-black text-[oklch(0.84_0.16_80)]">
                      {stat.val}
                    </p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Our Services
            </p>
            <h2 className="font-heading text-3xl font-black text-foreground md:text-4xl">
              What We Offer
            </h2>
            <p className="mt-3 text-muted-foreground">
              Professional electrical services across all of Mumbai
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="card-hover group rounded-2xl border border-border bg-card p-6 cursor-pointer"
                  onClick={scrollToBooking}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-card-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {service.desc}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-primary group-hover:underline">
                    Book now →
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────── */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CheckCircle2,
                title: "Licensed & Certified",
                desc: "All technicians are government certified",
              },
              {
                icon: Zap,
                title: "Fast Response",
                desc: "On-site within 2 hours of booking",
              },
              {
                icon: Star,
                title: "Quality Assured",
                desc: "Top-grade materials and workmanship",
              },
              {
                icon: Phone,
                title: "24/7 Support",
                desc: "Emergency helpline always available",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Booking Form ────────────────────────────────────────── */}
      <section id="booking" ref={bookingRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                Book a Service
              </p>
              <h2 className="font-heading text-3xl font-black text-foreground md:text-4xl">
                Schedule Your Visit
              </h2>
              <p className="mt-3 text-muted-foreground">
                Fill in the details below and our team will confirm within 30
                minutes
              </p>
            </motion.div>

            <motion.div
              data-ocid="booking.form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    data-ocid="booking.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">
                      Booking Confirmed!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you! Our team will contact you within 30 minutes to
                      confirm your appointment.
                    </p>
                    <div className="flex gap-3 mt-2">
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="bg-primary text-primary-foreground hover:opacity-90"
                      >
                        Book Another
                      </Button>
                      <a
                        href="https://wa.me/919628469060"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp Us
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="customerName" className="font-semibold">
                          Customer Name{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="customerName"
                          data-ocid="booking.name_input"
                          placeholder="Your full name"
                          value={form.customerName}
                          onChange={(e) =>
                            setForm({ ...form, customerName: e.target.value })
                          }
                          required
                          className="border-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-semibold">
                          Phone Number{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          data-ocid="booking.phone_input"
                          placeholder="10-digit mobile number"
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          required
                          className="border-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="font-semibold">
                        Address <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        data-ocid="booking.address_input"
                        placeholder="Full address with landmark, Mumbai"
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        required
                        rows={3}
                        className="border-input resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="font-semibold">
                          Service Required{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.service}
                          onValueChange={(val) =>
                            setForm({ ...form, service: val })
                          }
                        >
                          <SelectTrigger
                            data-ocid="booking.service_select"
                            className="border-input"
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICES.map((s) => (
                              <SelectItem key={s.name} value={s.name}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateTime" className="font-semibold">
                          Preferred Date & Time{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="dateTime"
                          data-ocid="booking.datetime_input"
                          type="datetime-local"
                          value={form.dateTime}
                          onChange={(e) =>
                            setForm({ ...form, dateTime: e.target.value })
                          }
                          required
                          className="border-input"
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="font-semibold">
                        Additional Notes{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </Label>
                      <Textarea
                        id="notes"
                        data-ocid="booking.notes_input"
                        placeholder="Describe the issue, any special requirements..."
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        rows={3}
                        className="border-input resize-none"
                      />
                    </div>

                    {createBooking.isError && (
                      <div
                        data-ocid="booking.error_state"
                        className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      >
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        Failed to submit booking. Please try again or WhatsApp
                        us.
                      </div>
                    )}

                    <Button
                      data-ocid="booking.submit_button"
                      type="submit"
                      disabled={createBooking.isPending}
                      className="w-full bg-primary py-6 text-base font-bold text-primary-foreground hover:opacity-90 disabled:opacity-70"
                    >
                      {createBooking.isPending ? (
                        <span
                          data-ocid="booking.loading_state"
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting Booking...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Confirm Booking
                        </span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Customer Reviews
            </p>
            <h2 className="font-heading text-3xl font-black text-foreground">
              What Our Clients Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <Star
                      key={`star-${t.name}-${j}`}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{t.text}"
                </p>
                <div className="mt-4">
                  <p className="font-heading font-bold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {t.area}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Footer ────────────────────────────────────── */}
      <footer id="contact" className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-foreground">
                    Shruan Electrician Service
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mumbai, Maharashtra
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted electrical partner in Mumbai. Quality work, fair
                prices, fast service.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#services"
                    className="hover:text-foreground transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#booking"
                    className="hover:text-foreground transition-colors"
                  >
                    Book Now
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/admin";
                    }}
                  >
                    Admin Login
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-foreground mb-4">
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:+919628469060"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +91 96284 69060
                </a>
                <a
                  href="https://wa.me/919628469060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  WhatsApp: 9628469060
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Mumbai, Maharashtra
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Shruan Electrician Service. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ─────────────────────────────── */}
      <motion.a
        data-ocid="whatsapp.button"
        href="https://wa.me/919628469060"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-btn fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white transition-all"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.a>
    </div>
  );
}
