import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

const DEFAULT_TITLE = 'Theorem Academy | Institutional Financial Trading Academy'
const DEFAULT_DESC =
  'Premier institutional financial trading academy. Master Forex, Crypto, Equities, Indices, and Commodities with physical trading floors in Dubai and Mumbai, plus live online cohorts. Prepare for prop firm funded trading.'
const DEFAULT_KEYWORDS =
  'institutional trading academy, forex trading course dubai, trading courses mumbai, smart money concepts, prop firm challenge training, crypto trading course, stock market academy, order flow trading, theorem academy'
const SITE_URL = 'https://theoreminstitute.com'
const DEFAULT_IMAGE = `${SITE_URL}/theorem-logo.png`

function setMetaTag(selector, attribute, value) {
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    const [attrName, attrValue] = selector.replace(/[\[\]"]/g, '').split('=')
    element.setAttribute(attrName, attrValue)
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

function setCanonical(url) {
  let element = document.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', url)
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  jsonLd,
}) {
  const { pathname } = useLocation()
  const pageTitle = title ? `${title} | ${site.name}` : DEFAULT_TITLE
  const pageDesc = description || DEFAULT_DESC
  const pageKeywords = keywords || DEFAULT_KEYWORDS
  const pageImage = image || DEFAULT_IMAGE
  const pageUrl = `${SITE_URL}${pathname}`

  useEffect(() => {
    // 1. Primary Tags
    document.title = pageTitle
    setMetaTag('meta[name="description"]', 'content', pageDesc)
    setMetaTag('meta[name="keywords"]', 'content', pageKeywords)
    setCanonical(pageUrl)

    // 2. OpenGraph Meta
    setMetaTag('meta[property="og:title"]', 'content', pageTitle)
    setMetaTag('meta[property="og:description"]', 'content', pageDesc)
    setMetaTag('meta[property="og:url"]', 'content', pageUrl)
    setMetaTag('meta[property="og:image"]', 'content', pageImage)
    setMetaTag('meta[property="og:type"]', 'content', type)
    setMetaTag('meta[property="og:site_name"]', 'content', site.name)

    // 3. Twitter Cards
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMetaTag('meta[name="twitter:title"]', 'content', pageTitle)
    setMetaTag('meta[name="twitter:description"]', 'content', pageDesc)
    setMetaTag('meta[name="twitter:image"]', 'content', pageImage)

    // 4. Optional Custom JSON-LD
    let scriptTag = null
    if (jsonLd) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      scriptTag.setAttribute('data-dynamic-seo', 'true')
      scriptTag.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(scriptTag)
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag)
      }
    }
  }, [pageTitle, pageDesc, pageKeywords, pageImage, pageUrl, type, jsonLd])

  return null
}

