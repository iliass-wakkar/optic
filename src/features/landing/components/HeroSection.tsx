import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Star, ShieldCheck, Eye, CheckCircle2 } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-12 pb-20 md:pt-16 md:pb-28 border-b border-zinc-100">
      {/* Subtle background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Nouvelle Collection 2026 • Optique & Solaire</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
              L’Élégance de votre Regard,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                La Précision en Plus.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Découvrez notre sélection exclusive de montures de créateurs, alliant acétate d&apos;exception, titane ultra-léger et verres haute définition taillés dans nos ateliers français.
            </p>

            {/* Trust / Social Proof */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full border-2 border-white bg-zinc-200 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format"
                    alt="Avis client"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white bg-zinc-200 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
                    alt="Avis client"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white bg-zinc-200 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&auto=format"
                    alt="Avis client"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-zinc-800">4.9 / 5</span>
                </div>
                <p className="text-xs text-zinc-500 font-medium">
                  Plébiscité par <strong className="text-zinc-800">+15 000 clients</strong> satisfaits
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/catalogue"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <span>Explorer le Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#showcase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-base transition-colors duration-200 focus:ring-2 focus:ring-zinc-400 focus:outline-none"
              >
                <span>Découvrir la Collection</span>
              </a>
            </div>

            {/* Key Value Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-200/70 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-zinc-700">Verres Français</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-zinc-700">Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-zinc-700">100% Santé Mutuelle</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-zinc-200/80 shadow-2xl shadow-zinc-300/40 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&h=1100&fit=crop&auto=format"
                  alt="Monture optique d'exception"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                {/* Floating Bottom Status Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-zinc-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          Technologie de Précision
                        </p>
                        <p className="text-sm font-semibold text-zinc-900">
                          Verres Polarisés &amp; Anti-Reflet Max
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      En stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Right */}
              <div className="absolute -top-4 -right-4 p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase">Qualité Garantie</p>
                  <p className="text-sm font-bold text-zinc-900">Opticiens Diplômés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
