const RequestBlocker = (() => {
    return {
        async check(request) {
            let encoding = FeatureExtractor.encode(request);
            let model = await Model;
            let result = model.predict(encoding)
           
            const values = result.dataSync();
            const arr = Array.from(values);

            return {predict: arr[0], blocked: arr[0] > StatsListener.getRate()}
        }
    }
})();