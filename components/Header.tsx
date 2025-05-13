"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseSvg, ForwardArrowSvg, HamburgerSvg } from "./svgs";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/news", label: "News" },
    { href: "/services", label: "Services" },
    { href: "/our-team", label: "Our Team" },
    { href: "/make-enquiry", label: "Make Enquiry" },
  ];

  return (
    <nav className="fixed md:top-5 md:left-5 md:right-5 z-10 w-full md:w-auto max-w-full">
      <div className="mx-auto bg-white max-w-[1440px]">
        <div className="h-full p-6 md:p-10 flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-[20px]">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-black font-fontWorkSans text-sm"
              >
                {label}
              </Link>
            ))}
          </div>

          <Link href="/contact" className="bg-seashellColor">
            <span className="text-base border border-black px-4 py-[10px] flex items-center gap-4 text-raisinBlackColor">
              Contact us
              <ForwardArrowSvg />
            </span>
          </Link>

          <button
            className="md:hidden p-2 bg-alabasterColor h-12 w-12"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseSvg /> : <HamburgerSvg />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white">
            <div className="p-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex py-2 text-black font-fontWorkSans text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
