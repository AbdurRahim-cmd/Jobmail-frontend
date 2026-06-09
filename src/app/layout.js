import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Jobmail — Send Personalized Job Emails In Minutes ",
  description:
    "Connect Google, upload your resume, and send personalized outreach emails to companies. Built for job seekers.",
  verification: {
    google: "mfla_NFw9sXmwVOGrsmpI6HiK25zsX2kVe28fg1WN1Y",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
