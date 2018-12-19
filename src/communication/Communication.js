import url from "url";

export default class Communication {
    constructor(baseUrl, preload = true) {
        this.baseUrl = baseUrl;
        this._allVitamins = null;
        if (preload) {
            this.getAllVitamins();
        }
    }

    async getVitamin(vitaminUrl) {
        var res = await fetch(vitaminUrl);
        var json = await res.json();
        return json;
    }

    getAllVitamins() {
        if (!this._allVitamins) {
            this._allVitamins = this._getAllVitamins();
        }
        return this._allVitamins;
    }

    async _getAllVitamins() {
        var u = url.resolve(this.baseUrl, "api/v1/vitamins");
        var res = await fetch(u);
        var vitaminsJson = await res.json();
        var vitaminUrls = vitaminsJson.vitamins;

        // I think this is faster since it allows requests to start in any order.
        // I might be mistaken.
        var promises = vitaminUrls.map(async function(vitaminUrl) {
            var res = await fetch(vitaminUrl);
            return await res.json();
        });

        var out = [];
        for (let i in promises) {
            out[i] = await promises[i];
        }
        return out;
    }
}
