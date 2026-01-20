'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface ServiceCardProps {
  title: string
  icon: React.ReactNode
}

export default function ServiceCard({ title, icon }: ServiceCardProps) {
  const { t } = useLanguage()
  
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-5 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg group h-full flex flex-col min-h-[160px] overflow-hidden border border-blue-500/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-white/0 transition-all duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-between">
        {/* Icon container - smaller and more elegant */}
        <div className="w-14 h-14 bg-blue-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-md border border-white/20">
          <div className="transform group-hover:scale-105 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Title - smaller text */}
        <h3 className="text-sm font-semibold leading-tight mb-3 group-hover:translate-y-[-1px] transition-transform duration-300 px-2">
          {title}
        </h3>
        
        {/* Book Now button - compact and elegant */}
        <div className="mt-auto w-full pt-2">
          <button className="w-full text-white text-xs font-medium flex items-center justify-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 bg-white/20 backdrop-blur-sm py-2 px-3 rounded-lg hover:bg-white/30 border border-white/20">
            <span>{t('booking.bookNow')}</span>
            <svg className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      </div>
    </div>
  )
}
