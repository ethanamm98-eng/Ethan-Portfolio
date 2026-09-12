import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CreativeCursor from "./components/ui/CreativeCursor";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Ethan Angelo — Front-End Developer & UI/UX Engineer | Desarrollador Front-End",
  description:
    "Bilingual creative portfolio of Ethan Angelo, a front-end developer, UI/UX engineer, and designer crafting modern digital experiences. Portafolio creativo bilingüe.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||t==='light'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('language');if(l!=='en'&&l!=='es'){l=navigator.language.toLowerCase().indexOf('es')===0?'es':'en';localStorage.setItem('language',l)}document.documentElement.lang=l}catch(e){document.documentElement.lang='en'}})()`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <CreativeCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
