import * as tf from "@tensorflow/tfjs";

const Model = (async () => {
  const MODEL_URI = browser.runtime.getURL("model/model.json");
  const model = await tf.loadLayersModel(MODEL_URI);
  return {
    predict(features) {
      return model.predict(features);
    },
  };
})();

export { Model };
