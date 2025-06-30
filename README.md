# Privy Telegram Mini App

A Telegram Mini App built with React, TypeScript, and Privy for smart wallet authentication and management.

## Features

- 🔐 **Privy Authentication**: Seamless login with email, wallet, or Telegram
- 💰 **Pimlico Smart Accounts**: Custom account abstraction with Pimlico
- 💰 **Transaction Support**: Sign messages and send transactions
- 📱 **Telegram Integration**: Native Telegram Mini App support
- 🎨 **Modern UI**: Clean and responsive design
- 🔒 **Security**: Secure authentication and data handling

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Authentication**: Privy
- **Smart Accounts**: Pimlico Account Abstraction
- **Styling**: Tailwind CSS
- **Blockchain**: Viem, Permissionless

## Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- Privy App ID (get one at [privy.io](https://privy.io))
- Pimlico API Key (get one at [pimlico.io](https://pimlico.io))
- Telegram Bot Token (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd privy-telegram-mini-app
```

2. Install dependencies:
```bash
yarn install
```

3. Install Pimlico dependencies (required for full functionality):
```bash
yarn add @pimlico/permissionless @pimlico/aa-sdk
```

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
VITE_PRIVY_APP_ID=your-privy-app-id-here
VITE_PIMLICO_API_KEY=your-pimlico-api-key-here
VITE_PIMLICO_BUNDLER_URL=https://api.pimlico.io/v2/polygon/rpc
```

5. Start the development server:
```bash
yarn dev
```

### Configuration

#### Privy Setup

1. Create a Privy account at [privy.io](https://privy.io)
2. Create a new app in the Privy dashboard
3. Configure embedded wallets in the dashboard
4. Add your App ID to the environment variables

#### Pimlico Setup

1. Create a Pimlico account at [pimlico.io](https://pimlico.io)
2. Get your API key from the dashboard
3. Configure your bundler and paymaster URLs
4. Add your API key to the environment variables

#### Telegram Mini App Setup

1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Set up your Mini App in the bot settings
3. Configure the web app URL to point to your deployed app

## Usage

### Authentication

The app supports multiple authentication methods:
- **Email**: Traditional email/password login
- **Wallet**: Connect with MetaMask, Coinbase Wallet, etc.
- **Telegram**: Seamless login with Telegram account

### Pimlico Smart Accounts

Once authenticated, users automatically get a Pimlico smart account that supports:
- Message signing
- Transaction sending
- Gas sponsorship
- Account abstraction features

### Current Implementation Status

✅ **Working Implementation**: The app now uses Privy's embedded wallets with full Pimlico integration. Users can:

- Authenticate through Privy
- Get an embedded wallet automatically
- Send transactions using Pimlico's infrastructure
- Transfer USDC tokens
- Check Pimlico gas prices using `getUserOperationGasPrice()`
- Monitor user operation status using `getUserOperationStatus()`
- Access Pimlico's bundler and paymaster services

🔧 **Pimlico Client Features**: The implementation includes the official Pimlico client with:
- Bundler actions for sending user operations
- Paymaster actions for gas sponsorship
- Custom Pimlico actions like `getUserOperationGasPrice` and `getUserOperationStatus`
- Support for ERC-4337 & ERC-7677 JSON-RPC API methods

⚠️ **Next Steps for Full Account Abstraction**: To enable full ERC-4337 smart account features:

1. The current implementation uses Privy's embedded wallets directly with Pimlico's infrastructure
2. For full account abstraction, you would need to implement smart account creation using permissionless.js
3. The Pimlico client is fully configured and ready for smart account operations

The current setup provides a solid foundation with full Pimlico integration and can be extended to full account abstraction when needed.

### Smart Wallets

Once authenticated, users automatically get a smart wallet that supports:
- Message signing
- Transaction sending
- Batch transactions
- Gas sponsorship

### Development

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run linting
yarn lint

# Type checking
yarn type-check
```

## Project Structure
