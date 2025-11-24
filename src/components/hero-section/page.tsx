import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="hero-section relative overflow-hidden">
      {/* Top Banner */}
      <div className="hero-banner relative z-30 w-full py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal">
            New name. Same commitment to helping every student find a <em className="italic font-medium">way</em>.
          </span>
          <a href="#" className="hero-banner-link flex items-center gap-1.5 font-semibold text-sm transition-opacity">
            Chalk AI FAQ
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4l4 4-4 4"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="hero-header relative z-20 w-full">
        <nav className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-[1600px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {/* Logo Icon - Three diamond shapes */}
              <div className="flex items-center">
                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(5, 8)">
                    <path d="M4 0 L8 3 L4 6 L0 3 Z" fill="#FF3D8F"/>
                    <path d="M12 0 L16 3 L12 6 L8 3 Z" fill="#FF3D8F"/>
                    <path d="M4 9 L8 12 L4 15 L0 12 Z" fill="#FF3D8F"/>
                  </g>
                </svg>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col -ml-1">
                <span className="hero-logo-text font-black leading-none tracking-tight">
                  CHALK AI
                </span>
                <span className="hero-logo-subtext text-[11px] tracking-wide -mt-0.5">formerly Quizizz</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden xl:flex items-center gap-10 text-white">
            <a href="#" className="hero-nav-link text-[15px] font-semibold transition-opacity whitespace-nowrap">
              School & District
            </a>
            <a href="#" className="hero-nav-link text-[15px] font-semibold transition-opacity whitespace-nowrap">
              Plans
            </a>
            <div className="relative group">
              <button className="hero-nav-link flex items-center gap-1.5 text-[15px] font-semibold transition-opacity whitespace-nowrap">
                Library
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="mt-0.5">
                  <path d="M5 7L1 3h8L5 7z"/>
                </svg>
              </button>
            </div>
            <div className="relative flex items-center gap-2.5">
              <a href="#" className="hero-nav-link text-[15px] font-semibold transition-opacity whitespace-nowrap">
                Math Practice
              </a>
              <span className="hero-nav-badge text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                New
              </span>
            </div>
            <div className="relative group">
              <button className="hero-nav-link flex items-center gap-1.5 text-[15px] font-semibold transition-opacity whitespace-nowrap">
                For Business
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="mt-0.5">
                  <path d="M5 7L1 3h8L5 7z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <button className="hero-button-transparent hidden lg:block px-6 py-2.5 text-white text-[15px] font-semibold rounded-lg transition-all whitespace-nowrap">
              Get a quote
            </button>
            <button className="hero-button-transparent hidden lg:block px-6 py-2.5 text-white text-[15px] font-semibold rounded-lg transition-all whitespace-nowrap">
              Enter code
            </button>
            <button className="hero-button-transparent hidden lg:block px-6 py-2.5 text-white text-[15px] font-semibold rounded-lg transition-all whitespace-nowrap">
              Log in
            </button>
            <Link
              href="/main-app"
              className="hero-button-primary px-7 py-2.5 text-white text-[15px] font-bold rounded-lg transition-all whitespace-nowrap shadow-lg"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large overlapping circles creating the abstract background pattern */}
        <div className="hero-circle-1 absolute rounded-full"></div>
        <div className="hero-circle-2 absolute rounded-full"></div>
        <div className="hero-circle-3 absolute rounded-full"></div>
        <div className="hero-circle-4 absolute rounded-full"></div>
        <div className="hero-circle-5 absolute rounded-full"></div>
        <div className="hero-circle-6 absolute rounded-full"></div>
        <div className="hero-circle-7 absolute rounded-full"></div>
        
        {/* Subtle grid lines for depth */}
        <div className="absolute inset-0">
          <div className="hero-grid-line absolute left-[15%] top-0 bottom-0 w-[1px]"></div>
          <div className="hero-grid-line absolute left-[30%] top-0 bottom-0 w-[1px]"></div>
          <div className="hero-grid-line absolute left-[45%] top-0 bottom-0 w-[1px]"></div>
          <div className="hero-grid-line absolute left-[60%] top-0 bottom-0 w-[1px]"></div>
          <div className="hero-grid-line absolute left-[75%] top-0 bottom-0 w-[1px]"></div>
          
          <div className="hero-grid-line absolute top-[20%] left-0 right-0 h-[1px]"></div>
          <div className="hero-grid-line absolute top-[40%] left-0 right-0 h-[1px]"></div>
          <div className="hero-grid-line absolute top-[60%] left-0 right-0 h-[1px]"></div>
          <div className="hero-grid-line absolute top-[80%] left-0 right-0 h-[1px]"></div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-20 text-center">
        <div className="max-w-[1100px] mx-auto">
          {/* Main Heading */}
          <h1 className="mb-10">
            {/* First line - "Quizizz is now" */}
            <div className="hero-title-line-1 text-white font-normal mb-2 tracking-tight leading-tight">
              
            </div>
            {/* Second line - CHALK AI */}
            <div className="hero-title-line-2 font-black leading-none">
              <span className="typewriter-text">CHALK AI</span>
            </div>
          </h1>

          {/* Description */}
          <p className="hero-description text-white max-w-[900px] mx-auto mb-16 leading-relaxed">
            Bridge classroom realities and curriculum expectations with the
            <br className="hidden md:block" />
            platform that&apos;s AI-supported, but teacher-first.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Teachers Button */}
            <div className="flex flex-col items-center w-full sm:w-auto min-w-[240px]">
              <div className="hero-cta-label uppercase mb-3.5 font-bold tracking-wider">
                TEACHERS
              </div>
              <Link
                href="/main-app"
                className="hero-cta-button-primary w-full px-12 py-4 text-white font-bold rounded-lg transition-all duration-200 shadow-xl"
              >
                Get started
              </Link>
            </div>

            {/* Administrators Button */}
            <div className="flex flex-col items-center w-full sm:w-auto min-w-[240px]">
              <div className="hero-cta-label uppercase mb-3.5 font-bold tracking-wider">
                ADMINISTRATORS
              </div>
              <button className="hero-cta-button-secondary w-full px-12 py-4 font-bold rounded-lg transition-all duration-200 shadow-xl">
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
