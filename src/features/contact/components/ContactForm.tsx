'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-serif font-medium text-stone-900">Demande envoyée avec succès !</h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Un opticien de notre équipe casablancaise vous recontactera par téléphone ou WhatsApp sous 24 heures pour confirmer votre rendez-vous.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition cursor-pointer"
        >
          Envoyer une autre demande
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
            Nom &amp; Prénom *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Ex: Youssef El Idrissi"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-[#faf9f6]"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="votre.email@domaine.ma"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-[#faf9f6]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
            Téléphone / WhatsApp *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            placeholder="06 61 00 00 00"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-[#faf9f6]"
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
            Motif
          </label>
          <select
            id="contact-subject"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-[#faf9f6]"
          >
            <option>Prise de rendez-vous bilan visuel (Casablanca)</option>
            <option>Conseil choix de monture &amp; visagisme</option>
            <option>Renseignement verres &amp; mutuelle / AMO</option>
            <option>Suivi de commande / Livraison Maroc</option>
            <option>Autre demande</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[11px] font-mono uppercase tracking-wider text-stone-700 mb-1">
          Message ou Disponibilités *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          placeholder="Précisez votre demande ou vos disponibilités pour une visite en boutique..."
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-[#faf9f6]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs tracking-wide shadow-xs transition disabled:opacity-50 flex items-center justify-center gap-2 focus:ring-2 focus:ring-stone-900 focus:outline-none cursor-pointer"
      >
        <Send className="w-3.5 h-3.5 text-[#c5a880]" />
        <span>{loading ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
      </button>
    </form>
  )
}
