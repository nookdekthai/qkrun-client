import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://primeschool.online/',
      lastModified: new Date(),
    },
    {
      url: 'https://primeschool.online/courses',
      lastModified: new Date(),
    },
    {
      url: 'https://primeschool.online/about',
      lastModified: new Date(),
    },
    {
      url: 'https://primeschool.online/ebook',
      lastModified: new Date(),
    },
  ]
}