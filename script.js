// Simple cart and testimonial + kritik handlers
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    cartCount++;
    cartCountEl.textContent = cartCount;
    alert('Produk ditambahkan ke keranjang.');
  });
});

// Checkout button (simple demo)
document.getElementById('viewCart').addEventListener('click', ()=>{
  if(cartCount === 0) {
    alert('Keranjang kosong — tambahkan produk dulu.');
    return;
  }
  alert('Membawa ke halaman checkout (demo). Total item: ' + cartCount);
});

// Testimoni submit
document.getElementById('testiForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('testiName').value.trim();
  const msg = document.getElementById('testiMsg').value.trim();
  if(!name || !msg) return alert('Isi nama dan pesan testimoni.');
  const node = document.createElement('div');
  node.className = 'testimoni-item';
  node.innerHTML = '<strong>' + escapeHtml(name) + ':</strong> ' + escapeHtml(msg);
  document.getElementById('testimoniList').prepend(node);
  this.reset();
  alert('Terima kasih! Testimoni dikirim.');
});

// Kritik & Saran
document.getElementById('kritikForm').addEventListener('submit', function(e){
  e.preventDefault();
  const txt = document.getElementById('kritikText').value.trim();
  if(!txt) return alert('Tulis kritik atau saran terlebih dahulu.');
  const el = document.createElement('div');
  el.className = 'testimoni-item';
  el.textContent = txt;
  document.getElementById('kritikList').prepend(el);
  this.reset();
  alert('Kritik / saran terkirim. Terima kasih!');
});

// basic escape to avoid injection in this simple demo
function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}
