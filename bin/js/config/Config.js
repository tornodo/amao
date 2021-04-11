var WebGL = Laya.WebGL;
var util;
(function (util) {
    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.Save = function () {
            Laya.LocalStorage.setItem("currentSelect", config.currentSelect.toString());
            Laya.LocalStorage.setItem("hasGoldAMao", config.hasGoldAMao ? "1" : "0");
            Laya.LocalStorage.setItem("hasBianYiAMao", config.hasBianYiAMao ? "1" : "0");
            Laya.LocalStorage.setItem("coin", config.coin.toString());
        };
        Config.Load = function () {
            var select = Laya.LocalStorage.getItem("currentSelect");
            var hasGold = Laya.LocalStorage.getItem("hasGoldAMao");
            var hasBianYi = Laya.LocalStorage.getItem("hasBianYiAMao");
            var coin = Laya.LocalStorage.getItem("coin");
            switch (select) {
                case "2":
                    config.currentSelect = 2;
                    break;
                case "3":
                    config.currentSelect = 3;
                    break;
                default:
                    config.currentSelect = 1;
            }
            config.hasGoldAMao = (hasGold == "0" || hasGold == null) ? false : true;
            if (!config.hasGoldAMao && config.currentSelect == 2) {
                config.currentSelect = 1;
            }
            config.hasBianYiAMao = (hasBianYi == "0" || hasBianYi == null) ? false : true;
            if (!config.hasBianYiAMao && config.currentSelect == 3) {
                config.currentSelect = 1;
            }
            config.coin = Number(coin);
            if (isNaN(config.coin)) {
                config.coin = 0;
            }
        };
        Config.width = 1000;
        Config.height = 619;
        Config.model = WebGL;
        Config.coin = 0;
        Config.dangerCounts = 12;
        Config.jumpDistance = 200;
        Config.collisionWidth = 40;
        Config.collisionHeight = 50;
        Config.goldPrice = 5000;
        Config.bianyiPrice = 20000;
        Config.currentSelect = 1;
        Config.hasGoldAMao = false;
        Config.hasBianYiAMao = false;
        return Config;
    }());
    util.Config = Config;
})(util || (util = {}));
//# sourceMappingURL=Config.js.map