const scenes = [
  {
    id: 1,
    title: "Prelogue",
    text: "Es begann alles mit einem Match, das anders war als alle davor.",
    background: "assets/backgrounds/chat.jpg",
    next: 2
  },
  {
    id: 2,
    text: "Ich weiß noch genau, was ich gedacht habe, als ich dein Profil gesehen habe...",
    background: "assets/backgrounds/profile.jpg",
    choices: [
      { text: "Erzähl mir mehr ❤️", next: 3 },
      { text: "Zeig mir ein Erinnerungsfoto 📸", next: 99 }
    ]
  },
  {
    id: 3,
    text: "Unser erstes Treffen war aufregend, nervös, aber wunderschön...",
    background: "assets/backgrounds/date.jpg",
    next: 4
  },
];

let currentScene = 1;

// Type Writer Effect
function typeWriter(text, element, speed = 35) {
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
  document.getElementById("nextBtn").style.display = "block";
}




function loadScene(id) {
  const scene = scenes.find(s => s.id === id);
  currentScene = id;

  document.getElementById("background").style.backgroundImage = `url('${scene.background}')`;
  //document.getElementById("text").innerText = scene.text;

  typeWriter(scene.text, document.getElementById("text"));

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = ""; // reset

  if (scene.choices) {
    document.getElementById("nextBtn").style.display = "none";
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.innerText = choice.text;
      btn.onclick = () => loadScene(choice.next);
      choicesContainer.appendChild(btn);
    });
  } else {
    //document.getElementById("nextBtn").style.display = "block";
    document.getElementById("nextBtn").onclick = () => loadScene(scene.next);
  }
}

loadScene(currentScene);

