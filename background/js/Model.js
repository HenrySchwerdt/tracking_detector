const Model = (async () => {
    const MODEL_URI = chrome.runtime.getURL("model/model.json");
    const model = await tf.loadLayersModel(MODEL_URI); 
    return {
        predict(features) {
            return model.predict(features);
        }
    }
})(); 