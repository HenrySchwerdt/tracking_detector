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
    document.getElementById('requests').innerHTML = '';
    requests.filter(x=>x.blocked).forEach(request => {
      let innerHtml = `<div>
        <div class="mui--text-caption mt-1">${request.url}</div>
        
        <div class="mui-divider mt-1">
        </div>
      </div>`
      let el = document.createElement('div')
      el.innerHTML = innerHtml;
      document.getElementById('requests').appendChild(el);
    });
    
    let blocked = data.requests.filter((x) => x.blocked).length;
    document.getElementById("numOfBlockedRequests").innerHTML = blocked;
  });
}, 200);




var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
