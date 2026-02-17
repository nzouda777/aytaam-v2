import { motion } from "framer-motion";
import { impactStats } from "@/data/mockData";
import { Users, Globe, DollarSign, HeartHandshake } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { label: "Orphelins parrainés", value: impactStats.orphansSponsored, icon: Users, prefix: "", suffix: "" },
  { label: "Pays desservis", value: impactStats.countriesServed, icon: Globe, prefix: "", suffix: "" },
  { label: "Dons collectés", value: impactStats.donationsRaised / 100000, icon: DollarSign, prefix: "", suffix: "M $", displayValue: impactStats.donationsRaised },
  { label: "Bénévoles actifs", value: impactStats.volunteersActive, icon: HeartHandshake, prefix: "", suffix: "+" },
];

const ImpactStats = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center animate-pulse-glow"
                whileHover={{ scale: 1.1 }}
              >
                <stat.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <p className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {stat.displayValue ? (
                  <AnimatedCounter end={25} prefix="" suffix=" M $" decimals={1} />
                ) : (
                  <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
