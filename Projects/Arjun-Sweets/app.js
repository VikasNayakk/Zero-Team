// Simple client-side cart and reservation UI (no backend)
const Cart = {
  items: JSON.parse(localStorage.getItem('arjun_cart') || '[]'),
  save() { localStorage.setItem('arjun_cart', JSON.stringify(this.items)); },
  add(item){
    const existing = this.items.find(i=>i.id===item.id);
    if(existing){ existing.qty += item.qty; } else { this.items.push(item); }
    this.save();
    renderCart();
  },
  remove(id){ this.items = this.items.filter(i=>i.id!==id); this.save(); renderCart(); },
  clear(){ this.items=[]; this.save(); renderCart(); }
};

function addToCartFromBtn(btn){
  const id = btn.dataset.id;
  const name = btn.dataset.name;
  const price = Number(btn.dataset.price);
  Cart.add({id,name,price,qty:1});
  showToast(name + ' added to cart');
}

function renderCart(){
  const list = document.querySelector('#cart-items');
  const totalEl = document.querySelector('#cart-total');
  if(!list) return;
  list.innerHTML = '';
  let total = 0;
  Cart.items.forEach(it=>{
    const row = document.createElement('div'); row.className='cart-row';
    row.innerHTML = `<div class="cart-name">${it.name} x ${it.qty}</div><div class="cart-price">₹${it.price*it.qty}</div><button class="cart-remove" data-id="${it.id}">Remove</button>`;
    list.appendChild(row);
    total += it.price*it.qty;
  });
  totalEl.textContent = '₹' + total;
  // update cart count badges if present
  const countEl = document.querySelector('#cart-count');
  if(countEl) countEl.textContent = Cart.items.reduce((s,i)=>s+i.qty,0);
  const openBtn = document.querySelector('#open-cart-btn');
  if(openBtn) openBtn.dataset.count = Cart.items.reduce((s,i)=>s+i.qty,0);
}

function showCart(){ document.body.classList.add('show-cart'); renderCart(); }
function hideCart(){ document.body.classList.remove('show-cart'); }

function showToast(msg){
  const t = document.createElement('div'); t.className='toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.classList.add('visible'); },10);
  setTimeout(()=>{ t.classList.remove('visible'); setTimeout(()=>t.remove(),300); },2000);
}

function openReservation(){ document.querySelector('#reservation-modal').classList.add('open'); }
function closeReservation(){ document.querySelector('#reservation-modal').classList.remove('open'); }

document.addEventListener('click', e=>{
  if(e.target.matches('.add-to-cart')) addToCartFromBtn(e.target);
  if(e.target.matches('#open-cart-btn')) showCart();
  if(e.target.matches('#close-cart-btn') || e.target.matches('.cart-close')) hideCart();
  if(e.target.matches('.cart-remove')) Cart.remove(e.target.dataset.id);
  if(e.target.matches('#reserve-now')) openReservation();
  if(e.target.matches('#reservation-modal .close')) closeReservation();
});

document.addEventListener('DOMContentLoaded', ()=>{
  renderCart();
});

// simple promo carousel auto-advance
function startPromoCarousel(){
  const carousel = document.querySelector('.promo-carousel');
  if(!carousel) return;
  let idx=0;
  setInterval(()=>{
    idx = (idx+1) % carousel.children.length;
    carousel.style.transform = `translateX(-${idx*280}px)`;
  },3000);
}

// sticky header on scroll
function initStickyHeader(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>80) header.classList.add('scrolled'); else header.classList.remove('scrolled');</
  });
}

// close cart when clicking outside
document.addEventListener('click', e=>{
  const drawer = document.querySelector('.cart-drawer');
  if(!drawer) return;
  if(document.body.classList.contains('show-cart') && !e.target.closest('.cart-drawer') && !e.target.matches('#open-cart-btn')){
    hideCart();
  }
});

// Hero slider auto-advance
function initHeroSlider(){
  const slides = document.querySelectorAll('#hero-slider .slide');
  const indicators = document.querySelector('#hero-indicators');
  if(!slides.length) return;
  slides.forEach((_,i)=>{
    const dot = document.createElement('span');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click',()=>goToSlide(i));
    indicators.appendChild(dot);
  });
  let current = 0;
  function goToSlide(idx){
    slides[current].classList.remove('active');
    indicators.children[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    indicators.children[current].classList.add('active');
  }
  setInterval(()=>{ goToSlide((current+1)%slides.length); },4000);
}

// Menu tab filtering
function initMenuTabs(){
  const tabs = document.querySelectorAll('.menu-tab');
  const items = document.querySelectorAll('#menu-list .item');
  if(!tabs.length) return;
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item=>{
        if(cat==='all' || item.dataset.cat===cat) item.classList.remove('hidden');
        else item.classList.add('hidden');
      });
    });
  });
}

// Hamburger menu
function initHamburger(){
  const btn = document.querySelector('#hamburger');
  const nav = document.querySelector('#main-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click',()=>nav.classList.toggle('open'));
  document.addEventListener('click',e=>{if(!e.target.closest('#hamburger')&&!e.target.closest('#main-nav')) nav.classList.remove('open');});
}

document.addEventListener('DOMContentLoaded', ()=>{ startPromoCarousel(); initStickyHeader(); initHeroSlider(); initMenuTabs(); initHamburger(); });</
