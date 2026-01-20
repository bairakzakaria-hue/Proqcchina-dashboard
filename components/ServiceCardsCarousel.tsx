'use client'

import { useState } from 'react'
import ServiceCard from './ServiceCard'

interface Service {
  title: string
  icon: React.ReactNode
}

interface ServiceCardsCarouselProps {
  services: Service[]
  onServiceClick: (serviceName: string) => void
}

export default function ServiceCardsCarousel({ services, onServiceClick }: ServiceCardsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsPerView = 4 // Show all 4 services
  const totalSlides = Math.ceil(services.length / cardsPerView)

  // Auto-scroll removed - carousel only moves when user interacts

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative py-4">
      {/* Carousel Container with smooth overflow */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2"
            >
              {services
                .slice(slideIndex * cardsPerView, slideIndex * cardsPerView + cardsPerView)
                .map((service, cardIndex) => (
                  <div
                    key={cardIndex}
                    onClick={() => onServiceClick(service.title)}
                    className="cursor-pointer"
                  >
                    <ServiceCard title={service.title} icon={service.icon} />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-blue-50 hover:scale-110 z-20 border-2 border-gray-200 hover:border-blue-400 group"
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-blue-50 hover:scale-110 z-20 border-2 border-gray-200 hover:border-blue-400 group"
            aria-label="Next slide"
          >
            <svg className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Enhanced Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-10 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-300 w-3 hover:bg-gray-400 hover:w-5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
