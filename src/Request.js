import { ActiveTabListener } from "./ActiveTabListener";


const Requests = (() => {
    let requests = {};
    // Send data to front end
    setInterval(() => {
      const currentTab = ActiveTabListener.getCurrentTab();
      if (currentTab != null) {
        chrome.storage.local.set({requests: requests[currentTab.id] || [] });
      }
    }, 200)

    // Clean unwanted data
    setInterval(() => {
      const tabIds = ActiveTabListener.getAllTabs().map(x => x.id);
      const currentIds = Object.keys(requests);
      currentIds.filter(x => tabIds.includes(x)).forEach(x => {
        delete requests[x];
      });
    }, 1000);

    return {
      add: (request) => {
        if (requests.hasOwnProperty(request.tabId)) {
          requests[request.tabId].push(request);
        } else {
          requests[request.tabId] = [request];
        }
      },
    };
  })();
export {
  Requests
}
