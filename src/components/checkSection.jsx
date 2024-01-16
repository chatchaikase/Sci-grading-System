"use client"
import React from 'react'
import LoginPage from '../app/(auth)/login/page';
import { usePathname } from 'next/navigation'
import Header from './header';
import HeaderMobile from './header-mobile';
import MarginWidthWrapper from './margin-width-wrapper';
import PageWrapper from './page-wrapper';
import SideNav from './side-nav';

export default function CheckSection({ children }) {
    const pathname = usePathname()
    return (
        <div>
          {pathname !== "/login" ? (
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
          ) : (
            <LoginPage/>
          )}
        </div>
    );
};
