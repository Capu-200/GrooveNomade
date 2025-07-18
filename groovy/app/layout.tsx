import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrooveNomad - Assistant IA pour Festivals de Musique",
  description: "Découvrez les meilleurs festivals du monde avec notre assistant IA intelligent. Devis personnalisés, hébergement, transport et suggestions d'activités.",
  keywords: "festivals, musique, voyage, IA, assistant, devis, hébergement, transport",
  authors: [{ name: "GrooveNomad" }],
  openGraph: {
    title: "GrooveNomad - Assistant IA pour Festivals",
    description: "Votre compagnon de voyage pour des expériences festival inoubliables",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
