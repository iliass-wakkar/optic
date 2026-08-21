import { describe, it, expect } from 'vitest'
import { productToCsvRow, productsToCsv, parseProductsCsv } from '@/lib/csv'

const mockProduct = {
  id: '1',
  reference: 'RB-001',
  name: 'Wayfarer',
  slug: 'wayfarer',
  description: 'A frame',
  price: 129.99,
  gender: 'UNISEX',
  frameType: 'FULL_RIM',
  shape: 'RECTANGLE',
  material: 'Acétate',
  color: 'Noir',
  lensWidth: 50,
  bridgeWidth: 22,
  templeLength: 145,
  brandId: 'b1',
  categoryId: 'c1',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  brand: { name: 'Ray-Ban' },
  category: { name: 'Optique' },
  images: [
    { id: 'img1', url: '/uploads/a.jpg', alt: 'a', sortOrder: 0, productId: '1' },
    { id: 'img2', url: '/uploads/b.jpg', alt: 'b', sortOrder: 1, productId: '1' },
  ],
} as any

describe('CSV utilities', () => {
  it('productToCsvRow joins images with pipe', () => {
    const row = productToCsvRow(mockProduct)
    expect(row.images).toBe('/uploads/a.jpg|/uploads/b.jpg')
  })

  it('productToCsvRow returns empty string for no images', () => {
    const product = { ...mockProduct, images: [] }
    const row = productToCsvRow(product as any)
    expect(row.images).toBe('')
  })

  it('productToCsvRow handles price 0', () => {
    const product = { ...mockProduct, price: 0 }
    const row = productToCsvRow(product as any)
    expect(row.price).toBe('0')
  })

  it('productsToCsv generates header and row', () => {
    const csv = productsToCsv([mockProduct])
    expect(csv).toContain('reference,name,slug')
    expect(csv).toContain('RB-001,Wayfarer,wayfarer')
  })

  it('parseProductsCsv parses valid CSV', () => {
    const csv = `reference,name,slug,description,price,gender,frameType,shape,material,color,lensWidth,bridgeWidth,templeLength,brandName,categoryName,isActive,images
RB-001,Wayfarer,wayfarer,A frame,129.99,UNISEX,FULL_RIM,RECTANGLE,Acétate,Noir,50,22,145,Ray-Ban,Optique,true,/uploads/a.jpg|/uploads/b.jpg`
    const rows = parseProductsCsv(csv)
    expect(rows).toHaveLength(1)
    expect(rows[0].reference).toBe('RB-001')
    expect(rows[0].images).toBe('/uploads/a.jpg|/uploads/b.jpg')
  })

  it('parseProductsCsv throws on malformed CSV', () => {
    const csv = `reference,name\n"unclosed`
    expect(() => parseProductsCsv(csv)).toThrow()
  })

  it('parseProductsCsv throws on missing headers', () => {
    const csv = `reference,name
RB-001,Wayfarer`
    expect(() => parseProductsCsv(csv)).toThrow()
  })

  it('parseProductsCsv strips BOM', () => {
    const csv = '\uFEFFreference,name,slug,description,price,gender,frameType,shape,material,color,lensWidth,bridgeWidth,templeLength,brandName,categoryName,isActive,images\nRB-001,Wayfarer,wayfarer,A frame,129.99,UNISEX,FULL_RIM,RECTANGLE,Acétate,Noir,50,22,145,Ray-Ban,Optique,true,/uploads/a.jpg|/uploads/b.jpg'
    const rows = parseProductsCsv(csv)
    expect(rows).toHaveLength(1)
    expect(rows[0].reference).toBe('RB-001')
  })

  it('parseProductsCsv skips empty lines', () => {
    const csv = `reference,name,slug,description,price,gender,frameType,shape,material,color,lensWidth,bridgeWidth,templeLength,brandName,categoryName,isActive,images

RB-001,Wayfarer,wayfarer,A frame,129.99,UNISEX,FULL_RIM,RECTANGLE,Acétate,Noir,50,22,145,Ray-Ban,Optique,true,/uploads/a.jpg|/uploads/b.jpg

`
    const rows = parseProductsCsv(csv)
    expect(rows).toHaveLength(1)
  })
})