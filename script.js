const scenes = [
  {
    id: 1,
    text: "Pack just arrived from the tempel in hong kong 2 days ago",
    background: "img/locations/tempel.png",
    person1: null,
    person2: null,
    optional: null,
    next: 2
  },
  {
    id: 2,
    text: "Pack decided to try one last time",
    background: "img/locations/flat_pack.png",
    person1: null,
    person2: "img/charakter/pack_normal.png",
    optional: null,
    next: 3
  },
  
  {
    id: 3,
    text: "And start to swipe",
    background: "img/locations/flat_pack.png",
    person1: null,
    person2: "img/charakter/pack_normal.png",
    optional: "img/optional/pack_smartphone.png",
    next: 4
  },
  {
    id: 4,
    text: "And swipe left ..",
    background: "img/locations/flat_pack.png",
    person1: null,
    person2: "img/charakter/pack_normal.png",
    optional: "img/optional/pack_smartphone.png",
    next: 5
  },
  {
    id: 5,
    text: "And swipe left ..",
    background: "img/locations/flat_pack.png",
    person1: null,
    person2: "img/charakter/pack_normal.png",
    optional: "img/optional/pack_smartphone.png",
    next: 6
  },
  {
    id: 6,
    text: "..",
    background: "img/locations/flat_pack.png",
    person1: null,
    person2: "img/charakter/pack_normal.png",
    optional: "img/optional/pack_bumble_match.png",
    next: 7
  },
  {
    id: 7,
    text: "..",
    background: "img/locations/flat_pack.png",
    person1: null,
    person2: "img/charakter/pack_suprised.png",
    optional: "img/optional/pack_bumble_match.png",
    next: 8
  },
  {
    id: 8,
    text: "swipe right",
    background: null,
    person1: null,
    person2: null,
    optional: null,
    next: 9
  },
  {
    id: 9,
    text: "Patrick just landed in Thailand from his long flight from germany",
    background: "img/locations/airplane.png",
    person1: null,
    person2: null,
    optional: null,
    next: 10
  },
  {
    id: 10,
    text: "Patrick decided to try",
    background: "img/locations/flat_patrick.png",
    person1: "img/charakter/patrick_normal.png",
    person2: null,
    optional: null,
    next: 11
  },
  {
    id: 11,
    text: "Patrick start to swipe",
    background: "img/locations/flat_patrick.png",
    person1: "img/charakter/patrick_normal.png",
    person2: null,
    optional: "img/optional/patrick_smartphone.png",
    next: 12
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
  /* nextBtn.disabled = true;  */      // Button deaktivieren
  nextBtn.style.opacity = 0.5;   // Optionales visuelles Feedback

  const scene = scenes.find(s => s.id === id);
  currentScene = id;

  document.getElementById("background").style.backgroundImage = `url('${scene.background}')`;

  /* const textbox = document.getElementById("textbox");

  textbox.style.display = "none";
  textbox.style.display = "flex"; */

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