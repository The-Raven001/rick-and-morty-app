import { AppProps } from 'next/app';
import { Toaster } from "src/components/ui/toaster"; // Adjust the import path
import "../styles/globals.css"; // Tailwind or global CSS
import Sidebar from "src/components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
        <Toaster /> 
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;