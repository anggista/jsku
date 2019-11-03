document.getElementsByName('downloadfile').style = `display:none;`;
var a = document.getElementById('downloadfile');

if (window.location.hostname=="bungabdi.blogspot.com") {
}
function indexinput() {
var rates = document.getElementsByName('rate');
var rate_value;
for(var i = 0; i < rates.length; i++){
    if(rates[i].checked){
        rate_value = rates[i].value;
    }
}
var sizefile = document.getElementById("sizefile").value;
if (rate_value=="kb"){
ukuranfile=sizefile*1024;
}
if (rate_value=="mb"){
ukuranfile=sizefile*1024*1024;
}
var namafile = document.getElementById("namafile").value;
var formatfile = document.getElementById("formatfile").value;
pesanawal = `oppsss!!!`;
pesan2 = `<i class="fa fa-times-circle"></i><span style="color: red;"> Nama File Belum Dimasukkan</span>`;
pesan3 = `<i class="fa fa-times-circle"></i><span style="color: red;"> Format File Belum Dimasukkan</span>`;
pesan4 = `<i class="fa fa-times-circle"></i><span style="color: red;"> Size File Belum Dimasukkan</span>`;
pesan5 = `<i class="fa fa-times-circle"></i><span style="color: red;"> Size File Harus Angka Bukan Huruf</span>`;
pesan6 = `<i class="fa fa-times-circle"></i><span style="color: red;"> Format File harus diberi tanda titik (.), contoh = .rar</span>`;
syarat1 = (namafile.split("").length==0);
syarat2 = (formatfile.split("").length==0);
syarat3 = (ukuranfile==0);
syarat4 = (/^[0-9]+$/).test(document.getElementById("sizefile").value);
syarat5 = (document.getElementById("formatfile").value.indexOf(".") >= 0);
a.innerHTML = `  <br/>Please Wait..<br/> <div class='spinner'>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div><span id="checkfile"></span>`;
setTimeout(function() {
var checkfile = document.getElementById('checkfile');
var isi1 = document.createElement('div');
isi1.id = "asa1";
isi1.innerHTML = `<br/><i class="fa fa-database"> Check Input`;
checkfile.insertBefore(isi1, checkfile.childNodes[0]);
},1000);
setTimeout(function() {
if (syarat1==true && syarat2==true && syarat3==true) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan2+"<br/>"+pesan3+"<br/>"+pesan4;
}
if (syarat1==true && syarat2==true && syarat3==false) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan2+"<br/>"+pesan3;
}
if (syarat1==true && syarat2==false && syarat3==true) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan2+"<br/>"+pesan4;
}
if (syarat1==false && syarat2==true && syarat3==true) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan3+"<br/>"+pesan4;
}
if (syarat1==true && syarat2==false && syarat3==false) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan2;
}
if (syarat1==false && syarat2==true && syarat3==false) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan3;
}
if (syarat1==false && syarat2==false && syarat3==true) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan4;
}
if (syarat1==false && syarat2==false && syarat3==false && syarat4==false && syarat5==true) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan5;
}
if (syarat1==false && syarat2==false && syarat3==false && syarat4==true && syarat5==false) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan6;
}
if (syarat1==false && syarat2==false && syarat3==false && syarat4==false && syarat5==false) {
document.getElementById('downloadfile').innerHTML = "<br/>OOPPPSS!!!<br/>"+pesan5+"<br/>"+pesan6;
}

if (syarat1==false && syarat2==false && syarat3==false && syarat4==true && syarat5==true) {
a.style = `display: block;text-align: center;`;
a.innerHTML = `
<a id="getfile" ><br/><button onclick="downloadfile();" style="
    cursor: pointer;
    font-family: Arial;
    text-decoration: none;
    box-shadow: 0 0 0 1px #92aed2;
    padding: 5px 12px;
    border-radius: 16px;
    text-shadow: none;
    border: 1px solid;
    border-bottom-color: white;
    background-color: rgba(217, 228, 16, 0.99);
    font-size: 13px;
"><i class="fa fa-download"></i> DOWNLOAD FILE</button></a>
`; 
}
},2000);

}
function downloadfile() {
var namafile = document.getElementById("namafile").value;
var formatfile = document.getElementById("formatfile").value;
var rates = document.getElementsByName('rate');
var rate_value;
for(var i = 0; i < rates.length; i++){
    if(rates[i].checked){
        rate_value = rates[i].value;
    }
}
var sizefile = document.getElementById("sizefile").value;
if (rate_value=="kb"){
ukuranfile=sizefile*1024;
}
if (rate_value=="mb"){
ukuranfile=sizefile*1024*1024;
}
var blob = new Blob([new Int8Array(ukuranfile)], {type: "octet/stream"});
var getfile = document.getElementById("getfile");
getfile.download = namafile+"."+formatfile.split(".")[1];  
getfile.href = window.URL.createObjectURL(blob);
getfile.style = "display:none";
a.innerHTML =`<br/>SUCSSES <i class="fa fa-check-circle"></i>
<br/>file has been downloaded`;

}
