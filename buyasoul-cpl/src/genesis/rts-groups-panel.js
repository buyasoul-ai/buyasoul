/**
 * rts-groups-panel.js
 * BUYASOUL CPL / GODFORGE — Control Groups HUD Panel (Proposal #7)
 *
 * Implements a premium, real-time updated Control Groups HUD indicator bar.
 * Positioned cleanly on the left side of the screen.
 * Features:
 *   - Displays numbers 1-9 as modular cyberpunk glass indicators.
 *   - Illuminates and displays unit count when a group contains units.
 *   - Handles click-to-select (Recall Group) and double-click to center the RTS camera.
 *   - Real-time polling to ensure counts update immediately if units die in battle.
 */

(function() {
  'use strict';

  let _panelEl = null;

  function injectStyles() {
    if (document.getElementById('rts-groups-styles')) return;

    const style = document.createElement('style');
    style.id = 'rts-groups-styles';
    style.textContent = `
      #rts-groups-panel {
        position: fixed;
        left: 20px;
        top: 250px;
        z-index: 120;
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: 'Outfit', sans-serif;
        user-select: none;
      }

      .rts-group-indicator {
        width: 44px;
        height: 44px;
        background: rgba(6, 11, 26, 0.75);
        border: 1px solid rgba(0, 255, 204, 0.22);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        color: rgba(0, 255, 204, 0.45);
        transition: all 0.25s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      .rts-group-indicator.active {
        color: #ffffff;
        background: rgba(6, 11, 26, 0.94);
        border-color: rgba(0, 255, 204, 0.75);
        box-shadow: 0 0 12px rgba(0, 255, 204, 0.35);
        font-weight: 700;
      }

      .rts-group-indicator:hover {
        border-color: #00ffcc;
        box-shadow: 0 0 15px rgba(0, 255, 204, 0.55);
        transform: scale(1.05);
      }

      .rts-group-num {
        font-size: 13px;
        font-family: 'JetBrains Mono', monospace;
      }

      .rts-group-count {
        position: absolute;
        bottom: 2px;
        right: 4px;
        font-size: 9px;
        font-weight: 700;
        font-family: 'JetBrains Mono', monospace;
        color: #00ffcc;
        text-shadow: 0 0 4px rgba(0, 255, 204, 0.5);
      }
    `;
    document.head.appendChild(style);
  }

  function ensurePanelEl() {
    if (_panelEl) return _panelEl;

    injectStyles();

    _panelEl = document.createElement('div');
    _panelEl.id = 'rts-groups-panel';
    document.body.appendChild(_panelEl);

    return _panelEl;
  }

  // --- ACTIONS ---

  let _lastClickTime = 0;
  let _lastGroupNum = -1;

  window.__rts_recall_group = function(num) {
    const bridge = window.RTSBridge;
    if (!bridge || !bridge.selection) return;

    const now = performance.now();
    const isDoubleClick = (_lastGroupNum === num && (now - _lastClickTime) < 300);
    _lastClickTime = now;
    _lastGroupNum = num;

    // Selection recall
    bridge.selection.recallGroup(num);

    if (isDoubleClick) {
      // Center camera on group average position
      centerCameraOnGroup(num);
    }
  };

  function centerCameraOnGroup(groupNum) {
    const bridge = window.RTSBridge;
    const camera = window.__rtsCamera;
    const entities = window.RTSEngineCore?.ENTITIES;
    if (!bridge || !camera || !entities || !camera.rtsTarget) return;

    const group = bridge.groups ? bridge.groups.get(groupNum) : null;
    if (!group || group.size === 0) return;

    let sumX = 0, sumZ = 0, count = 0;
    for (const id of group) {
      const ent = entities.get(id);
      if (ent && ent.mesh) {
        sumX += ent.mesh.position.x;
        sumZ += ent.mesh.position.z;
        count++;
      }
    }

    if (count > 0) {
      camera.rtsTarget.set(sumX / count, camera.rtsTarget.y, sumZ / count);
      console.log(`[RTS Group Panel] Centered camera on Control Group ${groupNum}`);
    }
  }

  // --- UPDATE PANEL ---

  function updatePanel() {
    const bridge = window.RTSBridge;
    if (!bridge || !bridge.groups) {
      if (_panelEl) _panelEl.style.display = 'none';
      return;
    }

    const panel = ensurePanelEl();
    panel.style.display = 'flex';

    let html = '';
    // Groups 1 to 9
    for (let i = 1; i <= 9; i++) {
      const group = bridge.groups.get(i);
      const count = group ? group.size : 0;
      const isActive = count > 0;

      html += `
        <div class="rts-group-indicator ${isActive ? 'active' : ''}" onclick="window.__rts_recall_group(${i})">
          <span class="rts-group-num">${i}</span>
          ${isActive ? `<span class="rts-group-count">${count}</span>` : ''}
        </div>
      `;
    }

    panel.innerHTML = html;
  }

  // Poll control group states (10Hz) to keep HUD counts accurate
  setInterval(updatePanel, 100);

  window.RTSGroupsPanel = {
    init: function() {
      ensurePanelEl();
      console.log('[RTS Group Panel] Control group indicator HUD initialized.');
    }
  };

  // Auto init
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.RTSGroupsPanel.init();
  } else {
    document.addEventListener('DOMContentLoaded', window.RTSGroupsPanel.init);
  }

})();