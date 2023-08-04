const selectTag     = document.querySelectorAll("select");
const botaoTraduzir = document.getElementById("botaoTraduzir");
const botaoLimpar   = document.getElementById("botaoClear");
const textareaDe    = document.getElementById("textareaDe");
const textareaPara  = document.getElementById("textareaPara");
const altoFalanteDe = document.getElementById("altoFalanteDe");
const altoFalantePara = document.getElementById("altoFalantePara");
const copiarDe = document.getElementById("copiarDe");
const copiarPara = document.getElementById("copiarPara");


selectTag.forEach((tag, id) =>{
    for(let codigoPais in paises){
        let selected = id == 0 ? codigoPais == "en-GB" ? "selected" : "" : codigoPais == "pt-PT" ? "selected" : "";
        let option = `<option ${selected} value="${codigoPais}">${paises[codigoPais]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

botaoLimpar.addEventListener("click", () =>{
    textareaDe.value="";
    textareaPara.value = "";
});

botaoTraduzir.addEventListener("click", ()=>{
    if(textareaDe.value === "")
        window.alert("Sem Texto Para Traduzir!");
    else
        traduzir();
}); 

altoFalanteDe.addEventListener("click", () =>{
    if(!textareaDe.value)
        window.alert("Sem Texto Convertido");
    else
    {
        let uterrance = new SpeechSynthesisUtterance(textareaDe.value);
        uterrance.lang = selectTag[0].value;
        speechSynthesis.speak(uterrance);
    }
});

altoFalantePara.addEventListener("click", () =>{
    if(!textareaPara.value)
        window.alert("Sem Texto Convertido");
    else{
        let uterrance = new SpeechSynthesisUtterance(textareaPara.value);
        uterrance.lang = selectTag[1].value;
        speechSynthesis.speak(uterrance);
    }
});

copiarDe.addEventListener("click", () => {
    if(!textareaDe.value)
        window.alert("Sem texto a ser copiado");
    else
        navigator.clipboard.writeText(textareaDe.value);
});

copiarPara.addEventListener("click", () => {
    if(!textareaPara.value)
        window.alert("Sem texto a ser copiado");
    else
        navigator.clipboard.writeText(textareaPara.value);
});


function traduzir(){
    let texto = textareaDe.value.trim();
    let traduzirDe = selectTag[0].value;
    let traduzirPara = selectTag[1].value;

    if(!texto) return;

    textareaPara.setAttribute("placeholder", "Traduzindo...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${traduzirDe}|${traduzirPara}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        // console.log(data);
        textareaPara.value = data.responseData.translatedText;
    });
}

