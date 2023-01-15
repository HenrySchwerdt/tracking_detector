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
      chrome.tabs.get(tabId, function (tab) {
        if (chrome.runtime.lastError || typeof tab === "undefined") {
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
    chrome.webRequest.onBeforeRequest.addListener(
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

    chrome.webRequest.onBeforeSendHeaders.addListener(
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

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   async (details) => {
//     setRequest(details.requestId, {
//       requestHeaders: details.requestHeaders,
//     });
//     let result = blocker.check(details);
//     setRequest(details.requestId, {
//       ...result,
//     });
//     pushToQueue(details.requestId);
//     return { cancel: true }//result.blocked && StatsListener.isActive() };
//   },
//   urlFilter,
//   ["requestHeaders", "extraHeaders", "blocking"]
// );
// chrome.webRequest.onBeforeSendHeaders.addListener(
//   (details) => {
//    return { cancel: true }//result.blocked && StatsListener.isActive() };
//  },
//  { urls: ["http://*/*", "https://*/*"] },
//  ["requestHeaders", "extraHeaders", "blocking"]
// );