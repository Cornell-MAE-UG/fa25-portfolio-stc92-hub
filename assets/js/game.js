(() => {
  const SAVE_KEY = "sal_incremental_v1";
  const OFFLINE_CAP_SEC = 24 * 60 * 60; // cap offline gains to 24h

  // ----- State -----
const defaultState = () => ({
    coins: 0,
    totalCoins: 0,
    clickPower: 1,

    genCount: 0,
    genBaseCost: 10,
    genGrowth: 1.15,
    genCoinsPerSec: 5,

    upgrades: { gen10x: false },
    multipliers: { gen: 1 },

    lastSaved: Date.now()
});
const UPGRADE_DEFS = {
  gen10x: {
    name: "10× Generators",
    desc: "Generators produce 10× more coins/sec.",
    cost: 1000,
    apply: () => { state.multipliers.gen *= 10; state.upgrades.gen10x = true; }
  }
};


  let state = loadState();

  // ----- UI -----
  const root = document.getElementById("game");
  root.innerHTML = `
  <div class="game-card">
    <div class="game-header">
      <h1>Incremental Game</h1>
      <div class="muted">localStorage save • offline progress</div>
    </div>

    <div class="stats">
      <div class="stat"><div class="label">Coins</div><div id="coins" class="value">0</div></div>
      <div class="stat"><div class="label">Coins / sec</div><div id="cps" class="value">0</div></div>
      <div class="stat"><div class="label">Generators</div><div id="gens" class="value">0</div></div>
    </div>

    <div class="game-grid">
      <!-- LEFT: Producers -->
      <div class="panel">
        <div class="panel-title">Producers</div>

        <div class="actions">
          <button id="clickBtn" class="primary">+<span id="clickPower">1</span> coin</button>
        </div>

        <div class="shop">
          <div class="shop-row">
            <div>
              <div class="shop-title">Generator</div>
              <div class="muted">
                Adds <b>${format(state.genCoinsPerSec)}</b> coins/sec each
              </div>
            </div>
            <button id="buyGenBtn">Buy (<span id="genCost"></span>)</button>
          </div>
        </div>
      </div>

      <!-- RIGHT: Upgrades -->
      <div class="panel">
        <div class="panel-title">Upgrades</div>
        <div id="upgrades"></div>
      </div>
    </div>

    <div class="footer">
      <button id="saveBtn" class="ghost">Save</button>
      <button id="resetBtn" class="danger">Hard Reset</button>
      <span id="status" class="muted"></span>
    </div>
  </div>
`;

  const elCoins = root.querySelector("#coins");
  const elCps = root.querySelector("#cps");
  const elGens = root.querySelector("#gens");
  const elClickPower = root.querySelector("#clickPower");
  const elGenCost = root.querySelector("#genCost");
  const elStatus = root.querySelector("#status");

  const clickBtn = root.querySelector("#clickBtn");
  const buyGenBtn = root.querySelector("#buyGenBtn");
  const saveBtn = root.querySelector("#saveBtn");
  const resetBtn = root.querySelector("#resetBtn");
  const upgradesRoot = root.querySelector("#upgrades");

  // ----- Mechanics -----
  function coinsPerSec() {
    return state.genCount * state.genCoinsPerSec * state.multipliers.gen;
  }

  function genCost() {
    // exponential cost growth
    return state.genBaseCost * Math.pow(state.genGrowth, state.genCount);
  }

  function addCoins(amount) {
    state.coins += amount;
    state.totalCoins += Math.max(0, amount);
  }

  // Click
  clickBtn.addEventListener("click", () => {
    addCoins(state.clickPower);
    render();
  });

  // Buy generator
  buyGenBtn.addEventListener("click", () => {
    const cost = genCost();
    if (state.coins >= cost) {
      state.coins -= cost;
      state.genCount += 1;
      render();
      saveState();
      flash(`Bought generator #${state.genCount}`);
    } else {
      flash("Not enough coins.");
    }
  });

  // Save
  saveBtn.addEventListener("click", () => {
    saveState();
    flash("Saved.");
  });

  // Reset
  resetBtn.addEventListener("click", () => {
    if (!confirm("Reset the game? This deletes your save.")) return;
    localStorage.removeItem(SAVE_KEY);
    state = defaultState();
    render();
    flash("Reset complete.");
  });

  // ----- Offline progress -----
  applyOfflineProgress();
  render();
  saveState(); // update lastSaved after offline calc

  // ----- Loops -----
  let lastTick = performance.now();

  // Simulation tick (~10 fps). Uses dt for smoothness.
  setInterval(() => {
    const now = performance.now();
    const dt = (now - lastTick) / 1000;
    lastTick = now;

    const cps = coinsPerSec();
    if (cps > 0) addCoins(cps * dt);

    render(); // MVP: just render every tick
  }, 100);

  // Autosave every 10s
  setInterval(() => saveState(), 10000);

  // ----- Helpers -----
  function render() {
  elCoins.textContent = format(state.coins);
  elCps.textContent = format(coinsPerSec());
  elGens.textContent = String(state.genCount);
  elClickPower.textContent = String(state.clickPower);

  const cost = genCost();
  elGenCost.textContent = format(cost);
  buyGenBtn.disabled = state.coins < cost;

  renderUpgrades();
}

  function renderUpgrades() {
  upgradesRoot.innerHTML = "";

  // Only one upgrade for now
  const def = UPGRADE_DEFS.gen10x;
  const owned = state.upgrades.gen10x;

  const row = document.createElement("div");
  row.className = "upgrade-row";

  const left = document.createElement("div");
  left.innerHTML = `
    <div class="shop-title">${def.name}</div>
    <div class="muted">${def.desc}</div>
    <div class="muted">Cost: <b>${format(def.cost)}</b></div>
  `;

  const btn = document.createElement("button");
  btn.textContent = owned ? "Purchased" : "Buy";
  btn.disabled = owned || state.coins < def.cost;

  btn.addEventListener("click", () => {
    if (state.coins < def.cost || owned) return;
    state.coins -= def.cost;
    def.apply();
    saveState();
    render();
    flash("Upgrade purchased.");
  });

  row.appendChild(left);
  row.appendChild(btn);
  upgradesRoot.appendChild(row);
}

  function applyOfflineProgress() {
    const now = Date.now();
    const last = state.lastSaved ?? now;
    const offlineSec = Math.min(OFFLINE_CAP_SEC, Math.max(0, (now - last) / 1000));
    const gained = coinsPerSec() * offlineSec;

    if (offlineSec >= 1 && gained > 0) {
      addCoins(gained);
      flash(`Offline: +${format(gained)} coins (${Math.floor(offlineSec)}s)`);
    }
  }

  function saveState() {
    state.lastSaved = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function flash(msg) {
    elStatus.textContent = msg;
    setTimeout(() => {
      if (elStatus.textContent === msg) elStatus.textContent = "";
    }, 2000);
  }

  function format(n) {
    // simple formatting (no libraries)
    if (!isFinite(n)) return "0";
    if (n < 1000) return n.toFixed(2).replace(/\.00$/, "");
    if (n < 1e6) return (n / 1e3).toFixed(2) + "k";
    if (n < 1e9) return (n / 1e6).toFixed(2) + "M";
    return (n / 1e9).toFixed(2) + "B";
  }
})();