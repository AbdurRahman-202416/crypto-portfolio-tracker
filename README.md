# Crypto Portfolio Tracker 🚀

A real-time cryptocurrency price tracking and portfolio management dashboard built with Next.js, TypeScript, Zustand, and TanStack Query. 

## 🌟 Overview

The **Crypto Portfolio Tracker** is a production-quality frontend application designed to help users track live cryptocurrency markets and manage their personal crypto portfolios. All data is fetched directly from the CoinGecko public API without the need for a custom backend server. Personal portfolio data and user preferences (like favorites and theme) are persisted locally in the browser.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand (with persist middleware)
- **Data Fetching & Caching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date Formatting:** date-fns

## ✨ Features

- **Live Market Prices:** View top cryptocurrencies with real-time data from CoinGecko. Auto-refreshes every 60 seconds.
- **24H Price Charts:** Detailed line charts for individual coins showing 24-hour price movements.
- **Portfolio Management:** Add and remove assets from your portfolio to track total holdings and value. Data persists across reloads via `localStorage`.
- **Favorites / Watchlist:** Mark coins as favorites to quickly filter them on the dashboard.
- **Responsive UI:** Desktop-first, fully mobile-friendly design.
- **Light/Dark Mode:** Built-in theme toggling that remembers user preference.
- **Optimized Data Fetching:** Built with TanStack Query for optimal caching, stale-time management, and background polling.

## 🏗️ Architecture Decisions

1. **App Router:** Utilizes Next.js App Router (`src/app`) for modern routing and layout definitions.
2. **Feature-based Folder Structure:** Separation of components into `common/` and `crypto/` ensures modularity and easy scaling.
3. **State Management:**
   - **TanStack Query:** Handles all asynchronous API calls, caching, retries, and background polling for live price updates.
   - **Zustand:** Manages persistent global state (portfolio, favorites, UI preferences).
4. **Local Persistance:** Zustand's `persist` middleware automatically syncs the user's portfolio and favorites directly to the browser's `localStorage`.
5. **UI & Styling:** Tailwind CSS enables rapid styling using utility classes while maintaining clean component markup via `clsx` and `tailwind-merge`.

## ⚙️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd crypto-portfolio-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📝 API Used

This project relies on the [CoinGecko API V3](https://www.coingecko.com/en/api).
- Endpoints used: `/coins/markets`, `/coins/{id}`, `/coins/{id}/market_chart`.
- *Note: CoinGecko has strict rate limits for its free tier. Occasional 429 Too Many Requests errors might occur.*

## 📸 Screenshots

*(Add your screenshots here)*

## 🌐 Live Demo

*(Add your production URL here)*

---

*Developed as a demonstration of production-ready frontend architecture.*
# crypto-portfolio-tracker
