import { unsplashConfig } from '@/config/site-config'

interface UnsplashImage {
  id: string
  url: string
  thumbUrl: string
  author: {
    name: string
    link: string
  }
  description?: string
}

// Busca imagens no Unsplash
export async function searchUnsplashImages(
  query: string,
  count: number = 10
): Promise<UnsplashImage[]> {
  const accessKey = unsplashConfig.accessKey
  
  if (!accessKey) {
    console.warn('Unsplash access key not configured')
    return []
  }
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch Unsplash images')
    }
    
    const data = await response.json()
    
    return data.results.map((image: any) => ({
      id: image.id,
      url: image.urls.regular,
      thumbUrl: image.urls.small,
      author: {
        name: image.user.name,
        link: image.user.links.html,
      },
      description: image.description || image.alt_description,
    }))
  } catch (error) {
    console.error('Error fetching Unsplash images:', error)
    return []
  }
}

// Busca imagem aleatória
export async function getRandomUnsplashImage(query: string): Promise<UnsplashImage | null> {
  const images = await searchUnsplashImages(query, 1)
  return images[0] || null
}

// Gera URL de imagem do Unsplash com parâmetros
export function getUnsplashImageUrl(
  photoId: string,
  width?: number,
  height?: number
): string {
  let url = `https://images.unsplash.com/photo-${photoId}`
  
  const params = new URLSearchParams()
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('q', '80')
  params.append('fit', 'crop')
  
  if (params.toString()) {
    url += `?${params.toString()}`
  }
  
  return url
}

// URLs de fallback por tipo de serviço
export const fallbackImages: Record<string, string> = {
  barbearia: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
  'salao-cabelo': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
  'salao-unhas': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
  dentista: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
  'clinica-estetica': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
}

// Obtém imagem de fallback
export function getFallbackImage(serviceType: string): string {
  return fallbackImages[serviceType] || fallbackImages.default
}
