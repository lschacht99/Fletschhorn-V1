(function(){
  function initMobileMenu(){
    const openBtn=document.querySelector('[data-fh-menu-open]');
    const closeBtn=document.querySelector('[data-fh-menu-close]');
    const menu=document.querySelector('[data-fh-mobile-menu]');
    const backdrop=document.querySelector('[data-fh-menu-backdrop]');
    if(!openBtn||!menu) return;
    const focusable='a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
    let previousFocus=null;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function setOpen(open){
      menu.classList.toggle('is-open',open); backdrop&&backdrop.classList.toggle('is-open',open);
      menu.setAttribute('aria-hidden',String(!open)); openBtn.setAttribute('aria-expanded',String(open));
      document.body.style.overflow=open?'hidden':'';
      if(open){ previousFocus=document.activeElement; const first=menu.querySelector(focusable); first&&first.focus({preventScroll:reduced}); }
      else if(previousFocus){ previousFocus.focus({preventScroll:reduced}); }
    }
    openBtn.addEventListener('click',()=>setOpen(true));
    closeBtn&&closeBtn.addEventListener('click',()=>setOpen(false));
    backdrop&&backdrop.addEventListener('click',()=>setOpen(false));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&menu.classList.contains('is-open')) setOpen(false);
      if(e.key==='Tab'&&menu.classList.contains('is-open')){
        const nodes=[...menu.querySelectorAll(focusable)].filter(n=>!n.disabled);
        if(!nodes.length) return; const first=nodes[0], last=nodes[nodes.length-1];
        if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
      }
    });
    menu.addEventListener('click',e=>{ if(e.target.closest('a')) setOpen(false); });
  }
  function initReveal(){
    const els=document.querySelectorAll('.fh-scroll-reveal,.fh-sharp-card,.fh-image-panel');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(el=>el.classList.add('is-visible'));return;}
    const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target);}}),{threshold:.12});
    els.forEach(el=>{el.classList.add('fh-scroll-reveal');io.observe(el);});
  }
  function initForms(){
    document.addEventListener('submit',e=>{ if(e.target.matches('[data-fh-inquiry-form],[data-fh-contact-form]')){ e.preventDefault(); location.hash='contact-booking'; alert('Thank you. This inquiry placeholder is ready to connect to Squarespace Forms, Zapier, Google Sheets or a custom API.'); }});
  }
  window.FHUi={initMobileMenu,initReveal,initForms};
})();
