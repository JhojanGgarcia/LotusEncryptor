import { Poppins } from "next/font/google";
import "./styles/globals.css";


const Font = Poppins({ subsets: ["latin"],
  weight : ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
 });

export const metadata = {
  viewport: "width=device-width, initial-scale=1.0",
  title: "Lotus",
  description: "Encrypt and manage your passwords in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}  className={`${Font.className} bg-black  overflow-x-hidden`}>{children}</body>
    </html>
  );
}
                                    