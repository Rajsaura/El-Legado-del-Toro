(function() {
  'use strict';

  function initArteGallery() {
    // Cache DOM elements
    const filterBar = document.getElementById('arte-filter-bar');
    const galleryGrid = document.getElementById('arte-gallery-grid');
    if (!filterBar || !galleryGrid) return;

    const filterButtons = filterBar.querySelectorAll('.arte-filter-btn');
    const cards = galleryGrid.querySelectorAll('.arte-card');
    const countNumber = document.getElementById('arte-count-number');
    const noResults = document.getElementById('arte-no-results');

    const modal = document.getElementById('arte-lightbox-modal');
    const modalCloseBtn = document.getElementById('arte-lightbox-close');
    const modalFooterCloseBtn = document.getElementById('arte-lightbox-footer-close');
    const modalImg = document.getElementById('arte-lightbox-img');
    const modalTitle = document.getElementById('arte-lightbox-title');
    const modalCategory = document.getElementById('arte-lightbox-category');
    const modalYear = document.getElementById('arte-lightbox-year');
    const modalOrigin = document.getElementById('arte-lightbox-origin');
    const modalTechnique = document.getElementById('arte-lightbox-technique');
    const modalMedium = document.getElementById('arte-lightbox-medium');
    const modalMuseum = document.getElementById('arte-lightbox-museum');
    const modalContext = document.getElementById('arte-lightbox-context-text');

    // Helper to update visible count and empty state
    function updateCount() {
      const visible = galleryGrid.querySelectorAll('.arte-card:not([hidden]):not(.arte-hidden)');
      if (countNumber) {
        countNumber.textContent = visible.length;
      }
      if (noResults) {
        const hasVisible = visible.length > 0;
        noResults.hidden = hasVisible;
        noResults.classList.toggle('arte-hidden', hasVisible);
        noResults.style.display = hasVisible ? 'none' : 'block';
      }
    }

    // Filter logic using event delegation on filter bar
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button.arte-filter-btn') || e.target.closest('.arte-filter-btn') || e.target.closest('button');
      if (!btn || !filterBar.contains(btn)) return;

      // Update active state on all buttons
      filterButtons.forEach(b => {
        const isCurrent = (b === btn);
        b.classList.toggle('active', isCurrent);
        b.classList.toggle('arte-active', isCurrent);
        b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });

      const rawFilter = btn.getAttribute('data-filter') || btn.dataset.filter || 'all';
      const filter = rawFilter.trim().toLowerCase();
      const isAll = (filter === 'all' || filter === 'todas');

      cards.forEach(card => {
        const rawCategory = card.getAttribute('data-category') || card.dataset.category || '';
        const category = rawCategory.trim().toLowerCase();
        const matches = isAll || (category === filter);

        card.hidden = !matches;
        card.classList.toggle('arte-hidden', !matches);
        card.style.display = matches ? '' : 'none';
      });

      updateCount();
    });

    // Track last focused card for return focus after closing modal
    let lastFocusedCard = null;

    // Open modal for a card
    function openModal(card) {
      if (!modal) return;
      const imgEl = card.querySelector('img');
      const imgSrc = imgEl ? imgEl.src : '';
      const imgAlt = imgEl ? imgEl.alt : '';
      const title = card.getAttribute('data-title') || card.dataset.title || '';
      const category = card.getAttribute('data-category') || card.dataset.category || '';
      const year = card.getAttribute('data-year') || card.dataset.year || '';
      const origin = card.getAttribute('data-origin') || card.dataset.origin || '';
      const medium = card.getAttribute('data-medium') || card.dataset.medium || '';
      const technique = card.getAttribute('data-technique') || card.dataset.technique || '';
      const context = card.getAttribute('data-context') || card.dataset.context || '';
      const museum = card.getAttribute('data-museum') || card.dataset.museum || '';

      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt || title;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) {
        modalCategory.textContent = category ? (category.charAt(0).toUpperCase() + category.slice(1)) : '';
      }
      if (modalYear) modalYear.textContent = year;
      if (modalOrigin) modalOrigin.textContent = origin;
      if (modalMedium) modalMedium.textContent = medium;
      if (modalTechnique) modalTechnique.textContent = technique;
      if (modalMuseum) modalMuseum.textContent = museum;
      if (modalContext) modalContext.textContent = context;

      modal.hidden = false;
      modal.classList.remove('arte-hidden');
      modal.style.display = 'flex';

      // Focus close button for accessibility
      if (modalCloseBtn) {
        modalCloseBtn.focus();
      }
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    // Close modal
    function closeModal() {
      if (!modal) return;
      modal.hidden = true;
      modal.classList.add('arte-hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
      // Return focus to the last active card if any
      if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
        lastFocusedCard.focus();
      }
    }

    // Card button click handling via delegation on gallery grid
    galleryGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.arte-card-btn');
      if (!btn) return;
      const card = btn.closest('.arte-card');
      if (!card) return;
      lastFocusedCard = card;
      openModal(card);
    });

    // Keyboard accessibility for cards (Enter / Space)
    galleryGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target && e.target.tagName === 'BUTTON') return;
        const card = e.target.closest('.arte-card');
        if (card) {
          e.preventDefault();
          lastFocusedCard = card;
          openModal(card);
        }
      }
    });

    // Modal close events
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }
    if (modalFooterCloseBtn) {
      modalFooterCloseBtn.addEventListener('click', closeModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });

    // Initialize count and state on page load
    updateCount();
  }

  // Ensure DOM is ready before initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArteGallery);
  } else {
    initArteGallery();
  }
})();
