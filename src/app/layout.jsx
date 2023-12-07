import { Inter } from 'next/font/google'
import './globals.css'

import Header from '../components/header';
import HeaderMobile from '../components/header-mobile';
import MarginWidthWrapper from '../components/margin-width-wrapper';
import PageWrapper from '../components/page-wrapper';
import SideNav from '../components/side-nav';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Side Nav w/ submenus',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="autumn">
      <body className={`bg-white${inter.className}`} suppressHydrationWarning={true}> 
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  )
}
