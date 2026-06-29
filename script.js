const chatData = {
  inicio: {
    from: "Lester",
    text: "Hey, tengo planes para un nuevo golpe, ¿puedo contar contigo?",
    next: "opciones1"
  },

  opciones1: {
    options: [
      { text: "De acuerdo, ponme al tanto", next: "audio1" },
      { text: "No, la verdad, tengo mocos", next: "foto1" }
    ]
  },

  audio1: {
    from: "Lester",
    audio: "audio/mensaje1.mp3",
  },

  foto1: {
    from: "Lester",
    image: "img/foto1.jpg",
    next: "fin"
  },

  fin: {
    from: "Lester",
    text: "Eso eres."
  }
};

const chat = document.getElementById("chat");
const optionsDiv = document.getElementById("options");

function addMessage(from, content) {
  const msg = document.createElement("div");
  msg.classList.add("message", from === "Lester" ? "from-Lester" : "from-tu");

  if (content.text) {
    msg.textContent = content.text;
  }

  if (content.image) {
    const img = document.createElement("img");
    img.src = content.image;
    msg.appendChild(img);
  }

  if (content.audio) {
    const audio = document.createElement("audio");
    audio.src = content.audio;
    audio.controls = true;
    msg.appendChild(audio);
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function showOptions(options) {
  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      addMessage("tu", { text: opt.text });
      optionsDiv.innerHTML = "";
      setTimeout(() => loadNode(opt.next), 600);
    };
    optionsDiv.appendChild(btn);
  });
}

function loadNode(nodeKey) {
  const node = chatData[nodeKey];
  if (!node) return;

  if (node.from) {
    addMessage(node.from, node);
  }

  if (node.options) {
    showOptions(node.options);
  }

  if (node.next) {
    setTimeout(() => loadNode(node.next), 1000);
  }
}

// INICIO
setTimeout(() => loadNode("inicio"), 500);