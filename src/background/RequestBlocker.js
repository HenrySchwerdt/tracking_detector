import { Model } from "./Model";
import { FeatureExtractor } from "./FeatureExtractor";
import { StatsListener } from "./StatsListener";
const RequestBlocker = (async () => {
    
    let model = await Model;
    return {
        check(request) {
            let encoding = FeatureExtractor.encode(request);
            
            let result = model.predict(encoding)
           
            const values = result.dataSync();
            const arr = Array.from(values);

            return {predict: arr[0], blocked: arr[0] >= StatsListener.getRate()}
        }
    }
})();

export {
    RequestBlocker
}