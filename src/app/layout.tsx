import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { getSiteAssetUrl } from "@/lib/supabase";
import BackgroundImage from "@/components/BackgroundImage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LORE BJJ - Outdoor Nomadic Brazilian Jiu-Jitsu Training",
  description: "Join our free outdoor nomadic BJJ team training in nature. We train at Erdal İnönü Park (Mon/Thu) and Konyaaltı Beach (Sat). Ancient techniques meet modern outdoor training.",
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
        
        {/* Preload critical images for faster loading */}
        <link rel="preload" href={getSiteAssetUrl('logo.png')} as="image" type="image/png" />
        <link rel="preload" href={getSiteAssetUrl('background.jpg')} as="image" type="image/jpeg" />
        
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
