'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What does ProQCChina do?',
      answer: 'ProQCChina delivers supplier verification, factory audits, and quality inspections so your China shipments meet spec and arrive on time.',
    },
    {
      question: 'Do you handle everything when importing from China?',
      answer: 'Yes, we cover origin-side steps: vetting suppliers, drafting protective terms, monitoring production, and inspecting goods before departure. Destination customs and last-mile steps stay with your local partners.',
    },
    {
      question: 'How do you help avoid risks when purchasing from China?',
      answer: 'We run factory audits, check certifications, enforce QC milestones in contracts, and perform on-site inspections (DPI/PSI/CLS) to catch issues before shipment.',
    },
    {
      question: 'What is an inspection plan?',
      answer: 'It is a tailored roadmap that defines checkpoints, sampling levels, and documentation needed at each production stage to ensure consistent quality and compliance.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

