// EYES OPEN interactions: image carousels, scroll progress, mobile navigation.
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progressBar");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".desktop-nav");

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }));

  document.querySelectorAll(".scene").forEach(scene => {
    const slides = [...scene.querySelectorAll(".image-slides img")];
    if (slides.length < 2) return;
    let current = 0;
    let timer = null;
    let visible = false;
    let paused = false;
    const controls = scene.querySelector(".carousel-controls");
    const counter = controls?.querySelector("span");

    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      if (counter) counter.innerHTML = `${String(current + 1).padStart(2, "0")} <i></i> ${String(slides.length).padStart(2, "0")}`;
    };
    const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (visible && !paused && !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = window.setInterval(() => show(current + 1), 3000);
      }
    };
    controls?.querySelector("[data-prev]")?.addEventListener("click", () => { show(current - 1); start(); });
    controls?.querySelector("[data-next]")?.addEventListener("click", () => { show(current + 1); start(); });

    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.12 });
    observer.observe(scene);
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'carousel-pause';
    pauseButton.textContent = 'Pause images';
    pauseButton.setAttribute('aria-pressed', 'false');
    pauseButton.addEventListener('click', () => {
      paused = !paused;
      pauseButton.textContent = paused ? 'Play images' : 'Pause images';
      pauseButton.setAttribute('aria-pressed', String(paused));
      if (paused) stop(); else start();
    });
    scene.append(pauseButton);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    motion.addEventListener('change', () => { if (motion.matches) stop(); else start(); });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  });
});

// Local prototype state. No server verification, payments or real bookings.
document.addEventListener('DOMContentLoaded', () => {
  const events = [
    {id:'tree-care',name:'Neighbourhood tree-care morning',category:'greening',city:'Tashkent',description:'Explore how a supervised tree-care session could work.',notes:'Sample venue and organiser to be confirmed. Accessibility, equipment and watering plans must be checked before a real event.'},
    {id:'repair',name:'Repair & share meetup',category:'reuse',city:'Tashkent',description:'Practice registering for a community repair and exchange session.',notes:'Sample venue and organiser to be confirmed. A real session would need trained repair support; no hazardous waste collection is proposed.'},
    {id:'climate-class',name:'Climate questions, local actions',category:'education',city:'Online',description:'Explore a sample environmental literacy workshop.',notes:'Online platform, facilitator and accessibility arrangements are not confirmed.'}
  ];
  const products = [
    {id:'bottle',name:'A bottle you already own',category:'reuse',description:'Reuse a suitable bottle and care for it according to its manufacturer’s guidance.',detail:'Sample reusable-essential concept. No seller, price, stock or product certification is verified.'},
    {id:'repair-service',name:'Repair before replacing',category:'repair',description:'Consider repairing a useful bag or garment before buying another.',detail:'Sample repair-service concept. A real listing would need a confirmed provider, scope and quote.'},
    {id:'book-swap',name:'Give a book another reader',category:'exchange',description:'Explore a book exchange for items in usable condition.',detail:'Sample exchange concept. No inventory, collection point or exchange partner is confirmed.'}
  ];
  const key='ecopulse-prototype-v1';
  const empty=()=>({name:'',registered:[],attended:[],saved:[]});
  let state=empty(), storageOK=true;
  try {
    const raw=JSON.parse(localStorage.getItem(key)||'null');
    if(raw && typeof raw==='object') {
      state.name=typeof raw.name==='string'?raw.name.slice(0,50):'';
      for(const field of ['registered','attended','saved']) state[field]=[...new Set(Array.isArray(raw[field])?raw[field]:[])].filter(id=>(field==='saved'?products:events).some(item=>item.id===id));
      state.attended=state.attended.filter(id=>state.registered.includes(id));
    }
  } catch { storageOK=false; }
  const $=id=>document.getElementById(id);
  let toast;
  const announce=message=>{ $('appStatus').textContent=message;clearTimeout(toast);toast=setTimeout(()=>$('appStatus').textContent='',7000); };
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));storageOK=true;}catch{storageOK=false;} if(!storageOK)announce('Storage is unavailable. Changes last only while this page is open.');};
  const button=(text,action,secondary=false)=>{const b=document.createElement('button');b.type='button';b.className='ep-button'+(secondary?' ep-secondary':'');b.textContent=text;b.addEventListener('click',action);return b;};
  const paragraph=text=>{const p=document.createElement('p');p.textContent=text;return p;};
  const card=(item,tag)=>{const a=document.createElement('article');a.className='ep-card';const t=document.createElement('span');t.className='ep-tag';t.textContent=tag;const h=document.createElement('h3');h.textContent=item.name;a.append(t,h,paragraph(item.description));return a;};
  const details=(item,type)=>{
    const host=$('detailContent');host.replaceChildren();const h=document.createElement('h2');h.textContent=item.name;
    host.append(paragraph(type==='event'?'SAMPLE EVENT · NOT A REAL BOOKING':'SAMPLE IDEA · NOT FOR SALE'),h,paragraph(item.description));
    if(type==='event')host.append(paragraph(`${item.city} · Date/time: not scheduled · Capacity: not confirmed`),paragraph(item.notes),paragraph('Registration is stored in this browser only. No personal information is sent to an organiser.'),button(state.registered.includes(item.id)?'View my registration':'Register for sample event',()=>{
      if(!state.registered.includes(item.id)){state.registered.push(item.id);save();render();announce('Sample registration saved. No real event booking was made.');}
      $('detailDialog').close();location.hash='profile';
    }));
    else host.append(paragraph(item.detail),button(state.saved.includes(item.id)?'Remove saved idea':'Save idea',()=>{state.saved=state.saved.includes(item.id)?state.saved.filter(id=>id!==item.id):[...state.saved,item.id];save();render();$('detailDialog').close();announce('Saved ideas updated.');}));
    $('detailDialog').showModal();
  };
  const renderEvents=()=>{
    const query=$('eventSearch').value.trim().toLowerCase(),category=$('eventCategory').value,format=$('eventFormat').value;
    const filtered=events.filter(e=>(category==='all'||e.category===category)&&(format==='all'||e.city===format)&&`${e.name} ${e.description} ${e.category}`.toLowerCase().includes(query));
    $('eventCards').replaceChildren();$('eventCount').textContent=`${filtered.length} sample ${filtered.length===1?'activity':'activities'} found`;
    for(const e of filtered){const c=card(e,`SAMPLE · ${e.city.toUpperCase()}`);c.append(paragraph('Date & organiser: to be confirmed'),button(state.registered.includes(e.id)?'Registered · view details':'Explore sample event',()=>details(e,'event')));$('eventCards').append(c);}
    if(!filtered.length)$('eventCards').append(paragraph('No activities match. Try another category or search.'));
  };
  const render=()=>{
    renderEvents();$('productCards').replaceChildren();
    for(const p of products.filter(p=>$('marketCategory').value==='all'||p.category===$('marketCategory').value)){const c=card(p,'SAMPLE CONCEPT');c.append(button(state.saved.includes(p.id)?'Saved · view idea':'Explore idea',()=>details(p,'product')));$('productCards').append(c);}
    $('savedCount').textContent=`${state.saved.length} saved ${state.saved.length===1?'idea':'ideas'} · No checkout or reward redemption is enabled.`;
    $('profileGreeting').textContent=state.name?`${state.name}’s activity`:'Your activity';
    $('registrationTotal').textContent=state.registered.length;$('attendanceTotal').textContent=state.attended.length;$('pointsTotal').textContent=state.attended.length*50;
    $('registrations').replaceChildren();$('demoAttendance').replaceChildren();
    for(const id of state.registered){const e=events.find(e=>e.id===id),row=document.createElement('article');row.append(paragraph(`${e.name} — ${state.attended.includes(id)?'Demo attendance recorded · 50 demo points':'Sample registration · awaiting demonstration'}`));
      if(!state.attended.includes(id)){row.append(button('Cancel sample registration',()=>{state.registered=state.registered.filter(x=>x!==id);save();render();announce('Sample registration cancelled.');},true));$('demoAttendance').append(button(`Simulate: ${e.name}`,()=>{if(!state.registered.includes(id)||state.attended.includes(id))return;state.attended.push(id);save();render();announce('Demo attendance recorded: 50 demo points. No real attendance verified.');}));}
      $('registrations').append(row);
    }
    if(!state.registered.length)$('registrations').append(paragraph('No sample registrations yet. Explore Take Action to try the journey.'));
    if(state.registered.every(id=>state.attended.includes(id)))$('demoAttendance').append(paragraph('Register for an uncompleted sample activity to try attendance.'));
  };
  $('displayName').value=state.name;
  $('profileForm').addEventListener('submit',e=>{e.preventDefault();const name=$('displayName').value.trim();if(!name){$('displayName').setCustomValidity('Enter a display name.');$('displayName').reportValidity();return;}state.name=name;save();render();if(storageOK)announce('Profile saved on this device.');});
  $('displayName').addEventListener('input',()=>$('displayName').setCustomValidity(''));
  $('resetData').addEventListener('click',()=>{if(!confirm('Clear your display name, sample registrations, demo points and saved ideas on this device?'))return;state=empty();save();$('displayName').value='';render();announce('Local prototype data cleared.');});
  $('eventSearch').addEventListener('input',renderEvents);for(const id of ['eventCategory','eventFormat'])$(id).addEventListener('change',renderEvents);$('marketCategory').addEventListener('change',render);
  render();if(!storageOK)announce('Saved data could not be read. This session starts with an empty profile.');
});
