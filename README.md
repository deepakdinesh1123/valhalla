<div align="center">

#  Valhalla

A next-generation code execution platform powered by Odin

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square)](https://nextjs.org)
[![Powered by Vercel AI SDK](https://img.shields.io/badge/Powered%20by-Vercel%20AI%20SDK-black?style=flat-square)](https://sdk.vercel.ai/)
[![Nix Enabled](https://img.shields.io/badge/Nix-Enabled-blue?style=flat-square)](https://nixos.org)

</div>

## ✨ Features

- 🤖 **AI-Powered Code Generation** - Intelligent code generation using Vercel's AI SDK
- ⚡ **Real-Time Execution** - Instant code execution powered by Odin engine
- 🔒 **Reproducible Environments** - Automatic `flake.nix` generation for perfect reproducibility
- 🎯 **Modern Interface** - Clean, responsive UI built with Next.js

## 🚀 Quick Start

### Prerequisites

- [Nix Package Manager](https://nixos.org/download.html) (recommended)
- [pnpm](https://pnpm.io/installation)
- Access to Odin execution engine (contact us for API key)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/valhalla.git
cd valhalla
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Add your keys to `.env`:
```env
ODIN_API_KEY=your_api_key_here
# Add other required keys from .env.example
```

### Development

#### Using Nix (Recommended)
```bash
nix develop
pnpm install
pnpm dev
```

#### Without Nix
```bash
pnpm install
pnpm dev
```

Your development server will be running at [http://localhost:3000](http://localhost:3000) 🎉

## 🏗️ Architecture

```mermaid
graph LR
    A[Valhalla UI] --> B[Vercel AI SDK]
    B --> C[Code Generation]
    C --> D[Odin Engine]
    D --> E[Output]
    D --> F[flake.nix]
```

## 🔧 Reproducible Environments

Every code execution automatically generates a `flake.nix` file, enabling perfect reproducibility of your development environment. To use a generated flake:

```bash
nix develop flake.nix
```

## 🤝 Getting Help

Need the Odin execution engine API key? Contact us:
- 💬 Discord: [Join our community](https://discord.gg/example)

## 📜 License

MIT License - see [LICENSE](LICENSE) for details

---

<div align="center">
  
Built with ❤️ by the Valhalla Team

[Documentation](docs) • [Contributing](CONTRIBUTING.md) • [Report Bug](issues)

</div>