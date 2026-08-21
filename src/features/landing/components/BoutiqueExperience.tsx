import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function BoutiqueExperience() {
  const steps = [
    {
      num: '01',
      title: 'Accueil & Écoute de Vos Habitudes',
      desc: 'Nous échangeons autour d’un thé à la menthe ou d’un café sur votre quotidien : travail sur écrans, conduite, lecture ou activités extérieures.',
    },
    {
      num: '02',
      title: 'Examen Réfractif Haute Précision',
      desc: 'Dans notre salle d’optométrie à Casablanca, nous évaluons votre vision avec nos instruments numériques de dernière génération.',
    },
    {
      num: '03',
      title: 'Conseil Morphologique & Essayage',
      desc: 'Nous vous guidons parmi plus de 500 créations selon l’harmonie de vos traits et votre sensibilité esthétique.',
    },
    {
      num: '04',
      title: 'Centrage 3D & Meulage en Atelier',
      desc: 'Vos verres sont taillés et assemblés sur place dans notre atelier casablancais pour un confort optique instantané.',
    },
  ]

  return (
    <section className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          {/* Left Column: Authentic Atelier Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=900&h=700&fit=crop&auto=format&q=80"
                alt="Atelier d'optique à Casablanca et meulage de verres"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8c6b38]">
                  Atelier Maison d&apos;Optique Casablanca
                </p>
                <p className="text-sm font-serif text-stone-900 mt-0.5">
                  Montage artisanal &amp; ajustement millimétrique
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Journey */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
                L&apos;Expérience en Boutique
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
                Une Visite Pensée Comme un Moment Privilégié
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
                Poussez les portes de notre boutique du Boulevard d&apos;Anfa et prenez le temps de trouver la monture qui sublimera votre regard au quotidien.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((s) => (
                <div key={s.num} className="flex gap-5">
                  <span className="shrink-0 font-serif italic text-xl text-[#8c6b38]">
                    {s.num}.
                  </span>
                  <div>
                    <h3 className="font-serif text-base text-stone-900">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogue"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
              >
                <span>Découvrir nos montures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200/70 text-stone-800 text-xs font-medium transition"
              >
                <span>Prendre rendez-vous</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
