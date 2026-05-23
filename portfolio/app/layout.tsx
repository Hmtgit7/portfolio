import type { Metadata } from "next";
import "./globals.css";
import "./components/styles/App.scss";

export const metadata: Metadata = {
  title: "Hemant Gehlod - Full Stack Developer",
  description: "Portfolio of Hemant Gehlod, Full Stack Developer specializing in Web Development, Java, and Cloud Solutions",
  icons: {
    icon: "/assets/logo.svg",
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
