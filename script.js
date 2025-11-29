const scenes = [
  {
    id: 1,
    title: "Prelogue",
    text: "Es begann alles mit einem Match, das anders war als alle davor. zzzzzzzzzzzzzzzzzzzzzzzzzzzzz hbh h h         h hhhhhhh h h h h hhhhhhhhhhhhhh",
    background: "img/locations/rama9.png",
    person1: "img/charakter/patrick_normal.png",
    person2: null,
    optional: null,
    next: 2
  },
  {
    id: 2,
    text: "Ich weiß noch genau, was ich gedacht habe, als ich dein Profil gesehen habe...",
    background: "img/locations/rama9.png",
    person1: null,
    person2: "img/charakter/patrick_normal.png",
    optional: null,
    next: 3
  },
  {
    id: 3,
    text: "Unser erstes Treffen war aufregend, nervös, aber wunderschön...",
    background: "img/locations/rama9.png",
    person1: null,
    person2: "img/patrick_normal.png",
    optional: null,
    next: 4
  },
];

let currentScene = 1;

// Type Writer Effect
function typeWriter(text, element, speed = 35, callback = null) {
  element.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();   // <- Button wird aktiviert
    }
  }, speed);
}

function showOptional(src, element) {
  const optional = document.getElementById(element);
  optional.src = src;
  optional.style.opacity = 1;
}

function hideOptional(element) {
  document.getElementById(element).style.opacity = 0;
}




function loadScene(id) {
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = true;       // Button deaktivieren
  nextBtn.style.opacity = 0.5;   // Optionales visuelles Feedback

  const scene = scenes.find(s => s.id === id);
  currentScene = id;

  document.getElementById("background").style.backgroundImage = `url('${scene.background}')`;

  const textbox = document.getElementById("textbox");

  textbox.style.display = "none";
  textbox.style.display = "flex";

  if (scene.person1) {
    showOptional(scene.person1, "person_1");
  }else {
    hideOptional("person_1");
  }
  if (scene.person2) {
    showOptional(scene.person2, "person_2");
  }else {
    hideOptional("person_2");
  }
  if (scene.optional) {
    showOptional(scene.optional, "optional");
  } else {
    hideOptional("optional");
  }

  typeWriter(scene.text, document.getElementById("text"), 35, () => {
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = false;
    nextBtn.style.opacity = 1;
  });

  document.getElementById("nextBtn").onclick = () => loadScene(scene.next);
}

loadScene(currentScene);