// Initialize WebSocket connection for live crypto data
const ws = new WebSocket(
  "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,binancecoin"
);

// Initialize CoinGecko API for detailed crypto data
const COINGECKO_API = "https://api.coingecko.com/api/v3";

// Utility function for formatting numbers
const formatNumber = (num, decimals = 2) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

// Initialize market ticker
const initMarketTicker = async () => {
  const tickerWrapper = document.getElementById("cryptoTicker");
  const response = await fetch(
    `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true`
  );
  const data = await response.json();

  const coins = [
    { id: "bitcoin", symbol: "BTC" },
    { id: "ethereum", symbol: "ETH" },
    { id: "binancecoin", symbol: "BNB" },
  ];

  coins.forEach((coin) => {
    const price = data[coin.id].usd;
    const change = data[coin.id].usd_24h_change;
    const tickerItem = document.createElement("div");
    tickerItem.className = "epg_ticker_item_r5n8";
    tickerItem.innerHTML = `
      <span>${coin.symbol}</span>
      <span class="epg_ticker_price_g3m9">$${formatNumber(price)}</span>
      <span class="epg_ticker_change_k8p2 ${
        change >= 0 ? "positive" : "negative"
      }">
        ${change >= 0 ? "+" : ""}${formatNumber(change)}%
      </span>
    `;
    tickerWrapper.appendChild(tickerItem);
  });
};

// Initialize live earnings counter
const initLiveEarnings = () => {
  let earnings = 0;
  const earningsElement = document.getElementById("totalEarnings");

  setInterval(() => {
    const increment = Math.random() * 1000;
    earnings += increment;
    earningsElement.textContent = `$${formatNumber(earnings)}`;
  }, 3000);
};

// Initialize trading statistics
const initTradingStats = () => {
  const stats = {
    activeTrades: {
      element: document.getElementById("activeTrades"),
      value: 0,
    },
    activeTraders: {
      element: document.getElementById("activeTraders"),
      value: 0,
    },
    avgProfit: { element: document.getElementById("avgProfit"), value: 0 },
  };

  setInterval(() => {
    // Simulate active trades (150-300)
    stats.activeTrades.value = Math.floor(Math.random() * 150) + 150;
    stats.activeTrades.element.textContent = stats.activeTrades.value;

    // Simulate active traders (1000-2000)
    stats.activeTraders.value = Math.floor(Math.random() * 1000) + 1000;
    stats.activeTraders.element.textContent = stats.activeTraders.value;

    // Simulate average profit (2-8%)
    stats.avgProfit.value = (Math.random() * 6 + 2).toFixed(1);
    stats.avgProfit.element.textContent = `${stats.avgProfit.value}%`;
  }, 5000);
};

// Initialize live trade feed
const initTradeFeed = () => {
  const feedContainer = document.getElementById("tradeFeed");
  const coins = ["BTC", "ETH", "BNB", "XRP", "ADA"];

  setInterval(() => {
    const trade = {
      coin: coins[Math.floor(Math.random() * coins.length)],
      type: Math.random() > 0.5 ? "Buy" : "Sell",
      profit: (Math.random() * 10 - 5).toFixed(2),
    };

    const tradeItem = document.createElement("div");
    tradeItem.className = "epg_trade_item_m6p3";
    tradeItem.innerHTML = `
      <div class="epg_trade_info_h8k4">
        <span>${trade.type} ${trade.coin}</span>
      </div>
      <span class="epg_trade_profit_b2n7 ${
        parseFloat(trade.profit) >= 0 ? "positive" : "negative"
      }">
        ${trade.profit >= 0 ? "+" : ""}${trade.profit}%
      </span>
    `;

    feedContainer.insertBefore(tradeItem, feedContainer.firstChild);
    if (feedContainer.children.length > 10) {
      feedContainer.removeChild(feedContainer.lastChild);
    }
  }, 2000);
};

// Initialize floating price cards
const initPriceCards = () => {
  const priceCards = document.getElementById("priceCards");
  const coins = ["BTC", "ETH", "BNB", "XRP", "ADA"];

  coins.forEach((coin, index) => {
    const card = document.createElement("div");
    card.className = "epg_price_card_l4t7";
    card.style.left = `${Math.random() * 80 + 10}%`;
    card.style.top = `${Math.random() * 80 + 10}%`;
    card.style.animationDelay = `${index * 0.5}s`;
    priceCards.appendChild(card);
  });
};

// Initialize everything when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  initMarketTicker();
  initLiveEarnings();
  initTradingStats();
  initTradeFeed();
  initPriceCards();

  // Handle WebSocket messages
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    // Update prices in real-time
    Object.entries(data).forEach(([coin, price]) => {
      // Update relevant elements with new price data
      const tickerItems = document.querySelectorAll(".epg_ticker_item_r5n8");
      tickerItems.forEach((item) => {
        if (item.querySelector("span").textContent === coin.toUpperCase()) {
          item.querySelector(
            ".epg_ticker_price_g3m9"
          ).textContent = `$${formatNumber(price)}`;
        }
      });
    });
  };
});

// Trading Analytics Section JavaScript
const tradingAnalyticsKp92 = {
  charts: {},
  currentPeriod: "day",

  initialize() {
    this.initializeCharts();
    this.initializeTopTraders();
    this.setupEventListeners();
    this.updateData(this.currentPeriod);
  },

  initializeCharts() {
    // Trading Volume Chart
    const volumeCtx = document
      .getElementById("volumeChart-jk83")
      .getContext("2d");
    this.charts.volume = new Chart(volumeCtx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Trading Volume",
            data: [],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: this.getChartOptions("Trading Volume ($)"),
    });

    // Profit Distribution Chart
    const profitCtx = document
      .getElementById("profitChart-vt47")
      .getContext("2d");
    this.charts.profit = new Chart(profitCtx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Profit Distribution",
            data: [],
            backgroundColor: "#2196F3",
            borderRadius: 5,
          },
        ],
      },
      options: this.getChartOptions("Number of Trades"),
    });

    // Asset Distribution Chart
    const assetCtx = document
      .getElementById("assetChart-rw56")
      .getContext("2d");
    this.charts.asset = new Chart(assetCtx, {
      type: "doughnut",
      data: {
        labels: ["BTC", "ETH", "BNB", "Others"],
        datasets: [
          {
            data: [40, 30, 20, 10],
            backgroundColor: ["#F7931A", "#627EEA", "#F3BA2F", "#808080"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        cutout: "70%",
      },
    });

    this.updateAssetLegend();
  },

  getChartOptions(yAxisLabel) {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#808080",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#808080",
          },
          title: {
            display: true,
            text: yAxisLabel,
            color: "#808080",
          },
        },
      },
    };
  },

  updateAssetLegend() {
    const legendContainer = document.getElementById("assetLegend-pq47");
    const { labels, datasets } = this.charts.asset.data;

    legendContainer.innerHTML = labels
      .map(
        (label, index) => `
            <div class="legend-item-tf92">
                <div class="legend-color-bh47" style="background: ${datasets[0].backgroundColor[index]}"></div>
                <span class="legend-label-mp83">${label}</span>
            </div>
        `
      )
      .join("");
  },

  initializeTopTraders() {
    const traders = [
      { name: "Alex Thompson", profit: "+$45,230", winRate: "94%" },
      { name: "Sarah Chen", profit: "+$38,450", winRate: "91%" },
      { name: "Michael Rodriguez", profit: "+$32,780", winRate: "89%" },
      { name: "Emma Watson", profit: "+$28,920", winRate: "88%" },
      { name: "James Wilson", profit: "+$25,640", winRate: "87%" },
    ];

    const tradersList = document.getElementById("topTradersList-mt63");
    tradersList.innerHTML = traders
      .map(
        (trader, index) => `
            <div class="trader-item-yw73">
                <div class="trader-rank-vp82">${index + 1}</div>
                <div class="trader-info-qm94">
                    <div class="trader-name-ux37">${trader.name}</div>
                    <div class="trader-profit-kj28">
                        <span class="positive-yh82">${trader.profit}</span>
                        <span class="stat-label-tp63"> | Win Rate: ${
                          trader.winRate
                        }</span>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  },

  setupEventListeners() {
    const timeButtons = document.querySelectorAll(".time-btn-qw21");
    timeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        timeButtons.forEach((btn) => btn.classList.remove("active-yz95"));
        button.classList.add("active-yz95");
        this.currentPeriod = button.dataset.period;
        this.updateData(this.currentPeriod);
      });
    });
  },

  updateData(period) {
    // Simulate different data for different time periods
    const volumeData = this.generateVolumeData(period);
    const profitData = this.generateProfitData(period);

    this.charts.volume.data.labels = volumeData.labels;
    this.charts.volume.data.datasets[0].data = volumeData.values;
    this.charts.volume.update();

    this.charts.profit.data.labels = profitData.labels;
    this.charts.profit.data.datasets[0].data = profitData.values;
    this.charts.profit.update();
  },

  generateVolumeData(period) {
    const labels = [];
    const values = [];
    const points =
      period === "day"
        ? 24
        : period === "week"
        ? 7
        : period === "month"
        ? 30
        : 12;

    for (let i = 0; i < points; i++) {
      labels.push(
        period === "day"
          ? `${i}:00`
          : period === "week"
          ? `Day ${i + 1}`
          : period === "month"
          ? `Day ${i + 1}`
          : `Month ${i + 1}`
      );
      values.push(Math.floor(Math.random() * 1000000) + 500000);
    }

    return { labels, values };
  },

  generateProfitData(period) {
    const labels = [];
    const values = [];
    const points = 10;

    for (let i = 0; i < points; i++) {
      labels.push(`${i * 10}%`);
      values.push(Math.floor(Math.random() * 100) + 20);
    }

    return { labels, values };
  },
};

// Initialize the analytics section when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  tradingAnalyticsKp92.initialize();
});
