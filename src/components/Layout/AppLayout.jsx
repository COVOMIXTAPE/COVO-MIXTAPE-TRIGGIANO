import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto pb-28 md:ml-60">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
