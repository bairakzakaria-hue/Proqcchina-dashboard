'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navigation() {
  const { t } = useLanguage()
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">
              ProQCChina
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
              {t('nav.about')}
            </a>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-gray-700 hover:text-blue-600 transition flex items-center">
                {t('nav.services')}
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2">
                  <a href="#services" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold">
                    {t('nav.allServices')}
                  </a>
                  <div className="border-t border-gray-100 my-2"></div>
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">{t('nav.services')}</div>
                    <a href="#services" className="block px-4 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {t('service.companyCheckup')}
                    </a>
                    <a href="#services" className="block px-4 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {t('service.factoryAudit')}
                    </a>
                    <a href="#services" className="block px-4 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {t('service.preShipment')}
                    </a>
                    <a href="#services" className="block px-4 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {t('service.duringProduction')}
                    </a>
                    <a href="#services" className="block px-4 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {t('service.containerLoading')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#blog" className="text-gray-700 hover:text-blue-600 transition">
              {t('nav.blog')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              {t('nav.contact')}
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#signin" className="text-gray-700 hover:text-blue-600 transition">
              {t('auth.signIn')}
            </a>
            <a href="#signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              {t('auth.signUp')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

