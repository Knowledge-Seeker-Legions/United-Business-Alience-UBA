import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { PageRoute } from '../types/uba';
import { UBALogo } from './IndustryArtwork';

interface FooterProps {
  onNavigate: (page: PageRoute, businessId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B253A] text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand Summary */}
          <div className="space-y-4">
            <UBALogo light />
            <p className="text-sm text-slate-300 leading-relaxed">
              United Business Alliance connects vetted SMEs across six core industries with transparent capital, strategic expertise, and ongoing financial audit protection.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Independent Background & Legal Compliance</span>
            </div>
          </div>

          {/* Investor Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              For Investors
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('businesses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Browse Verified Businesses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('invest')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Submit Investment Application
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compliance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audit & Compliance Framework
                </button>
              </li>
            </ul>
          </div>

          {/* Business Owners & Organizers */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Owners & Management
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('pitch')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pitch Your Business
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organizer Admin Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How UBA Prevents Fraud
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Desk */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Compliance & Support Desk
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>compliance@uba-alliance.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="tabular-nums">+1 (800) 555-0194</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gulshan Financial Plaza, Suite 402</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} United Business Alliance (UBA). All business audit records are simulated locally for platform evaluation.
          </p>
          <p className="whitespace-nowrap">
            Idea · Money · Idea+Money Governance
          </p>
        </div>
      </div>
    </footer>
  );
};
