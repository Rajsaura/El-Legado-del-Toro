/**
 * ==========================================================================
 * EL LEGADO DEL TORO — Sección 2: El Arte
 * Archivo: sections/arte/script.js
 * Autor: Krishna Mishra | Por Krishna Mishra, Sección 2: El Arte
 *
 * Funcionalidades:
 *  1. Filtros de categoría (Todas / Traje de Luces / Carteles / Plazas / Pintura)
 *  2. Modal de inspección de obra (apertura, cierre con Escape, cierre con backdrop)
 *
 * Todo el código está encapsulado en una IIFE para evitar variables globales.
 * ==========================================================================
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────────────────────
     SELECTORES DE ELEMENTOS
  ────────────────────────────────────────────────────────────────────────── */
  const filterBar      = document.getElementById('arte-filter-bar');
  const filterBtns     = filterBar ? Array.from(filterBar.querySelectorAll('.arte-filter-btn')) : [];
  const galleryGrid    = document.getElementById('arte-gallery-grid');
  const cards          = galleryGrid ? Array.from(galleryGrid.querySelectorAll('.arte-card')) : [];
  const countEl        = document.getElementById('arte-count-number');
  const noResultsEl    = document.getElementById('arte-no-results');

  // Modal
  const modalBackdrop  = document.getElementById('arte-modal-backdrop');
  const modalEl        = document.getElementById('arte-modal');
  const modalCloseBtn  = document.getElementById('arte-modal-close');
  const modalCloseBtnFooter = document.getElementById('arte-modal-close-btn');

  // Modal fields
  const modalCategory  = document.getElementById('arte-modal-category');
  const modalTitle     = document.getElementById('arte-modal-title');
  const modalIcon      = document.getElementById('arte-modal-icon');
  const modalYear      = document.getElementById('arte-modal-year');
  const modalOrigin    = document.getElementById('arte-modal-origin');
  const modalMedium    = document.getElementById('arte-modal-medium');
  const modalMuseum    = document.getElementById('arte-modal-museum');
  const modalDescText  = document.getElementById('arte-modal-desc-text');

  // Track focus before modal opens (for restoration)
  let focusTrigger = null;

  /* ──────────────────────────────────────────────────────────────────────────
     CATEGORY → LABEL MAP
  ────────────────────────────────────────────────────────────────────────── */
  var CATEGORY_LABELS = {
    traje:    'Traje de Luces',
    carteles: 'Carteles Taurinos',
    plazas:   'Plazas de Toros',
    pintura:  'Pintura (Goya / Picasso)',
    all:      'Todas las categorías'
  };

  // Map data-category to the icon emoji shown inside each placeholder
  var CATEGORY_ICONS = {
    traje:    '🧵',
    carteles: '🎨',
    plazas:   '🏟️',
    pintura:  '🖌️'
  };

  /* ──────────────────────────────────────────────────────────────────────────
     1. FILTROS DE CATEGORÍA
  ────────────────────────────────────────────────────────────────────────── */

  function applyFilter(selectedFilter) {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute('data-category') || '';
      var isMatch  = (selectedFilter === 'all') || (category === selectedFilter);

      if (isMatch) {
        card.classList.remove('arte-card--hidden');
        // Trigger enter animation
        card.classList.remove('arte-card--entering');
        // Force reflow so the animation re-triggers
        void card.offsetWidth;
        card.classList.add('arte-card--entering');
        visibleCount++;
      } else {
        card.classList.add('arte-card--hidden');
        card.classList.remove('arte-card--entering');
      }
    });

    // Update count
    if (countEl) {
      countEl.textContent = visibleCount;
    }

    // Show / hide empty state
    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.removeAttribute('hidden');
      } else {
        noResultsEl.setAttribute('hidden', '');
      }
    }
  }

  function handleFilterClick(evt) {
    var btn = evt.currentTarget;
    var filter = btn.getAttribute('data-filter') || 'all';

    // Update aria-pressed and active class
    filterBtns.forEach(function (b) {
      var isActive = (b === btn);
      b.setAttribute('aria-pressed', String(isActive));
      if (isActive) {
        b.classList.add('arte-filter-btn--active');
      } else {
        b.classList.remove('arte-filter-btn--active');
      }
    });

    applyFilter(filter);
  }

  // Attach filter listeners
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', handleFilterClick);
  });

  /* ──────────────────────────────────────────────────────────────────────────
     2. MODAL DE INSPECCIÓN
  ────────────────────────────────────────────────────────────────────────── */

  function openModal(card) {
    if (!modalBackdrop || !card) return;

    var category = card.getAttribute('data-category') || 'all';

    // Populate modal fields
    if (modalCategory) {
      modalCategory.textContent = CATEGORY_LABELS[category] || category;
    }
    if (modalTitle) {
      modalTitle.textContent = card.getAttribute('data-title') || '';
    }
    if (modalIcon) {
      // Try to get the emoji from the card placeholder icon
      var placeholderIcon = card.querySelector('.arte-placeholder-icon');
      modalIcon.textContent = placeholderIcon ? placeholderIcon.textContent : (CATEGORY_ICONS[category] || '🎨');
    }
    if (modalYear) {
      modalYear.textContent = card.getAttribute('data-year') || '—';
    }
    if (modalOrigin) {
      modalOrigin.textContent = card.getAttribute('data-origin') || '—';
    }
    if (modalMedium) {
      modalMedium.textContent = card.getAttribute('data-medium') || '—';
    }
    if (modalMuseum) {
      modalMuseum.textContent = card.getAttribute('data-museum') || '—';
    }
    if (modalDescText) {
      modalDescText.textContent = card.getAttribute('data-desc') || '';
    }

    // Style the modal visual placeholder to match category
    var modalPlaceholder = document.getElementById('arte-modal-placeholder');
    if (modalPlaceholder) {
      // Remove old category classes
      modalPlaceholder.className = 'arte-modal-placeholder';
      // Match gradient from the card
      var gradientMap = {
        traje:    'linear-gradient(135deg, #8B1E1E 0%, #C99700 50%, #8B1E1E 100%)',
        carteles: 'linear-gradient(135deg, #C0392B 0%, #F39C12 50%, #8E1A0E 100%)',
        plazas:   'linear-gradient(135deg, #D4AC7A 0%, #8B6914 50%, #C49A3C 100%)',
        pintura:  'linear-gradient(135deg, #2C1810 0%, #8B6914 50%, #1A0A00 100%)'
      };
      modalPlaceholder.style.background = gradientMap[category] || 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-gold) 100%)';
    }

    // Show modal
    focusTrigger = document.activeElement;
    modalBackdrop.removeAttribute('hidden');
    modalBackdrop.classList.add('arte-modal-backdrop--open');
    document.body.style.overflow = 'hidden';

    // Move focus to close button for accessibility
    if (modalCloseBtn) {
      setTimeout(function () { modalCloseBtn.focus(); }, 50);
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;

    modalBackdrop.setAttribute('hidden', '');
    modalBackdrop.classList.remove('arte-modal-backdrop--open');
    document.body.style.overflow = '';

    // Restore focus
    if (focusTrigger && typeof focusTrigger.focus === 'function') {
      focusTrigger.focus();
    }
    focusTrigger = null;
  }

  // Open on card click or Enter/Space key
  function handleCardActivate(evt) {
    var card = evt.currentTarget;
    if (evt.type === 'keydown') {
      if (evt.key !== 'Enter' && evt.key !== ' ') return;
      evt.preventDefault();
    }
    openModal(card);
  }

  // Open on "Inspeccionar obra" button
  function handleCardBtnClick(evt) {
    evt.stopPropagation();
    var btn  = evt.currentTarget;
    var card = btn.closest('.arte-card');
    if (card) openModal(card);
  }

  // Attach card listeners
  cards.forEach(function (card) {
    card.addEventListener('click', handleCardActivate);
    card.addEventListener('keydown', handleCardActivate);

    var btn = card.querySelector('.arte-card-btn');
    if (btn) {
      btn.addEventListener('click', handleCardBtnClick);
    }
  });

  // Close listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalCloseBtnFooter) {
    modalCloseBtnFooter.addEventListener('click', closeModal);
  }

  // Escape key
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && modalBackdrop && !modalBackdrop.hasAttribute('hidden')) {
      closeModal();
    }
  });

  // Backdrop click (outside modal panel)
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function (evt) {
      if (evt.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────────────────
     INIT — apply default filter and trigger entrance animations
  ────────────────────────────────────────────────────────────────────────── */
  (function init() {
    applyFilter('all');
  })();

})();
