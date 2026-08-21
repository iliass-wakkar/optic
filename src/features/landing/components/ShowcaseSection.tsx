'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

type ShowcaseProduct = {
  id: string
  name: string
  house: string
  category: string
  price: string
  origin: string
  description: string
  image: string
  material: string
  weight: string
  catalogUrl: string
}

export function ShowcaseSection() {
  const products: ShowcaseProduct[] = [
    {
      id: 'optique',
      name: 'L’Artisan Pantos en Acétate 8mm',
      house: 'Édition Atelier Casablanca',
      category: 'Monture Optique',
      price: '2 950 DH',
      origin: 'Façonné à la main en Italie',
      description:
        'Une silhouette pantos iconique taillée dans un bloc d’acétate japonais de 8mm. Les biseaux polis à la main captent la lumière naturelle pour sublimer les traits du visage.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&h=800&fit=crop&auto=format&q=80',
      material: 'Acétate de cellulose biologique',
      weight: 'Poids : 22g',
      catalogUrl: '/catalogue?shape=pantos',
    },
    {
      id: 'solaire',
      name: 'L’Aviateur Géométrique Polarisé',
      house: 'Manufacture Venise',
      category: 'Lunettes Solaires',
      price: '3 400 DH',
      origin: 'Verres minéraux Barberini',
      description:
        'Double pont gravé au laser et verres minéraux trempés polarisants de catégorie 3. Protection UV totale et clarté optique inégalée face à la réverbération du soleil marocain.',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&h=800&fit=crop&auto=format&q=80',
      material: 'Titane brossé & or pâle',
      weight: 'Poids : 16g',
      catalogUrl: '/catalogue?category=sunglasses',
    },
    {
      id: 'titane',
      name: 'La Silhouette Titane Pur Découpée',
      house: 'Atelier Fukui, Japon',
      category: 'Édition Ultra-Légère',
      price: '4 200 DH',
      origin: 'Série Numérotée',
      description:
        'Une prouesse d’ingénierie lunetière sans aucune soudure apparente. Une légèreté absolue de 12 grammes offrant une sensation d’apesanteur toute la journée.',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=900&h=800&fit=crop&auto=format&q=80',
      material: 'Bêta-Titane 100% hypoallergénique',
      weight: 'Poids : 12g',
      catalogUrl: '/catalogue?frameType=rimless',
    },
  ]

  const [activeTab, setActiveTab] = useState(0)
  const current = products[activeTab]

  return (
    <section className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Sélection Coups de Cœur
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Des Pièces d&apos;Exception Façonnées pour Durer
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Chaque monture est rigoureusement choisie pour l&apos;équilibre de ses proportions et la noblesse de ses matériaux.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl bg-stone-200/70 border border-stone-300/50">
            {products.map((p, idx) => {
              const isSelected = activeTab === idx
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {p.name.split(' ')[1] || p.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Product Showcase Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/80 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/70">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c6b38] bg-[#f7f3eb] px-2.5 py-1 rounded-md">
                    {current.house}
                  </span>
                  <span className="text-xs text-stone-400">• {current.origin}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
                  {current.name}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  {current.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block">Matériau</span>
                  <span className="font-medium text-stone-900 mt-0.5 block">{current.material}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Confort</span>
                  <span className="font-medium text-stone-900 mt-0.5 block">{current.weight}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-stone-400 text-xs block">Prix monture</span>
                  <span className="font-serif text-2xl font-normal text-stone-900">
                    {current.price}
                  </span>
                </div>

                <Link
                  href={current.catalogUrl as any}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
                >
                  <span>Voir la collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
