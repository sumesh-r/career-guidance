import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "career guidance",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[url('../../public/bg.jpg')] bg-no-repeat  bg-cover bg-start bg-fixed `}
      >
        {children}
      </body>
    </html>
  );
}
