// Simple static store functionality with localStorage cart and testimonials
const PRODUCTS = [
  {id:1,name:'Hijab Oval Motif A',price:75000,img:'assets/product1.svg'},
  {id:2,name:'Hijab Oval Motif B',price:82000,img:'assets/product2.svg'},
  {id:3,name:'Gamis Kekinian Model 1',price:150000,img:'assets/product3.svg'},
  {id:4,name:'Gamis Kekinian Model 2',price:160000,img:'assets/product4.svg'},
  {id:5,name:'Hijab Syar\'i Motif C',price:68000,img:'assets/product5.svg'},
];

function formatCurrency(n){ return n.toLocaleString('id-ID'); }

/* --- Slider (max 5) --- */
const sliderEl = document.getElementById('productSlider');
let slideIndex = 0;
const slides = PRODUCTS.slice(0,5);

function renderSlides(){
  sliderEl.innerHTML = '';
  slides.forEach((p, idx)=>{
    const s = document.createElement('div');
    s.className='slide';
    s.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div>
        <h4>${p.name}</h4>
        <p>Rp ${formatCurrency(p.price)}</p>
        <div class="actions">
          <button class="btn add" data-id="${p.id}">Tambahkan ke Keranjang</button>
          <button class="btn view" onclick="scrollToProducts()">Lihat</button>
        </div>
      </div>
    `;
    s.style.transform = \`translateX(\${(idx - slideIndex) * 100}%)\`;
    sliderEl.appendChild(s);
  });
}

document.getElementById('prevSlide').addEventListener('click',()=>{
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  renderSlides();
});
document.getElementById('nextSlide').addEventListener('click',()=>{
  slideIndex = (slideIndex + 1) % slides.length;
  renderSlides();
});

/* --- Products Grid --- */
const productsGrid = document.getElementById('productsGrid');
function renderProducts(){
  productsGrid.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = \`
      <img src="\${p.img}" alt="\${p.name}" />
      <h4>\${p.name}</h4>
      <div class="price">Rp \${formatCurrency(p.price)}</div>
      <div class="actions">
        <button class="btn add" data-id="\${p.id}">Tambah ke Keranjang</button>
        <button class="btn view" onclick="alert('Detail produk: ' + \${p.id})">Detail</button>
      </div>
    \`;
    productsGrid.appendChild(card);
  });
}

/* --- Cart --- */
let cart = JSON.parse(localStorage.getItem('hijrah_cart')||'[]');

function saveCart(){ localStorage.setItem('hijrah_cart', JSON.stringify(cart)); updateCartUI(); }

function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  const item = cart.find(x=>x.id===id);
  if(item){ item.qty += 1; } else{ cart.push({id:p.id,name:p.name,price:p.price,qty:1}); }
  saveCart();
}

function updateCartUI(){
  document.getElementById('cartCount').innerText = cart.reduce((s,i)=>s+i.qty,0);
  const itemsEl = document.getElementById('cartItems');
  if(itemsEl){
    itemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(i=>{
      total += i.price * i.qty;
      const div = document.createElement('div');
      div.className='cart-row';
      div.innerHTML = \`<div>\${i.name} x \${i.qty}</div><div>Rp \${formatCurrency(i.price * i.qty)}</div>\`;
      itemsEl.appendChild(div);
    });
    document.getElementById('cartTotal').innerText = formatCurrency(total);
  }
}

/* Attach add to cart buttons (delegation) */
document.body.addEventListener('click', e=>{
  if(e.target.matches('.btn.add')){
    const id = Number(e.target.dataset.id);
    addToCart(id);
    alert('Produk ditambahkan ke keranjang');
  }
});

/* Cart modal */
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
document.getElementById('closeCart').addEventListener('click', ()=>{ cartModal.classList.add('hidden'); cartModal.setAttribute('aria-hidden','true'); });
cartBtn.addEventListener('click', ()=>{ cartModal.classList.remove('hidden'); cartModal.setAttribute('aria-hidden','false'); updateCartUI(); });

document.getElementById('checkoutNow').addEventListener('click', ()=>{
  if(cart.length===0){ alert('Keranjang kosong'); return; }
  // Simple checkout demo - clear cart
  alert('Terima kasih! Ini demo checkout (tidak memproses pembayaran).');
  cart = []; saveCart();
  cartModal.classList.add('hidden');
});

/* Checkout button at contact section */
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  cartModal.classList.remove('hidden'); cartModal.setAttribute('aria-hidden','false'); updateCartUI();
});

/* --- Testimonials (persist via localStorage) --- */
function loadTestimonials(){
  const t = JSON.parse(localStorage.getItem('hijrah_testimonials')||'[]');
  return t;
}
function renderTestimonials(){
  const list = document.getElementById('testiList');
  list.innerHTML = '';
  const t = loadTestimonials();
  if(t.length===0) list.innerHTML = '<p>Belum ada testimoni. Jadilah yang pertama!</p>';
  t.forEach(item=>{
    const div = document.createElement('div');
    div.className='testi';
    div.innerHTML = `<strong>\${item.name}</strong><p>\${item.message}</p>`;
    list.appendChild(div);
  });
}
document.getElementById('testiForm').addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('namaTesti').value || 'Anonim';
  const msg = document.getElementById('pesanTesti').value;
  const t = loadTestimonials();
  t.unshift({name:name, message:msg, date:Date.now()});
  localStorage.setItem('hijrah_testimonials', JSON.stringify(t));
  renderTestimonials();
  e.target.reset();
});

/* --- Feedback form --- */
document.getElementById('feedbackForm').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('feedbackThanks').classList.remove('hidden');
  setTimeout(()=>document.getElementById('feedbackThanks').classList.add('hidden'),3000);
  e.target.reset();
});

/* helper */
function scrollToProducts(){ document.getElementById('products').scrollIntoView({behavior:'smooth'}); }

/* init */
renderSlides();
renderProducts();
updateCartUI();
renderTestimonials();
