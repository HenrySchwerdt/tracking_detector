const EventListener = (() => {
    const urlFilter = { urls: ["http://*/*", "https://*/*"] };
    let requests = {};
  
    const load = (() => {
      chrome.webRequest.onBeforeRequest.addListener(
        (details) => {
          if (details.tabId < 0) {
            return;
          }
  
          if (details.hasOwnProperty("requestBody")) {
            delete details.requestBody;
          }
         
          EventListener.setRequest(details.requestId, details);
  
          EventListener.getCompletedTabFromId(details.tabId, (tab) => {
            EventListener.setRequest(details.requestId, {
              source: tab.url,
              complete: true,
            });
  
            EventListener.getRequest(details.requestId).requestHeaders &&
              EventListener.getRequest(details.requestId).response &&
              EventListener.pushToQueue(details.requestId);
          });
        },
        urlFilter,
        ["requestBody"]
      );

      setInterval(() => {

      }, 1000);
  
      chrome.webRequest.onBeforeSendHeaders.addListener(
        async (details) => {
          EventListener.setRequest(details.requestId, {
            requestHeaders: details.requestHeaders,
          });
          let result = await RequestBlocker.check(details);
          EventListener.setRequest(details.requestId, {
           ...result
          });  
          EventListener.pushToQueue(details.requestId);
          return {cancel: result.blocked && StatsListener.isActive()}
        },
        urlFilter,
        ["requestHeaders", "extraHeaders", "blocking"]
      );
      
      console.log("Event Listener Setup");
      return () => true;
    })();
  
    return {
      isLoaded: () => load(),
      getRequest: (requestId) => requests[requestId],
      setRequest: (requestId, obj) => {
        let tmp = requests[requestId] ? requests[requestId] : {};
        requests[requestId] = Object.assign(tmp, obj);
      },
      pushToQueue: (requestId) => {
        Requests.add(EventListener.getRequest(requestId));
        delete EventListener.getRequest(requestId);
      },
      getCompletedTabFromId: (tabId, callback) => {
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
      },
    };
  })();