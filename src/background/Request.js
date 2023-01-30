import { ActiveTabListener } from "./ActiveTabListener";
const CHUNK_SIZE = 100;

const Requests = (() => {
  let keys = [];
  let requestChunk = [];
  let requests = {};

  // Send data to front end
  setInterval(() => {
    const currentTab = ActiveTabListener.getCurrentTab();
    if (currentTab != null) {
      browser.storage.local.set({ requests: requests[currentTab.id] || [] });
    }
  }, 200);

  // Clean unwanted data
  setInterval(() => {
    const tabIds = ActiveTabListener.getAllTabs().map((x) => x.id);
    const currentIds = Object.keys(requests);
    currentIds
      .filter((x) => tabIds.includes(x))
      .forEach((x) => {
        delete requests[x];
      });
  }, 1000);

  // Clean unwanted label data
  // TODO

  return {
    add: (request) => {
      if (requests.hasOwnProperty(request.tabId)) {
        requests[request.tabId].push(request);
      } else {
        requests[request.tabId] = [request];
      }
      if (requestChunk.length < CHUNK_SIZE) {
        requestChunk.push(request)
      } else {
        let now = Date.now();
        let obj = {};
        obj[now] = requestChunk;
        browser.storage.local.set(obj)
        keys.push(now)
        browser.storage.local.set({keys: keys})
        requestChunk = []
      }
      
    },
    refreshDataForTab: (tabid) => {
      requests[tabid] = [];
    },
  };
})();
export { Requests };
