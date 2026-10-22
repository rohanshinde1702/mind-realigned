import { DM_Sans, Merriweather, Quicksand, Lobster_Two } from "next/font/google";
import "@/styles/globals.css";
import { SITE_CONFIG } from "@/constants";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lobsterTwo = Lobster_Two({
  subsets: ["latin"],
  variable: "--font-lobster-two",
  weight: ["700"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  icons: {
    icon: [
      { url: "/images/logos/mLogo.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/images/logos/mLogo.png",
    apple: "/images/logos/mLogo.png",
  },
};

export const viewport = {
  themeColor: SITE_CONFIG.themeColor,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${merriweather.variable} ${quicksand.variable} ${lobsterTwo.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Quicksand:wght@600&family=Merriweather:wght@300;400;700;900&family=Lobster+Two:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
