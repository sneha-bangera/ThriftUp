import { Geist, Geist_Mono, Notable, Homemade_Apple, Ms_Madi } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const msMadi = Ms_Madi({
  subsets: ['latin'],
  weight: '400', 
  variable: '--font-ms-madi', 
});

const notable = Notable({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-notable',
});
const homemadeApple = Homemade_Apple({
  subsets: ['latin'],
  weight: '400', // Only one weight available for Homemade Apple
  variable: '--font-homemade-apple', // Optional: add as CSS variable
});

export const metadata = {
  title: "THRIFT UP",
  description: "Your Sustainable Fashion Marketplace",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body
        className={`${msMadi.variable} ${geistSans.variable} ${notable.variable} ${homemadeApple.variable} antialiased`}
      >
        <AuthProvider>
          <div>
          <Navbar/>
          {children}
          <Chatbot/>
          <Footer/>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
