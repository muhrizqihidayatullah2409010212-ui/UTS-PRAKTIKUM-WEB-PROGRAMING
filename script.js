const cartCount = document.getElementById("cartCount");
const search = document.getElementById("search");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* HARGA PRODUK */
let hargaProduk = {
"Paracetamol":10000,
"Ibuprofen":12000,
"Amoxicillin":20000,
"Vitamin C":15000,
"OBH Combi":18000,
"Bodrex":8000,
"Antimo":7000,
"Promag":9000,
"Betadine":14000,
"Panadol":13000,
"Sanmol":11000,
"Enervon-C":17000,
"Diapet":10000,
"Decolgen":12000,
"Mixagrip":9000,
"Neozep":11000,
"Redoxon":25000,
"Nature-E":22000,
"Konidin":13000,
"Laserin":16000,
"Albothyl":20000,
"Insto":9000,
"Salonpas":10000,
"Hansaplast":8000,
"Termometer":30000,
"Masker Medis":5000,
"Hand Sanitizer":12000,
"Alcohol 70%":15000,
"Betahistine":18000,
"Caviplex":14000
};

/* UPDATE CART */
function updateCart(){
cartCount.innerText = cart.length;
localStorage.setItem("cart", JSON.stringify(cart));
}
updateCart();

/* TAMBAH KE CART */
document.querySelectorAll(".add-cart").forEach(btn=>{
btn.onclick = ()=>{
let produk = btn.parentElement.querySelector("h3").innerText;
cart.push(produk);
updateCart();
toast(produk + " ditambah");
};
});

/* SEARCH PRODUK SAJA */
search.onkeyup = ()=>{
let v = search.value.toLowerCase();

document.querySelectorAll("#produk .card").forEach(c=>{
c.style.display = c.innerText.toLowerCase().includes(v) ? "block" : "none";
});
};

/* TOAST */
function toast(msg){
let t = document.getElementById("toast");
t.innerText = msg;
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),2000);
}

/* ================= CHAT ================= */
const chatBox = document.getElementById("chatBox");
const chatContent = document.getElementById("chatContent");

document.querySelectorAll(".konsultasi").forEach(btn=>{
btn.onclick = ()=>{
let nama = btn.parentElement.querySelector("h3").innerText;
document.getElementById("chatNama").innerText = nama;
chatBox.style.display = "flex";
chatContent.innerHTML = `<div class="chat dokter">Halo saya ${nama}, ada keluhan apa?</div>`;
};
});

document.getElementById("sendChat").onclick = ()=>{
let input = document.getElementById("chatInput");

if(input.value==="") return;

chatContent.innerHTML += `<div class="chat user">${input.value}</div>`;
chatContent.scrollTop = chatContent.scrollHeight;

input.value = "";

setTimeout(()=>{
chatContent.innerHTML += `<div class="chat dokter">Silakan istirahat & minum obat sesuai anjuran</div>`;
chatContent.scrollTop = chatContent.scrollHeight;
},1000);
};

document.getElementById("closeChat").onclick = ()=>{
chatBox.style.display = "none";
};

/* ================= BOOKING ================= */
const bookingBox = document.getElementById("bookingBox");

document.querySelectorAll(".booking").forEach(btn=>{
btn.onclick = ()=>{
let nama = btn.parentElement.querySelector("h3").innerText;
document.getElementById("bookingNama").innerText = "Booking " + nama;
bookingBox.style.display = "flex";
};
});

document.getElementById("submitBooking").onclick = ()=>{
let t = document.getElementById("tanggal").value;
let j = document.getElementById("jam").value;

if(t=="" || j=="") return toast("Isi jadwal dulu");

toast("Booking berhasil " + t + " " + j);
bookingBox.style.display = "none";
};

document.getElementById("closeBooking").onclick = ()=>{
bookingBox.style.display = "none";
};

/* ================= COUNTER ================= */
const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{
let update = ()=>{
let target = +counter.getAttribute("data-target");
let current = +counter.innerText;
let increment = target / 100;

if(current < target){
counter.innerText = Math.ceil(current + increment);
setTimeout(update,20);
}else{
counter.innerText = target;
}
};

update();
});

/* ================= CHECKOUT ================= */
const checkoutBox = document.getElementById("checkoutBox");

document.getElementById("openCheckout").onclick = ()=>{
checkoutBox.style.display = "flex";
renderCheckout();
};

function renderCheckout(){
let list = document.getElementById("checkoutList");
let total = 0;

list.innerHTML = "";

cart.forEach(item=>{
let harga = hargaProduk[item] || 5000;
total += harga;

let li = document.createElement("li");
li.innerText = `${item} - Rp ${harga}`;
list.appendChild(li);
});

document.getElementById("totalHarga").innerText = "Total: Rp " + total;
}

document.getElementById("bayarBtn").onclick = ()=>{
let alamat = document.getElementById("alamat").value;

if(alamat==="") return toast("Isi alamat");

toast("Pembelian berhasil");
cart = [];
updateCart();
checkoutBox.style.display = "none";
};

document.getElementById("closeCheckout").onclick = ()=>{
checkoutBox.style.display = "none";
};
