# ModernStore - Next.js E-commerce Application

A modern e-commerce application built with Next.js, featuring product listings, pagination, and a beautiful UI with shadcn/ui components.

## 📁 ModernStore

```
ModernShop/
├── .next/                    # Next.js build output (auto-generated)
├── public/                   # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                  # Next.js 13+ App Router
│   │   └── page.tsx         # Main homepage with product listings
│   ├── components/          # Reusable UI components
│   │   └── ui/              # shadcn/ui components
│   │       └── command.tsx  # Command palette component
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions and configurations
├── .gitignore              # Git ignore rules
├── components.json         # shadcn/ui configuration
├── eslint.config.mjs       # ESLint configuration
├── next-env.d.ts          # Next.js TypeScript definitions
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── serve.js               # Express server for production
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ModernShop
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   npm install --legacy-peer-deps && npm run dev
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

| Command                        | Description                             |
| ------------------------------ | --------------------------------------- |
| `set PORT=8000 && npm run dev` | Start development server with Turbopack |
| `npm run dev`                  | Start development server with Turbopack |
| `npm run build`                | Build the application for production    |
| `npm start`                    | Start production server                 |
| `npm run lint`                 | Run ESLint for code linting             |

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Default port (3000)
npm run dev

# Custom port (8000)
set PORT=8000 && npm run dev
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Using Express Server

```bash
# Run with custom Express server
node serve.js
```

## 🧰 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Form Handling**: React Hook Form
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Turbopack (development)

## 📦 Key Dependencies

- `@radix-ui/*` - Accessible UI components
- `@hookform/resolvers` - Form validation
- `cmdk` - Command palette functionality
- `framer-motion` - Animations
- `lucide-react` - Icon library

## 🌟 Features

- Modern e-commerce product listing
- Responsive design with Tailwind CSS
- Product pagination (12 products per page)
- Command palette interface
- Smooth animations with Framer Motion
- Type-safe development with TypeScript

## 🔧 Development

The application uses Next.js 13+ App Router architecture. Main features:

- **Homepage** ([src/app/page.tsx](src/app/page.tsx)): Product listing with pagination
- **UI Components** ([src/components/ui/](src/components/ui/)): Reusable shadcn/ui components
- **Command Interface** ([src/components/ui/command.tsx](src/components/ui/command.tsx)): Search and command functionality

## 📄 License

This project is private and not licensed for public use.

```
https://modern-store-next-js-z2ry.vercel.app/
```
