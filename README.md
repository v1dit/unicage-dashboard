# Unicage Payments Dashboard

A modern, responsive payments dashboard built with React, Vite, and Tailwind CSS for managing crypto/blockchain transactions.

## Features

- **Dashboard**: Overview of wallet balance, recent transactions, and quick actions
- **Wallet Management**: Connect wallet, view address, manage security settings
- **Transaction History**: View, filter, and export transaction data
- **Send Tokens**: Send cryptocurrency with real-time status tracking
- **Admin Panel**: Monitor suspicious transactions and system metrics
- **Settings**: Manage profile, security, and application preferences

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for components
- Zustand for state management
- React Router for navigation
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Set your API base URL in `.env`:
   \`\`\`
   VITE_API_BASE=https://your-render-backend-url.com
   \`\`\`

5. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Environment Variables

Create a `.env` file with:

\`\`\`
VITE_API_BASE=https://your-backend-url.com
\`\`\`

## API Integration

The app expects these endpoints from your backend:

- `GET /health` - Health check
- `GET /wallet/demo` - Get demo wallet info
- `GET /wallet/balance` - Get wallet balance
- `POST /pay/initiate` - Initiate payment
- `GET /pay/status` - Check payment status
- `GET /wallet/history` - Get transaction history

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable `VITE_API_BASE` in Vercel dashboard
4. Deploy

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
├── routes/             # Page components
├── lib/                # Utilities and API client
├── store/              # Zustand state management
└── main.tsx           # App entry point
\`\`\`

## License

MIT License
