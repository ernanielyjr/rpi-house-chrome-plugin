const CONFIG = {
  ACTIVE: true,
  INTERVAL: 10,
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (const key in changes) {
    CONFIG[key] = changes[key].newValue;
    console.log('CONFIG', CONFIG);
  }
});

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

      if (tabResult.url.indexOf('chrome://') === -1) {
        currentIndex = tabResult.index || 0;
        let nextIndex = currentIndex + 1;
        if (nextIndex > lastIndex) {
          nextIndex = 0;
        }

        chrome.tabs.update(tabs[nextIndex].id, { active: true });
      }

      setTimeout(() => {
        if (CONFIG.ACTIVE) {
          nextTab();
        }
      }, CONFIG.INTERVAL * 1000);
    });
  });
}

nextTab();