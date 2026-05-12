import "./globals.css";

export const metadata = {
  title: "Salon SaaS",
  description: "Salon appointment and business management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}