import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";

function GotPop({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default GotPop;
