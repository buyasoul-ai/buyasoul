/**
 * rts-selected-dashboard.js
 * BUYASOUL CPL / GODFORGE — Selected Units Dashboard & Tactical Actions HUD (Proposal #2)
 *
 * Implements a premium, real-time updated RTS dashboard in the bottom center.
 * Features:
 *   - Glassmorphic styling matching godforge-ui-dashboard design system.
 *   - Real-time HP, Attack, Speed, and Carrying updates (every frame/100ms).
 *   - Custom detailed portraits with neon holographic animation.
 *   - Full action card panel for Stop, Hold Position, Patrol, and Retire (Delete).
 *   - Compact grid sub-views for multi-selections with individual mini HP indicators.
 */

(function() {
  'use strict';

  let _dashboardEl = null;
  let _lastSelectionHash = '';

  // ─── INJECT DASHBOARD STYLES ────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('rts-dashboard-styles')) return;

    const style = document.createElement('style');
    style.id = 'rts-dashboard-styles';
    style.textContent = `
      #rts-dashboard {
        position: fixed;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        width: 620px;
        height: 125px;
        background: rgba(6, 11, 26, 0.94);
        border: 1px solid rgba(0, 255, 204, 0.45);
        border-radius: 12px;
        z-index: 120;
        display: none; /* Shown dynamically */
        font-family: 'Outfit', sans-serif;
        color: #bfe6ff;
        box-shadow: 0 10px 40px rgba(0,0,0,0.85), inset 0 0 15px rgba(0, 255, 204, 0.15);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 10px 15px;
        user-select: none;
        overflow: hidden;
      }

      .rts-dash-container {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 15px;
        align-items: center;
      }

      /* Single Selection Portrait */
      .rts-dash-portrait-box {
        width: 105px;
        height: 105px;
        border: 1.5px solid rgba(0, 255, 204, 0.35);
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(12, 18, 34, 0.9), rgba(5, 8, 16, 0.95));
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .rts-dash-portrait-glow {
        position: absolute;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(0, 255, 204, 0.22) 0%, transparent 60%);
        animation: rts-glow-anim 4s infinite linear;
      }

      @keyframes rts-glow-anim {
        0% { transform: translate(-25%, -25%) rotate(0deg); }
        100% { transform: translate(-25%, -25%) rotate(360deg); }
      }

      .rts-dash-portrait-avatar {
        font-size: 32px;
        z-index: 2;
        filter: drop-shadow(0 0 10px rgba(0, 255, 204, 0.6));
      }

      /* Single Selection Details */
      .rts-dash-info-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 200px;
        flex-shrink: 0;
        gap: 4px;
      }

      .rts-dash-name {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #ffffff;
        text-shadow: 0 0 8px rgba(0, 255, 204, 0.4);
        text-transform: uppercase;
      }

      .rts-dash-hp-bar-container {
        width: 100%;
        height: 14px;
        background: rgba(255,255,255,0.08);
        border: 1.5px solid rgba(0, 255, 204, 0.25);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }

      .rts-dash-hp-fill {
        height: 100%;
        background: linear-gradient(90deg, #00ff88, #00ffcc);
        box-shadow: 0 0 8px #00ff88;
        width: 100%;
        transition: width 0.1s ease-out;
      }

      .rts-dash-hp-text {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 9px;
        font-weight: 700;
        color: #ffffff;
        line-height: 11px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
      }

      .rts-dash-stats-row {
        display: flex;
        gap: 12px;
        font-size: 11px;
        font-weight: 600;
        color: #88aacc;
      }

      .rts-dash-stat-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* Action Card Panel */
      .rts-dash-action-panel {
        display: flex;
        gap: 8px;
        flex-grow: 1;
        justify-content: flex-end;
        align-items: center;
      }

      .rts-dash-action-btn {
        width: 64px;
        height: 64px;
        background: rgba(10, 18, 38, 0.85);
        border: 1px solid rgba(0, 255, 204, 0.35);
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: #00ffcc;
        transition: all 0.25s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }

      .rts-dash-action-btn:hover {
        background: rgba(0, 255, 204, 0.15);
        border-color: #00ffcc;
        box-shadow: 0 0 14px rgba(0, 255, 204, 0.4);
        transform: translateY(-2px);
      }

      .rts-dash-action-btn:active {
        transform: translateY(0);
      }

      .rts-dash-action-icon {
        font-size: 18px;
      }

      .rts-dash-action-label {
        font-size: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Multi-Selection View */
      .rts-dash-multi-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        flex-grow: 1;
        max-height: 105px;
        overflow-y: auto;
        padding-right: 4px;
      }

      /* Custom scrollbar for multi grid */
      .rts-dash-multi-grid::-webkit-scrollbar {
        width: 4px;
      }
      .rts-dash-multi-grid::-webkit-scrollbar-track {
        background: transparent;
      }
      .rts-dash-multi-grid::-webkit-scrollbar-thumb {
        background: rgba(0, 255, 204, 0.35);
        border-radius: 2px;
      }

      .rts-dash-multi-item {
        width: 38px;
        height: 38px;
        background: rgba(12, 18, 34, 0.8);
        border: 1.5px solid rgba(0, 255, 204, 0.35);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .rts-dash-multi-avatar {
        font-size: 14px;
        line-height: 1;
      }

      .rts-dash-multi-hp-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: rgba(255,255,255,0.1);
      }

      .rts-dash-multi-hp-fill {
        height: 100%;
        background: #00ff88;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── INITIALIZATION ─────────────────────────────────────────────────

  function ensureDashboardEl() {
    if (_dashboardEl) return _dashboardEl;

    injectStyles();

    _dashboardEl = document.createElement('div');
    _dashboardEl.id = 'rts-dashboard';
    document.body.appendChild(_dashboardEl);

    return _dashboardEl;
  }

  // ─── COMPONENT BUILDERS ─────────────────────────────────────────────

  function getAvatarIcon(entity) {
    if (entity.type === 'building') {
      if (entity.defId === 'barracks') return '🏛️';
      if (entity.defId === 'farm') return '🌾';
      if (entity.defId === 'wall') return '🧱';
      return '🏭';
    }
    if (entity.type === 'resource') return '💎';

    // Units
    if (entity.defId === 'harvester') return '🚜';
    return '⚔️'; // Soldier/Defender
  }

  function getEntityName(entity) {
    if (entity.name) return entity.name;
    if (entity.type === 'building') {
      if (entity.defId === 'barracks') return 'Barracks';
      if (entity.defId === 'farm') return 'Aether Farm';
      if (entity.defId === 'wall') return 'Blast Wall';
      return 'Command Center';
    }
    if (entity.type === 'resource') return 'Crystal Node';
    if (entity.defId === 'harvester') return 'Harvester Drone';
    return 'Sovereign Soldier';
  }

  // Action handlers
  window.__rts_action = function(actionType) {
    if (!window.RTSBridge) return;
    const bridge = window.RTSBridge;

    switch (actionType) {
      case 'stop':
        if (typeof bridge.stopSelected === 'function') bridge.stopSelected();
        else triggerRTSKey('s');
        break;
      case 'hold':
        if (typeof bridge.holdSelected === 'function') bridge.holdSelected();
        else triggerRTSKey('h');
        break;
      case 'patrol':
        if (typeof bridge.patrolSelected === 'function') bridge.patrolSelected();
        else triggerRTSKey('p');
        break;
      case 'delete':
        if (typeof bridge.deleteSelected === 'function') bridge.deleteSelected();
        else triggerRTSKey('delete');
        break;
    }
  };

  function triggerRTSKey(keyName) {
    // Falls back to simulating a direct key down
    const e = new KeyboardEvent('keydown', { code: keyName === 'delete' ? 'Delete' : 'Key' + keyName.toUpperCase() });
    document.dispatchEvent(e);
  }

  // ─── RENDER LOOP ────────────────────────────────────────────────────

  function updateDashboard() {
    const bridge = window.RTSBridge;
    if (!bridge || !bridge.selection) {
      if (_dashboardEl) _dashboardEl.style.display = 'none';
      return;
    }

    const selectionList = bridge.selection.list || [];
    const entities = window.RTSEngineCore?.ENTITIES;

    if (selectionList.length === 0 || !entities) {
      if (_dashboardEl) _dashboardEl.style.display = 'none';
      return;
    }

    const dashboard = ensureDashboardEl();
    dashboard.style.display = 'block';

    if (selectionList.length === 1) {
      // ─── SINGLE SELECTION HUD ───
      const entId = selectionList[0];
      const ent = entities.get(entId);
      if (!ent) {
        dashboard.style.display = 'none';
        return;
      }

      const hp = typeof ent.hp === 'number' ? ent.hp : 100;
      const maxHp = typeof ent.maxHp === 'number' ? ent.maxHp : 100;
      const hpPct = Math.max(0, Math.min(100, (hp / maxHp) * 100));

      const avatar = getAvatarIcon(ent);
      const name = getEntityName(ent);

      // Custom stats display
      let statsHtml = '';
      if (ent.type === 'unit') {
        const attack = typeof ent.attackDamage === 'number' ? ent.attackDamage : 0;
        const speed = typeof ent.speed === 'number' ? ent.speed : 0;
        statsHtml += `<div class="rts-dash-stat-item">⚔️ <span>ATK: ${attack}</span></div>`;
        statsHtml += `<div class="rts-dash-stat-item">👟 <span>SPD: ${speed}</span></div>`;
        if (ent.maxCarry) {
          const carry = ent.carryAmount || 0;
          statsHtml += `<div class="rts-dash-stat-item">💎 <span>CARRY: ${carry}/${ent.maxCarry}</span></div>`;
        }
      } else if (ent.type === 'building') {
        statsHtml += `<div class="rts-dash-stat-item">🛡️ <span>ARMOR: HIGH</span></div>`;
        if (ent._prodType) {
          statsHtml += `<div class="rts-dash-stat-item">🏛️ <span>PROD: ${ent._prodType}</span></div>`;
        }
      } else if (ent.type === 'resource') {
        const amt = ent.resourceAmount || 0;
        statsHtml += `<div class="rts-dash-stat-item">💎 <span>YIELD: ${amt}</span></div>`;
      }

      dashboard.innerHTML = `
        <div class="rts-dash-container">
          <!-- Portrait -->
          <div class="rts-dash-portrait-box">
            <div class="rts-dash-portrait-glow"></div>
            <div class="rts-dash-portrait-avatar">${avatar}</div>
          </div>

          <!-- Info Box -->
          <div class="rts-dash-info-box">
            <div class="rts-dash-name">${name}</div>
            <div class="rts-dash-hp-bar-container">
              <div class="rts-dash-hp-fill" style="width: ${hpPct}%"></div>
              <div class="rts-dash-hp-text">HP: ${Math.round(hp)} / ${Math.round(maxHp)}</div>
            </div>
            <div class="rts-dash-stats-row">
              ${statsHtml}
            </div>
          </div>

          <!-- Actions -->
          <div class="rts-dash-action-panel">
            <button class="rts-dash-action-btn" onclick="window.__rts_action('stop')">
              <span class="rts-dash-action-icon">🛑</span>
              <span class="rts-dash-action-label">Stop</span>
            </button>
            <button class="rts-dash-action-btn" onclick="window.__rts_action('hold')">
              <span class="rts-dash-action-icon">🛡️</span>
              <span class="rts-dash-action-label">Hold</span>
            </button>
            <button class="rts-dash-action-btn" onclick="window.__rts_action('patrol')">
              <span class="rts-dash-action-icon">🔁</span>
              <span class="rts-dash-action-label">Patrol</span>
            </button>
            <button class="rts-dash-action-btn" onclick="window.__rts_action('delete')">
              <span class="rts-dash-action-icon">💀</span>
              <span class="rts-dash-action-label">Retire</span>
            </button>
          </div>
        </div>
      `;

    } else {
      // ─── MULTI-SELECTION HUD ───
      let itemsHtml = '';
      for (const entId of selectionList) {
        const ent = entities.get(entId);
        if (!ent) continue;

        const hp = typeof ent.hp === 'number' ? ent.hp : 100;
        const maxHp = typeof ent.maxHp === 'number' ? ent.maxHp : 100;
        const hpPct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
        const avatar = getAvatarIcon(ent);

        itemsHtml += `
          <div class="rts-dash-multi-item">
            <div class="rts-dash-multi-avatar">${avatar}</div>
            <div class="rts-dash-multi-hp-bar">
              <div class="rts-dash-multi-hp-fill" style="width: ${hpPct}%"></div>
            </div>
          </div>
        `;
      }

      dashboard.innerHTML = `
        <div class="rts-dash-container">
          <!-- Compact Grid -->
          <div class="rts-dash-multi-grid">
            ${itemsHtml}
          </div>

          <!-- Actions (Applies to all selected) -->
          <div class="rts-dash-action-panel">
            <button class="rts-dash-action-btn" onclick="window.__rts_action('stop')">
              <span class="rts-dash-action-icon">🛑</span>
              <span class="rts-dash-action-label">Stop</span>
            </button>
            <button class="rts-dash-action-btn" onclick="window.__rts_action('hold')">
              <span class="rts-dash-action-icon">🛡️</span>
              <span class="rts-dash-action-label">Hold</span>
            </button>
            <button class="rts-dash-action-btn" onclick="window.__rts_action('patrol')">
              <span class="rts-dash-action-icon">🔁</span>
              <span class="rts-dash-action-label">Patrol</span>
            </button>
            <button class="rts-dash-action-btn" onclick="window.__rts_action('delete')">
              <span class="rts-dash-action-icon">💀</span>
              <span class="rts-dash-action-label">Retire</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  // Start polling loop for real-time updates (HP, resource amounts, carry values)
  setInterval(updateDashboard, 100);

  // Expose initialization function
  window.RTSSelectedDashboard = {
    init: function() {
      ensureDashboardEl();
      console.log('[RTS Dashboard] Real-time tactical dashboard initialized.');
    }
  };

  // Auto init once loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.RTSSelectedDashboard.init();
  } else {
    document.addEventListener('DOMContentLoaded', window.RTSSelectedDashboard.init);
  }

})();