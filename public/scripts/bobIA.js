let bob = document.getElementById("bobIA");
let bobContent = document.getElementById("bobContent");
let circleContent = document.getElementById("circleContent");
let chatContent = document.getElementById("chat");
let closeBtn = document.getElementById("closeBtn");
let sentBtn = document.getElementById("send");
let userContent = document.getElementById("userContent");

let isChanging = false;
let isPending = false;

if(sessionStorage.getItem("ID_USUARIO") != 1){
    bob.style.display = "none";
}

bob.addEventListener("click", () => {
    if(isChanging) return;
    bob.classList.replace("chatClosed", "chatOpened")
    circleContent.style.display = "none";
});

closeBtn.addEventListener("click", () => {
    isChanging = true;
    bob.classList.remove("chatOpened");
    bob.classList.add("chatClosed");
    circleContent.style.display = "block"
    setTimeout(() => {
        isChanging = false
    }, 200)
})

sentBtn.addEventListener("click", () => {
    talk()
});

async function talk() {
    let msg = userContent.value;
    
    if(msg == "") return alert("AAAAAAAAA");

    createMsg("user", msg);
    let response = await sendMsg(msg)
    createMsg("chat", response.resultado);
}

function createMsg(type, content){
    let msgClass = type == "user" ? "userMsg" : "chatMsg";

    let html = `
        <div class="${msgClass}">${content}</div>
    `

    chatContent.innerHTML += html;
}

async function sendMsg(content) {
    let response = await fetch('http://localhost:4000/perguntar', {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            pergunta: content,
        })
    })

    let data = await response.json();

    return data;
}
