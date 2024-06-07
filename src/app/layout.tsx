import { Provider } from "./AppProvider"

export const metadata = {
  title: '脱法放送不適切用語エミュレータ',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}

export const fetchCache = 'default-no-store'
export const dynamic = 'force-dynamic'
