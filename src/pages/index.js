import React, { useState, useEffect } from 'react';
import { TonConnectButton, useTonAddress, TonConnect } from '@tonconnect/ui-react';
import { storage } from '@/storage';
import { fetchTonBalance } from '@/utils/utils';
import { useRouter } from 'next/router';

const Wallet = () => {
    const [balance] = useState(0);
    const tonAddress = useTonAddress();
    const [tonConnect, setTonConnect] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const instance = new TonConnect({
            manifestUrl: 'https://joebrock666.github.io/ton-connect-app/tonconnect-manifest.json',
            storage: storage
        });
        setTonConnect(instance);
    }, []);

    useEffect(() => {
        if (tonAddress) {
            fetchTonBalance(tonAddress).then(r => console.log(r));
        }
    }, [tonAddress]);

    const handleConnect = async () => {
        if (!tonConnect) return;
        try {
            await tonConnect.connectWallet();
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const handleGoToTransaction = () => {
        router.push('/transaction');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">

            <header
                className="w-full bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
                <h1 className="text-lg font-bold">TON Wallet</h1>
                <div className="flex flex-col items-center">
                    <TonConnectButton onClick={handleConnect} />
                    {balance && (
                        <p className="text-sm mt-2">Balance: {balance} TON</p>
                    )}
                </div>
            </header>

            <main className="flex flex-col items-center justify-center text-center mt-28">
                {tonAddress ? (
                    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xs">
                        <p className="text-sm font-semibold">Wallet Address:</p>
                        <p className="text-xs mt-1 break-all">{tonAddress}</p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600">Please connect your wallet to see the address.</p>
                )}
                {tonAddress && (
                <div className="mt-6">
                    <button
                        onClick={handleGoToTransaction}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go to Transactions
                    </button>
                </div>
                )}

            </main>
        </div>
    );
};

export default Wallet;