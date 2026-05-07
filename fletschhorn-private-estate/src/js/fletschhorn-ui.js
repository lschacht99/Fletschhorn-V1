(function(){
  let closeMenuRef = null;
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
    closeMenuRef = () => setOpen(false);
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
    const els=document.querySelectorAll('.fh-scroll-reveal,.fh-sharp-card,.fh-image-panel,.fh-story-chapter,.fh-arrival-steps > div,.fh-wedding-card');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(el=>el.classList.add('is-visible'));return;}
    const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-visible');io.unobserve(en.target);}}),{threshold:.12});
    els.forEach(el=>{el.classList.add('fh-scroll-reveal');io.observe(el);});
  }
  function initForms(){
    document.addEventListener('submit',e=>{
      if(e.target.matches('[data-fh-inquiry-form]')){ e.preventDefault(); location.hash='contact-booking'; }
      if(e.target.matches('[data-fh-contact-form]')){ e.preventDefault(); const msg=(window.FH_TRANSLATIONS?.[localStorage.getItem('fh_language')||'en']?.['booking.confirmation']) || 'Thank you. Your inquiry is ready to connect.'; alert(msg); }
    });
  }
  function activateTabs(root, tabSelector, panelSelector, attr){
    const tabs=[...root.querySelectorAll(tabSelector)], panels=[...root.querySelectorAll(panelSelector)];
    function show(id){
      tabs.forEach((t,i)=>{ const active=(t.getAttribute(attr)===id)||(!id&&i===0); t.toggleAttribute('aria-selected',active); t.tabIndex=active?0:-1; });
      panels.forEach((p,i)=>p.classList.toggle('is-active',(p.getAttribute(attr.replace('-tab','-panel'))===id)||(!id&&i===0)));
      if(window.FHPopups && typeof window.FHPopups.syncPopTab === 'function') window.FHPopups.syncPopTab(root, id);
    }
    tabs.forEach(t=>{ t.addEventListener('click',()=>show(t.getAttribute(attr))); t.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); const i=tabs.indexOf(t), n=e.key==='ArrowRight' ? (i+1)%tabs.length : (i-1+tabs.length)%tabs.length; tabs[n].focus(); tabs[n].click(); } }); });
    show(tabs[0]&&tabs[0].getAttribute(attr));
  }
  function initEstateExplorer(){ document.querySelectorAll('[data-fh-estate-explorer]').forEach(root=>activateTabs(root,'[data-fh-estate-tab]','[data-fh-estate-panel]','data-fh-estate-tab')); }
  function initExperienceToggle(){ document.querySelectorAll('[data-fh-experience-toggle]').forEach(root=>activateTabs(root,'[data-fh-experience-tab]','[data-fh-experience-panel]','data-fh-experience-tab')); }
  function initStoryDisclosures(){ document.querySelectorAll('[data-fh-disclosure]').forEach((root,index)=>{ const btn=root.querySelector('[data-fh-disclosure-toggle]'), panel=root.querySelector('[data-fh-disclosure-panel]'); if(!btn||!panel) return; const id='fh-story-'+index; panel.id=id; btn.setAttribute('aria-controls',id); function set(open){ root.classList.toggle('is-open',open); btn.setAttribute('aria-expanded',String(open)); } btn.addEventListener('click',()=>set(!root.classList.contains('is-open'))); set(index===0); }); }
  function initStickyMobileCta(){ const bar=document.querySelector('[data-fh-mobile-sticky-cta]'); if(!bar) return; function update(){ const footer=document.querySelector('.fh-footer'); const footerTop=footer?footer.getBoundingClientRect().top:Infinity; bar.classList.toggle('is-visible', window.scrollY>220 && footerTop>window.innerHeight+40); } window.addEventListener('scroll',update,{passive:true}); window.addEventListener('fh:page-change',update); update(); }
  window.FHUi={initMobileMenu,closeMobileMenu:()=>closeMenuRef&&closeMenuRef(),initReveal,initForms,initEstateExplorer,initExperienceToggle,initStoryDisclosures,initStickyMobileCta};
})();
