import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <TonConnectUIProvider manifestUrl="https://joebrock666.github.io/ton-connect-app/tonconnect-manifest.json">
            <Component {...pageProps} />
        </TonConnectUIProvider>
    );
}

export default MyApp;