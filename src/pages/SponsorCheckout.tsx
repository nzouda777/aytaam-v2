import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Heart, CreditCard, CheckCircle, ArrowLeft, MapPin, Star, Download, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const presetAmounts = [500, 1000, 2000, 5000, 10000, 25000];

const SponsorCheckout = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const categoryParam = searchParams.get("category"); // "orphan" | "widow" | "family"
    const idParam = searchParams.get("id");

    const [beneficiary, setBeneficiary] = useState<any>(null);
    const [loadingBeneficiary, setLoadingBeneficiary] = useState(true);

    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState("");
    const [customAmount, setCustomAmount] = useState("");
    const [paymentFrequency, setPaymentFrequency] = useState<"monthly" | "quarterly" | "yearly">("monthly");
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [paymentData, setPaymentData] = useState({ phoneNumber: "" });
    const [submitting, setSubmitting] = useState(false);

    // Fetch beneficiary details from API
    useEffect(() => {
        if (!idParam || !categoryParam) {
            setLoadingBeneficiary(false);
            return;
        }

        const fetchBeneficiary = async () => {
            try {
                // The id might be prefixed (w-XX, f-XX) or a plain number for orphans
                let actualId = idParam;
                if (idParam.startsWith("w-") || idParam.startsWith("f-")) {
                    actualId = idParam.substring(2);
                }

                let endpoint = "";
                if (categoryParam === "orphan") {
                    endpoint = `http://localhost:8000/api/orphans/${actualId}`;
                } else if (categoryParam === "widow" || categoryParam === "family") {
                    endpoint = `http://localhost:8000/api/families/${actualId}`;
                }

                if (endpoint) {
                    const response = await fetch(endpoint);
                    if (response.ok) {
                        const data = await response.json();
                        const item = data.data || data;

                        // Transform to display-friendly shape
                        if (categoryParam === "orphan") {
                            setBeneficiary({
                                id: item.id,
                                name: `${item.first_name} ${item.last_name}`,
                                age: item.date_of_birth ? calculateAge(item.date_of_birth) : undefined,
                                location: item.family?.city || "Non spécifié",
                                monthlyNeed: 0,
                                image: item.photo || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
                                sponsored: item.is_sponsored,
                                orphan_id: item.id,
                                family_id: item.family_id,
                                sponsorship_type: item.sponsorship_type,
                            });
                        } else {
                            setBeneficiary({
                                id: item.id,
                                name: categoryParam === "widow" ? item.widow_name : `Famille ${(item.widow_name || "").split(" ").pop()}`,
                                location: `${item.city || ""}${item.region ? `, ${item.region}` : ""}`,
                                monthlyNeed: item.total_needs ? Math.round(parseFloat(item.total_needs) / 12) : 0,
                                image: categoryParam === "widow"
                                    ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
                                    : "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400",
                                sponsored: item.status === "active",
                                family_id: item.id,
                                orphan_id: null,
                                sponsorship_type: item.sponsorship_type,
                                children: item.orphans_count,
                                members: (item.orphans_count || 0) + 1,
                            });
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching beneficiary:", error);
            } finally {
                setLoadingBeneficiary(false);
            }
        };

        fetchBeneficiary();
    }, [idParam, categoryParam]);

    const calculateAge = (dateOfBirth: string): number => {
        const today = new Date();
        const birth = new Date(dateOfBirth);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    };

    const handleAmountChange = (val: string, isCustom: boolean) => {
        if (isCustom) {
            setCustomAmount(val);
            setAmount("");
        } else {
            setAmount(val);
            setCustomAmount("");
        }
    };

    const finalAmount = amount || customAmount;

    const isFieldValid = (val: string) => val.trim().length > 0;
    const isEmailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const handleDonate = () => {
        if (!finalAmount || parseFloat(finalAmount) < 100) {
            toast.error("Le montant minimum est de 100 FCFA");
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePayment = () => {
        if (!formData.firstName || !formData.email) {
            toast.error("Veuillez remplir les champs obligatoires");
            return;
        }
        setStep(3);
        window.scrollTo(0, 0);
    };

    const handleConfirm = async () => {
        if (!paymentData.phoneNumber) {
            toast.error("Veuillez entrer votre numéro de téléphone");
            return;
        }

        setSubmitting(true);

        try {
            const today = new Date().toISOString().split("T")[0];

            const payload: Record<string, any> = {
                monthly_amount: parseFloat(finalAmount),
                start_date: today,
                payment_frequency: paymentFrequency,
                sponsorship_type: categoryParam,
                donor_name: `${formData.firstName} ${formData.lastName}`.trim(),
                donor_email: formData.email,
                donor_phone: paymentData.phoneNumber,
            };

            // Send the appropriate ID based on category
            if (categoryParam === "orphan" && beneficiary?.orphan_id) {
                payload.orphan_id = beneficiary.orphan_id;
                payload.family_id = beneficiary.family_id;
            } else if (beneficiary?.family_id) {
                payload.family_id = beneficiary.family_id;
            }

            const response = await fetch("http://localhost:8000/api/sponsorships", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.message || data.error || "Erreur lors de la création du parrainage";
                toast.error(errorMsg);
                setSubmitting(false);
                return;
            }

            // Redirect to payment gateway
            if (data.authorization_url) {
                toast.success("Redirection vers le paiement...");
                window.location.href = data.authorization_url;
            } else {
                toast.success("Parrainage créé avec succès !");
                setStep(4);
                setSubmitting(false);
            }
        } catch (error) {
            console.error("Sponsorship creation error:", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
            setSubmitting(false);
        }
    };

    const frequencyLabels: Record<string, string> = {
        monthly: "Mensuel",
        quarterly: "Trimestriel",
        yearly: "Annuel",
    };

    // Loading state
    if (loadingBeneficiary) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                    <p className="text-muted-foreground">Chargement des informations...</p>
                </div>
            </Layout>
        );
    }

    // Beneficiary not found
    if (!beneficiary) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-32 text-center">
                    <h2 className="text-2xl font-bold mb-4">Bénéficiaire non trouvé</h2>
                    <Button onClick={() => navigate("/sponsorship")}>Retour au programme de parrainage</Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="gradient-hero pattern-islamic py-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Finaliser le parrainage
                    </motion.h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-2xl">
                {/* Beneficiary banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary rounded-xl p-4 mb-8 flex items-center gap-4 border border-border"
                >
                    <img src={beneficiary.image} alt={beneficiary.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                    <div className="flex-1">
                        <p className="font-semibold text-foreground">{beneficiary.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" /> {beneficiary.location}
                        </div>
                    </div>
                    {beneficiary.monthlyNeed > 0 && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Besoin mensuel</p>
                            <p className="text-lg font-bold text-primary">{beneficiary.monthlyNeed} FCFA</p>
                        </div>
                    )}
                </motion.div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <motion.div
                                animate={step >= s ? { scale: [1, 1.2, 1] } : {}}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                            </motion.div>
                            {s < 3 && <div className={`w-12 h-0.5 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
                        </div>
                    ))}
                </div>

                {/* Step 1: Amount & Frequency */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Montant du parrainage</h2>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {presetAmounts.map((a) => (
                                    <motion.button
                                        key={a}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAmountChange(a.toString(), false)}
                                        className={`py-3 rounded-lg border text-center font-semibold transition-all ${amount === a.toString()
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-card text-card-foreground hover:border-primary/50"
                                            }`}
                                    >
                                        {a.toLocaleString()} FCFA
                                    </motion.button>
                                ))}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">Ou entrez un montant personnalisé (min. 100 FCFA)</Label>
                                <div className="relative mt-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">FCFA</span>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="pl-14"
                                        value={customAmount}
                                        onChange={(e) => handleAmountChange(e.target.value, true)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment frequency */}
                        <div>
                            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Fréquence de paiement</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {(["monthly", "quarterly", "yearly"] as const).map((freq) => (
                                    <motion.button
                                        key={freq}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setPaymentFrequency(freq)}
                                        className={`py-3 rounded-lg border text-center font-semibold transition-all ${paymentFrequency === freq
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-card text-card-foreground hover:border-primary/50"
                                            }`}
                                    >
                                        {frequencyLabels[freq]}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <Button onClick={handleDonate} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                            Continuer — {finalAmount ? `${parseInt(finalAmount).toLocaleString()} FCFA/${frequencyLabels[paymentFrequency].toLowerCase()}` : "0 FCFA"}
                        </Button>
                    </motion.div>
                )}

                {/* Step 2: Information */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <button onClick={() => setStep(1)} className="text-sm text-primary flex items-center gap-1 hover:underline">
                            <ArrowLeft className="w-4 h-4" /> Retour
                        </button>
                        <h2 className="font-display text-2xl font-bold text-foreground">Vos informations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Prénom *</Label>
                                <div className="relative">
                                    <Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="Prénom" />
                                    {isFieldValid(formData.firstName) && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                                </div>
                            </div>
                            <div>
                                <Label>Nom</Label>
                                <Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Nom" />
                            </div>
                        </div>
                        <div>
                            <Label>Email *</Label>
                            <div className="relative">
                                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="votre@email.com" />
                                {isEmailValid(formData.email) && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                            </div>
                        </div>
                        <div>
                            <Label>Téléphone (optionnel)</Label>
                            <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="6 XX XXX XXXX" />
                        </div>
                        <Button onClick={handlePayment} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                            Continuer vers le paiement
                        </Button>
                    </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <button onClick={() => setStep(2)} className="text-sm text-primary flex items-center gap-1 hover:underline">
                            <ArrowLeft className="w-4 h-4" /> Retour
                        </button>
                        <h2 className="font-display text-2xl font-bold text-foreground">Détails de paiement</h2>

                        <div className="bg-secondary rounded-lg p-4 mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Parrainage</span>
                                <span className="font-medium text-foreground">{beneficiary.name}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Fréquence</span>
                                <span className="font-medium text-foreground">{frequencyLabels[paymentFrequency]}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Montant</span>
                                <span className="font-bold text-primary text-lg">{parseInt(finalAmount).toLocaleString()} FCFA</span>
                            </div>
                        </div>

                        {/* Orange Money / MTN Money payment */}
                        <div>
                            <Label>Numéro Orange Money / MTN Money *</Label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    className="pl-10 pr-10"
                                    value={paymentData.phoneNumber}
                                    onChange={(e) => setPaymentData({ ...paymentData, phoneNumber: e.target.value })}
                                    placeholder="6 XX XXX XXX"
                                    maxLength={9}
                                />
                                {paymentData.phoneNumber.length >= 9 && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                            </div>
                        </div>

                        <Button
                            onClick={handleConfirm}
                            disabled={submitting}
                            size="lg"
                            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Traitement en cours...
                                </>
                            ) : (
                                <>
                                    <Heart className="w-5 h-5 mr-2" /> Confirmer le parrainage — {parseInt(finalAmount).toLocaleString()} FCFA
                                </>
                            )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">🔒 Votre paiement est sécurisé via NotchPay.</p>
                    </motion.div>
                )}

                {/* Step 4: Confirmation (fallback if no redirect) */}
                {step === 4 && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="text-center space-y-6 py-8 relative">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: [0, -80 - Math.random() * 120],
                                        x: [(Math.random() - 0.5) * 200],
                                        scale: [0, 1, 0.5],
                                        rotate: [0, Math.random() * 360],
                                    }}
                                    transition={{ duration: 1.5, delay: i * 0.1 }}
                                    className="absolute left-1/2 top-1/2"
                                >
                                    <Star className="w-4 h-4 text-gold fill-gold" />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-20 h-20 rounded-full bg-emerald-light mx-auto flex items-center justify-center"
                        >
                            <CheckCircle className="w-10 h-10 text-primary" />
                        </motion.div>

                        <h2 className="font-display text-3xl font-bold text-foreground">JazakAllahu Khairan !</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Votre parrainage de <strong className="text-primary">{parseInt(finalAmount).toLocaleString()} FCFA</strong> ({frequencyLabels[paymentFrequency].toLowerCase()}) pour{" "}
                            <strong>{beneficiary.name}</strong> a bien été enregistré.
                        </p>

                        {/* Sponsoring certificate preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-card border-2 border-gold/30 rounded-xl p-6 max-w-sm mx-auto"
                        >
                            <div className="text-center space-y-3">
                                <p className="text-xs uppercase tracking-widest text-gold font-semibold">Certificat de parrainage</p>
                                <div className="w-1 h-6 bg-gold mx-auto rounded-full" />
                                <img src={beneficiary.image} alt={beneficiary.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gold" />
                                <p className="font-display text-lg font-bold text-foreground">{beneficiary.name}</p>
                                <p className="text-sm text-muted-foreground">{beneficiary.location}</p>
                                <p className="text-sm text-muted-foreground">Parrainé par <strong>{formData.firstName} {formData.lastName}</strong></p>
                                <p className="text-primary font-bold">{parseInt(finalAmount).toLocaleString()} FCFA/{frequencyLabels[paymentFrequency].toLowerCase()}</p>
                                <Button variant="outline" size="sm" className="mt-2 border-gold text-gold hover:bg-gold hover:text-white">
                                    <Download className="w-3 h-3 mr-1" /> Télécharger le certificat
                                </Button>
                            </div>
                        </motion.div>

                        <p className="text-sm text-muted-foreground">
                            Une confirmation a été envoyée à <strong>{formData.email}</strong>.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            <Button variant="outline" onClick={() => navigate("/")} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                Retour à l'accueil
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default SponsorCheckout;
