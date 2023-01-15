let requests = [];
chrome.storage.local.get(["info"], (data) => {
  document.getElementById("favicon").src = data.info.favIconUrl;
  document.getElementById("currentUrl").innerText = new URL(
    data.info.url
  ).hostname;
});

chrome.storage.local.get(["requests"], (data) => {
  requests = data.requests;
  let blocked = data.requests.filter((x) => x.blocked).length;
  document.getElementById("numOfBlockedRequests").innerHTML = blocked;
});
setInterval(() => {
  chrome.storage.local.get(["info"], (data) => {
    document.getElementById("favicon").src = data.info.favIconUrl;
    document.getElementById("currentUrl").innerText = new URL(
      data.info.url
    ).hostname;
  });
}, 200);

setInterval(() => {
  chrome.storage.local.get(["requests"], (data) => {
    requests = data.requests;
    let blocked = data.requests.filter((x) => x.blocked).length;
    document.getElementById("numOfBlockedRequests").innerHTML = blocked;
  });
}, 200);

document.getElementById('moreInfos').addEventListener("click", () => {
    console.log("Clicked")
    buildRequestList();
})

function buildRequestList() {
  const container = document.createElement("div");
  container.id = "requestsholder";
  requests
    .filter((x) => x.blocked)
    .map((x) => {
       let url=  new URL(
            x.url
          );
      let item = document.createElement("div");
      let text = document.createTextNode(JSON.stringify(url));
      item.appendChild(text)
      return item
    }).forEach(x => {
        container.appendChild(x);
    });

    document.getElementById('requests').appendChild(container);
}
