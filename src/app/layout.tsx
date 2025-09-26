import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { getSiteAssetUrl } from "@/lib/supabase";
import BackgroundImage from "@/components/BackgroundImage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antalya BJJ Training | LORE BJJ - Outdoor Brazilian Jiu-Jitsu in Antalya",
  description: "Join Antalya's premier outdoor BJJ training at Erdal İnönü Park and Konyaaltı Beach. Free Brazilian Jiu-Jitsu classes in Antalya, Turkey. Professional BJJ training in nature.",
  keywords: "Antalya BJJ, Brazilian Jiu-Jitsu Antalya, BJJ training Antalya, outdoor BJJ Antalya, Erdal İnönü Park BJJ, Konyaaltı Beach BJJ, martial arts Antalya, BJJ classes Antalya",
  openGraph: {
    title: "Antalya BJJ Training | LORE BJJ - Outdoor Brazilian Jiu-Jitsu",
    description: "Join Antalya's premier outdoor BJJ training at Erdal İnönü Park and Konyaaltı Beach. Free Brazilian Jiu-Jitsu classes in Antalya, Turkey.",
    url: "https://loremartialarts.com",
    siteName: "LORE BJJ Antalya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antalya BJJ Training | LORE BJJ",
    description: "Join Antalya's premier outdoor BJJ training at Erdal İnönü Park and Konyaaltı Beach.",
  },
  alternates: {
    canonical: "https://loremartialarts.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Structured Data for Local Business SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "name": "LORE BJJ - Antalya Brazilian Jiu-Jitsu Training",
              "description": "Outdoor Brazilian Jiu-Jitsu training in Antalya, Turkey. Free BJJ classes at Erdal İnönü Park and Konyaaltı Beach.",
              "url": "https://loremartialarts.com",
              "telephone": "+90-XXX-XXX-XXXX",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Antalya",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "36.8969",
                "longitude": "30.7133"
              },
              "sport": "Brazilian Jiu-Jitsu",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY",
                "description": "Free outdoor BJJ training"
              },
              "openingHours": [
                "Mo 18:00-20:00",
                "Th 18:00-20:00", 
                "Sa 10:00-12:00"
              ],
              "location": [
                {
                  "@type": "Place",
                  "name": "Erdal İnönü Park",
                  "address": "Erdal İnönü Park, Antalya, Turkey"
                },
                {
                  "@type": "Place", 
                  "name": "Konyaaltı Beach",
                  "address": "Konyaaltı Beach, Antalya, Turkey"
                }
              ]
            })
          }}
        />
        
        {/* Preload critical images for faster loading */}
        <link rel="preload" href={getSiteAssetUrl('logo.png')} as="image" type="image/png" fetchPriority="high" />
        <link rel="preload" href={getSiteAssetUrl('background.jpg')} as="image" type="image/jpeg" fetchPriority="high" />
        
        {/* DNS prefetch for Supabase CDN */}
        <link rel="dns-prefetch" href="https://fmkglpsfszlkubobcmhg.supabase.co" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif+JP:wght@400;600;700&display=swap" rel="stylesheet" />
        
        {/* Chakra Petch Font - Authentic Blocky, Distressed Style */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh' }}>
        <BackgroundImage />
        <AuthProvider>
          <div id="__next" style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh' }}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
