// ---------- Storage ----------
const STORAGE_KEYS = {
  structure: "inv_structure",
  records: "inv_records",
  currentYear: "inv_current_year",
};

function loadState() {
  let structure = localStorage.getItem(STORAGE_KEYS.structure);
  let records = localStorage.getItem(STORAGE_KEYS.records);
  let currentYear = localStorage.getItem(STORAGE_KEYS.currentYear);

  if (!structure) {
    structure = SEED_STRUCTURE;
    localStorage.setItem(STORAGE_KEYS.structure, JSON.stringify(structure));
  } else {
    structure = JSON.parse(structure);
  }

  if (!records) {
    records = { "2025": SEED_RECORDS_2025 };
    localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
  } else {
    records = JSON.parse(records);
  }

  if (!currentYear) {
    // default to today's date, so you land on a fresh blank checklist
    currentYear = new Date().toISOString().slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.currentYear, currentYear);
  }

  return { structure, records, currentYear };
}

let state = loadState();

function saveStructure() {
  localStorage.setItem(STORAGE_KEYS.structure, JSON.stringify(state.structure));
}
function saveRecords() {
  localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(state.records));
}
function saveCurrentYear() {
  localStorage.setItem(STORAGE_KEYS.currentYear, state.currentYear);
}

function currentYearRecords() {
  if (!state.records[state.currentYear]) {
    state.records[state.currentYear] = {};
  }
  return state.records[state.currentYear];
}

// A "period" is now a full date string (YYYY-MM-DD) from the date picker.
// Older entries created before this feature may just be a plain year
// ("2025") — both are supported and sort correctly against each other.
function periodSortKey(period) {
  if (/^\d{4}$/.test(period)) return new Date(period + "-01-01").getTime();
  const d = new Date(period);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}
function formatPeriod(period) {
  if (/^\d{4}$/.test(period)) return period;
  const d = new Date(period + "T00:00:00");
  if (isNaN(d.getTime())) return period;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function priorYearFor(period) {
  const target = periodSortKey(period);
  const candidates = Object.keys(state.records).filter(p => periodSortKey(p) < target);
  if (!candidates.length) return null;
  candidates.sort((a, b) => periodSortKey(b) - periodSortKey(a));
  return candidates[0];
}

function getRecord(itemId, year) {
  const yr = state.records[year];
  return (yr && yr[itemId]) || { value: "", need: false };
}

// ---------- Routing ----------
let route = { view: "home" }; // {view:'home'} | {view:'space', spaceId} | {view:'shopping'} | {view:'export'}

function navigate(newRoute) {
  route = newRoute;
  render();
  window.scrollTo(0, 0);
}

// ---------- Toast ----------
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add("hidden"), 1800);
}

// ---------- Rendering ----------
const root = document.getElementById("app-root");
const headerTitle = document.getElementById("header-title");
const backBtn = document.getElementById("back-btn");

function render() {
  root.innerHTML = "";
  if (route.view === "home") {
    backBtn.hidden = true;
    headerTitle.textContent = "Swan's Island Inventory";
    renderHome();
  } else if (route.view === "space") {
    backBtn.hidden = false;
    const space = state.structure.find(s => s.id === route.spaceId);
    headerTitle.textContent = space ? space.name : "Space";
    renderSpace(space);
  } else if (route.view === "shopping") {
    backBtn.hidden = false;
    headerTitle.textContent = "Need / Shopping List";
    renderShopping();
  } else if (route.view === "export") {
    backBtn.hidden = false;
    headerTitle.textContent = "Export Inventory";
    renderExport();
  }
}

function countNeeds(spaceId, year) {
  const space = state.structure.find(s => s.id === spaceId);
  if (!space) return 0;
  const yr = state.records[year] || {};
  return space.items.filter(it => yr[it.id] && yr[it.id].need).length;
}

function renderHome() {
  const banner = document.createElement("div");
  banner.className = "year-banner";
  const totalNeeds = state.structure.reduce((sum, s) => sum + countNeeds(s.id, state.currentYear), 0);
  banner.innerHTML = `
    <div>
      <div class="label">Current inventory</div>
      <div class="value">${formatPeriod(state.currentYear)}</div>
    </div>
    <div class="need-count">${totalNeeds} item${totalNeeds === 1 ? "" : "s"} need</div>
  `;
  root.appendChild(banner);

  if (!state.structure.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No spaces yet. Use the menu to add one.";
    root.appendChild(empty);
    return;
  }

  state.structure.forEach(space => {
    const card = document.createElement("div");
    card.className = "space-card";
    const needs = countNeeds(space.id, state.currentYear);
    card.innerHTML = `
      <div>
        <div class="name">${escapeHtml(space.name)}</div>
        <div class="meta">${space.items.length} item${space.items.length === 1 ? "" : "s"}</div>
      </div>
      <div class="badge ${needs === 0 ? "zero" : ""}">${needs === 0 ? "✓ ok" : needs + " need"}</div>
    `;
    card.addEventListener("click", () => navigate({ view: "space", spaceId: space.id }));
    root.appendChild(card);
  });
}

function renderSpace(space) {
  if (!space) {
    root.innerHTML = `<div class="empty-state">Space not found.</div>`;
    return;
  }
  const priorYear = priorYearFor(state.currentYear);
  const yearRecords = currentYearRecords();

  space.items.forEach(item => {
    const rec = yearRecords[item.id] || { value: "", need: false };
    const priorRec = priorYear ? getRecord(item.id, priorYear) : null;

    const row = document.createElement("div");
    row.className = "item-row";

    const priorText = priorRec
      ? `${formatPeriod(priorYear)}: ${priorRec.value ? escapeHtml(priorRec.value) : (priorRec.need ? "needed" : "—")}`
      : "";

    row.innerHTML = `
      <div class="item-name">
        ${escapeHtml(item.name)}
        <button class="delete-x" aria-label="Delete item" style="float:right;">✕</button>
      </div>
      ${priorText ? `<div class="last-year">${priorText}</div>` : ""}
      <div class="row-controls">
        <input type="text" placeholder="Count / notes for ${formatPeriod(state.currentYear)}" value="${escapeAttr(rec.value)}">
        <button class="need-toggle ${rec.need ? "" : "off"}">${rec.need ? "★ Need" : "Need?"}</button>
      </div>
    `;

    const input = row.querySelector("input");
    input.addEventListener("input", () => {
      const yr = currentYearRecords();
      yr[item.id] = yr[item.id] || { value: "", need: false };
      yr[item.id].value = input.value;
      saveRecords();
    });

    const needBtn = row.querySelector(".need-toggle");
    needBtn.addEventListener("click", () => {
      const yr = currentYearRecords();
      yr[item.id] = yr[item.id] || { value: "", need: false };
      yr[item.id].need = !yr[item.id].need;
      saveRecords();
      render();
    });

    row.querySelector(".delete-x").addEventListener("click", () => {
      if (confirm(`Remove "${item.name}" from this space's checklist?`)) {
        space.items = space.items.filter(i => i.id !== item.id);
        saveStructure();
        render();
      }
    });

    root.appendChild(row);
  });

  const addRow = document.createElement("div");
  addRow.className = "add-row";
  addRow.innerHTML = `
    <input type="text" placeholder="Add new item…">
    <button class="primary-btn">Add</button>
  `;
  const addInput = addRow.querySelector("input");
  addRow.querySelector("button").addEventListener("click", () => {
    const name = addInput.value.trim();
    if (!name) return;
    space.items.push({ id: "i_" + Date.now() + Math.floor(Math.random() * 1000), name });
    saveStructure();
    addInput.value = "";
    render();
  });
  addInput.addEventListener("keydown", e => { if (e.key === "Enter") addRow.querySelector("button").click(); });
  root.appendChild(addRow);
}

function shoppingListText() {
  const yr = state.records[state.currentYear] || {};
  const lines = [`Shopping / Need List — ${formatPeriod(state.currentYear)}`, ""];
  let any = false;
  state.structure.forEach(space => {
    const needed = space.items.filter(it => yr[it.id] && yr[it.id].need);
    if (!needed.length) return;
    any = true;
    lines.push(space.name + ":");
    needed.forEach(it => lines.push("  - " + it.name));
    lines.push("");
  });
  if (!any) lines.push("Nothing flagged as needed yet.");
  return lines.join("\n");
}

function renderShopping() {
  const yr = state.records[state.currentYear] || {};
  let any = false;
  state.structure.forEach(space => {
    const needed = space.items.filter(it => yr[it.id] && yr[it.id].need);
    if (!needed.length) return;
    any = true;
    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = space.name;
    root.appendChild(title);
    needed.forEach(it => {
      const row = document.createElement("div");
      row.className = "item-row";
      row.innerHTML = `<div class="item-name">${escapeHtml(it.name)}</div>`;
      root.appendChild(row);
    });
  });
  if (!any) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Nothing flagged as needed yet for " + formatPeriod(state.currentYear) + ".";
    root.appendChild(empty);
  }

  const title = document.createElement("div");
  title.className = "section-title";
  title.textContent = "Text version (for email)";
  root.appendChild(title);

  const text = shoppingListText();
  const box = document.createElement("textarea");
  box.id = "shopping-export-box";
  box.className = "text-export-box";
  box.readOnly = true;
  box.value = text;
  root.appendChild(box);

  const btnRow = document.createElement("div");
  btnRow.className = "add-row";
  btnRow.innerHTML = `<button class="primary-btn" id="copy-shopping-btn">Copy to clipboard</button>`;
  root.appendChild(btnRow);
  document.getElementById("copy-shopping-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied! Paste it into an email.");
    } catch (e) {
      box.select();
      toast("Select-all done — copy manually");
    }
  });
}

// ---------- Small modal helper (used for the new-inventory date picker
// and the switch-inventory list) ----------
function openModal(innerHtml) {
  closeModal();
  const backdrop = document.createElement("div");
  backdrop.className = "overlay-backdrop";
  backdrop.id = "modal-backdrop";
  const box = document.createElement("div");
  box.className = "modal-box";
  box.innerHTML = innerHtml;
  backdrop.appendChild(box);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
  document.body.appendChild(backdrop);
  return box;
}
function closeModal() {
  const el = document.getElementById("modal-backdrop");
  if (el) el.remove();
}

function renderExport() {
  const lines = [];
  lines.push(`Swan's Island Year End Inventory — ${formatPeriod(state.currentYear)}`);
  lines.push("");
  state.structure.forEach(space => {
    lines.push(space.name.toUpperCase());
    const yr = state.records[state.currentYear] || {};
    space.items.forEach(it => {
      const rec = yr[it.id] || { value: "", need: false };
      const flag = rec.need ? " -- NEED" : "";
      lines.push(`  ${it.name}: ${rec.value}${flag}`);
    });
    lines.push("");
  });
  const text = lines.join("\n");

  const box = document.createElement("textarea");
  box.id = "export-box";
  box.className = "text-export-box";
  box.readOnly = true;
  box.value = text;
  root.appendChild(box);

  const btnRow = document.createElement("div");
  btnRow.className = "add-row";
  btnRow.innerHTML = `<button class="primary-btn" id="copy-btn">Copy to clipboard</button>`;
  root.appendChild(btnRow);
  document.getElementById("copy-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied!");
    } catch (e) {
      box.select();
      toast("Select-all done — copy manually");
    }
  });
}

// ---------- Menu ----------
const menuBtn = document.getElementById("menu-btn");
const menuPanel = document.getElementById("menu-panel");

menuBtn.addEventListener("click", () => menuPanel.classList.remove("hidden"));

menuPanel.addEventListener("click", e => {
  const action = e.target.dataset.action;
  if (!action) return;
  if (action === "close-menu") {
    menuPanel.classList.add("hidden");
    return;
  }
  menuPanel.classList.add("hidden");

  if (action === "shopping-list") {
    navigate({ view: "shopping" });
  } else if (action === "export") {
    navigate({ view: "export" });
  } else if (action === "switch-inventory") {
    const periods = Object.keys(state.records).sort((a, b) => periodSortKey(b) - periodSortKey(a));
    const box = openModal(`
      <h3>Switch inventory</h3>
      <div id="period-list"></div>
      <div class="modal-actions"><button class="secondary-btn" id="modal-cancel">Cancel</button></div>
    `);
    const list = box.querySelector("#period-list");
    if (!periods.length) {
      list.innerHTML = `<div class="empty-state">No inventories yet.</div>`;
    }
    periods.forEach(p => {
      const row = document.createElement("div");
      row.className = "modal-list-item";
      row.textContent = formatPeriod(p) + (p === state.currentYear ? "  (current)" : "");
      row.addEventListener("click", () => {
        state.currentYear = p;
        saveCurrentYear();
        closeModal();
        navigate({ view: "home" });
      });
      list.appendChild(row);
    });
    box.querySelector("#modal-cancel").addEventListener("click", closeModal);
  } else if (action === "new-inventory") {
    const today = new Date().toISOString().slice(0, 10);
    const box = openModal(`
      <h3>Start a new inventory</h3>
      <input type="date" id="new-date" value="${today}">
      <div class="modal-actions">
        <button class="secondary-btn" id="modal-cancel">Cancel</button>
        <button class="primary-btn" id="modal-create">Create</button>
      </div>
    `);
    box.querySelector("#modal-cancel").addEventListener("click", closeModal);
    box.querySelector("#modal-create").addEventListener("click", () => {
      const val = box.querySelector("#new-date").value;
      if (!val) return;
      if (state.records[val]) {
        if (!confirm(`An inventory for ${formatPeriod(val)} already exists. Switch to it?`)) return;
      } else {
        state.records[val] = {};
        saveRecords();
      }
      state.currentYear = val;
      saveCurrentYear();
      closeModal();
      toast(`Started inventory for ${formatPeriod(val)}`);
      navigate({ view: "home" });
    });
  } else if (action === "add-space") {
    const name = prompt("Name of new space (e.g. 'Attic'):");
    if (name && name.trim()) {
      state.structure.push({ id: "space_" + Date.now(), name: name.trim(), items: [] });
      saveStructure();
      navigate({ view: "home" });
    }
  }
});

backBtn.addEventListener("click", () => navigate({ view: "home" }));

// ---------- Utilities ----------
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
function escapeAttr(str) { return escapeHtml(str); }

// ---------- Service worker (offline support) ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

// ---------- Init ----------
render();
