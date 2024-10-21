export const fetchTonBalance = async (address) => {
    try {
        const response = await fetch('https://testnet.toncenter.com/api/v2/jsonRPC', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getAddressBalance',
                params: { address: address },
            }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.result;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};
