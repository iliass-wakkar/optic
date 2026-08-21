'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

type FaceShape = {
  id: string
  name: string
  subtitle: string
  description: string
  recommendedShapes: string[]
  recommendedFrameNames: string
  catalogParam: string
  tips: string
}

export function FaceShapeGuide() {
  const shapes: FaceShape[] = [
    {
      id: 'round',
      name: 'Visage Rond',
      subtitle: 'Lignes douces & courbes naturelles',
      description:
        'Pour structurer et affiner un visage rond, nous recommandons des montures rectangulaires, pantos angulaires ou géométriques qui apportent du caractère et allongent le regard.',
      recommendedShapes: ['Rectangulaire', 'Carrée', 'Géométrique', 'Papillon'],
      recommendedFrameNames: 'Montures rectangulaires fines ou géométriques',
      catalogParam: 'rectangle',
      tips: 'Évitez les formes parfaitement rondes qui accentuent la rondeur.',
    },
    {
      id: 'square',
      name: 'Visage Carré',
      subtitle: 'Ligne de mâchoire affirmée & front large',
      description:
        'Pour adoucir les angles marqués d’une mâchoire carrée, les silhouettes rondes, ovales ou pantos créent un équilibre visuel naturel et très élégant.',
      recommendedShapes: ['Ronde', 'Ovale', 'Pantos', 'Aviateur'],
      recommendedFrameNames: 'Montures rondes ou pantos fines en titane',
      catalogParam: 'round',
      tips: 'Privilégiez les montures qui dépassent légèrement la largeur des pommettes.',
    },
    {
      id: 'oval',
      name: 'Visage Ovale',
      subtitle: 'Proportions parfaitement équilibrées',
      description:
        'Le visage ovale offre une liberté totale de choix. Vous pouvez porter quasiment toutes les formes : de l’oversize audacieux à la monture minimaliste en fil d’or.',
      recommendedShapes: ['Pantos', 'Rectangulaire', 'Aviateur', 'Ronde', 'Oversize'],
      recommendedFrameNames: 'Toutes silhouettes : pantos, oversize, rectangulaire',
      catalogParam: 'pantos',
      tips: 'Suivez la courbure naturelle de vos sourcils pour un rendu harmonieux.',
    },
    {
      id: 'heart',
      name: 'Visage Cœur',
      subtitle: 'Front plus large & menton fin',
      description:
        'Pour créer une harmonie délicate, optez pour des montures légères, percées ou forme papillon aux tonalités douces (écaille blonde, or pâle, cristal).',
      recommendedShapes: ['Papillon / Cat-Eye', 'Ovale', 'Titane fin', 'Nylor'],
      recommendedFrameNames: 'Montures fines en titane ou papillon délicates',
      catalogParam: 'cat-eye',
      tips: 'Évitez les montures trop massives sur le haut du cadre.',
    },
  ]

  const [activeShape, setActiveShape] = useState<FaceShape>(shapes[0])

  return (
    <section className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Guide Visagisme
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Quelle Forme Sublimera Vos Traits ?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Chaque morphologie possède ses harmonies. Découvrez les recommandations de nos opticiens visagistes.
          </p>
        </div>

        {/* Shape Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {shapes.map((s) => {
            const isSelected = activeShape.id === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActiveShape(s)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-stone-50 shadow-md'
                    : 'bg-white hover:bg-stone-50 border-stone-200/80 text-stone-800'
                }`}
              >
                <p className={`font-serif text-sm sm:text-base ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {s.name}
                </p>
                <p className={`text-[11px] mt-0.5 truncate ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {s.subtitle}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected Shape Detail Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-md">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-5">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#8c6b38]">
                Recommandation Visagiste
              </span>
              <h3 className="text-2xl font-serif font-normal text-stone-900">
                {activeShape.recommendedFrameNames}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {activeShape.description}
              </p>

              <div className="pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                  Silhouettes idéales :
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeShape.recommendedShapes.map((shape) => (
                    <span
                      key={shape}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 text-xs font-medium text-stone-700"
                    >
                      <Check className="w-3.5 h-3.5 text-[#8c6b38]" />
                      {shape}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fcfbf9] border border-stone-200 text-xs text-stone-600">
                <strong className="text-stone-900 font-medium">Conseil d&apos;Atelier :</strong> {activeShape.tips}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-stretch justify-center gap-3">
              <Link
                href={`/catalogue?shape=${activeShape.catalogParam}` as any}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
              >
                <span>Voir les montures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200/70 text-stone-800 text-xs font-medium transition"
              >
                <span>Essai personnalisé en magasin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
