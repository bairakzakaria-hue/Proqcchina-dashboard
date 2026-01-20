'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
  { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
  { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
]

export default function LanguageSelector({ variant = 'dropdown' }: { variant?: 'dropdown' | 'buttons' }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode: 'en' | 'ar' | 'fr' | 'ru') => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  if (variant === 'buttons') {
    return (
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              language === lang.code
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={lang.name}
          >
            <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors rtl:space-x-reverse"
      >
        <span>{languages.find(l => l.code === language)?.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {languages.find(l => l.code === language)?.name}
        </span>
        <svg 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 rtl:right-auto rtl:left-0 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg rtl:text-right rtl:space-x-reverse ${
                language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && (
                <svg className="h-4 w-4 ml-auto text-blue-600 rtl:ml-0 rtl:mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}






