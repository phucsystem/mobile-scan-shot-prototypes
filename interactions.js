/* ==========================================================================
   Mobile Scan Shot - CJX Animations & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Prototype Navigation Bar --- */
  (function buildProtoNav() {
    var screens = [
      { file: 's00-splash.html', label: 'S00 Splash' },
      { file: 's01-home-gallery-empty.html', label: 'S01 Empty' },
      { file: 's01-home-gallery.html', label: 'S01 Gallery' },
      { file: 's02-camera.html', label: 'S02 Camera' },
      { file: 's03-preview-edit.html', label: 'S03 Preview' },
      { file: 's04-scan-session.html', label: 'S04 Session' },
      { file: 's05-export.html', label: 'S05 Export' },
    ];
    var currentFile = window.location.pathname.split('/').pop() || '';
    var nav = document.createElement('nav');
    nav.className = 'proto-nav';
    nav.innerHTML = '<span class="proto-nav-label">Screens</span>';
    screens.forEach(function (screen) {
      var link = document.createElement('a');
      link.href = screen.file;
      link.textContent = screen.label;
      if (currentFile === screen.file) {
        link.className = 'active';
      }
      nav.appendChild(link);
    });
    document.body.insertBefore(nav, document.body.firstChild);
  })();

  /* --- CJX Stage Entrance Animations --- */
  const cjxStage = document.body.className;

  const entranceElements = document.querySelectorAll('[data-cjx-entrance]');
  entranceElements.forEach(function (element, index) {
    element.style.opacity = '0';
    const delay = index * 80;

    setTimeout(function () {
      element.style.transition = getTransitionForStage(cjxStage);
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  });

  function getTransitionForStage(stage) {
    if (stage.includes('cjx-onboarding')) {
      return 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
    if (stage.includes('cjx-usage')) {
      return 'opacity 0.3s ease, transform 0.3s ease';
    }
    if (stage.includes('cjx-retention')) {
      return 'opacity 0.4s ease, transform 0.4s ease';
    }
    if (stage.includes('cjx-discovery')) {
      return 'opacity 0.8s ease-out, transform 0.8s ease-out';
    }
    return 'opacity 0.4s ease, transform 0.4s ease';
  }

  /* --- Filter Pill Toggle --- */
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      filterPills.forEach(function (otherPill) {
        otherPill.classList.remove('active');
      });
      pill.classList.add('active');
    });
  });

  /* --- Export Format Card Selection --- */
  const formatCards = document.querySelectorAll('.format-card');
  formatCards.forEach(function (card) {
    card.addEventListener('click', function () {
      formatCards.forEach(function (otherCard) {
        otherCard.classList.remove('selected');
      });
      card.classList.add('selected');
    });
  });

  /* --- Page Strip Thumb Selection --- */
  const pageStripThumbs = document.querySelectorAll('.page-strip-thumb');
  pageStripThumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      pageStripThumbs.forEach(function (otherThumb) {
        otherThumb.classList.remove('active');
      });
      thumb.classList.add('active');
    });
  });

  /* --- Search Toggle --- */
  const searchToggle = document.querySelector('[data-search-toggle]');
  const searchBar = document.querySelector('.search-bar');
  if (searchToggle && searchBar) {
    searchBar.style.display = 'none';
    searchToggle.addEventListener('click', function () {
      const isVisible = searchBar.style.display !== 'none';
      searchBar.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        const searchInput = searchBar.querySelector('input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
  }

  /* --- Camera Guidance Fade --- */
  var guidance = document.querySelector('.camera-guidance');
  if (guidance) {
    setTimeout(function () {
      guidance.style.transition = 'opacity 0.5s ease';
      guidance.style.opacity = '0';
    }, 3000);
  }

  /* --- Edge Overlay Pulse Animation --- */
  var edgePolygon = document.querySelector('.edge-overlay polygon');
  if (edgePolygon) {
    var pulseState = true;
    setInterval(function () {
      edgePolygon.setAttribute('fill',
        pulseState ? 'rgba(66,165,245,0.1)' : 'rgba(66,165,245,0.05)'
      );
      pulseState = !pulseState;
    }, 1200);
  }

  /* --- Capture Button Haptic Simulation --- */
  const captureBtn = document.querySelector('.capture-btn');
  if (captureBtn) {
    captureBtn.addEventListener('click', function () {
      captureBtn.style.transform = 'scale(0.9)';
      setTimeout(function () {
        captureBtn.style.transform = 'scale(1)';
      }, 100);
    });
  }

  /* --- Context Menu (Long Press on Doc Card) --- */
  const docCards = document.querySelectorAll('.doc-card');
  let longPressTimer = null;

  docCards.forEach(function (card) {
    card.addEventListener('mousedown', function (event) {
      longPressTimer = setTimeout(function () {
        showContextMenu(event, card);
      }, 500);
    });

    card.addEventListener('mouseup', function () {
      clearTimeout(longPressTimer);
    });

    card.addEventListener('mouseleave', function () {
      clearTimeout(longPressTimer);
    });
  });

  function showContextMenu(event, card) {
    hideAllContextMenus();
    const menu = document.querySelector('.context-menu');
    if (menu) {
      const rect = card.getBoundingClientRect();
      const appLayout = document.querySelector('.app-layout');
      const appRect = appLayout.getBoundingClientRect();
      menu.style.top = (rect.bottom - appRect.top) + 'px';
      menu.style.left = (rect.left - appRect.left + 10) + 'px';
      menu.classList.add('show');
    }
  }

  function hideAllContextMenus() {
    document.querySelectorAll('.context-menu').forEach(function (menu) {
      menu.classList.remove('show');
    });
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.context-menu')) {
      hideAllContextMenus();
    }
  });

  /* --- Flash Toggle Cycle --- */
  const flashBtn = document.querySelector('.flash-btn');
  if (flashBtn) {
    const flashStates = ['auto', 'on', 'off'];
    let flashIndex = 0;

    flashBtn.addEventListener('click', function () {
      flashIndex = (flashIndex + 1) % flashStates.length;
      const label = flashBtn.querySelector('.flash-label');
      if (label) {
        label.textContent = flashStates[flashIndex];
      }
    });
  }

  /* --- Bottom Sheet Dismiss (Swipe down) --- */
  const sheetOverlay = document.querySelector('.bottom-sheet-overlay');
  if (sheetOverlay) {
    sheetOverlay.addEventListener('click', function (event) {
      if (event.target === sheetOverlay) {
        sheetOverlay.style.display = 'none';
      }
    });
  }

  /* --- Toast Show Helper --- */
  window.showToast = function (message) {
    const toast = document.querySelector('.toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
      }, 2500);
    }
  };

});
