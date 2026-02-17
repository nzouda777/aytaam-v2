import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import SponsorCard from "@/components/SponsorCard";
import BeneficiaryModal from "@/components/BeneficiaryModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { orphans, widows, families } from "@/data/mockData";

type Tab = "orphans" | "widows" | "families";

const allBeneficiaries = [
  ...orphans.map((o) => ({ ...o, _type: "orphan" as const })),
  ...widows.map((w) => ({ ...w, _type: "widow" as const })),
  ...families.map((f) => ({ ...f, _type: "family" as const })),
];

const totalWaiting = allBeneficiaries.filter((b) => !b.sponsored).length;

const Sponsorship = () => {
  const [activeTab, setActiveTab] = useState<Tab>("orphans");
  const [search, setSearch] = useState("");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<typeof allBeneficiaries[0] | null>(null);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "orphans", label: "Orphelins", count: orphans.length },
    { key: "widows", label: "Veuves", count: widows.length },
    { key: "families", label: "Familles", count: families.length },
  ];

  const getFiltered = () => {
    let data: any[] = [];
    if (activeTab === "orphans") data = orphans;
    else if (activeTab === "widows") data = widows;
    else data = families;

    if (search) {
      const q = search.toLowerCase();
      data = data.filter((d: any) => d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q));
    }
    return data;
  };

  const filtered = getFiltered();

  return (
    <Layout>
      {/* Enhanced Hero */}
      <div className="gradient-hero pattern-islamic py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Programme de parrainage</h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Offrez un soutien mensuel régulier aux orphelins, veuves et familles qui en ont le plus besoin.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-6 py-3"
            >
              <Users className="w-5 h-5 text-gold" />
              <span className="text-primary-foreground font-semibold text-lg">
                <AnimatedCounter end={totalWaiting} /> bénéficiaires en attente de parrainage
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search + Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou lieu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab + search}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item: any) => (
            <SponsorCard
              key={item.id}
              {...item}
              type={activeTab === "orphans" ? "orphan" : activeTab === "widows" ? "widow" : "family"}
              onClick={() => setSelectedBeneficiary({ ...item, _type: activeTab === "orphans" ? "orphan" : activeTab === "widows" ? "widow" : "family" })}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Aucun résultat trouvé pour « {search} »
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <BeneficiaryModal
        open={!!selectedBeneficiary}
        onClose={() => setSelectedBeneficiary(null)}
        beneficiary={selectedBeneficiary}
        type={selectedBeneficiary?._type || "orphan"}
      />
    </Layout>
  );
};

export default Sponsorship;
