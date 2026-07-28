import type { Metadata, Viewport } from "next";
import { ThemeProvider, themeBootScript } from "@/lib/theme";
import { site } from "@/data/site";
import { fontClass } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: {
    icon: "/logo/trusol_logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
    { media: "(prefers-color-scheme: light)", color: "#F6F4F1" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={fontClass} suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint to prevent a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}