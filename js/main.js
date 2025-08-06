const STORAGE_KEY = "myTabGroups";
let tabGroups = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  "💼 Work": ["https://calendar.google.com", "https://mail.google.com"],
  "🎮 Fun": ["https://youtube.com", "https://reddit.com"]
};

let rating = 0;

function renderButtons() {
  const container = document.getElementById("buttonContainer");
  container.innerHTML = "";
  let i = 0;
  const colors = ['var(--btn1)', 'var(--btn2)', 'var(--btn3)'];

  for (const group in tabGroups) {
    const btn = document.createElement("button");
    btn.draggable = true;
    btn.style.position = "relative";
    btn.addEventListener("dragend", (e) => {
      btn.style.position = "absolute";
      btn.style.left = e.pageX + "px";
      btn.style.top = e.pageY + "px";
    });

    btn.textContent = group;
    btn.style.background = getComputedStyle(document.body).getPropertyValue(
      document.body.classList.contains("dark")
        ? ['--btn-dark1', '--btn-dark2', '--btn-dark3'][i % 3]
        : ['--btn1', '--btn2', '--btn3'][i % 3]
    );

    let pressTimer;
    btn.addEventListener("mousedown", () => {
      pressTimer = setTimeout(() => {
        if (confirm(`Delete group "${group}"?`)) {
          delete tabGroups[group];
          saveAndRender();
        }
      }, 800);
    });
    btn.addEventListener("mouseup", () => clearTimeout(pressTimer));
    btn.addEventListener("mouseleave", () => clearTimeout(pressTimer));
    btn.addEventListener("click", () => openGroup(group));

    btn.ondblclick = () => {
      const newName = prompt("Rename group:", group);
      if (newName && newName !== group) {
        tabGroups[newName] = tabGroups[group];
        delete tabGroups[group];
        saveAndRender();
      }
    };

    btn.oncontextmenu = (e) => {
      e.preventDefault();
      const newLinks = prompt("Edit links (comma separated):", tabGroups[group].join(","));
      if (newLinks !== null) {
        tabGroups[group] = newLinks.split(",").map(s => s.trim()).filter(Boolean);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tabGroups));
      }
      return false;
    };

    container.appendChild(btn);
    i++;
  }
}

function openGroup(group) {
  const urls = tabGroups[group];
  if (!urls || urls.length === 0) return;
  urls.forEach((url, index) => {
    window.open(url, "_blank", "noopener,noreferrer"); // 防止浏览器拦截
  });
}

function addTab() {
  const name = prompt("New tab group name:");
  if (name && !tabGroups[name]) {
    tabGroups[name] = [];
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tabGroups));
  
renderButtons(); createHelpPopup();
loadPositions();

function savePositions() {
  const positions = {};
  const container = document.getElementById("buttonContainer");
  container.childNodes.forEach(btn => {
    if (btn.style.position === "absolute") {
      positions[btn.textContent] = { left: btn.style.left, top: btn.style.top };
    }
  });
  localStorage.setItem("buttonPositions", JSON.stringify(positions));
}

function loadPositions() {
  const positions = JSON.parse(localStorage.getItem("buttonPositions") || "{}");
  const container = document.getElementById("buttonContainer");
  container.childNodes.forEach(btn => {
    const pos = positions[btn.textContent];
    if (pos) {
      btn.style.position = "absolute";
      btn.style.left = pos.left;
      btn.style.top = pos.top;
    }
  });
}

function resetPositions() {
  localStorage.removeItem("buttonPositions");
  renderButtons(); }

}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");
  const btn = document.querySelector(".theme-toggle");
  btn.textContent = body.classList.contains("dark") ? "🌞" : "🌙";
  
renderButtons(); createHelpPopup();
loadPositions();

function savePositions() {
  const positions = {};
  const container = document.getElementById("buttonContainer");
  container.childNodes.forEach(btn => {
    if (btn.style.position === "absolute") {
      positions[btn.textContent] = { left: btn.style.left, top: btn.style.top };
    }
  });
  localStorage.setItem("buttonPositions", JSON.stringify(positions));
}

function loadPositions() {
  const positions = JSON.parse(localStorage.getItem("buttonPositions") || "{}");
  const container = document.getElementById("buttonContainer");
  container.childNodes.forEach(btn => {
    const pos = positions[btn.textContent];
    if (pos) {
      btn.style.position = "absolute";
      btn.style.left = pos.left;
      btn.style.top = pos.top;
    }
  });
}

function resetPositions() {
  localStorage.removeItem("buttonPositions");
  renderButtons(); }

}

function showFeedback() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("feedbackPage").style.display = "flex";

  document.getElementById("stars").style.display = "block";
  document.querySelector("#feedbackPage textarea").style.display = "block";
  document.getElementById("submitFeedbackBtn").style.display = "block";
  document.getElementById("thankYou").style.display = "none";
  document.getElementById("backBtn").style.display = "none";
}

function submitFeedback() {
  document.getElementById("stars").style.display = "none";
  document.querySelector("#feedbackPage textarea").style.display = "none";
  document.getElementById("submitFeedbackBtn").style.display = "none";
  document.getElementById("thankYou").style.display = "block";
  document.getElementById("backBtn").style.display = "block";
}

function backToMain() {
  document.getElementById("feedbackPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
}

function setRating(star) {
  rating = star;
  const stars = document.querySelectorAll("#stars span");
  stars.forEach((s, i) => {
    s.classList.toggle("selected", i < star);
  });
}


renderButtons(); createHelpPopup();
loadPositions();

function savePositions() {
  const positions = {};
  const container = document.getElementById("buttonContainer");
  container.childNodes.forEach(btn => {
    if (btn.style.position === "absolute") {
      positions[btn.textContent] = { left: btn.style.left, top: btn.style.top };
    }
  });
  localStorage.setItem("buttonPositions", JSON.stringify(positions));
}

function loadPositions() {
  const positions = JSON.parse(localStorage.getItem("buttonPositions") || "{}");
  const container = document.getElementById("buttonContainer");
  container.childNodes.forEach(btn => {
    const pos = positions[btn.textContent];
    if (pos) {
      btn.style.position = "absolute";
      btn.style.left = pos.left;
      btn.style.top = pos.top;
    }
  });
}

function resetPositions() {
  localStorage.removeItem("buttonPositions");
  renderButtons(); }




function createHelpPopup() {
  const folderIcon = document.getElementById("helpIcon");
  folderIcon.title = "Click for usage guide";

  folderIcon.addEventListener("click", () => {
    alert(`📘 How to Use Tab Launcher:

- Click a tab group to open all its links.
- Drag a tab to reposition it. It will remember the position.
- ➕ button lets you add new tab groups.
- Right-click a tab to edit its links.
- Double-click a tab to rename it.
- Long press (hold 0.8s) a tab to delete it.
- Use 🔄 to reset all tab positions.
- Toggle 🌙/🌞 for light/dark mode.

Enjoy! 🚀`);
  });
}