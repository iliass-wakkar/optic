'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Glasses, Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError(t('errorInvalid'))
      } else {
        router.push('/admin')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] p-6 text-stone-900 selection:bg-stone-200">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-900 text-stone-50 shadow-md hover:bg-stone-800 transition mx-auto"
          >
            <Glasses className="w-7 h-7 text-[#c5a880]" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-tight">
              Maison d&apos;Optique
            </h1>
            <p className="text-xs uppercase font-mono tracking-widest text-[#8c6b38] mt-1">
              Espace Atelier &amp; Administration
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-md space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
              {t('loginTitle')}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Accès réservé aux opticiens et gestionnaires de la Maison.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="p-4 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-2xl"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5"
              >
                {t('email')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  placeholder="admin@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5"
              >
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span>{loading ? t('loading') || 'Connexion...' : t('loginButton')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à la boutique publique</span>
          </Link>
        </div>
      </div>
    </div>
  )
}