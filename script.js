const cartCount = document.getElementById("cartCount");
const search = document.getElementById("search");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let hargaProduk = {
"Paracetamol":10000,
"Vitamin C":15000,
"Amoxicillin":20000
};

/* CART */
function updateCart(){
cartCount.innerText=cart.length;
localStorage.setItem("cart",JSON.stringify(cart));
}
updateCart();

document.querySelectorAll(".add-cart").forEach(btn=>{
btn.onclick=()=>{
let p=btn.parentElement.querySelector("h3").innerText;
cart.push(p);
updateCart();
toast(p+" ditambah");
};
});

/* SEARCH */
search.onkeyup=()=>{
let v=search.value.toLowerCase();
document.querySelectorAll(".card").forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(v)?"block":"none";
});
};

/* TOAST */
function toast(msg){
let t=document.getElementById("toast");
t.innerText=msg;
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),2000);
}

/* CHAT */
const chatBox=document.getElementById("chatBox");
const chatContent=document.getElementById("chatContent");

document.querySelectorAll(".konsultasi").forEach(btn=>{
btn.onclick=()=>{
let nama=btn.parentElement.querySelector("h3").innerText;
document.getElementById("chatNama").innerText=nama;
chatBox.style.display="flex";
chatContent.innerHTML=`<div class="chat dokter">Halo saya ${nama}</div>`;
};
});

document.getElementById("sendChat").onclick=()=>{
let input=document.getElementById("chatInput");
if(input.value==="")return;
chatContent.innerHTML+=`<div class="chat user">${input.value}</div>`;
input.value="";
setTimeout(()=>{
chatContent.innerHTML+=`<div class="chat dokter">Silakan istirahat & minum obat</div>`;
},1000);
};

document.getElementById("closeChat").onclick=()=>{
chatBox.style.display="none";
};

/* BOOKING */
const bookingBox=document.getElementById("bookingBox");

document.querySelectorAll(".booking").forEach(btn=>{
btn.onclick=()=>{
let nama=btn.parentElement.querySelector("h3").innerText;
document.getElementById("bookingNama").innerText="Booking "+nama;
bookingBox.style.display="flex";
};
});

document.getElementById("submitBooking").onclick=()=>{
let t=document.getElementById("tanggal").value;
let j=document.getElementById("jam").value;

if(t==""||j=="") return toast("Isi jadwal dulu");

toast("Booking berhasil "+t+" "+j);
bookingBox.style.display="none";
};

document.getElementById("closeBooking").onclick=()=>{
bookingBox.style.display="none";
};

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

/* CHECKOUT */
const checkoutBox=document.getElementById("checkoutBox");

document.getElementById("openCheckout").onclick=()=>{
checkoutBox.style.display="flex";
renderCheckout();
};

function renderCheckout(){
let list=document.getElementById("checkoutList");
let total=0;
list.innerHTML="";

cart.forEach(item=>{
let harga=hargaProduk[item]||5000;
total+=harga;
list.innerHTML+=`<li>${item} - Rp ${harga}</li>`;
});

document.getElementById("totalHarga").innerText="Total: Rp "+total;
}

document.getElementById("bayarBtn").onclick=()=>{
let alamat=document.getElementById("alamat").value;
if(alamat==="") return toast("Isi alamat");

toast("Pembelian berhasil");
cart=[];
updateCart();
checkoutBox.style.display="none";
};

document.getElementById("closeCheckout").onclick=()=>{
checkoutBox.style.display="none";
};
function hapus(i){
data.splice(i,1);
tampil();
}

tampil();
