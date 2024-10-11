import { AppProps } from 'next/app';
import { Toaster } from "src/components/ui/toaster"; 
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
        <Toaster /> 
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;