import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Faire un don", path: "/donate" },
  { label: "Parrainage", path: "/sponsorship" },
  { label: "Blog", path: "/blog" },
  { label: "À propos", path: "/about" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur-lg shadow-md border-border" : "bg-card/60 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-display text-xl font-bold text-foreground">Ummah<span className="text-gradient-gold">Care</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`text-sm font-medium transition-colors relative hover:text-primary ${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
                {location.pathname === item.path && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/donate">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Faire un don</Button>
            </Link>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-border bg-card">
              <nav className="flex flex-col p-4 gap-3">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={`text-sm font-medium py-2 ${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}>
                    {item.label}
                  </Link>
                ))}
                <Link to="/donate" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground mt-2">Faire un don</Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-gold" />

        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold">Ummah<span className="text-accent">Care</span></span>
              </div>
              <p className="text-background/60 text-sm leading-relaxed mb-6">
                Accompagner les orphelins, veuves et familles à travers le monde musulman avec compassion et soutien durable depuis 2018.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 className="font-display font-semibold mb-5 text-sm uppercase tracking-wider">Liens rapides</h4>
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-background/60 hover:text-accent transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-200" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Programmes */}
            <div>
              <h4 className="font-display font-semibold mb-5 text-sm uppercase tracking-wider">Programmes</h4>
              <div className="flex flex-col gap-3 text-sm text-background/60">
                {["Parrainage d'orphelins", "Autonomisation des veuves", "Soutien aux familles", "Fonds éducation", "Aide d'urgence", "Distribution de Zakat"].map((p) => (
                  <span key={p} className="hover:text-accent transition-colors cursor-default">{p}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold mb-5 text-sm uppercase tracking-wider">Nous contacter</h4>
              <div className="flex flex-col gap-4 text-sm text-background/60">
                <a href="mailto:info@ummahcare.org" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent" /> info@ummahcare.org
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 text-accent" /> +1 (555) 123-4567
                </a>
                <span className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" /> 123 Charity Lane, New York, NY 10001
                </span>
              </div>

              {/* Mini newsletter */}
              <div className="mt-6">
                <p className="text-xs text-background/40 mb-2">Recevez nos actualités</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-background/10 text-sm placeholder:text-background/30 focus:outline-none focus:border-accent/50 transition-colors" />
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-3">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-background/40">© 2026 UmmahCare Foundation. Tous droits réservés. | Association enregistrée #12345</p>
            <div className="flex gap-6 text-xs text-background/40">
              <span className="hover:text-accent transition-colors cursor-pointer">Politique de confidentialité</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Conditions d'utilisation</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Rapport annuel</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
