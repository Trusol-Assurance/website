import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";

/**
 * Self-hosted at build time and served from our own origin, which removes both
 * third-party round trips (fonts.googleapis.com -> fonts.gstatic.com) from the
 * critical path. Inter and Space Grotesk are pulled as variable fonts — one
 * file each instead of one per weight. Space Mono has no variable cut, so its
 * two used weights are requested explicitly.
 */
export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-body",
});

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-display",
});

export const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-mono",
});

export const fontClass = `${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`;