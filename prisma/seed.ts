import { PrismaClient, Gender, FrameType, Shape } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// Helper to download an image and save it locally if not already present
async function downloadImageLocally(url: string, localFilename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const filePath = path.join(uploadsDir, localFilename)
  const publicUrl = `/uploads/${localFilename}`

  if (fs.existsSync(filePath)) {
    console.log(`✓ Image already exists: ${localFilename}`)
    return publicUrl
  }

  try {
    console.log(`↓ Downloading image: ${localFilename}...`)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch ${url} (HTTP ${response.status}), creating fallback placeholder`)
      createPlaceholderImage(filePath)
      return publicUrl
    }

    const arrayBuffer = await response.arrayBuffer()
    await fs.promises.writeFile(filePath, Buffer.from(arrayBuffer))
    console.log(`✓ Saved image: ${localFilename}`)
  } catch (err) {
    console.warn(`Error downloading ${url}:`, err)
    createPlaceholderImage(filePath)
  }

  return publicUrl
}

// Fallback 1x1 transparent/colored JPEG if download fails
function createPlaceholderImage(filePath: string) {
  const fallbackJpeg = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08,
    0x07, 0x07, 0x07, 0x09, 0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20, 0x24, 0x2e, 0x27, 0x20,
    0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29, 0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27,
    0x39, 0x3d, 0x38, 0x32, 0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x1f, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04,
    0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f,
    0x00, 0xbf, 0x00, 0xff, 0xd9,
  ])
  fs.writeFileSync(filePath, fallbackJpeg)
}

type SeedProduct = {
  reference: string
  name: string
  slug: string
  description: string
  price: number
  gender: Gender
  frameType: FrameType
  shape: Shape
  material: string
  color: string
  lensWidth: number
  bridgeWidth: number
  templeLength: number
  brandName: string
  brandSlug: string
  categoryName: string
  categorySlug: string
  imageUrl: string
  imageFilename: string
}

const productsToSeed: SeedProduct[] = [
  {
    reference: 'JMM-DEA-001',
    name: 'Dealan Vintage 10mm',
    slug: 'jacques-marie-mage-dealan',
    description: 'Édition limitée sculptée dans un bloc d’acétate japonais de 10mm avec rivets or 18 carats et branches gravées.',
    price: 6800.0,
    gender: Gender.UNISEX,
    frameType: FrameType.FULL_RIM,
    shape: Shape.RECTANGLE,
    material: 'Acétate japonais 10mm & Or 18k',
    color: 'Écaille Havane Foncé',
    lensWidth: 50,
    bridgeWidth: 20,
    templeLength: 142,
    brandName: 'Jacques Marie Mage',
    brandSlug: 'jacques-marie-mage',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'jmm-dealan-1.jpg',
  },
  {
    reference: 'MOS-LEM-002',
    name: 'Lemtosh Classic Pantos',
    slug: 'moscot-lemtosh-classic',
    description: 'La silhouette new-yorkaise emblématique depuis 1915 avec ses rivets diamant signature et son acétate poli au tonneau.',
    price: 3200.0,
    gender: Gender.UNISEX,
    frameType: FrameType.FULL_RIM,
    shape: Shape.ROUND,
    material: 'Acétate italien Mazzucchelli',
    color: 'Blonde Tortoise',
    lensWidth: 46,
    bridgeWidth: 24,
    templeLength: 145,
    brandName: 'Moscot',
    brandSlug: 'moscot',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'moscot-lemtosh-1.jpg',
  },
  {
    reference: 'CG-1307-003',
    name: '1307 Bold Square',
    slug: 'cutler-and-gross-1307',
    description: 'Monture carrée d’inspiration architecturale britannique avec biseaux prononcés et charnières 7 barillets robustes.',
    price: 4200.0,
    gender: Gender.MEN,
    frameType: FrameType.FULL_RIM,
    shape: Shape.SQUARE,
    material: 'Acétate de cellulose 9mm',
    color: 'Noir Onyx Brillant',
    lensWidth: 52,
    bridgeWidth: 21,
    templeLength: 145,
    brandName: 'Cutler and Gross',
    brandSlug: 'cutler-and-gross',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'cutler-1307-1.jpg',
  },
  {
    reference: 'LIN-AIR-004',
    name: 'Corona Air Titanium',
    slug: 'lindberg-air-titanium-corona',
    description: 'Prouesse du minimalisme danois pesant moins de 3 grammes. Fil de Bêta-titane ultra-résistant sans aucune vis ni rivet.',
    price: 5400.0,
    gender: Gender.UNISEX,
    frameType: FrameType.RIMLESS,
    shape: Shape.ROUND,
    material: 'Fil de Bêta-Titane 100% pur',
    color: 'Gris Graphite & Or Pâle',
    lensWidth: 48,
    bridgeWidth: 20,
    templeLength: 140,
    brandName: 'Lindberg',
    brandSlug: 'lindberg',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'lindberg-corona-1.jpg',
  },
  {
    reference: 'PER-714-005',
    name: '714 Steve McQueen Pliante',
    slug: 'persol-714-steve-mcqueen',
    description: 'La légendaire monture pliante immortalisée par Steve McQueen. Verres minéraux polarisés bleus et charnière Arrow argent.',
    price: 2900.0,
    gender: Gender.UNISEX,
    frameType: FrameType.FULL_RIM,
    shape: Shape.AVIATOR,
    material: 'Acétate italien & Verres minéraux',
    color: 'Havane Écaille & Bleu Polarisé',
    lensWidth: 54,
    bridgeWidth: 21,
    templeLength: 140,
    brandName: 'Persol',
    brandSlug: 'persol',
    categoryName: 'Solaires',
    categorySlug: 'solaires',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'persol-714-1.jpg',
  },
  {
    reference: 'RB-3025-006',
    name: 'Aviator Classic 1937',
    slug: 'ray-ban-aviator-classic',
    description: 'La monture solaire originelle créée pour les aviateurs. Structure métallique plaquée or et verres trempés G-15.',
    price: 1650.0,
    gender: Gender.UNISEX,
    frameType: FrameType.FULL_RIM,
    shape: Shape.AVIATOR,
    material: 'Métal plaqué or & Verre minéral',
    color: 'Or Brillant / Vert G-15',
    lensWidth: 58,
    bridgeWidth: 14,
    templeLength: 135,
    brandName: 'Ray-Ban',
    brandSlug: 'ray-ban',
    categoryName: 'Solaires',
    categorySlug: 'solaires',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'rayban-aviator-1.jpg',
  },
  {
    reference: 'TF-SNOW-007',
    name: 'Snowdon Vintage 007',
    slug: 'tom-ford-snowdon',
    description: 'Silhouette intemporelle portée au cinéma dans 007 Spectre. Acétate noir profond et insert métallique en T sur les tempes.',
    price: 3800.0,
    gender: Gender.MEN,
    frameType: FrameType.FULL_RIM,
    shape: Shape.SQUARE,
    material: 'Acétate brillant & Métal doré',
    color: 'Noir Brillant',
    lensWidth: 51,
    bridgeWidth: 21,
    templeLength: 145,
    brandName: 'Tom Ford',
    brandSlug: 'tom-ford',
    categoryName: 'Solaires',
    categorySlug: 'solaires',
    imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'tomford-snowdon-1.jpg',
  },
  {
    reference: 'SL-276-008',
    name: 'SL 276 Mica Cat-Eye',
    slug: 'saint-laurent-mica',
    description: 'Une monture papillon angulaire et sculptée avec verres gris dégradés anti-reflets haute protection.',
    price: 3400.0,
    gender: Gender.WOMEN,
    frameType: FrameType.FULL_RIM,
    shape: Shape.CAT_EYE,
    material: 'Acétate biseauté haute densité',
    color: 'Noir Profond',
    lensWidth: 53,
    bridgeWidth: 16,
    templeLength: 145,
    brandName: 'Saint Laurent',
    brandSlug: 'saint-laurent',
    categoryName: 'Solaires',
    categorySlug: 'solaires',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'sl-mica-1.jpg',
  },
  {
    reference: 'MDO-PAN-009',
    name: 'L’Élégance Pantos Artisanale',
    slug: 'mdo-elegance-pantos',
    description: 'Sélection atelier conventionnée AMO & Mutuelles privées au Maroc. Dossier de remboursement fourni avec devis aux normes.',
    price: 950.0,
    gender: Gender.UNISEX,
    frameType: FrameType.FULL_RIM,
    shape: Shape.ROUND,
    material: 'Bio-Acétate de coton',
    color: 'Écaille Miel Ambré',
    lensWidth: 49,
    bridgeWidth: 20,
    templeLength: 142,
    brandName: "Maison d'Optique",
    brandSlug: 'maison-d-optique',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'mdo-pantos-1.jpg',
  },
  {
    reference: 'MDO-REC-010',
    name: 'Le Rectangle Titane Satiné',
    slug: 'mdo-rectangle-titane',
    description: 'Monture demi-cerclée en acier chirurgical et titane ultra-légère conçue pour le confort longue durée au bureau et sur écran.',
    price: 850.0,
    gender: Gender.MEN,
    frameType: FrameType.SEMI_RIMLESS,
    shape: Shape.RECTANGLE,
    material: 'Acier chirurgical & Bêta-Titane',
    color: 'Gunmetal Brossé',
    lensWidth: 54,
    bridgeWidth: 18,
    templeLength: 145,
    brandName: "Maison d'Optique",
    brandSlug: 'maison-d-optique',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'mdo-rectangle-1.jpg',
  },
  {
    reference: 'MDO-PAP-011',
    name: 'Le Papillon Délicat Or Rose',
    slug: 'mdo-papillon-or-rose',
    description: 'Lignes féminines adoucies avec cerclage or rose et plaquettes de nez en silicone hypoallergénique.',
    price: 900.0,
    gender: Gender.WOMEN,
    frameType: FrameType.FULL_RIM,
    shape: Shape.CAT_EYE,
    material: 'Métal fin & Acétate translucide',
    color: 'Or Rose & Cristal Pêche',
    lensWidth: 51,
    bridgeWidth: 17,
    templeLength: 140,
    brandName: "Maison d'Optique",
    brandSlug: 'maison-d-optique',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'mdo-papillon-1.jpg',
  },
  {
    reference: 'MDO-KID-012',
    name: 'L’Aventurier Junior Flexible',
    slug: 'mdo-aventurier-junior',
    description: 'Monture enfant incassable en silicone souple à mémoire de forme sans aucune charnière métallique dangereuse.',
    price: 650.0,
    gender: Gender.KIDS,
    frameType: FrameType.FULL_RIM,
    shape: Shape.OVAL,
    material: 'Silicone souple médical',
    color: 'Bleu Nuit & Rouge',
    lensWidth: 44,
    bridgeWidth: 16,
    templeLength: 125,
    brandName: "Maison d'Optique",
    brandSlug: 'maison-d-optique',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'mdo-junior-1.jpg',
  },
  {
    reference: 'GUC-MAR-013',
    name: 'GG Marmont Browline',
    slug: 'gucci-gg-marmont-browline',
    description: 'Silhouette clubmaster revisitée par la maison florentine avec arcade en acétate écaille et double G doré.',
    price: 3900.0,
    gender: Gender.UNISEX,
    frameType: FrameType.SEMI_RIMLESS,
    shape: Shape.BROWLINE,
    material: 'Acétate écaille & Métal doré',
    color: 'Écaille & Or Brillant',
    lensWidth: 51,
    bridgeWidth: 19,
    templeLength: 145,
    brandName: 'Gucci',
    brandSlug: 'gucci',
    categoryName: 'Optique',
    categorySlug: 'optique',
    imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'gucci-browline-1.jpg',
  },
  {
    reference: 'PRA-SYM-014',
    name: 'Symbole Rectangulaire 3D',
    slug: 'prada-symbole-geometric',
    description: 'Monture solaire aux branches facettées 3D intégrant le logo triangulaire iconique de la maison milanaise.',
    price: 4200.0,
    gender: Gender.WOMEN,
    frameType: FrameType.FULL_RIM,
    shape: Shape.RECTANGLE,
    material: 'Acétate haute densité',
    color: 'Blanc Craie & Noir',
    lensWidth: 53,
    bridgeWidth: 19,
    templeLength: 140,
    brandName: 'Prada',
    brandSlug: 'prada',
    categoryName: 'Solaires',
    categorySlug: 'solaires',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'prada-symbole-1.jpg',
  },
  {
    reference: 'OAK-HOL-015',
    name: 'Holbrook Prizm Sapphire',
    slug: 'oakley-holbrook-prizm',
    description: 'Monture sportive ultra-légère en O Matter avec verres polarisés Prizm Sapphire pour un contraste et une clarté optimale.',
    price: 1750.0,
    gender: Gender.MEN,
    frameType: FrameType.FULL_RIM,
    shape: Shape.SQUARE,
    material: 'O Matter ultra-léger & Plutonite',
    color: 'Noir Mat / Verres Bleus Prizm',
    lensWidth: 57,
    bridgeWidth: 18,
    templeLength: 137,
    brandName: 'Oakley',
    brandSlug: 'oakley',
    categoryName: 'Solaires',
    categorySlug: 'solaires',
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&auto=format&fit=crop&q=80',
    imageFilename: 'oakley-holbrook-1.jpg',
  },
]

async function main() {
  console.log('--- Starting Optical Store Database Seeding (Morocco) ---')

  // 1. Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  })
  console.log('✓ Admin user ready: admin@example.com')

  // 2. Process all products
  for (const item of productsToSeed) {
    // Upsert Brand
    const brand = await prisma.brand.upsert({
      where: { slug: item.brandSlug },
      update: { name: item.brandName },
      create: { name: item.brandName, slug: item.brandSlug },
    })

    // Upsert Category
    const category = await prisma.category.upsert({
      where: { slug: item.categorySlug },
      update: { name: item.categoryName },
      create: { name: item.categoryName, slug: item.categorySlug },
    })

    // Download image locally to public/uploads/
    const localImageUrl = await downloadImageLocally(item.imageUrl, item.imageFilename)

    // Upsert Product
    const product = await prisma.product.upsert({
      where: { reference: item.reference },
      update: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        gender: item.gender,
        frameType: item.frameType,
        shape: item.shape,
        material: item.material,
        color: item.color,
        lensWidth: item.lensWidth,
        bridgeWidth: item.bridgeWidth,
        templeLength: item.templeLength,
        brandId: brand.id,
        categoryId: category.id,
        isActive: true,
      },
      create: {
        reference: item.reference,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        gender: item.gender,
        frameType: item.frameType,
        shape: item.shape,
        material: item.material,
        color: item.color,
        lensWidth: item.lensWidth,
        bridgeWidth: item.bridgeWidth,
        templeLength: item.templeLength,
        brandId: brand.id,
        categoryId: category.id,
        isActive: true,
      },
    })

    // Ensure product image exists
    const existingImage = await prisma.productImage.findFirst({
      where: { productId: product.id },
    })

    if (!existingImage) {
      await prisma.productImage.create({
        data: {
          url: localImageUrl,
          alt: `${item.name} par ${item.brandName}`,
          sortOrder: 0,
          productId: product.id,
        },
      })
    } else {
      await prisma.productImage.update({
        where: { id: existingImage.id },
        data: {
          url: localImageUrl,
          alt: `${item.name} par ${item.brandName}`,
        },
      })
    }

    console.log(`✓ Seeded frame: ${item.name} (${item.brandName}) -> ${item.price} MAD`)
  }

  console.log(`\n🎉 Successfully seeded ${productsToSeed.length} optical frames with MAD pricing!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })