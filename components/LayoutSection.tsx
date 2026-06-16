"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';

function LayoutSection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname!.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default LayoutSection