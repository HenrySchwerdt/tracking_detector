let requests = [];
let currentTab = undefined;

const uniqueTrackers = (requests) => {
  return requests.filter(x => x.blocked).map(x => new URL(
    x.url
  ).hostname).filter((v, i, a) => a.indexOf(v) === i)
}

const numberOfTrackers = (requests) => {
  return uniqueTrackers(requests).length
}

chrome.storage.local.get(["info"], (data) => {
  document.getElementById("favicon").src = data.info.favIconUrl;
  document.getElementById("currentUrl").innerText = new URL(
    data.info.url
  ).hostname;
});

chrome.storage.local.get(["requests"], (data) => {
  requests = data.requests;
  document.getElementById("numOfBlockedRequests").innerHTML = numberOfTrackers(requests);
});

setInterval(() => {
  chrome.storage.local.get(["info"], (data) => {
    if (currentTab != data.info.id) {
      currentTab = data.info.id;
      requests = []
    }
    document.getElementById("favicon").src = data.info.favIconUrl;
    document.getElementById("currentUrl").innerText = new URL(
      data.info.url
    ).hostname;
  });
}, 200);

const buildCollapsableContent = (id, urls) => {
  document.getElementById(id).innerHTML = '';
  urls.forEach(url => {
    let innerHtml = `<div>
      <div class="mui--text-caption mt-1">${url}</div>
      
      <div class="mui-divider mt-1">
      </div>
    </div>`
    let el = document.createElement('div')
    el.innerHTML = innerHtml;
    document.getElementById(id).appendChild(el);
  });
}

setInterval(() => {
  chrome.storage.local.get(["requests"], (data) => {
    if (requests.length < data.requests.length) {
      requests = data.requests;
      buildCollapsableContent('requests', requests.filter(r => r.blocked).map(r => r.url))
      buildCollapsableContent('trackers', uniqueTrackers(requests))
      document.getElementById("numOfBlockedRequests").innerHTML = numberOfTrackers(requests);
    }
    
  });
}, 200);

let settingsState = {
  active: true,
  rate: 0.8
}

chrome.storage.local.get(['settings'], (data) => {
  if (data == undefined) {
    document.getElementById('checkBox').checked = true
  } else {
    settingsState = data.settings
    document.getElementById('checkBox').checked = settingsState.active
  }
})

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    
    this.classList.toggle("active");
    this.childNodes[3].classList.toggle("mui-caret--up")
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

document.getElementById('checkBox').addEventListener('click', () => {
  settingsState.active = !settingsState.active;
  chrome.storage.local.set({settings: {active: settingsState.active, rate: settingsState.rate}});
})


document.getElementById('rangeSlider').addEventListener('change', (el, ev) => {
  console.log(el)
  console.log(ev)
})
