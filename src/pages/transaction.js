import {useEffect, useState} from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import { useRouter } from 'next/router';
import { fetchTonBalance } from '@/utils/utils';

export default function Transactions() {
    const address = useTonAddress();
    const router = useRouter();

    const [tonAmount, setTonAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (address) {
            fetchTonBalance(address)
                .then((balance) => setBalance(balance))
                .catch((error) => console.error('Error fetching balance:', error));
        }
    }, [address]);

    const handleBack = () => {
        router.push('/');
    };

    const handleTransaction = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!tonAmount || isNaN(tonAmount) || parseFloat(tonAmount) <= 0) {
            setErrorMessage('Please enter a valid amount of TON greater than 0.');
            return;
        }

        const tonWalletAddressRegex = /^[a-zA-Z0-9_-]{48}$/;
        if (!tonWalletAddressRegex.test(recipient)) {
            setErrorMessage('Please enter a valid TON wallet address.');
            return;
        }

        try {
            setSuccessMessage('Transaction processed successfully!');
        } catch (error) {
            setErrorMessage(`Error processing transaction: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">

            <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
                <button onClick={handleBack} className="text-sm underline">Back</button>
                <h1 className="text-lg font-bold">Transactions</h1>
                {balance ? (
                    <p className="text-sm">Balance: {balance} TON</p>
                ) : (
                    <p className="text-sm">Balance: --</p>
                )}
            </header>

            <main className="flex flex-col items-center justify-center text-center mt-28">
                {address ? (
                    <>
                        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xs">
                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Enter amount (TON)"
                                    value={tonAmount}
                                    onChange={(e) => setTonAmount(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Recipient wallet address"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                onClick={handleTransaction}
                                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Process Transaction
                            </button>

                            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-gray-600">Please connect your wallet to proceed.</p>
                )}
            </main>
        </div>
    );
}