const FeatureExtractor = (() => {
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
    
    const frameTypes = [
        "outermost_frame",
        "fenced_frame",
        "sub_frame",
    ]

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
    console.log("Feature Extractor Setup");
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
})();