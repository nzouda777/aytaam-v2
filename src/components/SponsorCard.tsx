import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SponsorCardProps {
  id: string;
  name: string;
  age?: number;
  location: string;
  story: string;
  monthlyNeed: number;
  image: string;
  sponsored: boolean;
  type: "orphan" | "widow" | "family";
  children?: number;
  members?: number;
  onClick?: () => void;
}

const SponsorCard = ({ id, name, age, location, story, monthlyNeed, image, sponsored, type, children, members, onClick }: SponsorCardProps) => {
  const typeLabels: Record<string, string> = { orphan: "Orphelin", widow: "Veuve", family: "Famille" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {sponsored && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
            Parrainé
          </div>
        )}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {typeLabels[type] || type}
        </div>
        <motion.div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white text-sm font-medium">Cliquez pour voir le profil complet</p>
        </motion.div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground">{name}{age ? `, ${age}` : ""}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>
        {children !== undefined && <p className="text-sm text-muted-foreground mt-1">{children} enfants</p>}
        {members !== undefined && <p className="text-sm text-muted-foreground mt-1">{members} membres</p>}
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2 whitespace-pre-line">{story}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Besoin mensuel</p>
            <p className="text-lg font-bold text-primary">{monthlyNeed} FCFA</p>
          </div>
          {!sponsored ? (
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Parrainer
            </Button>
          ) : (
            <span className="text-sm text-accent font-semibold">✓ Parrainé</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SponsorCard;
