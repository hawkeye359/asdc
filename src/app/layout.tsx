import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "css-reset-and-normalize";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Script from "next/script";
import Footer from "./Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata: Metadata = {
  title: "asdc",
  description: "advance skill development centre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppRouterCacheProvider>
          <Footer>{children}</Footer>
        </AppRouterCacheProvider>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </html>
  );
}
