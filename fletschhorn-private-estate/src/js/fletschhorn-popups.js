(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  let mouseBound = false;

  function imageMap(data){
    const map = {};
    ((data && data.images) || (window.FH_FALLBACK_PROPERTY && window.FH_FALLBACK_PROPERTY.images) || []).forEach(img => {
      if(img && img.category) map[img.category] = img;
    });
    return map;
  }

  function applyPopImages(data){
    const map = imageMap(data);
    document.querySelectorAll('[data-fh-image]').forEach(img => {
      const category = img.getAttribute('data-fh-image');
      const item = map[category];
      if(item && item.url){
        img.src = item.url;
        img.alt = item.alt || '';
        img.removeAttribute('data-fh-empty');
      } else {
        img.removeAttribute('src');
        img.alt = '';
        img.setAttribute('data-fh-empty','true');
      }
    });
  }

  function revealLayer(layer){
    layer.querySelectorAll('.fh-pop-image').forEach((item,index) => {
      const delay = reduceMotion ? 0 : index * 130;
      window.setTimeout(() => item.classList.add('is-visible'), delay);
    });
  }

  function initPopImages(){
    const layers = document.querySelectorAll('.fh-pop-image-layer');
    if(!layers.length) return;
    applyPopImages(window.FH_CURRENT_PROPERTY || window.FH_FALLBACK_PROPERTY);
    if('IntersectionObserver' in window){
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(!entry.isIntersecting) return;
          revealLayer(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.18 });
      layers.forEach(layer => observer.observe(layer));
    } else {
      layers.forEach(revealLayer);
    }
    if(!reduceMotion && !mobileQuery.matches && !mouseBound){
      window.addEventListener('mousemove', handlePopImageMouseMove, { passive:true });
      window.addEventListener('scroll', handlePopImageScroll, { passive:true });
      mouseBound = true;
    }
  }

  function handlePopImageMouseMove(event){
    const x = (event.clientX / window.innerWidth - .5) * 10;
    const y = (event.clientY / window.innerHeight - .5) * 10;
    document.querySelectorAll('.fh-pop-image.is-visible').forEach((item,index) => {
      const depth = (index + 1) * .18;
      item.style.setProperty('--cursor-x', `${x * depth}px`);
      item.style.setProperty('--cursor-y', `${y * depth}px`);
    });
  }

  function handlePopImageScroll(){
    const y = Math.min(18, window.scrollY * .018);
    document.documentElement.style.setProperty('--pop-scroll-y', `${y}px`);
  }

  function syncPopTab(root, id){
    const page = root.closest('[data-fh-page]') || document;
    page.querySelectorAll('.fh-pop-image[data-pop-tab]').forEach(item => {
      item.classList.toggle('is-tab-active', item.getAttribute('data-pop-tab') === id);
    });
  }

  document.addEventListener('DOMContentLoaded', initPopImages);
  window.FHPopups = { initPopImages, applyPopImages, syncPopTab };
  window.FH_initPopImages = initPopImages;
})();
