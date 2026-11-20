import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types/uba';
import { UBALogo } from './IndustryArtwork';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, businessId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'Discover', route: 'home' },
    { label: 'Businesses', route: 'businesses' },
    { label: 'Compliance', route: 'compliance' },
    { label: 'Pitch Business', route: 'pitch' },
    { label: 'Invest', route: 'invest' },
  ];

  const handleLinkClick = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B253A] rounded whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="United Business Alliance Home"
        >
          <UBALogo />
        </button>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.route ||
              (currentPage === 'details' && item.route === 'businesses');
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleLinkClick(item.route)}
                className={`text-sm font-medium transition-colors duration-150 py-1 border-b-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B253A] ${
                  isActive
                    ? 'text-[#0B253A] border-[#10B981]'
                    : 'text-slate-600 border-transparent hover:text-[#0B253A] hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              handleLinkClick(currentPage === 'dashboard' ? 'home' : 'dashboard')
            }
            className={`hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B253A] ${
              currentPage === 'dashboard'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-[#0B253A] text-white hover:bg-[#133552]'
            }`}
          >
            {currentPage === 'dashboard' ? 'Public View' : 'Organizer Portal'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleLinkClick(item.route)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-100 text-[#0B253A] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B253A]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                handleLinkClick(currentPage === 'dashboard' ? 'home' : 'dashboard')
              }
              className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-[#0B253A] text-white hover:bg-[#133552] transition-colors cursor-pointer"
            >
              {currentPage === 'dashboard' ? 'Public View' : 'Organizer Portal'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
