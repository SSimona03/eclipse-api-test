import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "LG Website",
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>LG Website</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body className={inter.className}>
        <Navbar />
        <div className="my-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
