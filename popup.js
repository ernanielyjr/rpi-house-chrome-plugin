let CONFIG = {
  ACTIVE: true,
  INTERVAL: 10,
};

function loadOnScreen() {
  document.getElementById('ACTIVE').checked = CONFIG.ACTIVE;
  document.getElementById('INTERVAL').value = CONFIG.INTERVAL;
  document.getElementById('config').innerHTML = JSON.stringify(CONFIG, null, 2);
}

function saveConfig() {
  CONFIG.ACTIVE = document.getElementById('ACTIVE').checked;
  CONFIG.INTERVAL = document.getElementById('INTERVAL').value;

  chrome.storage.sync.set(CONFIG, function() {
    loadOnScreen();
  });
}

chrome.storage.sync.get(Object.keys(CONFIG), function (result) {
  for (const key in result) {
    CONFIG[key] = result[key];
  }

  loadOnScreen();
});

document.getElementById('ACTIVE').onclick = saveConfig;
document.getElementById('INTERVAL').onchange = saveConfig;
