import type { Metadata } from "next";
import { Questrial, Raleway } from "next/font/google";
import { AosInit } from "@/client/_components/aos-init";
import { TranslationProvider } from "@/context/TranslationContext";
import "./globals.css";

const questrial = Questrial({
  weight: ["400"],
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fotógrafa Brasileira em Londres",
  description: "Quer transformar seus momentos em registros inesquecíveis? Seja para sua viagem, sua marca ou um retrato especial, estou aqui para capturar sua essência em cada clique.",
  openGraph: {
    title: "Fotógrafa Brasileira em Londres",
    description: "Quer transformar seus momentos em registros inesquecíveis? Seja para sua viagem, sua marca ou um retrato especial, estou aqui para capturar sua essência em cada clique.",
    type: "website",
    locale: "en_GB",
    url: "https://fotografa-brasileira-em-londres.vercel.app/",
    siteName: "Fotógrafa Brasileira em Londres",
    images: [{ url: "/images/about-image-large.webp" }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${questrial.className} ${raleway.className} antialiased`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <AosInit/>
      </body>
    </html>
  );
}
