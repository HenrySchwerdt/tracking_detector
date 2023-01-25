import { RequestBlocker } from "./RequestBlocker";
import { StatsListener } from "./StatsListener";
import { Requests } from "./Request";

const EventListener = (async () => {
  const urlFilter = { urls: ["http://*/*", "https://*/*"] };
  let requests = {};
  const blocker = await RequestBlocker;

  const getRequest = (requestId) => requests[requestId];
  const setRequest = (requestId, obj) => {
    let tmp = requests[requestId] ? requests[requestId] : {};
    requests[requestId] = Object.assign(tmp, obj);
  };

  const pushToQueue = (requestId) => {
    Requests.add(getRequest(requestId));
    delete getRequest(requestId);
  };
  const getCompletedTabFromId = (tabId, callback) => {
    try {
      browser.tabs.get(tabId).then(function (tab) {
        if (browser.runtime.lastError || typeof tab === "undefined") {
          return;
        } else {
          callback(tab);
        }
      });
    } catch (err) {
      if (err) {
        callback(null);
      }
    }
  };

  const load = (() => {
    browser.webRequest.onBeforeRequest.addListener(
      (details) => {
        if (details.tabId < 0) {
          return;
        }

        if (details.hasOwnProperty("requestBody")) {
          delete details.requestBody;
        }

        setRequest(details.requestId, details);

        getCompletedTabFromId(details.tabId, (tab) => {
          setRequest(details.requestId, {
            source: tab.url,
            complete: true,
          });

          getRequest(details.requestId).requestHeaders &&
            getRequest(details.requestId).response &&
            pushToQueue(details.requestId);
        });
      },
      urlFilter,
      ["requestBody"]
    );

    browser.webRequest.onBeforeSendHeaders.addListener(
       (details) => {
        setRequest(details.requestId, {
          requestHeaders: details.requestHeaders,
        });
        let result = blocker.check(details);
        setRequest(details.requestId, {
          ...result,
        });
        pushToQueue(details.requestId);
        return { cancel: result.blocked && StatsListener.isActive() };
      },
      urlFilter,
      ["requestHeaders", "extraHeaders", "blocking"]
    );
    
    return () => true;
  })();

  console.log("Backend Ready")
})();

export {  
  EventListener
}
