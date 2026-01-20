// WordPress REST API integration

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2'

export interface WordPressPost {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  link: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WordPressPage {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  slug: string
}

// Fetch posts from WordPress
export async function getWordPressPosts(limit: number = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_embed&per_page=${limit}&status=publish`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch WordPress posts')
    }
    
    return await response.json()
  } catch (error) {
    console.error('WordPress API Error:', error)
    return []
  }
}

// Fetch pages from WordPress
export async function getWordPressPage(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/pages?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch WordPress page')
    }
    
    const pages = await response.json()
    return pages[0] || null
  } catch (error) {
    console.error('WordPress API Error:', error)
    return null
  }
}

// Fetch custom post types (for bookings, invoices, etc.)
export async function getWordPressCustomPosts(
  postType: string,
  limit: number = 10
): Promise<any[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/${postType}?per_page=${limit}&status=publish`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    )
    
    if (!response.ok) {
      throw new Error(`Failed to fetch WordPress ${postType}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('WordPress API Error:', error)
    return []
  }
}

// WordPress authentication for protected endpoints
export async function wordPressAuth(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com'}/wp-json/jwt-auth/v1/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      }
    )
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.token
  } catch (error) {
    console.error('WordPress Auth Error:', error)
    return null
  }
}

