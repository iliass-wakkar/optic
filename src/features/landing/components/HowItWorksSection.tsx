import { Glasses, Sliders, CheckCircle2, Shield, Quote } from 'lucide-react'

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Glasses,
      title: 'Sélectionnez votre Monture',
      description:
        'Explorez plus de 500 montures de créateurs : titane japonais, acétate italien bio-sourcé ou métal fin. Filtrez par morphologie et style en un clin d’œil.',
      detail: 'Formes adaptées à tous les visages',
    },
    {
      number: '02',
      icon: Sliders,
      title: 'Personnalisez vos Verres',
      description:
        'Envoyez votre ordonnance ou venez faire un examen gratuit à Casablanca. Choisissez vos traitements : anti-lumière bleue, antireflet, amincissement ou verres photochromiques.',
      detail: 'Verres haute définition de précision',
    },
    {
      number: '03',
      icon: Shield,
      title: 'Montage & Remboursement Mutuelle',
      description:
        'Nos opticiens diplômés taillent et ajustent vos verres au demi-millimètre près. Vous bénéficiez d’un dossier complet pour votre mutuelle/AMO et d’une garantie 2 ans.',
      detail: 'Dossier AMO & Mutuelle fourni',
    },
  ]

  return (
    <section className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5efe4] text-[#8c6b38] text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-[#e5dac6]">
            <span>Le Savoir-Faire Optique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            3 Étapes vers Votre Confort Visuel Idéal
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            De la sélection de votre monture jusqu’à l’ajustement sur-mesure de vos verres, profitez d’un accompagnement d’opticien expert.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-8 sm:p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Step Number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#c5a880]" />
                  </div>
                  <span className="font-serif italic text-3xl text-stone-300 group-hover:text-[#8c6b38] transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-stone-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-[#8c6b38]" />
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Moment / Quote Banner */}
        <div className="rounded-3xl overflow-hidden bg-stone-900 text-white relative shadow-xl">
          <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <Quote className="w-8 h-8 text-[#c5a880] mb-4 opacity-80" />
              <p className="font-serif text-xl sm:text-2xl text-stone-100 tracking-tight leading-snug mb-4">
                &ldquo;Mes nouvelles lunettes en titane sont si légères que j&apos;oublie que je les porte. Le centrage des verres progressifs est juste parfait dès le premier jour.&rdquo;
              </p>
              <p className="text-xs text-stone-400 font-mono">
                — Yasmine B., cliente fidèle à Casablanca
              </p>
            </div>

            <div className="shrink-0 p-6 rounded-2xl bg-stone-800/90 border border-stone-700/80 text-center">
              <p className="font-serif text-3xl text-[#c5a880] mb-1">100%</p>
              <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-stone-300">
                Conforme AMO &amp; Mutuelles Maroc
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
