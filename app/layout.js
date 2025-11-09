import "./globals.css";
import { Inter } from "next/font/google";
import { Noto_Sans_Tamil } from "next/font/google";
import { Noto_Sans_Devanagari } from "next/font/google";
import { LanguageProvider } from './context/LanguageContext';

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["300", "400", "500", "600", "700"],
});

const hindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Agricast - Agriculture Intelligence",
  description: "Your companion for smart farming decisions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-green-50 to-amber-50`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}