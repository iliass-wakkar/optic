import Link from 'next/link'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export function MutuelleSection() {
  const steps = [
    {
      num: '01',
      title: 'Ordonnance & Carte d’Assurance',
      desc: 'Présentez votre ordonnance d’ophtalmologiste en cours de validité et votre carte d’adhérent mutuelle ou AMO.',
    },
    {
      num: '02',
      title: 'Dossier Normalisé & Devis',
      desc: 'Nous préparons votre dossier médical complet : devis réglementaire, feuille de soins et facture certifiée.',
    },
    {
      num: '03',
      title: 'Remboursement Rapide & Sérénité',
      desc: 'Votre bordereau est prêt le jour du retrait pour un traitement immédiat par votre compagnie d’assurance.',
    },
  ]

  const mutuellePartners = [
    'AMO (CNSS)',
    'AMO (CNOPS)',
    'Sanlam Assurance',
    'Wafa Assurance',
    'RMA Watanya',
    'AXA Maroc',
    'AtlantaSanad',
    'MAMDA / MCMA',
    'Mutuelle Générale',
    'Mutuelle de Police',
    'Forces Armées Royales',
    'OCP & Banques',
  ]

  return (
    <section id="mutuelle" className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Santé &amp; Prise en Charge Maroc
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Prise en Charge AMO &amp; Mutuelles Privées
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Conventionnés et habitués aux démarches auprès des compagnies d&apos;assurance et organismes de prévoyance au Maroc, nous vous facilitons chaque étape de votre remboursement.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {steps.map((s) => (
            <div
              key={s.title}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-serif italic text-2xl text-[#8c6b38] block mb-4">
                  {s.num}.
                </span>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mutuelle Network Badges Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif text-xl text-stone-900 mb-2">
              Organismes &amp; Compagnies Conventionnées
            </h3>
            <p className="text-xs text-stone-500">
              Dossiers de remboursement optimisés pour l&apos;ensemble des mutuelles d&apos;entreprises et régimes obligatoires au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mutuellePartners.map((partner) => (
              <div
                key={partner}
                className="py-3 px-4 rounded-xl bg-stone-50 border border-stone-200/60 text-center font-mono text-xs text-stone-700 hover:text-stone-900 transition"
              >
                {partner}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-[#8c6b38] shrink-0" />
              <span>Devis détaillé et facture cachetée conformes aux normes CNSS/CNOPS et mutuelles</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-[#8c6b38] transition"
            >
              <span>Vérifier ma prise en charge en boutique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
