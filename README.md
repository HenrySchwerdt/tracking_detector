<img src="./public/icons/icon128.png" height="128" width="128">

# Tracking Detector

Tracking Detector is a proof of concept for real time web tracker detection. The extension has an underlying DNN model which can identify tracking from non-tracking web requests.

## Model
The model is a tensorflowjs sequential dnna and expects a feature vector of dimension (1, 204) and returns a single number between 0 and 1. One being a tracker and 0 being a non-tracker.

### Feature Extraction
The feature vector is build in real time and encodes the url of the web requests as well as other information.

```js
// Part of FeatureExtractor.js
const generateURLEncoding = (url) => {
        let encoding = [];
        for (let i = 0; i< url.length; i++) {
            encoding.push((url.charCodeAt(i) % 89) +1 )
        }
        if (encoding.length < 200) {
            encoding = new Array(200 - encoding.length).fill(0).concat(encoding);
        } else if (encoding.length > 200) {
            encoding.splice(0, encoding.length - 200);
        }
        return encoding;
    }
return {
    encode(request) {
        let features = [];
        features = features.concat(generateURLEncoding(request.url));
        // features.push(request.frameId > 200000 ? 199999 : (request.frameId+1));
        features.push(frameTypes.indexOf(request.frameType)+1);
        features.push((methods.indexOf(request.method)+1));
        features.push((types.indexOf(request.type)+1));
        features.push((request.requestHeaders.filter(x => x.name == "Referer").length == 1 ? 1 : 0));
        const tensor = tf.reshape(tf.tensor(features), [1, 204]);
        return tensor
    }
}
```
The url gets transformed to a sequence of integer values between 1 and 90. The model only uses 200 characters of the url and adds padding when the url is to short or deletes the starting characters. 

#### Additional features
##### frameType
The frameType gets transformed to an integer value between 1 and 3.
```js
// All possible frameTypes
const frameTypes = [
    "outermost_frame",
    "fenced_frame",
    "sub_frame",
]
```
##### httpMethod
The httpMethod gets transformed to an integer value between 1 and 8.
```js
// All possible methods
const methods = [
        "GET",
        "POST",
        "OPTIONS",
        "HEAD",
        "PUT",
        "DELETE",
        "SEARCH",
        "PATCH",
]
```

##### httpMethod
The requestType gets transformed to an integer value between 1 and 12.
```js
// All possible requesttypes
const types = [
        "xmlhttprequest",
        "image",
        "font",
        "script",
        "stylesheet",
        "ping",
        "sub_frame",
        "other",
        "main_frame",
        "csp_report",
        "object",
        "media",
]
```

##### Sample Encoding
```
0,0,...,16,28,28,24,27,59,48,...,1,1,2,1
```
This vector includes a padding at the beginning the encoded url and the additional attributes.

## Build
### Clone the repository.
```git clone https://github.com/HenrySchwerdt/tracking_detector.git```
### Install Dependencies
```npm install```

### Build Project
```npm run build```




## Installation
You can directly install the extension from the public folder when Chrome developer options are enabled.