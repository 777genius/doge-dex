// Runtime configuration for Doge DEX
// This file allows changing configuration without rebuilding the application
// Environment variables set here take precedence over build-time variables

window.__RUNTIME_CONFIG__ = {
  // Broker configuration
  VITE_ORDERLY_BROKER_ID: "doge-dex-2804",
  VITE_ORDERLY_BROKER_NAME: "Doge DEX",
  VITE_ORDERLY_NETWORK_ID: "mainnet",

  // App metadata
  VITE_APP_NAME: "Doge DEX",
  VITE_APP_DESCRIPTION: "Decentralized exchange powered by Orderly Network",

  // Base URL for GitHub Pages (repository name)
  VITE_BASE_URL: "/doge-dex/",

  // Logo configuration
  // Set to "true" after adding logo.webp to /public folder
  VITE_HAS_PRIMARY_LOGO: "false",
  VITE_HAS_SECONDARY_LOGO: "false",

  // Menu configuration
  VITE_ENABLED_MENUS: "Trading,Portfolio,Markets,Swap,Leaderboard",

  // Social links (customize these for Doge DEX)
  // VITE_TELEGRAM_URL: "https://t.me/your_telegram",
  // VITE_DISCORD_URL: "https://discord.gg/your_discord",
  // VITE_TWITTER_URL: "https://twitter.com/your_twitter",

  // Custom external menu items (optional)
  // Format: "Name1,URL1;Name2,URL2;Name3,URL3"
  // VITE_CUSTOM_MENUS: "Documentation,https://docs.dogedex.com;Blog,https://blog.dogedex.com",

  // Campaigns (optional)
  // VITE_ENABLE_CAMPAIGNS: "false",
};
