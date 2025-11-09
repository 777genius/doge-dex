# Кастомизация официального проекта Orderly Network

Это руководство объясняет, как взять официальный шаблон от Orderly Network и кастомизировать его под свой DEX.

## 📦 Официальные репозитории Orderly Network

Orderly Network предоставляет несколько готовых шаблонов:

### Основные репозитории:

1. **Vite Template** (рекомендуется)
   - Репозиторий: https://github.com/OrderlyNetwork/orderly-js-sdk-vite-template
   - Технологии: Vite + React + TypeScript
   - Самый быстрый и современный вариант

2. **Example DEX**
   - Репозиторий: https://github.com/OrderlyNetwork/example-dex
   - Технологии: Remix + React
   - Полнофункциональный пример DEX

3. **JS SDK** (с шаблонами)
   - Репозиторий: https://github.com/OrderlyNetwork/js-sdk
   - Содержит: Vite, Next.js, Remix, Create React App шаблоны

## 🚀 Быстрый старт: Клонирование официального шаблона

### Вариант 1: Vite Template (рекомендуется)

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/OrderlyNetwork/orderly-js-sdk-vite-template.git my-dex
cd my-dex

# 2. Установите зависимости
npm install
# или
yarn install

# 3. Запустите dev сервер
npm run dev
# или
yarn dev
```

### Вариант 2: Example DEX

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/OrderlyNetwork/example-dex.git my-dex
cd my-dex

# 2. Используйте Docker (рекомендуется для example-dex)
docker build -t my-dex .
docker run -it --rm -p 3000:3000 my-dex

# Или без Docker
npm install
npm run dev
```

## 🎨 Кастомизация проекта

После клонирования официального шаблона, вам нужно настроить его под свой бренд.

### Шаг 1: Настройка Broker ID

#### Через переменные окружения (.env файл)

Создайте или отредактируйте файл `.env` в корне проекта:

```env
# === ОБЯЗАТЕЛЬНЫЕ ПАРАМЕТРЫ ===

# Ваш Broker ID от Orderly Network
VITE_ORDERLY_BROKER_ID=your-broker-id

# Название вашего DEX
VITE_ORDERLY_BROKER_NAME=Your DEX Name

# Сеть (mainnet или testnet)
VITE_ORDERLY_NETWORK_ID=mainnet

# === ОПЦИОНАЛЬНЫЕ ПАРАМЕТРЫ ===

# Метаданные приложения
VITE_APP_NAME=Your DEX Name
VITE_APP_DESCRIPTION=Your DEX description

# Меню (какие разделы показывать)
VITE_ENABLED_MENUS=Trading,Portfolio,Markets,Swap,Leaderboard

# Кастомные внешние ссылки (формат: Name,URL;Name2,URL2)
VITE_CUSTOM_MENUS=Documentation,https://docs.yourdex.com;Support,https://support.yourdex.com

# Социальные сети
VITE_TELEGRAM_URL=https://t.me/your_channel
VITE_DISCORD_URL=https://discord.gg/your_server
VITE_TWITTER_URL=https://twitter.com/your_account

# Логотипы (true/false)
VITE_HAS_PRIMARY_LOGO=true
VITE_HAS_SECONDARY_LOGO=false

# Кампании/Rewards (true/false)
VITE_ENABLE_CAMPAIGNS=false
```

#### Через Runtime конфигурацию (рекомендуется для production)

Создайте файл `public/config.js`:

```javascript
// Runtime конфигурация - можно менять без пересборки!
window.__RUNTIME_CONFIG__ = {
  // Broker настройки
  VITE_ORDERLY_BROKER_ID: "your-broker-id",
  VITE_ORDERLY_BROKER_NAME: "Your DEX Name",
  VITE_ORDERLY_NETWORK_ID: "mainnet",

  // Метаданные
  VITE_APP_NAME: "Your DEX Name",
  VITE_APP_DESCRIPTION: "Your DEX description",

  // Логотипы
  VITE_HAS_PRIMARY_LOGO: "true",
  VITE_HAS_SECONDARY_LOGO: "false",

  // Меню
  VITE_ENABLED_MENUS: "Trading,Portfolio,Markets,Swap,Leaderboard",

  // Социальные сети
  VITE_TELEGRAM_URL: "https://t.me/your_channel",
  VITE_DISCORD_URL: "https://discord.gg/your_server",
  VITE_TWITTER_URL: "https://twitter.com/your_account",
};
```

Затем добавьте в `index.html` перед `<script type="module" src="/src/main.tsx">`:

```html
<script src="/config.js"></script>
```

### Шаг 2: Настройка утилиты runtime-config

Создайте файл `app/utils/runtime-config.ts` (если его нет):

```typescript
declare global {
  interface Window {
    __RUNTIME_CONFIG__?: Record<string, string>;
  }
}

export function getRuntimeConfig(key: string): string | undefined {
  // Сначала проверяем runtime конфиг
  if (typeof window !== "undefined" && window.__RUNTIME_CONFIG__) {
    const value = window.__RUNTIME_CONFIG__[key];
    if (value !== undefined && value !== "") {
      return value;
    }
  }

  // Затем используем build-time env
  const envValue = (import.meta.env as any)[key];

  // Дефолтное значение для broker ID
  if (key === "VITE_ORDERLY_BROKER_ID" && (!envValue || envValue === "")) {
    return "demo";
  }

  return envValue;
}

export function getRuntimeConfigBoolean(key: string): boolean {
  const value = getRuntimeConfig(key);
  return value === "true";
}
```

### Шаг 3: Добавление своего логотипа

#### 1. Подготовьте логотипы:

- **Основной логотип**: `public/logo.webp` (рекомендуемый размер: 200x80px)
- **Вторичный логотип**: `public/logo-secondary.webp` (опционально)
- **Favicon**: `public/favicon.webp`

#### 2. Создайте SVG fallback (если нет webp):

`public/logo.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60">
  <!-- Ваш логотип SVG -->
  <text x="10" y="40" font-family="Arial" font-size="32" font-weight="bold" fill="#000">
    Your DEX
  </text>
</svg>
```

#### 3. Обновите конфигурацию логотипов в `app/utils/config.tsx`:

```typescript
appIcons: {
  main:
    getRuntimeConfigBoolean('VITE_HAS_PRIMARY_LOGO')
      ? { component: <img src={withBasePath("/logo.webp")} alt="logo" style={{ height: "42px" }} /> }
      : { img: withBasePath("/logo.svg") },
  secondary: {
    img: getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')
      ? withBasePath("/logo-secondary.webp")
      : withBasePath("/logo-secondary.svg"),
  },
}
```

### Шаг 4: Кастомизация меню и навигации

Отредактируйте `app/utils/config.tsx`:

```typescript
const ALL_MENU_ITEMS = [
  { name: "Trading", href: "/", translationKey: "common.trading" },
  { name: "Portfolio", href: "/portfolio", translationKey: "common.portfolio" },
  { name: "Markets", href: "/markets", translationKey: "common.markets" },
  { name: "Swap", href: "/swap", translationKey: "extend.swap" },
  { name: "Rewards", href: "/rewards", translationKey: "tradingRewards.rewards" },
  { name: "Leaderboard", href: "/leaderboard", translationKey: "tradingLeaderboard.leaderboard" },
  { name: "Vaults", href: "/vaults", translationKey: "common.vaults" },
];

// Функция для получения включенных меню из конфигурации
const getEnabledMenus = () => {
  const enabledMenusEnv = getRuntimeConfig('VITE_ENABLED_MENUS');

  if (!enabledMenusEnv) {
    return DEFAULT_ENABLED_MENUS;
  }

  const enabledMenuNames = enabledMenusEnv.split(',').map(name => name.trim());
  const enabledMenus = [];

  for (const menuName of enabledMenuNames) {
    const menuItem = ALL_MENU_ITEMS.find(item => item.name === menuName);
    if (menuItem) {
      enabledMenus.push(menuItem);
    }
  }

  return enabledMenus.length > 0 ? enabledMenus : DEFAULT_ENABLED_MENUS;
};
```

### Шаг 5: Настройка темы (опционально)

1. Посетите [Orderly Storybook](https://storybook.orderly.network/?path=/story/package-trading-tradingpage--page)
2. Настройте вашу тему с помощью элементов управления
3. Экспортируйте CSS
4. Замените содержимое `app/styles/theme.css`

### Шаг 6: Настройка для GitHub Pages (если деплоите туда)

#### 1. Обновите `vite.config.ts`:

```typescript
export default defineConfig(() => {
  // Замените на название вашего репозитория
  const basePath = process.env.PUBLIC_PATH || "/your-repo-name/";

  return {
    base: basePath,
    build: {
      outDir: "dist", // Для GitHub Pages
    },
    // ... остальная конфигурация
  };
});
```

#### 2. Создайте `public/404.html` для SPA routing:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Your DEX</title>
    <script>
      var pathSegmentsToKeep = 1; // Для GitHub Pages
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

#### 3. Добавьте скрипт в `index.html`:

```html
<head>
  <!-- ... другие meta теги -->

  <script>
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) {
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
</head>
```

#### 4. Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm install
      - run: npm run build
        env:
          NODE_OPTIONS: '--max-old-space-size=8192'

      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## 🔑 Получение Broker ID

Чтобы ваш DEX работал на production, вам нужен официальный Broker ID от Orderly Network:

1. **Свяжитесь с Orderly Network**:
   - Официальный сайт: https://orderly.network
   - Документация: https://orderly.network/docs
   - Discord/Telegram для поддержки

2. **Процесс регистрации брокера**:
   - Заполните заявку на регистрацию
   - Пройдите верификацию
   - Получите ваш уникальный Broker ID и API ключи

3. **Для тестирования используйте**:
   ```env
   VITE_ORDERLY_BROKER_ID=demo
   VITE_ORDERLY_NETWORK_ID=testnet
   ```

## 📦 Deployment

### Vercel (рекомендуется)

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel

# Production деплой
vercel --prod
```

### GitHub Pages

```bash
# Пушьте в main ветку
git add .
git commit -m "feat: my custom DEX"
git push origin main

# GitHub Actions автоматически задеплоит
```

### Docker

```bash
# Соберите образ
docker build -t my-dex .

# Запустите контейнер
docker run -p 3000:3000 my-dex
```

## 🔧 Продвинутая кастомизация

### Изменение цветовой схемы

Создайте или обновите `app/styles/theme.css`:

```css
:root {
  --oui-color-primary: #your-color;
  --oui-color-trading-profit: #00ff00;
  --oui-color-trading-loss: #ff0000;
  /* ... другие переменные */
}
```

### Кастомные компоненты

Вы можете заменить любые компоненты из `@orderly.network/ui`:

```typescript
import { TradingPage } from "@orderly.network/trading";
import CustomHeader from "./components/CustomHeader";

// Используйте свои компоненты
<TradingPage
  customHeader={<CustomHeader />}
  // ... другие пропсы
/>
```

## 📝 Чек-лист перед запуском

- [ ] Установлен Broker ID (не "demo" для production)
- [ ] Настроен `.env` файл
- [ ] Добавлен `public/config.js` для runtime конфигурации
- [ ] Заменены логотипы
- [ ] Обновлен `index.html` (title, meta tags)
- [ ] Настроено меню
- [ ] Добавлены социальные ссылки
- [ ] Протестировано на localhost
- [ ] Настроен deployment (Vercel/GitHub Pages)
- [ ] Проверена работа на mainnet/testnet

## 🆘 Частые проблемы

### Amplitude API ошибки

**Проблема**: Видите ошибки `https://api.eu.amplitude.com/2/httpapi`

**Решение**: Это нормально! Amplitude встроена в Orderly SDK для аналитики. Ошибки не влияют на работу DEX.

### Не работают роуты после refresh

**Решение**: Убедитесь, что добавили `404.html` и скрипт в `index.html` (для SPA routing)

### Логотип не загружается

**Решение**:
1. Проверьте путь: `public/logo.webp`
2. Установите `VITE_HAS_PRIMARY_LOGO=true`
3. Очистите кэш (Ctrl+Shift+R)

### Не могу подключить кошелек

**Решение**:
1. Используйте правильный `VITE_ORDERLY_NETWORK_ID`
2. Проверьте Broker ID
3. Для testnet используйте testnet wallet

## 🔗 Полезные ссылки

- [Orderly Network](https://orderly.network)
- [Официальная документация](https://orderly.network/docs/sdks)
- [JS SDK GitHub](https://github.com/OrderlyNetwork/js-sdk)
- [Storybook (темы)](https://storybook.orderly.network/)
- [Example DEX](https://github.com/OrderlyNetwork/example-dex)

---

**Готово! Теперь у вас есть полностью кастомизированный DEX на базе Orderly Network!** 🚀
