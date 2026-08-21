import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { useTranslations } from 'next-intl'

type ProductCardProps = {
  product: Product & {
    brand: { name: string }
    category: { name: string }
    images: { url: string; alt: string | null }[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('product')
  const image = product.images[0]
  const formattedPrice = product.price
    ? `${new Intl.NumberFormat('fr-MA').format(Number(product.price))} DH`
    : null

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group block h-full focus:outline-none focus:ring-2 focus:ring-stone-900 rounded-2xl"
    >
      <div className="h-full flex flex-col rounded-2xl bg-white border border-stone-200/80 hover:border-stone-400/80 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden">
        {/* Image Frame */}
        <div className="relative aspect-[4/3] bg-[#faf9f6] overflow-hidden border-b border-stone-100">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs font-medium">
              {t('noImage')}
            </div>
          )}

          {/* Brand pill */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-stone-200/70 text-[10px] font-mono uppercase tracking-widest text-stone-800 shadow-2xs">
            {product.brand.name}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 mb-1">
              {product.category.name}
            </p>
            <h3 className="font-serif text-base text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] text-stone-400 font-mono mt-0.5">
              Réf: {product.reference}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            {formattedPrice ? (
              <span className="text-base font-serif font-medium text-stone-900">
                {formattedPrice}
              </span>
            ) : (
              <span className="text-xs font-medium text-stone-500">Sur devis</span>
            )}
            <span className="text-xs font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform">
              Découvrir →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}