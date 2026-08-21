export function BrandMarquee() {
  const brands = [
    { name: 'Jacques Marie Mage', origin: 'Los Angeles / Japon' },
    { name: 'Moscot', origin: 'New York' },
    { name: 'Cutler and Gross', origin: 'Londres' },
    { name: 'Lindberg', origin: 'Danemark' },
    { name: 'Persol', origin: 'Turin, Italie' },
    { name: 'Tom Ford', origin: 'Italie' },
    { name: 'Matsuda', origin: 'Tokyo' },
    { name: 'Ray-Ban Icons', origin: 'Italie' },
  ]

  return (
    <section className="py-12 bg-[#fcfbf9] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-stone-400 mb-8">
          Les Grandes Manufactures &amp; Créateurs Indépendants
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((b) => (
            <div key={b.name} className="text-center group cursor-default">
              <span className="text-sm sm:text-base font-serif tracking-wider text-stone-700 group-hover:text-stone-900 transition-colors">
                {b.name}
              </span>
              <span className="block text-[10px] text-stone-400 tracking-widest uppercase font-mono mt-0.5">
                {b.origin}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
