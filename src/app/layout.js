import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Barland Motorsport",
  description: "IMI Indonesia",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer theme="dark" />

        <AuthProvider session={session}>
          <Navbar />
          <main className="pt-20 ">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
