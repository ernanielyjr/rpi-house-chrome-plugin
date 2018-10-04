let timer;
let lastReloadDay = (new Date()).getDate();

function nextTab() {
  chrome.tabs.getAllInWindow(null, (tabs) => {
    const count = tabs.length;
    const lastIndex = count - 1;
    let currentIndex = 0;

    const currentDay = (new Date()).getDate();

    if (currentDay !== lastReloadDay) {
      for (let i = 0; i < count; i++) {
        chrome.tabs.reload(tabs[i].id, { bypassCache: true });
      }
      lastReloadDay = currentDay;
    }

    chrome.tabs.query({ highlighted: true }, (tabsResult) => {
      let tabResult = tabsResult[0] || {};
      currentIndex = tabResult.index || 0;

      let nextIndex = currentIndex + 1;
      if (nextIndex > lastIndex) {
        nextIndex = 0;
      }

      chrome.tabs.update(tabs[nextIndex].id, { active: true });
    });
  });
}

function start() {
  chrome.browserAction.setTitle({ title: 'Parar' });
  chrome.browserAction.onClicked.addListener(stop);
  chrome.browserAction.setIcon({ path : "img/icon-on.png" });

  timer = setInterval(() => {
    nextTab();
  }, 5000);
}

function stop() {
  chrome.browserAction.setTitle({ title: 'Começar' });
  chrome.browserAction.onClicked.addListener(start);
  chrome.browserAction.setIcon({ path : "img/icon-off.png" });

  clearInterval(timer);
}

start();