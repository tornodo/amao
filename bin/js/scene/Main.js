var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scene;
(function (scene) {
    var View = laya.ui.View;
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super.call(this) || this;
            _this.angry = new Laya.Sprite();
            _this.de = new Laya.Sprite();
            _this.amao = new Laya.Sprite();
            _this.start = new Laya.Sprite();
            _this.shop = new Laya.Sprite();
            // private rankList: Laya.Sprite = new Laya.Sprite();
            _this.timeLine = new Laya.TimeLine();
            _this.shopTimeLine = new Laya.TimeLine();
            _this.shopui = new shopUI();
            _this.SelectAMao = 1;
            _this.SelectGoldAMao = 2;
            _this.SelectBianYiAMao = 3;
            _this.GolePriceY = _this.shopui.GoldPrice.y;
            _this.BianYiPriceY = _this.shopui.BianPrice.y;
            _this.bg = new Laya.Sprite();
            _this.bg.loadImage(resource.MainBg, 0, 0, 0, 0, new Laya.Handler(_this, _this.logoLoaded));
            return _this;
        }
        MainMenu.prototype.initShopUI = function () {
            this.shopui.popupCenter = true;
            this.shopui.SelectGold.mouseEnabled = true;
            this.shopui.SelectBian.mouseEnabled = true;
            this.shopui.SelectAMao.mouseEnabled = true;
            this.shopui.SelectGold.on(Laya.Event.CLICK, this, this.mouseHandler, [this.SelectGoldAMao]);
            this.shopui.SelectBian.on(Laya.Event.CLICK, this, this.mouseHandler, [this.SelectBianYiAMao]);
            this.shopui.SelectAMao.on(Laya.Event.CLICK, this, this.mouseHandler, [this.SelectAMao]);
            this.shopui.CloseBtn.on(Laya.Event.CLICK, this, function () {
                shopUI.closeAll();
            });
            this.initShopTexture();
        };
        MainMenu.prototype.logoLoaded = function () {
            Laya.stage.addChild(this.bg);
            Laya.loader.load([
                resource.Angry,
                resource.De,
                resource.AMao,
                resource.Start,
                resource.Shop,
                // resource.RankList,
                resource.SelectedBtn,
                resource.BuyBtn,
                resource.Have,
                resource.AMaoName,
                resource.BianYiName,
                resource.GoldName,
                resource.GoldAMaoPNG,
                resource.BianYiAMaoPNG,
                resource.AMaoPNG
            ], Laya.Handler.create(this, this.assetsLoaded));
        };
        MainMenu.prototype.assetsLoaded = function () {
            var texture = Laya.loader.getRes(resource.Angry);
            this.angry.graphics.drawTexture(texture);
            this.angry.pos(80, -texture.height);
            this.angry.size(texture.width, texture.height);
            // console.log(this.angry.getBounds());
            Laya.stage.addChild(this.angry);
            Laya.Tween.to(this.angry, { y: 50 }, 3000, Laya.Ease.bounceOut);
            texture = Laya.loader.getRes(resource.De);
            this.de.graphics.drawTexture(texture);
            this.de.pos(this.angry.x + this.angry.width + 20, -texture.height);
            this.de.size(texture.width, texture.height);
            Laya.stage.addChild(this.de);
            Laya.Tween.to(this.de, { y: 60 }, 3000, Laya.Ease.bounceOut, null, 1000);
            texture = Laya.loader.getRes(resource.AMao);
            this.amao.graphics.drawTexture(texture);
            this.amao.pos(this.angry.x + this.angry.width + 40, -texture.height);
            this.amao.size(texture.width, texture.height);
            Laya.stage.addChild(this.amao);
            Laya.Tween.to(this.amao, { y: 80 + this.de.height }, 3000, Laya.Ease.elasticOut, null, 3000);
            texture = Laya.loader.getRes(resource.Start);
            this.start.pos(595, 370);
            this.start.graphics.drawTexture(texture);
            this.start.size(texture.width, texture.height);
            this.start.pivot(texture.width / 2, texture.height / 2);
            Laya.stage.addChild(this.start);
            this.start.on(Laya.Event.CLICK, this, this.startGame);
            // texture = Laya.loader.getRes(resource.RankList);
            // this.rankList.graphics.drawTexture(texture);
            // this.rankList.size(texture.width, texture.height);
            // this.rankList.pos(this.bg.width - this.rankList.width, 30);
            // Laya.stage.addChild(this.rankList);
            texture = Laya.loader.getRes(resource.Shop);
            this.shop.graphics.drawTexture(texture);
            this.shop.size(texture.width, texture.height);
            this.shop.pos(Laya.stage.width - 1.5 * this.shop.width + texture.width / 2, 30 + texture.height / 2);
            this.shop.pivot(texture.width / 2, texture.height / 2);
            Laya.stage.addChild(this.shop);
            this.shop.on(Laya.Event.CLICK, this, this.showShop);
            this.timeLine.addLabel('start_button', 0)
                .to(this.start, { scaleX: 0.95, scaleY: 0.95, rotation: 5 }, 500, null, 0)
                .to(this.start, { scaleX: 1, scaleY: 1, rotation: 0 }, 500, null, 0)
                .to(this.start, { scaleX: 0.95, scaleY: 0.95, rotation: -5 }, 500, null, 0)
                .to(this.start, { scaleX: 1, scaleY: 1, rotation: 0 }, 500, null, 0);
            this.timeLine.play(0, true);
            this.shopTimeLine.addLabel('shop_button', 0)
                .to(this.shop, { scaleX: 0.55, scaleY: 0.95, rotation: 5 }, 100, Laya.Ease.circIn, 0)
                .to(this.shop, { scaleX: 0.95, scaleY: 0.55, rotation: -5 }, 100, Laya.Ease.circOut, 0)
                .to(this.shop, { scaleX: 0.55, scaleY: 0.95, rotation: 5 }, 100, Laya.Ease.circIn, 0)
                .to(this.shop, { scaleX: 0.95, scaleY: 0.55, rotation: -5 }, 100, Laya.Ease.circOut, 0)
                .to(this.shop, { scaleX: 1, scaleY: 1, rotation: 0 }, 100, null, 0)
                .to(this.shop, { scaleX: 1, scaleY: 1, rotation: 0 }, 3000, null, 0);
            this.shopTimeLine.play(0, true);
            this.initShopUI();
        };
        MainMenu.prototype.clear = function (del) {
            this.bg.destroy(del);
            this.angry.destroy(del);
            this.de.destroy(del);
            this.amao.destroy(del);
            this.start.destroy(del);
            this.shop.destroy(del);
            // this.rankList.destroy(del);
            this.timeLine.destroy();
            this.shopTimeLine.destroy();
        };
        MainMenu.prototype.showShop = function (e) {
            if (e.type == Laya.Event.CLICK) {
                this.initShopTexture();
                this.shopui.popup();
            }
        };
        MainMenu.prototype.initShopTexture = function () {
            var texture = Laya.loader.getRes(resource.SelectedBtn);
            var textureName;
            switch (config.currentSelect) {
                case 1:
                    this.shopui.SelectAMao.graphics.drawTexture(texture);
                    textureName = Laya.loader.getRes(resource.AMaoName);
                    break;
                case 2:
                    this.shopui.SelectGold.graphics.drawTexture(texture);
                    textureName = Laya.loader.getRes(resource.GoldName);
                    break;
                case 3:
                    this.shopui.SelectBian.graphics.clear();
                    this.shopui.SelectBian.graphics.drawTexture(texture);
                    textureName = Laya.loader.getRes(resource.BianYiName);
                    break;
            }
            this.shopui.ShowName.graphics.clear();
            this.shopui.ShowName.graphics.drawTexture(textureName);
            texture = Laya.loader.getRes(resource.Have);
            if (config.hasGoldAMao) {
                this.shopui.GoldPrice.graphics.clear();
                this.shopui.GoldPrice.graphics.drawTexture(texture);
                this.shopui.GoldPrice.pos(216, this.GolePriceY - 8);
            }
            if (config.hasBianYiAMao) {
                this.shopui.BianPrice.graphics.clear();
                this.shopui.BianPrice.graphics.drawTexture(texture);
                this.shopui.BianPrice.pos(216, this.BianYiPriceY - 8);
            }
            this.showAMaoRemark();
            this.loadAmao();
        };
        MainMenu.prototype.mouseHandler = function (type, e) {
            var texture = Laya.loader.getRes(resource.SelectedBtn);
            var texture2 = Laya.loader.getRes(resource.BuyBtn);
            var textureName;
            switch (e.type) {
                case Laya.Event.CLICK:
                    switch (type) {
                        case this.SelectGoldAMao:
                            if (config.currentSelect == 2) {
                                return;
                            }
                            if (!config.hasGoldAMao) {
                                if (config.coin > config.goldPrice) {
                                    config.coin -= config.goldPrice;
                                    config.hasGoldAMao = true;
                                }
                                else {
                                    return;
                                }
                            }
                            config.currentSelect = 2;
                            textureName = Laya.loader.getRes(resource.GoldName);
                            this.shopui.SelectGold.graphics.clear();
                            this.shopui.SelectGold.graphics.drawTexture(texture);
                            this.shopui.SelectBian.graphics.clear();
                            this.shopui.SelectBian.graphics.drawTexture(texture2);
                            this.shopui.SelectAMao.graphics.clear();
                            this.shopui.SelectAMao.graphics.drawTexture(texture2);
                            break;
                        case this.SelectBianYiAMao:
                            if (config.currentSelect == 3) {
                                return;
                            }
                            if (!config.hasBianYiAMao) {
                                if (config.coin > config.bianyiPrice) {
                                    config.coin -= config.bianyiPrice;
                                    config.hasBianYiAMao = true;
                                }
                                else {
                                    return;
                                }
                            }
                            config.currentSelect = 3;
                            textureName = Laya.loader.getRes(resource.BianYiName);
                            this.shopui.SelectGold.graphics.clear();
                            this.shopui.SelectGold.graphics.drawTexture(texture2);
                            this.shopui.SelectBian.graphics.clear();
                            this.shopui.SelectBian.graphics.drawTexture(texture);
                            this.shopui.SelectAMao.graphics.clear();
                            this.shopui.SelectAMao.graphics.drawTexture(texture2);
                            break;
                        case this.SelectAMao:
                            if (config.currentSelect == 1) {
                                return;
                            }
                            config.currentSelect = 1;
                            textureName = Laya.loader.getRes(resource.AMaoName);
                            this.shopui.SelectGold.graphics.clear();
                            this.shopui.SelectGold.graphics.drawTexture(texture2);
                            this.shopui.SelectBian.graphics.clear();
                            this.shopui.SelectBian.graphics.drawTexture(texture2);
                            this.shopui.SelectAMao.graphics.clear();
                            this.shopui.SelectAMao.graphics.drawTexture(texture);
                            break;
                    }
            }
            this.showAMaoRemark();
            this.shopui.ShowName.graphics.clear();
            this.shopui.ShowName.graphics.drawTexture(textureName);
            this.initShopTexture();
            this.loadAmao();
            config.Save();
        };
        MainMenu.prototype.showAMaoRemark = function () {
            switch (config.currentSelect) {
                case 1:
                    this.shopui.ShowRemark.text = "基础阿毛：这是一只充满了愤怒的阿毛";
                    break;
                case 2:
                    this.shopui.ShowRemark.text = "黄金阿毛：开局吸收金币10秒钟，跳跃达到110%的高度，跳跃时长增加100毫秒";
                    break;
                case 3:
                    this.shopui.ShowRemark.text = "变异阿毛：开局吸收金币15秒钟，跳跃达到130%的高度，跳跃时长增加150毫秒";
                    break;
            }
            this.shopui.ShowRemark.wordWrap = true;
            this.shopui.ShowRemark.bold = true;
            this.shopui.ShowRemark.fontSize = 23;
            this.shopui.ShowRemark.color = "#FFFFFF";
            this.shopui.ShowRemark.padding = [10, 10, 10, 10];
        };
        MainMenu.prototype.loadAmao = function () {
            if (this.template) {
                this.template.destroy();
            }
            this.template = new Laya.Templet();
            this.template.on(Laya.Event.COMPLETE, this, this.onAmaoLoaded);
            switch (config.currentSelect) {
                case 2:
                    this.template.loadAni(resource.GoldAMaoSK);
                    break;
                case 3:
                    this.template.loadAni(resource.BianYiAMaoSK);
                    break;
                case 1:
                default:
                    this.template.loadAni(resource.AMaoSK);
                    break;
            }
        };
        MainMenu.prototype.onAmaoLoaded = function () {
            this.skeleton = this.template.buildArmature(0);
            this.skeleton.play('run', true);
            var bounds = this.skeleton.getBounds();
            this.skeleton.pivot(bounds.width / 2, bounds.height / 2);
            this.skeleton.x = this.shopui.AMao.width / 2 + bounds.width / 2;
            this.skeleton.y = this.shopui.AMao.height / 2 + bounds.height / 2;
            this.shopui.AMao.addChild(this.skeleton);
        };
        MainMenu.prototype.startGame = function (e) {
            if (e.type == Laya.Event.CLICK) {
                this.clear(false);
                new scene.Game();
            }
        };
        return MainMenu;
    }(View));
    scene.MainMenu = MainMenu;
})(scene || (scene = {}));
//# sourceMappingURL=Main.js.map