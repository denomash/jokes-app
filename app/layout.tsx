"use client";

import { ThemeProvider } from "next-themes";

import Nav from "@components/Nav";
import ReactQueryProvider from "@context/ReactQueryProvider";
import { ToastProvider } from "@context/ToastProvider";
import { AuthProvider } from "@context/AuthProvider";

import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

/**
 * Props
 */
type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * The root layout
 * @param children Children
 * @returns Node to render
 */
const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <ThemeProvider attribute="class">
          <AuthProvider>
            <ReactQueryProvider>
              <ToastProvider>
                <Nav />
                {children}
              </ToastProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;
