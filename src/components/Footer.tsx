import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-iot-dark border-t border-gray-200 dark:border-iot-surface pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1 flex items-center justify-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Link
                href="/"
                className="hover:scale-105 transition-transform duration-300"
              >
                <Logo className="text-4xl" edgeColor="text-iot-green dark:text-iot-green" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          {/* <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="#about" className="hover:text-iot-cyan transition-colors">About Mission</Link></li>
              <li><Link href="#projects" className="hover:text-iot-cyan transition-colors">Project Gallery</Link></li>
              <li><Link href="#team" className="hover:text-iot-cyan transition-colors">Core Team</Link></li>
              <li><Link href="#join" className="hover:text-iot-cyan transition-colors">Join the Club</Link></li>
            </ul>
          </div> */}

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6 uppercase tracking-wider text-xs">Reach Out</h4>
            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-500">
              <li className="flex items-center justify-center gap-3">
                <Mail size={16} className="text-iot-green" />
                <span>iot.edge@mitsgwalior.in</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <MapPin size={16} className="text-iot-green" />
                <span>MITS Gwalior, MP, India</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Connectivity */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-6 uppercase tracking-wider text-xs">Connect</h4>
            <div className="flex justify-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-iot-surface/50 hover:text-iot-green transition-all border border-transparent hover:border-iot-green/30 text-gray-700 dark:text-gray-400">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-iot-surface/50 hover:text-iot-green transition-all border border-transparent hover:border-iot-green/30 text-gray-700 dark:text-gray-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-200 dark:bg-iot-surface/50 hover:text-iot-green transition-all border border-transparent hover:border-iot-green/30 text-gray-700 dark:text-gray-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-iot-surface flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IoT Edge Club - MITS Gwalior</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              All Systems Operational
            </span>
            <Link 
              href="/developer" 
              className="px-4 py-1.5 rounded-full bg-iot-green/5 text-iot-green border border-iot-green/20 hover:bg-iot-green hover:text-white transition-all duration-300 font-semibold"
            >
              Designed & Built by Yatharth Gupta
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}