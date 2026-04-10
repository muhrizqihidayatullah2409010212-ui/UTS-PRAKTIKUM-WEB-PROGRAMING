const toggle = document.getElementById("darkToggle");

toggle.onclick = () => {
document.body.classList.toggle("dark-mode");
toggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
};

const form = document.getElementById("formObat");

form.addEventListener("submit", function(e){
e.preventDefault();

let valid = true;

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const hp = document.getElementById("hp");
const obat = document.getElementById("obat");
const bayar = document.querySelectorAll("input[name='bayar']");

document.querySelectorAll(".error").forEach(e=>e.innerText="");

if(nama.value===""){
nama.nextElementSibling.innerText="Nama wajib diisi";
valid=false;
}

if(!email.value.includes("@")){
email.nextElementSibling.innerText="Email tidak valid";
valid=false;
}

if(hp.value<=0){
hp.nextElementSibling.innerText="Harus angka positif";
valid=false;
}

if(obat.value===""){
obat.nextElementSibling.innerText="Pilih obat";
valid=false;
}

let cek=false;
bayar.forEach(b=>{ if(b.checked) cek=true; });

if(!cek){
bayar[1].parentElement.parentElement.nextElementSibling.innerText="Pilih pembayaran";
valid=false;
}

if(valid){
alert("Pesanan berhasil!");
form.reset();
}
});

let data=["Paracetamol","Vitamin C","Amoxicillin","OBH"];

function tampil(){
const list=document.getElementById("listProduk");
list.innerHTML="";
data.forEach((item,i)=>{
list.innerHTML+=`<li>${item} <button onclick="hapus(${i})">X</button></li>`;
});
}

function tambahProduk(){
const input=document.getElementById("inputProduk");
if(input.value!==""){
data.push(input.value);
input.value="";
tampil();
}
}

function hapus(i){
data.splice(i,1);
tampil();
}

tampil();
