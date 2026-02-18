import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Heart, CreditCard, CheckCircle, ArrowLeft, MapPin, Star, Download } from "lucide-react";
import Layout from "@/components/Layout";
import ProcessingScreen from "@/components/ProcessingScreen";
import { orphans, widows, families } from "@/data/mockData";
import { toast } from "sonner";

const presetAmounts = [25, 50, 100, 250, 500, 1000];

const SponsorCheckout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const typeParam = searchParams.get("type");
    const categoryParam = searchParams.get("category");
    const idParam = searchParams.get("id");

    const getBeneficiary = () => {
        if (!idParam) return null;
        const all = [...orphans, ...widows, ...families];
        return all.find((p) => p.id === idParam) || null;
    };

    const beneficiary = getBeneficiary();

    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(searchParams.get("amount") || (beneficiary ? beneficiary.monthlyNeed.toString() : ""));
    const [customAmount, setCustomAmount] = useState(searchParams.get("amount") && !presetAmounts.includes(Number(searchParams.get("amount"))) ? searchParams.get("amount")! : "");
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [paymentData, setPaymentData] = useState({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "" });
    const [processing, setProcessing] = useState(false);

    // Sync state with URL parameters
    useEffect(() => {
        const amountVal = searchParams.get("amount");
        if (amountVal && amountVal !== (amount || customAmount)) {
            if (presetAmounts.includes(Number(amountVal))) {
                setAmount(amountVal);
                setCustomAmount("");
            } else {
                setAmount("");
                setCustomAmount(amountVal);
            }
        }
    }, [searchParams.get("amount")]);

    const updateURL = (params: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });
        setSearchParams(newParams);
    };

    const handleAmountChange = (val: string, isCustom: boolean) => {
        if (isCustom) {
            setCustomAmount(val);
            setAmount("");
        } else {
            setAmount(val);
            setCustomAmount("");
        }
        updateURL({ amount: val });
    };

    const finalAmount = amount || customAmount;

    const isFieldValid = (val: string) => val.trim().length > 0;
    const isEmailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const handleDonate = () => {
        if (!finalAmount || parseFloat(finalAmount) <= 0) {
            toast.error("Veuillez entrer un montant valide");
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

    const handleConfirm = () => {
        if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv || !paymentData.nameOnCard) {
            toast.error("Veuillez remplir tous les détails de paiement");
            return;
        }
        setProcessing(true);
        window.scrollTo(0, 0);
    };

    const handleProcessingComplete = useCallback(() => {
        setProcessing(false);
        setStep(4);
        toast.success("Parrainage traité avec succès ! JazakAllahu Khairan.");
    }, []);

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
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
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
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Besoin mensuel</p>
                        <p className="text-lg font-bold text-primary">{beneficiary.monthlyNeed} $</p>
                    </div>
                </motion.div>

                {/* Processing screen */}
                {processing && <ProcessingScreen onComplete={handleProcessingComplete} amount={finalAmount} />}

                {!processing && (
                    <>
                        {/* Progress Steps */}
                        <div className="flex items-center justify-center gap-2 mb-10">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className="flex items-center gap-2">
                                    <motion.div
                                        animate={step >= s ? { scale: [1, 1.2, 1] } : {}}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                                    </motion.div>
                                    {s < 4 && <div className={`w-12 h-0.5 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Amount */}
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
                                                {a} $
                                            </motion.button>
                                        ))}
                                    </div>
                                    <div>
                                        <Label className="text-sm text-muted-foreground">Ou entrez un montant personnalisé</Label>
                                        <div className="relative mt-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                className="pl-7"
                                                value={customAmount}
                                                onChange={(e) => handleAmountChange(e.target.value, true)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={handleDonate} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                                    Continuer — {finalAmount || "0"} $/mois
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
                                    <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+33 6 12 34 56 78" />
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
                                        <span className="text-muted-foreground">Type</span>
                                        <span className="font-medium text-foreground">Mensuel</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Montant</span>
                                        <span className="font-bold text-primary text-lg">{finalAmount} $/mois</span>
                                    </div>
                                </div>

                                <div>
                                    <Label>Nom sur la carte *</Label>
                                    <div className="relative">
                                        <Input value={paymentData.nameOnCard} onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })} placeholder="Nom complet sur la carte" />
                                        {isFieldValid(paymentData.nameOnCard) && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                                    </div>
                                </div>
                                <div>
                                    <Label>Numéro de carte *</Label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input className="pl-10 pr-10" value={paymentData.cardNumber} onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" maxLength={19} />
                                        {paymentData.cardNumber.length >= 16 && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Expiration *</Label>
                                        <div className="relative">
                                            <Input value={paymentData.expiry} onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })} placeholder="MM/AA" maxLength={5} />
                                            {paymentData.expiry.length >= 4 && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>CVV *</Label>
                                        <div className="relative">
                                            <Input type="password" value={paymentData.cvv} onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })} placeholder="•••" maxLength={4} />
                                            {paymentData.cvv.length >= 3 && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />}
                                        </div>
                                    </div>
                                </div>

                                <Button onClick={handleConfirm} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                                    <Heart className="w-5 h-5 mr-2" /> Confirmer le parrainage — {finalAmount} $/mois
                                </Button>
                                <p className="text-xs text-muted-foreground text-center">🔒 Votre paiement est sécurisé. Ceci est une transaction simulée.</p>
                            </motion.div>
                        )}

                        {/* Step 4: Confirmation */}
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
                                    Votre parrainage mensuel de <strong className="text-primary">{finalAmount} $</strong> pour{" "}
                                    <strong>{beneficiary.name}</strong> a bien été reçu. Vous parrainez désormais ce bénéficiaire.
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
                                        <p className="text-primary font-bold">{finalAmount} $/mois</p>
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
                    </>
                )}
            </div>
        </Layout>
    );
};

export default SponsorCheckout;
