import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>MineBot</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Minebot is the leading Minecraft verification service." />
      <link rel="icon" href="/Black Logo.png" />

      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-GLNMX6P0WD" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GLNMX6P0WD', {
page_path: window.location.pathname,
});
          `,
        }}
      />
    </>
  )
}
