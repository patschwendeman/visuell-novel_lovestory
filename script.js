let scenes = [];
let currentScene = 1;

async function loadAllScenes() {
  const files = [
   /*  "scenes/0_prologue.json",
    "scenes/1_bumble.json", */
    "scenes/2_first_date.json"
  ];

  const loaded = await Promise.all(
    files.map(file => fetch(file).then(res => res.json()))
  );

  scenes = loaded.flat();

  loadScene(0);
}

// Type Writer Effect
function typeWriter(text, element, speed = 35, callback = null) {
  element.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

function showIMG(src, element) {
  const el = document.getElementById(element);

  if (el.src.includes(src)) {
    el.style.opacity = 1;
    return;
  }

  el.style.opacity = 0;

  setTimeout(() => {
    el.src = src;
    el.style.opacity = 1;
  }, 400);
}

function hideIMG(element) {
  document.getElementById(element).style.opacity = 0;
}




function loadScene(index) {

  
  
  const nextBtn = document.getElementById("nextBtn");
  /* nextBtn.disabled = true;  */      // Button deaktivieren
  nextBtn.style.opacity = 0.5;

  const scene = scenes[index];
  currentScene = index;
  console.log("AKTUELLE SCENE:", scene);
  console.log("TEXT:", scene?.text);

  document.getElementById("background").style.backgroundImage = 
    scene.background ? `url('${scene.background}')` : "none";

  if (scene.person1) showIMG(scene.person1, "person_1");
  else hideIMG("person_1");

  if (scene.person2) showIMG(scene.person2, "person_2");
  else hideIMG("person_2");

  if (scene.optional) showIMG(scene.optional, "optional");
  else hideIMG("optional");

  typeWriter(scene.text, document.getElementById("text"), 35, () => {
    nextBtn.disabled = false;
    nextBtn.style.opacity = 1;
  });

  nextBtn.onclick = () => loadScene(currentScene + 1);
}


loadAllScenes();