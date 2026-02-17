import { motion } from "framer-motion";
import { Heart, Shield, Globe, Users } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactStats from "@/components/ImpactStats";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const values = [
  { icon: Heart, title: "Compassion", description: "Chaque personne mérite dignité, soins et la chance de s'épanouir. Nous servons avec miséricorde et amour." },
  { icon: Shield, title: "Confiance & Transparence", description: "100% de vos dons vont directement à ceux qui en ont besoin. Nous publions régulièrement des rapports d'impact détaillés." },
  { icon: Globe, title: "Portée mondiale", description: "Présents dans 18 pays, nous veillons à ce que l'aide atteigne les communautés les plus vulnérables dans le monde." },
  { icon: Users, title: "Communauté", description: "Nous croyons en l'autonomisation des communautés pour devenir autosuffisantes grâce à des programmes durables." },
];

const About = () => {
  return (
    <Layout>
      <div className="gradient-hero pattern-islamic py-20 relative overflow-hidden">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 right-20 w-20 h-20 border-2 border-primary-foreground/10 rounded-full"
        />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            À propos d'UmmahCare
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary-foreground/80 text-lg leading-relaxed"
          >
            Fondée sur les principes de la charité islamique, UmmahCare se consacre à transformer la vie des orphelins, veuves et familles dans le besoin à travers le monde musulman.
          </motion.p>
        </div>
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Notre mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous nous efforçons d'accomplir la tradition prophétique de prendre soin des membres les plus vulnérables de notre Oummah. À travers les parrainages, l'aide d'urgence, l'éducation et les programmes d'autonomisation, nous offrons un soutien holistique qui transforme des vies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Depuis notre création, nous avons servi plus de 5 000 bénéficiaires dans 18 pays, construit des écoles, établi des cliniques de santé et fourni un soutien mensuel continu aux orphelins, veuves et familles.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600" alt="Notre mission" className="rounded-xl shadow-lg w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl font-bold text-foreground text-center mb-12">Nos valeurs</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-lg transition-shadow"
              >
                <motion.div whileHover={{ rotate: 10 }} className="w-14 h-14 rounded-full bg-emerald-light mx-auto mb-4 flex items-center justify-center">
                  <v.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ImpactStats />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Rejoignez notre mission</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Que ce soit par des dons, des parrainages ou du bénévolat, votre soutien crée un changement durable.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/donate">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  <Heart className="w-5 h-5 mr-2" /> Commencer à donner
                </Button>
              </Link>
              <Link to="/sponsorship">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Parcourir les parrainages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
