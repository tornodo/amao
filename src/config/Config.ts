import WebGL = Laya.WebGL;

namespace util {
    export class Config {
        public static readonly width: number = 1000;
        public static readonly height: number = 619;
        public static readonly model = WebGL;
        public static coin = 0;
        public static readonly dangerCounts = 12;
        public static readonly jumpDistance = 200;
        public static collisionWidth = 40;
        public static collisionHeight = 50;

        public static goldPrice = 5000;
        public static bianyiPrice = 20000;
        public static currentSelect = 1;
        public static hasGoldAMao = false;
        public static hasBianYiAMao = false;

        public static Save(): void {
            Laya.LocalStorage.setItem("currentSelect", config.currentSelect.toString());
            Laya.LocalStorage.setItem("hasGoldAMao", config.hasGoldAMao ? "1" : "0");
            Laya.LocalStorage.setItem("hasBianYiAMao", config.hasBianYiAMao ? "1" : "0");
            Laya.LocalStorage.setItem("coin", config.coin.toString());
        }

        public static Load(): void {
            let select = Laya.LocalStorage.getItem("currentSelect");
            let hasGold: string = Laya.LocalStorage.getItem("hasGoldAMao");
            let hasBianYi: string = Laya.LocalStorage.getItem("hasBianYiAMao");
            let coin = Laya.LocalStorage.getItem("coin");
            switch(select) {
                case "2":
                    config.currentSelect = 2;
                break;
                case "3":
                    config.currentSelect = 3;
                break;
                default:
                    config.currentSelect = 1;
            }
            
            config.hasGoldAMao = (hasGold == "0" || hasGold == null) ? false: true;
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
        }
    }
}