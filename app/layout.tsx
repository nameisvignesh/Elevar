import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Navigation } from './components/Navigation';
import { Cursor } from './components/Cursor';
import { ChatbotButton } from './components/ChatbotButton';

export const metadata: Metadata = {
  title: 'Elevar - Personal Brand Growth',
  description: 'Strategic content engines for personal brand elevation',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
    { media: '(prefers-color-scheme: light)', color: '#f6f4f1' }
  ],
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="site-shell">
            <Navigation />
            {children}
            <footer className="footer">
              <div className="container footer-grid">
                <div>
                  <h4>Elevar</h4>
                  <p>Building content systems for founders who want strategy, speed, and premium execution.</p>
                  <p>© 2026 Elevar. All rights reserved.</p>
                </div>
                <div>
                  <h4>Company</h4>
                  <a href="/#portfolio">Portfolio</a>
                  <a href="/#services">Services</a>
                  <a href="/#process">Process</a>
                </div>
                <div>
                  <h4>Resources</h4>
                  <a href="/selected-work">Selected Work</a>
                  <a href="/book-call">Book a Call</a>
                  <a href="/manifest.webmanifest">Install App</a>
                </div>
                <div>
                  <h4>Contact</h4>
                  <p>elevardigitalstudio@gmail.com</p>
                  <p>+91 9790897877</p>
                </div>
              </div>
            </footer>
            <Cursor />
            <ChatbotButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
