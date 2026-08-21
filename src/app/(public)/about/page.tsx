import Image from 'next/image'
import Link from 'next/link'
import { Award, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'À Propos de la Maison d’Optique | Notre Savoir-Faire & Histoire au Maroc',
  description:
    'Découvrez l’histoire de notre maison d’optique à Casablanca, notre engagement pour l’optométrie de précision et l’artisanat lunetier d’exception au Maroc.',
}

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Excellence Artisanale',
      description:
        'Nous sélectionnons rigoureusement des créateurs indépendants et des manufactures historiques réputées pour la pureté de leurs matériaux (titane japonais, acétate italien).',
    },
    {
      icon: ShieldCheck,
      title: 'Précision Optométrique',
      description:
        'Chaque équipement est contrôlé au micron près par nos opticiens diplômés pour un centrage et une adaptation visuelle instantanée.',
    },
    {
      icon: HeartHandshake,
      title: 'Engagement & Mutuelles',
      description:
        'Agrément avec l’ensemble des mutuelles privées et régimes AMO au Maroc avec dossiers de remboursement conformes et sans surprise.',
    },
  ]

  return (
    <div className="bg-[#faf9f6] min-h-screen text-stone-900">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5efe4] text-[#8c6b38] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#e5dac6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Fondée à Casablanca</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-900 tracking-tight max-w-3xl mx-auto leading-tight mb-6">
            L&apos;Art de Sublimer Votre Regard avec Précision
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Depuis plus de 10 ans au cœur de Casablanca, notre mission est de réconcilier haute couture lunetière, santé visuelle et accueil marocain d&apos;excellence.
          </p>
        </div>
      </section>

      {/* Story & Atelier Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=900&h=700&fit=crop&auto=format"
                  alt="Atelier d'optique et de fabrication de lunettes à Casablanca"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8c6b38]">
                Notre Atelier &amp; Philosophie
              </span>
              <h2 className="text-3xl font-serif font-normal text-stone-900 tracking-tight">
                Une Passion pour les Belles Matières et le Travail Bien Fait
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Chaque monture raconte une histoire : celle de l’acétate de coton taillé dans les manufactures italiennes de Mazzucchelli, du titane ultra-léger usiné au Japon ou de l’acier chirurgical haute résistance.
              </p>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Dans notre atelier casablancais sur le Boulevard d&apos;Anfa, nos opticiens réalisent le meulage et le montage de vos verres correcteurs avec des instruments numériques de dernière génération.
              </p>
              <div className="pt-2">
                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs tracking-wide shadow-xs transition"
                >
                  <span>Explorer nos montures</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-normal text-stone-900 tracking-tight mb-3">
              Nos Piliers Fondateurs
            </h2>
            <p className="text-stone-600 text-sm">
              Ce qui guide chaque jour l’accompagnement de nos clients au Maroc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-8 rounded-3xl bg-[#faf9f6] border border-stone-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center mb-6">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}