import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react'
import { ContactForm } from '@/features/contact/components/ContactForm'

export const metadata = {
  title: 'Contact & Rendez-Vous | Maison d’Optique Casablanca',
  description:
    'Prenez rendez-vous avec un opticien diplômé à Casablanca, faites tester votre vue gratuitement ou contactez notre équipe pour toute question.',
}

export default function ContactPage() {
  return (
    <div className="bg-[#faf9f6] min-h-screen py-12 sm:py-16 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5efe4] text-[#8c6b38] text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-[#e5dac6]">
            <span>Nous Contacter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Venez Nous Rencontrer en Boutique à Casablanca
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Prenez rendez-vous avec l&apos;un de nos opticiens diplômés pour un examen de la vue gratuit ou un conseil visagisme sur-mesure.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Contact Details & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Store Card */}
            <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c6b38] block mb-1">
                  Atelier &amp; Showroom
                </span>
                <h2 className="text-2xl font-serif text-stone-900">
                  Maison d&apos;Optique Casablanca
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Adresse</p>
                    <p>74 Boulevard d&apos;Anfa, Gauthier, Casablanca</p>
                    <p className="text-[11px] text-stone-400">Angle Bd Moulay Youssef / Triangle d&apos;Or</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Téléphone &amp; WhatsApp</p>
                    <p className="font-serif">05 22 20 40 60</p>
                    <p className="text-[11px] text-stone-400">WhatsApp : +212 6 61 00 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Email</p>
                    <p>contact@maisondoptique.ma</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Horaires d&apos;ouverture</p>
                    <p>Du Lundi au Samedi : 09h30 – 19h30</p>
                    <p className="text-[11px] text-stone-400">Fermé le dimanche</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Agrément AMO (CNSS/CNOPS) &amp; Mutuelles Privées</span>
              </div>
            </div>
          </div>

          {/* Contact / Appointment Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs">
            <h2 className="text-2xl font-serif text-stone-900 mb-2">
              Envoyez-nous un Message ou Prenez Rendez-Vous
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Remplissez le formulaire ci-dessous et notre équipe vous recontactera sous 24h ouvrées.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}