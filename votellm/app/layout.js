export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>US Battleground State Voter Quiz</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
