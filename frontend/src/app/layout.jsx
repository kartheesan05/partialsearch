import "./globals.css";

export const metadata = {
  title: "User Database",
  description: "User Database for Forese Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
