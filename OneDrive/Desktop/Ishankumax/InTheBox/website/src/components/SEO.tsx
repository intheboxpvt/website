import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords = "custom packaging, packaging boxes, sustainable packaging, branding, printing", 
  image = "/assets/logo.png", 
  url = "https://inthebox.co.in" 
}: SEOProps) => {
  const siteUrl = "https://inthebox.co.in";
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InTheBox",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/logo.png`,
    "description": "Premium custom packaging solutions for brands that want to stand out.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mohali",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-70877-78689",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.instagram.com/inthebox.co.in/",
      "https://www.linkedin.com/company/intheboxpvt/"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;
