import { StoreHero } from '@/features/landing/components/StoreHero'
import { PromoBanner } from '@/features/landing/components/PromoBanner'
import { StoreServices } from '@/features/landing/components/StoreServices'
import { FaceShapeGuide } from '@/features/landing/components/FaceShapeGuide'
import { LensTechnologySection } from '@/features/landing/components/LensTechnologySection'
import { ShowcaseSection } from '@/features/landing/components/ShowcaseSection'
import { MaterialsSection } from '@/features/landing/components/MaterialsSection'
import { BoutiqueExperience } from '@/features/landing/components/BoutiqueExperience'
import { BrandMarquee } from '@/features/landing/components/BrandMarquee'
import { MutuelleSection } from '@/features/landing/components/MutuelleSection'
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection'
import { FaqSection } from '@/features/landing/components/FaqSection'
import { StoreLocationAndHours } from '@/features/landing/components/StoreLocationAndHours'

export const metadata = {
  title: 'Maison d’Optique Casablanca | Opticien Visagiste, Bilan Visuel & Montures Créateurs Maroc',
  description:
    'Votre opticien de confiance à Casablanca (Bd d’Anfa). Examen de la vue offert, verres haute précision, prise en charge AMO & mutuelles, livraison partout au Maroc.',
}

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Store Hero with Direct Shop CTA & Category Pills */}
      <StoreHero />

      {/* 2. Promotional Offers & Mutuelle Highlights */}
      <PromoBanner />

      {/* 3. Boutique & Online Services Grid */}
      <StoreServices />

      {/* 4. Interactive Face Shape Finder */}
      <FaceShapeGuide />

      {/* 5. Precision Optical Lens Technology */}
      <LensTechnologySection />

      {/* 6. Curated Frame Showcase Switcher */}
      <ShowcaseSection />

      {/* 7. Noble Materials & Craftsmanship */}
      <MaterialsSection />

      {/* 8. The 4-Step In-Store Experience */}
      <BoutiqueExperience />

      {/* 9. Designer Brand Partners */}
      <BrandMarquee />

      {/* 10. Mutuelle & AMO Integration */}
      <MutuelleSection />

      {/* 11. Verified Customer Reviews */}
      <TestimonialsSection />

      {/* 12. Optical FAQ */}
      <FaqSection />

      {/* 13. Store Locator, Hours & Appointment Booking */}
      <StoreLocationAndHours />
    </div>
  )
}