import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, ArrowRight, BookOpen, Sparkles, Quote, Star, Globe, Mail, Users, GraduationCap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactStats from "@/components/ImpactStats";
import SponsorCard from "@/components/SponsorCard";
import { orphans, widows, donationCauses, blogPosts } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import { useRef, useState } from "react";

const heroWords = ["Changez une vie,", "Gagnez votre récompense"];

const testimonials = [
  { id: 1, name: "Ibrahim Al-Farsi", role: "Donateur mensuel", quote: "Parrainer le petit Ahmed a été l'expérience la plus enrichissante. Je reçois des nouvelles chaque mois et voir sa progression me remplit de joie.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", rating: 5 },
  { id: 2, name: "Sarah Thompson", role: "Bénévole", quote: "La transparence et le dévouement d'UmmahCare sont incomparables. Chaque euro atteint vraiment ceux qui en ont besoin. J'en ai été témoin.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", rating: 5 },
  { id: 3, name: "Dr. Hassan Malik", role: "Organisation partenaire", quote: "Travailler avec UmmahCare a décuplé notre portée. Leur engagement envers la Oummah est vraiment inspirant et leurs systèmes sont professionnels.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", rating: 5 },
];

const partners = [
  { name: "Islamic Relief", icon: Globe },
  { name: "Muslim Aid", icon: Heart },
  { name: "Partenaire UNHCR", icon: Shield },
  { name: "Éducation d'abord", icon: GraduationCap },
  { name: "Fonds Global Oummah", icon: Users },
];

const Index = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [email, setEmail] = useState("");

  return (
    <Layout>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroBg} alt="Enfants souriants" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark/90 via-primary/80 to-primary/60" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-20 w-16 h-16 border-2 border-gold-light/20 rounded-lg" />
          <motion.div animate={{ y: [10, -15, 10] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-32 right-40 w-10 h-10 bg-gold/10 rounded-full" />
          <motion.div animate={{ y: [-10, 20, -10], x: [-5, 5, -5] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-40 left-[60%] w-8 h-8 border border-gold-light/15 rotate-45" />
        </div>
        <motion.div className="container mx-auto px-4 relative z-10" style={{ opacity: heroOpacity }}>
          <motion.div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-gold-light font-medium mb-4 tracking-widest uppercase text-sm">
              Bismillah Ar-Rahman Ar-Rahim
            </motion.p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }} className={i === 1 ? "text-gradient-gold" : ""}>
                  {i === 0 ? <>{word}{" "}</> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8">
              Soutenez les orphelins, veuves et familles dans le besoin à travers le monde musulman. Chaque don est un acte de sadaqah jariyah.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="flex flex-wrap gap-4">
              <Link to="/donate">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 shadow-lg">
                    <Heart className="w-5 h-5 mr-2" /> Faire un don
                  </Button>
                </motion.div>
              </Link>
              <Link to="/sponsorship">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                    Parrainer un enfant <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <ImpactStats />

      {/* Causes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Nos causes</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Choisissez où votre don aura le plus grand impact</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationCauses.map((cause, i) => (
              <motion.div key={cause.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)" }} className="bg-card border border-border rounded-xl p-6 transition-all">
                <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">{cause.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cause.description}</p>
                <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
                  <motion.div className="h-full rounded-full gradient-gold" initial={{ width: "0%" }} whileInView={{ width: `${(cause.raised / cause.goal) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-semibold">{cause.raised.toLocaleString()} $ collectés</span>
                  <span className="text-muted-foreground">sur {cause.goal.toLocaleString()} $</span>
                </div>
                <Link to={`/donate?cause=${cause.id}`}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">Donner pour cette cause</Button>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Orphans */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Parrainer un orphelin</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">« Moi et celui qui prend en charge un orphelin serons comme ces deux-là au Paradis » — Prophète Muhammad ﷺ</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orphans.slice(0, 3).map((orphan) => (
              <SponsorCard key={orphan.id} {...orphan} type="orphan" />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/sponsorship">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Voir tous les parrainages <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Dernières histoires</h2>
            <p className="text-muted-foreground">Actualités de notre mission et de notre communauté</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -5 }}>
                <Link to={`/blog/${post.id}`} className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary bg-emerald-light px-2 py-1 rounded">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blog">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <BookOpen className="w-4 h-4 mr-2" /> Lire plus d'histoires
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-64 h-64 border border-primary/5 rounded-full" />
          <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -bottom-32 -left-32 w-80 h-80 border border-accent/5 rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-2 block">Ce que disent nos donateurs</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Témoignages d'impact</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-2xl p-8 relative group hover:shadow-xl transition-all duration-300"
              >
                <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6 group-hover:text-accent/40 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">« {t.quote} »</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                  <div>
                    <p className="font-display font-semibold text-card-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 pattern-islamic pointer-events-none" />
            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="relative z-10">
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-card-foreground mb-3">Restez connecté</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">Abonnez-vous pour recevoir des histoires inspirantes, des mises à jour de nos programmes et des opportunités de faire la différence.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 px-5 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 rounded-xl whitespace-nowrap">
                    S'abonner
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-sm text-muted-foreground font-medium uppercase tracking-widest mb-10">
            Partenaires et affiliations de confiance
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors cursor-default"
              >
                <p.icon className="w-6 h-6" />
                <span className="font-display font-semibold text-sm">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero pattern-islamic py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ y: [-30, 30, -30], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-primary-foreground/10" />
          <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-primary-foreground/5" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-gold animate-float" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Chaque euro compte</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">Votre don aujourd'hui peut offrir nourriture, abri, éducation et espoir à ceux qui en ont le plus besoin.</p>
            <Link to="/donate">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-10 shadow-xl animate-pulse-glow">
                  <Heart className="w-5 h-5 mr-2" /> Faire un don
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
