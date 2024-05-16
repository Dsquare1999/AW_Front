import type { Metadata } from "next";
import { Poppins, Paytone_One } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});
const paytoneOne = Paytone_One({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoWay",
  description: "Welcome to your future ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          // disableTransitionOnChange
        >
          <Provider>
            <ToastContainer />
            <div>{children}</div>
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
