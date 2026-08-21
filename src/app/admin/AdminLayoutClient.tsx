'use client'

import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminMobileHeader from './AdminMobileHeader'
import { adminSignOut } from './actions'
import { X } from 'lucide-react'

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#faf9f6] text-stone-900">
      {/* Mobile Backdrop & Drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar for Desktop & Sliding Drawer for Mobile */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="relative">
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg z-50"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <AdminSidebar onSignOut={adminSignOut} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileHeader onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
