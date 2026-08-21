import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/upload/route'

const mockWriteFile = vi.fn()
const mockMkdir = vi.fn()

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('fs/promises', () => ({
  writeFile: () => mockWriteFile(),
  mkdir: () => mockMkdir(),
}))

import { auth } from '@/lib/auth'

describe('POST /api/upload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockWriteFile.mockResolvedValue(undefined)
    mockMkdir.mockResolvedValue(undefined)
  })

  it('returns 401 when not authenticated', async () => {
    ;(auth as any).mockResolvedValue(null)
    const formData = new FormData()
    const req = new Request('http://localhost/api/upload', { method: 'POST', body: formData })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 400 when no file is provided', async () => {
    ;(auth as any).mockResolvedValue({ user: { id: 'admin' } })
    const formData = new FormData()
    const req = new Request('http://localhost/api/upload', { method: 'POST', body: formData })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for non-image file types', async () => {
    ;(auth as any).mockResolvedValue({ user: { id: 'admin' } })
    const formData = new FormData()
    formData.append('file', new File(['hello'], 'test.txt', { type: 'text/plain' }))
    const req = new Request('http://localhost/api/upload', { method: 'POST', body: formData })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for files exceeding size limit', async () => {
    ;(auth as any).mockResolvedValue({ user: { id: 'admin' } })
    const largeContent = new Uint8Array(6 * 1024 * 1024)
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('file', file)
    const req = new Request('http://localhost/api/upload', { method: 'POST', body: formData })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('uploads valid image file', async () => {
    ;(auth as any).mockResolvedValue({ user: { id: 'admin' } })
    const file = new File(['image content'], 'photo.jpg', { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('file', file)
    const req = new Request('http://localhost/api/upload', { method: 'POST', body: formData })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.url).toMatch(/^\/uploads\/\d+-[a-z0-9]+\.jpg$/)
    expect(mockWriteFile).toHaveBeenCalled()
    expect(mockMkdir).toHaveBeenCalled()
  })
})