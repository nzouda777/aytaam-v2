export interface Orphan {
  id: string;
  name: string;
  age: number;
  location: string;
  story: string;
  monthlyNeed: number;
  image: string;
  sponsored: boolean;
}

export interface Widow {
  id: string;
  name: string;
  age: number;
  location: string;
  story: string;
  monthlyNeed: number;
  children: number;
  image: string;
  sponsored: boolean;
}

export interface Family {
  id: string;
  name: string;
  location: string;
  members: number;
  story: string;
  monthlyNeed: number;
  image: string;
  sponsored: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface DonationCause {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  icon: string;
}

export const orphans: Orphan[] = [
  { id: "o1", name: "Ahmed Hassan", age: 7, location: "Gaza, Palestine", story: "Ahmed a perdu son père durant le conflit et vit désormais avec sa grand-mère. Il rêve de devenir médecin pour aider sa communauté. Votre parrainage lui offre nourriture, éducation et soins médicaux.", monthlyNeed: 50, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400", sponsored: false },
  { id: "o2", name: "Fatima Ali", age: 5, location: "Alep, Syrie", story: "Fatima a été déplacée avec sa mère et ses frères et sœurs. Malgré les difficultés, elle est avide d'apprendre et fait preuve d'une résilience incroyable. Elle a besoin d'un soutien régulier pour sa scolarité et sa nutrition.", monthlyNeed: 45, image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400", sponsored: false },
  { id: "o3", name: "Yusuf Ibrahim", age: 9, location: "Mogadiscio, Somalie", story: "Yusuf est un élève brillant qui a perdu ses deux parents. Il vit actuellement dans un orphelinat et a besoin d'un parrain pour poursuivre ses études et lui apporter de la stabilité.", monthlyNeed: 40, image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400", sponsored: true },
  { id: "o4", name: "Amina Begum", age: 6, location: "Cox's Bazar, Bangladesh", story: "Amina est une réfugiée Rohingya qui a connu les difficultés dès sa naissance. Elle est douce, curieuse et a désespérément besoin d'un système de soutien stable.", monthlyNeed: 35, image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400", sponsored: false },
  { id: "o5", name: "Omar Khalil", age: 11, location: "Sanaa, Yémen", story: "Omar aide sa grand-mère âgée tout en continuant d'aller à l'école. Il est déterminé à sortir sa famille de la pauvreté grâce à l'éducation.", monthlyNeed: 55, image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400", sponsored: false },
  { id: "o6", name: "Maryam Noor", age: 8, location: "Kaboul, Afghanistan", story: "Maryam adore dessiner et espère un jour fréquenter une école d'art. Après la perte de son père, elle a besoin de soutien pour ses besoins essentiels et son éducation.", monthlyNeed: 45, image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400", sponsored: false },
];

export const widows: Widow[] = [
  { id: "w1", name: "Khadija Mohammed", age: 34, location: "Idlib, Syrie", story: "Khadija a perdu son mari il y a trois ans et élève désormais seule quatre enfants. Elle est douée en couture et rêve de lancer une petite entreprise de confection.", monthlyNeed: 120, children: 4, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400", sponsored: false },
  { id: "w2", name: "Halima Osman", age: 42, location: "Mogadiscio, Somalie", story: "Mère de six enfants, Halima lutte chaque jour pour offrir des repas. Elle tenait auparavant un étal au marché et espère relancer son commerce avec du soutien.", monthlyNeed: 150, children: 6, image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400", sponsored: false },
  { id: "w3", name: "Ruqayyah Siddique", age: 29, location: "Peshawar, Pakistan", story: "Après le décès de son mari, Ruqayyah s'est installée chez des proches. Elle est enseignante diplômée et souhaite soutenir ses deux enfants par l'éducation.", monthlyNeed: 90, children: 2, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", sponsored: true },
  { id: "w4", name: "Zainab Rashid", age: 38, location: "Bagdad, Irak", story: "Zainab s'occupe de sa belle-mère âgée ainsi que de trois enfants. Elle a besoin d'un soutien mensuel régulier pour le loyer, la nourriture et les médicaments.", monthlyNeed: 130, children: 3, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", sponsored: false },
];

export const families: Family[] = [
  { id: "f1", name: "Famille Rahman", location: "Dacca, Bangladesh", members: 7, story: "Une famille nombreuse touchée par les inondations, ils ont perdu leur maison et leurs moyens de subsistance. Le père travaille comme journalier mais ne peut couvrir toutes les dépenses.", monthlyNeed: 200, image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400", sponsored: false },
  { id: "f2", name: "Famille Al-Tayeb", location: "Khartoum, Soudan", members: 5, story: "Déplacée par le conflit, cette famille vit dans un abri de fortune. Elle a besoin de soutien pour le logement, la nourriture et l'éducation des enfants.", monthlyNeed: 180, image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", sponsored: false },
  { id: "f3", name: "Famille Yilmaz", location: "Gaziantep, Turquie", members: 6, story: "Réfugiés syriens en Turquie depuis cinq ans. Les parents travaillent mais leurs revenus sont insuffisants pour les besoins croissants de leurs enfants.", monthlyNeed: 160, image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=400", sponsored: true },
  { id: "f4", name: "Famille Abdi", location: "Nairobi, Kenya", members: 8, story: "Une famille de réfugiés somaliens à Nairobi. Avec huit membres, ils peinent à couvrir les frais de logement et de santé. Tous les enfants sont scolarisés.", monthlyNeed: 220, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400", sponsored: false },
];

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "Les vertus de la prise en charge des orphelins en Islam", excerpt: "Le Prophète Muhammad (PSL) a dit : « Moi et celui qui prend en charge un orphelin serons comme ces deux-là au Paradis », montrant son index et son majeur.", content: "La prise en charge des orphelins occupe une place spéciale en Islam. Le Prophète Muhammad (PSL) l'a souligné dans de nombreux hadiths...\n\nLe Coran mentionne les orphelins dans de nombreux versets, nous rappelant notre devoir de les protéger et de les élever. Dans la sourate Al-Baqarah, Allah dit : « Ils t'interrogent au sujet des orphelins. Dis : La meilleure chose est ce qui est dans leur intérêt. »\n\nParrainer un orphelin n'est pas simplement un acte de charité — c'est un investissement pour l'Au-delà. Le Prophète (PSL) a dit : « Moi et celui qui prend en charge un orphelin serons comme ces deux-là au Paradis », levant son index et son majeur ensemble.\n\nDans notre fondation, nous veillons à ce que chaque enfant parrainé reçoive éducation, soins médicaux, nutrition et soutien émotionnel. Votre contribution transforme directement la vie d'un enfant.", author: "Cheikh Ahmad Al-Rashidi", date: "2026-02-10", category: "Enseignements islamiques", image: "https://images.unsplash.com/photo-1585036156171-384164a8c8df?w=600", readTime: "5 min" },
  { id: "b2", title: "Comment vos dons ont changé 500 vies l'année dernière", excerpt: "Un rapport annuel sur l'impact de vos généreux dons dans 12 pays où nous servons orphelins, veuves et familles dans le besoin.", content: "Alhamdoulillah, l'année dernière a été notre année la plus impactante. Grâce à votre généreux soutien, nous avons pu atteindre plus de 500 bénéficiaires dans 12 pays...\n\nRéalisations clés :\n- 320 orphelins ont reçu un parrainage continu\n- 85 veuves ont bénéficié d'allocations mensuelles\n- 95 familles ont reçu une aide d'urgence et continue\n- 12 nouvelles écoles ont été construites\n- 3 cliniques médicales ont été établies", author: "Amina Hassan", date: "2026-01-25", category: "Histoires d'impact", image: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=600", readTime: "7 min" },
  { id: "b3", title: "Autonomiser les veuves par la formation professionnelle", excerpt: "Notre nouvelle initiative offre une formation professionnelle aux veuves, les aidant à devenir autonomes et à construire un meilleur avenir pour leurs familles.", content: "Notre dernière initiative se concentre sur l'autonomisation des veuves grâce à des programmes complets de formation professionnelle...\n\nLe programme comprend :\n- Ateliers de couture et confection\n- Cours de gestion de petites entreprises\n- Cours d'alphabétisation et de calcul\n- Programmes de micro-crédit pour lancer des entreprises\n\nJusqu'à présent, 45 veuves ont terminé le programme, dont 30 gèrent déjà leur propre petite entreprise.", author: "Dr. Maryam Qureshi", date: "2026-02-01", category: "Programmes", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600", readTime: "6 min" },
  { id: "b4", title: "Ramadan : un mois de générosité et de compassion", excerpt: "À l'approche du Ramadan, découvrez comment maximiser vos dons caritatifs et multiplier vos récompenses durant ce mois béni.", content: "Le Ramadan est le mois de la générosité, de la compassion et de l'adoration accrue. C'est un moment où les récompenses des bonnes actions sont multipliées...\n\nComment maximiser vos dons pendant le Ramadan :\n1. Mettre en place des dons récurrents\n2. Parrainer les repas d'iftar d'un orphelin\n3. Contribuer à notre fonds Zakat\n4. Partager notre mission avec vos proches", author: "Imam Khalid Mahmoud", date: "2026-02-08", category: "Saisonnier", image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600", readTime: "4 min" },
];

export const donationCauses: DonationCause[] = [
  { id: "c1", title: "Aide aux orphelins", description: "Offrir nourriture, éducation et soins médicaux aux enfants orphelins", raised: 125000, goal: 200000, icon: "Heart" },
  { id: "c2", title: "Soutien aux veuves", description: "Aider les veuves à subvenir aux besoins de leurs familles avec une aide mensuelle", raised: 85000, goal: 150000, icon: "HandHeart" },
  { id: "c3", title: "Aide aux familles", description: "Soutenir les familles déplacées avec logement, nourriture et produits essentiels", raised: 95000, goal: 180000, icon: "Home" },
  { id: "c4", title: "Fonds éducation", description: "Construire des écoles et offrir des bourses aux enfants défavorisés", raised: 60000, goal: 120000, icon: "GraduationCap" },
  { id: "c5", title: "Aide d'urgence", description: "Aide immédiate aux communautés touchées par les conflits et catastrophes", raised: 140000, goal: 250000, icon: "Siren" },
  { id: "c6", title: "Fonds Zakat", description: "Distribuer votre Zakat aux bénéficiaires éligibles à travers nos programmes", raised: 200000, goal: 300000, icon: "Coins" },
];

export const impactStats = {
  orphansSponsored: 1240,
  countriesServed: 18,
  donationsRaised: 2500000,
  volunteersActive: 350,
};
