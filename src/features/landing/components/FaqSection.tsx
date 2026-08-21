'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  question: string
  answer: string
}

export function FaqSection() {
  const faqs: FaqItem[] = [
    {
      question: 'Ai-je besoin d’une ordonnance pour renouveler mes lunettes en magasin ?',
      answer:
        'Pour bénéficier d’une prise en charge AMO ou mutuelle au Maroc, une ordonnance d’un médecin ophtalmologiste est requise. En boutique, nos opticiens-optométristes diplômés réalisent gratuitement votre bilan visuel et le contrôle de votre réfraction.',
    },
    {
      question: 'Comment se passe le remboursement avec ma mutuelle ou l’AMO (CNSS / CNOPS) ?',
      answer:
        'Nous vous fournissons un dossier de remboursement complet et conforme : devis préalable, feuille de soins et facture certifiée avec vignette des verres. Il vous suffit de le déposer auprès de votre compagnie d’assurance (Sanlam, Wafa, RMA, AXA, etc.) ou de la CNSS/CNOPS.',
    },
    {
      question: 'Livrez-vous partout au Maroc et quels sont les délais ?',
      answer:
        'Oui, nous livrons sur tout le territoire marocain (Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Oujda...). La livraison express est offerte dès 800 DH d’achat et prend 24h à 48h ouvrées. Le paiement à la livraison (Cash on Delivery) est également disponible.',
    },
    {
      question: 'Puis-je venir essayer les montures en boutique à Casablanca sans rendez-vous ?',
      answer:
        'Absolument. Notre showroom sur le Boulevard d’Anfa à Casablanca vous accueille librement du lundi au samedi de 09h30 à 19h30. Pour un créneau privilégié avec notre opticien visagiste, la prise de rendez-vous en ligne est également possible.',
    },
    {
      question: 'Que couvre la garantie de 2 ans ?',
      answer:
        'Toutes nos montures et verres bénéficient d’une garantie constructeur de 2 ans contre les défauts de fabrication, ainsi que d’un service d’assistance et de réparation prioritaire dans notre atelier.',
    },
    {
      question: 'L’entretien et le réglage de mes lunettes sont-ils offerts ?',
      answer:
        'Oui, le nettoyage aux ultrasons, le resserrage des vis, l’ajustage des branches à votre morphologie et le remplacement des plaquettes sont offerts à vie pour toutes les lunettes délivrées par la Maison.',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Questions Fréquentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Tout Ce Que Vous Devez Savoir
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Retrouvez les réponses aux questions les plus posées concernant votre visite en boutique à Casablanca, les mutuelles et la livraison au Maroc.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-stone-200/80 overflow-hidden transition-colors duration-200 bg-[#fcfbf9]"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-stone-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-stone-900' : 'text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/50 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
