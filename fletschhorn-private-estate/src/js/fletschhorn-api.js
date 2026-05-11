(function(){
  const fallback = window.FH_FALLBACK_PROPERTY || null;
  async function getProperty(){
    const cfg = window.FH_CONFIG || {};
    if(!cfg.useApi || !cfg.apiEndpoint) return fallback;
    try{
      const res = await fetch(cfg.apiEndpoint,{headers:{Accept:'application/json'}});
      if(!res.ok) throw new Error('API unavailable');
      return await res.json();
    }catch(error){
      console.warn('Fletschhorn API fallback active:', error.message);
      return fallback;
    }
  }
  function applyProperty(data){
    if(!data) return;
    window.FH_CURRENT_PROPERTY = data;
    document.documentElement.style.setProperty('--fh-max-guests', JSON.stringify(data.maxGuests));
    (data.images||[]).forEach(img=>{ if(img.url) document.documentElement.style.setProperty(`--fh-${img.category}-image`, `url("${img.url}")`); });
    document.querySelectorAll('[data-fh-property-name]').forEach(el=>el.textContent=data.propertyName);
    document.querySelectorAll('[data-fh-inquiry-email]').forEach(el=>{el.textContent=data.inquiryEmail; el.href='mailto:'+data.inquiryEmail;});
    if(window.FHPopups && typeof window.FHPopups.applyPopImages === 'function') window.FHPopups.applyPopImages(data);
  }
  window.FHApi = { getProperty, applyProperty };
})();
