import {
  Eye,
  Award,
  Monitor,
  Feather,
  CreditCard,
  ShieldCheck,
  Wrench,
  Truck,
} from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Eye,
      title: 'Examen de la Vue Offert',
      description:
        'Contrôle de votre acuité visuelle sans frais en boutique à Casablanca par nos opticiens-optométristes certifiés.',
      color: 'bg-[#f5efe4] text-[#8c6b38]',
    },
    {
      icon: Award,
      title: 'Verres Haute Définition',
      description:
        'Technologies verrières de pointe. Traitements antireflet multicouches, anti-salissures et protection UV400 intégrale.',
      color: 'bg-stone-100 text-stone-800',
    },
    {
      icon: Monitor,
      title: 'Filtre Anti-Lumière Bleue',
      description:
        'Soulagez la fatigue oculaire et les maux de tête causés par les smartphones, ordinateurs et tablettes.',
      color: 'bg-[#f5efe4] text-[#8c6b38]',
    },
    {
      icon: Feather,
      title: 'Titane & Acétate Bio',
      description:
        'Matériaux d’excellence hypoallergéniques sélectionnés pour leur légèreté incomparable et leur durabilité.',
      color: 'bg-stone-100 text-stone-800',
    },
    {
      icon: CreditCard,
      title: 'Prise en Charge Mutuelle',
      description:
        'Dossier de remboursement complet et conforme pour l’AMO (CNSS / CNOPS) et toutes les mutuelles privées au Maroc.',
      color: 'bg-emerald-50 text-emerald-800',
    },
    {
      icon: ShieldCheck,
      title: 'Garantie 2 Ans',
      description:
        'Garantie constructeur et assistance en cas de casse ou de rayures accidentelles dans notre atelier.',
      color: 'bg-[#f5efe4] text-[#8c6b38]',
    },
    {
      icon: Wrench,
      title: 'Entretien & Réglages à Vie',
      description:
        'Resserrage des branches, changement des plaquettes et nettoyage aux ultrasons gratuits et à volonté.',
      color: 'bg-stone-100 text-stone-800',
    },
    {
      icon: Truck,
      title: 'Livraison Partout au Maroc',
      description:
        'Expédition express sécurisée 24-48h avec étui rigide et microfibre haute densité dans toutes les villes du Royaume.',
      color: 'bg-[#f5efe4] text-[#8c6b38]',
    },
  ]

  const stats = [
    { value: '99.4%', label: 'Satisfaction client au Maroc' },
    { value: '< 24h', label: 'Montage en atelier & expédition' },
    { value: '500+', label: 'Montures créateurs en stock' },
    { value: '100%', label: 'Dossiers mutuelle conformes' },
  ]

  return (
    <section className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5efe4] text-[#8c6b38] text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-[#e5dac6]">
            <span>Nos Engagements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            L’Excellence du Service Opticien au Maroc
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Plus qu&apos;un simple achat, nous garantissons votre confort visuel au quotidien grâce à un accompagnement optométrique et technique sans compromis.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-sm hover:border-stone-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-medium text-stone-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-stone-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
