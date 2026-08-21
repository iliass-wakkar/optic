import { getProductBySlug } from '@/features/products/queries/getProductBySlug'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ArrowLeft, ShieldCheck, MapPin, Sparkles } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    return {
      title: `${product.name} | Maison d'Optique Casablanca`,
      description: product.description || `Découvrez ${product.name} par ${product.brand.name} chez Maison d'Optique Casablanca.`,
      openGraph: {
        title: `${product.name} | Maison d'Optique Casablanca`,
        description: product.description || `Découvrez ${product.name} par ${product.brand.name} chez Maison d'Optique Casablanca.`,
        images: product.images.length > 0 ? [{ url: product.images[0].url }] : [],
      },
    }
  } catch {
    return {
      title: 'Produit introuvable | Maison d\'Optique',
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  const t = await getTranslations('product')
  const tCommon = await getTranslations('common')

  const formattedPrice = product.price
    ? `${new Intl.NumberFormat('fr-MA').format(Number(product.price))} DH`
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} - ${product.brand.name}`,
    image: product.images.map((img) => img.url),
    sku: product.reference,
    brand: {
      '@type': 'Brand',
      name: product.brand.name,
    },
    category: product.category.name,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: Number(product.price),
        priceCurrency: 'MAD',
        availability: product.isActive ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
    }),
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen py-8 sm:py-12 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-medium text-stone-700 hover:text-stone-900 hover:border-stone-400 transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{tCommon('back')}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            {product.images.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} - vue ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-[4/3] bg-white border border-stone-200 rounded-3xl flex items-center justify-center text-stone-400 text-sm font-medium shadow-2xs">
                {t('noImage')}
              </div>
            )}
          </div>

          {/* Right Column: Information & Specs */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#f5efe4] text-[#8c6b38] text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-[#e5dac6]">
                {product.brand.name}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-stone-500 font-mono mt-1">
                Référence : {product.reference} • {product.category.name}
              </p>
            </div>

            {formattedPrice && (
              <div className="pt-2">
                <span className="text-3xl font-serif font-medium text-stone-900">
                  {formattedPrice}
                </span>
                <p className="text-xs text-emerald-800 font-medium mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dossier remboursement AMO &amp; Mutuelle fourni (Saham, Wafa, RMA, AXA...)</span>
                </p>
              </div>
            )}

            {product.description && (
              <div className="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                <p>{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            <div className="bg-[#fcfbf9] p-5 rounded-2xl border border-stone-200/70 space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                {t('specifications')}
              </h2>
              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-stone-500">{t('gender')}</dt>
                  <dd className="font-semibold text-stone-900">{t(`genderOptions.${product.gender}`)}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">{t('frameType')}</dt>
                  <dd className="font-semibold text-stone-900">{t(`frameTypeOptions.${product.frameType}`)}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">{t('shape')}</dt>
                  <dd className="font-semibold text-stone-900">{t(`shapeOptions.${product.shape}`)}</dd>
                </div>
                {product.material && (
                  <div>
                    <dt className="text-stone-500">{t('material')}</dt>
                    <dd className="font-semibold text-stone-900">{product.material}</dd>
                  </div>
                )}
                {product.color && (
                  <div>
                    <dt className="text-stone-500">{t('color')}</dt>
                    <dd className="font-semibold text-stone-900">{product.color}</dd>
                  </div>
                )}
                {product.lensWidth && (
                  <div>
                    <dt className="text-stone-500">{t('lensWidth')}</dt>
                    <dd className="font-semibold text-stone-900">{product.lensWidth} mm</dd>
                  </div>
                )}
                {product.bridgeWidth && (
                  <div>
                    <dt className="text-stone-500">{t('bridgeWidth')}</dt>
                    <dd className="font-semibold text-stone-900">{product.bridgeWidth} mm</dd>
                  </div>
                )}
                {product.templeLength && (
                  <div>
                    <dt className="text-stone-500">{t('templeLength')}</dt>
                    <dd className="font-semibold text-stone-900">{product.templeLength} mm</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* CTA action */}
            <div className="pt-2 space-y-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs tracking-wide shadow-xs transition focus:ring-2 focus:ring-stone-900 focus:outline-none"
              >
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                <span>Essayer en boutique à Casablanca / Prendre RDV</span>
              </Link>
              <p className="text-[11px] text-center text-stone-400">
                📦 Livraison express disponible sur tout le Maroc
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}