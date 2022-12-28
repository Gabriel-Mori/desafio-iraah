import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContext from "../contexts/UserContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { parseCookies } from "nookies";

interface Props extends AppProps {
  defaultTheme: "light" | "dark";
  user: {
    name: string;
    picture?: {
      bytes?: string;
      mimeType?: string;
    };
  };
}
export default function App({
  Component,
  pageProps,
  defaultTheme,
  user,
}: Props) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <UserContext user={user}>
        <Component {...pageProps} />
      </UserContext>
    </ThemeProvider>
  );
}
