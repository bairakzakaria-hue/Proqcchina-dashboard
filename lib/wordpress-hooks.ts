// React hooks for WordPress integration

import { useState, useEffect } from 'react'

export function useWordPressPosts(limit: number = 10) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''
        if (!apiUrl) {
          setError('WordPress API URL not configured')
          return
        }

        const response = await fetch(`${apiUrl}/posts?_embed&per_page=${limit}`)
        if (!response.ok) throw new Error('Failed to fetch posts')
        
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  return { posts, loading, error }
}

export function useWordPressBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBookings() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''
        if (!apiUrl) {
          setLoading(false)
          return
        }

        const response = await fetch(`${apiUrl}/inspaction_booking?per_page=100&_fields=id,title,date,booking_data`)
        if (!response.ok) {
          setLoading(false)
          return
        }
        
        const data = await response.json()
        // Transform WordPress data to match our component structure
        const transformed = data.map((post: any) => ({
          id: `#${post.id}`,
          date: post.booking_data?.date || new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.'),
          service: post.booking_data?.service || post.title?.rendered || '',
          status: post.booking_data?.status || 'Draft',
          amount: post.booking_data?.amount || '',
          supplier: post.booking_data?.supplier || '',
        }))
        setBookings(transformed)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  return { bookings, loading }
}

export function useWordPressInvoices() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ''
        if (!apiUrl) {
          setLoading(false)
          return
        }

        const response = await fetch(`${apiUrl}/inspaction_invoice?per_page=100&_fields=id,title,date,invoice_data`)
        if (!response.ok) {
          setLoading(false)
          return
        }
        
        const data = await response.json()
        const transformed = data.map((post: any) => ({
          id: `#${post.id}`,
          date: new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.'),
          dueDate: post.invoice_data?.due_date || '',
          amount: post.invoice_data?.amount || '',
          status: post.invoice_data?.status || 'Unpaid',
          bookingId: `#${post.id}`,
          description: post.title?.rendered || '',
        }))
        setInvoices(transformed)
      } catch (err) {
        console.error('Failed to fetch invoices:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  return { invoices, loading }
}
