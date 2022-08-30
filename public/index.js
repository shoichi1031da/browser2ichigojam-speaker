const btns = document.getElementById("btns");
for(const c of [
    ["アレクサ、電気をつけて","are'kusa..de'nnkiwo,tsukete."],
    ["アレクサ、電気を消して","are'kusa..de'nnkiwo,keshite."]
]){
    const btn = document.createElement("button");
    btn.id = "btn";
    btn.textContent = c[0];
    btn.type = "submit";
    btn.name = "msg";
    btn.value = c[1];
    btns.appendChild(btn);
}