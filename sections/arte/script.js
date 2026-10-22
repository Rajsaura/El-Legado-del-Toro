(function() {
  'use strict';

  // Cache DOM elements
  const filterBar = document.getElementById('arte-filter-bar');
  const filterButtons = filterBar.querySelectorAll('.arte-filter-btn');
  const galleryGrid = document.getElementById('arte-gallery-grid');
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
    const visible = galleryGrid.querySelectorAll('.arte-card:not([hidden])');
    countNumber.textContent = visible.length;
    noResults.hidden = visible.length > 0;
  }

  // Filter logic
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.arte-filter-btn');
    if (!btn) return;
    // Update active state
    filterButtons.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.hidden = !matches;
    });
    updateCount();
  });

  // Open modal for a card
  function openModal(card) {
    const imgSrc = card.querySelector('img').src;
    const title = card.dataset.title || '';
    const category = card.dataset.category || '';
    const year = card.dataset.year || '';
    const origin = card.dataset.origin || '';
    const medium = card.dataset.medium || '';
    const technique = card.dataset.technique || '';
    const context = card.dataset.context || '';
    const museum = card.dataset.museum || '';

    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    modalYear.textContent = year;
    modalOrigin.textContent = origin;
    modalMedium.textContent = medium;
    modalTechnique.textContent = technique;
    modalMuseum.textContent = museum;
    modalContext.textContent = context;

    modal.hidden = false;
    // Focus close button for accessibility
    modalCloseBtn.focus();
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  // Close modal
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    // Return focus to the last active card if any
    if (lastFocusedCard) {
      lastFocusedCard.focus();
    }
  }

  // Track last focused card for return focus after closing
  let lastFocusedCard = null;

  // Card button click handling
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
      const card = e.target.closest('.arte-card');
      if (card) {
        e.preventDefault();
        lastFocusedCard = card;
        openModal(card);
      }
    }
  });

  // Modal close events
  modalCloseBtn.addEventListener('click', closeModal);
  modalFooterCloseBtn.addEventListener('click', closeModal);
  // Also allow clicking outside the panel to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  // Initialize count on page load
  updateCount();
})();
