import { Link } from 'react-router';
import { Linkedin, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0e27] border-t border-[#1a1f3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-[#d4af37] mb-4">John Michael L. Libao</h3>
            <p className="text-gray-400 text-sm">
              Head, IT Digital Transformation & ERP Program Director
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
              <MapPin className="h-4 w-4" />
              <span>Quezon City, Philippines</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#d4af37] text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-[#d4af37] text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/capabilities" className="text-gray-400 hover:text-[#d4af37] text-sm">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#d4af37] text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="mailto:mymail@jlibao.cloud-ip.cc"
                className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>mymail@jlibao.cloud-ip.cc</span>
              </a>
              <a
                href="https://linkedin.com/in/jlibao14"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] text-sm"
              >
                <Linkedin className="h-4 w-4" />
                <span>linkedin.com/in/jlibao14</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1f3a] mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} John Michael L. Libao. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
