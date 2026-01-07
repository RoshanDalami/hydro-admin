import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./ckeditor.css";
import ClientProvider from "./ClientProvider";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hydro Admin",
    description: "Admin dashboard for Hydro Foundation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    forcedTheme="light"
                    disableTransitionOnChange
                >
                    <ClientProvider>{children}</ClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
