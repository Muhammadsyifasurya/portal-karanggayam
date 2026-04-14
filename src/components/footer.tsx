"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { X, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand & Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold text-emerald-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white font-semibold">
                K
              </div>
              <span>Karanggayam</span>
            </Link>
            <p className="text-sm leading-6 text-slate-600">
              Portal resmi berita dan pengumuman Dusun Karanggayam. Tetap update
              dengan inisiatif dan acara komunitas kami.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pengumuman"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Community Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-slate-600 hover:text-emerald-700 transition"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dusun Karanggayam, Yogyakarta</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <Link
                  href="mailto:info@karanggayam.com"
                  className="hover:text-emerald-700 transition"
                >
                  info@karanggayam.com
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <Link
                  href="tel:+62274"
                  className="hover:text-emerald-700 transition"
                >
                  +62 (0274) XXX-XXXX
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <Link
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                aria-label="Facebook"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                aria-label="Twitter"
              >
                <X className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-200"></div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
          <p>
            © {currentYear} Dusun Karanggayam. All rights reserved. Made with ❤️
            for our community.
          </p>
          <div className="flex gap-6">
            <Link href="/#" className="hover:text-emerald-700 transition">
              Privacy Policy
            </Link>
            <Link href="/#" className="hover:text-emerald-700 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
