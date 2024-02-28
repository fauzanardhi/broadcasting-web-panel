import { Inter } from "next/font/google";
import "./globals.css";
import AllProviders from "@/components/Providers/AllProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Broadcasting Texar",
  description: "Ekskul Broadcasting SMK Texar Klari Karawang Web Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AllProviders>
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
