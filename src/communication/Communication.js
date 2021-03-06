import url from "url";

import VitaminParse from "../parsing/VitaminParse.js";

export default class Communication {
    constructor(baseUrl, preload = true) {
        this.baseUrl = baseUrl;
        this._allVitamins = null;
        this.userID = 1; // TODO: Let the user log in
        if (preload) {
            this.getAllVitamins();
        }
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
            out[i] = VitaminParse(await promises[i]);
        }
        return out;
    }

    async submitScreening(screening) {
        // Posts a screening to the server and gets the recommended vitamins
        // TODO: Pull the screening format from the server
        var toPost = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "cache-control": "no-cache"
            },
            body: JSON.stringify(screening)
        };


        var postUrl = url.resolve(this.baseUrl, "api/v1/users/new_screening/" + this.userID);
        console.log(postUrl);
        var res = await fetch(postUrl, toPost);

        return await res.json();

    }
}
