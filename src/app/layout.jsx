import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Navbar/header';
import HeaderMobile from '../components/Navbar/header-mobile';
import MarginWidthWrapper from '../components/Navbar/margin-width-wrapper';
import PageWrapper from '../components/Navbar/page-wrapper';
import SideNav from '../components/Navbar/side-nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckSection from '../components/checkSection'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ระบบจัดเก็บคะเเนนนิสิต',
  description: 'ระบบจัดเก็บคะเเนนนิสิต',
}

export default  function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="garden">
      <body className={`bg-white${inter.className}`} suppressHydrationWarning={true}> 
        <div>
          <CheckSection>{children}</CheckSection>
        </div>
        <ToastContainer position="top-center" />
      </body>
    </html>
  )
}