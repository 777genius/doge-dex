# Doge DEX

A decentralized exchange powered by Orderly Network, featuring perpetual trading, spot markets, and advanced trading features.

🔗 [Live Demo](https://777genius.github.io/doge-dex/)

## Quick Start

1. **Clone the Repository**

```sh
git clone https://github.com/777genius/doge-dex.git
cd doge-dex
```

2. **Install Dependencies**

```sh
yarn install
```

3. **Run Development Server**

```sh
yarn dev
```

## Configuration

### Runtime Configuration

The project uses `public/config.js` for runtime configuration, which allows changing settings without rebuilding:

```javascript
window.__RUNTIME_CONFIG__ = {
  VITE_ORDERLY_BROKER_ID: "doge-dex-2804",
  VITE_ORDERLY_BROKER_NAME: "Doge DEX",
  VITE_ORDERLY_NETWORK_ID: "mainnet",
  VITE_APP_NAME: "Doge DEX",
  VITE_APP_DESCRIPTION: "Decentralized exchange powered by Orderly Network",
  VITE_ENABLED_MENUS: "Trading,Portfolio,Markets,Swap,Leaderboard",
  // Add social links, custom menus, etc.
};
```

### Build-time Configuration

For local development, edit `.env`:

```env
VITE_ORDERLY_BROKER_ID=doge-dex-2804
VITE_ORDERLY_BROKER_NAME=Doge DEX
VITE_APP_NAME=Doge DEX
VITE_APP_DESCRIPTION=Decentralized exchange powered by Orderly Network
VITE_ORDERLY_NETWORK_ID=mainnet
VITE_ENABLED_MENUS=Trading,Portfolio,Markets,Swap,Leaderboard
```

### Customization

#### Adding Custom Logo

To add your custom Doge DEX logo:

1. Add your logo file to `public/`:
   - Primary logo: `public/logo.webp` (recommended size: 200x80px)
   - Secondary logo: `public/logo-secondary.webp` (optional)
   - Favicon: `public/favicon.webp`

2. Update `public/config.js`:
   ```javascript
   VITE_HAS_PRIMARY_LOGO: "true",
   VITE_HAS_SECONDARY_LOGO: "true", // if you have secondary logo
   ```

#### Theme Customization

1. Visit the [Orderly Storybook Trading Page](https://storybook.orderly.network/?path=/story/package-trading-tradingpage--page)
2. Customize your preferred theme using the controls
3. Export the generated CSS
4. Replace the contents of `app/styles/theme.css` with your exported CSS

## Development

Run the development server:

```sh
yarn dev
```

## Deployment

### GitHub Pages

This project is configured to automatically deploy to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Deploy**:
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy
   - Site will be available at: https://777genius.github.io/doge-dex/

3. **Manual Deployment**:
   ```sh
   yarn build
   # Files will be in ./dist directory
   ```

### Configuration for GitHub Pages

The project is pre-configured for GitHub Pages:
- Base path: `/doge-dex/` (in `vite.config.ts`)
- Build output: `dist` directory
- Runtime config: `public/config.js`
- GitHub Actions workflow: `.github/workflows/deploy.yml`

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Trading SDK**: Orderly Network SDK v2.8.1
- **Styling**: TailwindCSS
- **Blockchain**: Multi-chain support (EVM + Solana)
- **Features**: Perpetual trading, Spot markets, Portfolio management, Leaderboard, Swap

## Additional Resources

- [Orderly Network Documentation](https://orderly.network/docs/sdks)
- [Orderly JS SDK](https://github.com/OrderlyNetwork/js-sdk)
- [Storybook Theme Editor](https://storybook.orderly.network/?path=/story/package-trading-tradingpage--page)

## License

MIT License - see [LICENSE](LICENSE) file for details

