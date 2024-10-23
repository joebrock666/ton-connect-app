
# TON Wallet Connection & Transaction Application

This is a mobile-responsive web application for connecting a TonKeeper crypto wallet and processing transactions in the TON TestNet network. The application is built using Next.js and the TonConnect SDK.

## Features

- Connect to a TonKeeper wallet
- Display wallet address and balance
- Process transactions by transferring TON to a recipient's wallet address
- Validation of wallet addresses and transaction amounts
- Mobile-friendly design

## Tech Stack

- **Next.js**: React-based framework for server-side rendering and static site generation.
- **TonConnect SDK**: For connecting and interacting with the TonKeeper wallet.
- **Tailwind CSS**: For responsive and mobile-first design.
- **Ton TestNet API**: For interacting with the blockchain to retrieve balance and process transactions.

## Installation

To run the application locally, follow these steps:

### Prerequisites

- Node.js (>= 14.x)
- NPM or Yarn package manager
- TonKeeper wallet installed

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/joebrock666/ton-wallet-app.git
   cd ton-wallet-app
   ```

2. **Install Dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using Yarn:
   ```bash
   yarn install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Or using Yarn:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
