import React from 'react';
import { AdvancedChart, MarketOverview } from 'react-tradingview-embed';
import './tradingvew.css';

const TradingViewWidget = () => {
  return (
    <div className="tradingview-container">
      {/* Header Section */}
      <header className="tv-header">
        <div className="tv-logo">TradingView</div>
        <nav className="tv-header-controls">
          <button className="tv-button">Symbols</button>
          <button className="tv-button">Indicators</button>
          <button className="tv-button">Compare</button>
          <button className="tv-button">Settings</button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="tv-main-content">
        {/* Left Sidebar */}
        <aside className="tv-sidebar">
          <MarketOverview
            widgetProps={{
              colorTheme: "dark",
              height: 600,
              width: "100%",
              showChart: true,
              locale: "en",
              defaultColumn: "overview",
              screener_type: "crypto",
              displayCurrency: "USD",
              market: "cryptocurrency",
              showFloatingTooltip: false
            }}
          />
        </aside>

        {/* Main Chart Area */}
        <section className="tv-chart-container">
          <AdvancedChart
            widgetProps={{
              theme: "dark",
              symbol: "BTCUSD",
              interval: "D",
              timezone: "Etc/UTC",
              style: "1",
              locale: "en",
              toolbar_bg: "#f1f3f6",
              enable_publishing: false,
              allow_symbol_change: true,
              details: true,
              hotlist: true,
              calendar: true,
              studies: [
                "ROC@tv-basicstudies",
                "StochasticRSI@tv-basicstudies",
                "MASimple@tv-basicstudies"
              ],
              container_id: "tradingview-chart"
            }}
          />
        </section>

        {/* Right Sidebar */}
        <aside className="tv-right-sidebar">
          <MarketOverview
            widgetProps={{
              colorTheme: "dark",
              height: 600,
              width: "100%",
              showChart: false,
              locale: "en",
              defaultColumn: "performance",
              screener_type: "crypto",
              displayCurrency: "USD",
              market: "cryptocurrency",
              showFloatingTooltip: false
            }}
          />
        </aside>
      </main>

      {/* Bottom Toolbar */}
      <footer className="tv-bottom-toolbar">
        <div className="tv-timeframes">
          {['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'].map((tf) => (
            <button key={tf} className="tv-timeframe-button">{tf}</button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default TradingViewWidget;