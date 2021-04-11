
namespace scene {
    import View = laya.ui.View;
    export class MainMenu extends View {
        private bg: Laya.Sprite;
        private angry: Laya.Sprite = new Laya.Sprite();
        private de: Laya.Sprite = new Laya.Sprite();
        private amao: Laya.Sprite = new Laya.Sprite();

        private start: Laya.Sprite = new Laya.Sprite();
        private shop: Laya.Sprite = new Laya.Sprite();
        // private rankList: Laya.Sprite = new Laya.Sprite();

        private timeLine: Laya.TimeLine = new Laya.TimeLine();
        private shopTimeLine: Laya.TimeLine = new Laya.TimeLine();

        private shopui: shopUI = new shopUI();
        private readonly SelectAMao = 1;
        private readonly SelectGoldAMao = 2;
        private readonly SelectBianYiAMao = 3;
        private readonly GolePriceY: number = this.shopui.GoldPrice.y;
        private readonly BianYiPriceY: number = this.shopui.BianPrice.y;

        private template;
        private skeleton;

        constructor() {
            super();
            this.bg = new Laya.Sprite();
            this.bg.loadImage(resource.MainBg, 0, 0, 0, 0, 
                new Laya.Handler(this, this.logoLoaded));
        }

        private initShopUI() {
            this.shopui.popupCenter = true;
            this.shopui.SelectGold.mouseEnabled = true;
            this.shopui.SelectBian.mouseEnabled = true;
            this.shopui.SelectAMao.mouseEnabled = true;
            
            this.shopui.SelectGold.on(Laya.Event.CLICK, this, this.mouseHandler, [this.SelectGoldAMao]);
            this.shopui.SelectBian.on(Laya.Event.CLICK, this, this.mouseHandler, [this.SelectBianYiAMao]);
            this.shopui.SelectAMao.on(Laya.Event.CLICK, this, this.mouseHandler, [this.SelectAMao]);
            this.shopui.CloseBtn.on(Laya.Event.CLICK, this, function() {
                shopUI.closeAll();
            });
            this.initShopTexture();
        }

        private logoLoaded(): void {
            Laya.stage.addChild(this.bg);
            Laya.loader.load(
                [
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
        }

        private assetsLoaded(): void {
            let texture: Laya.Texture = Laya.loader.getRes(resource.Angry);
            this.angry.graphics.drawTexture(texture);
            this.angry.pos(80, -texture.height);
            this.angry.size(texture.width, texture.height);
            // console.log(this.angry.getBounds());
            Laya.stage.addChild(this.angry);
            Laya.Tween.to(this.angry, {y: 50 }, 3000, Laya.Ease.bounceOut);

            texture = Laya.loader.getRes(resource.De);
            this.de.graphics.drawTexture(texture);
            this.de.pos(this.angry.x + this.angry.width + 20, -texture.height);
            this.de.size(texture.width, texture.height);
            Laya.stage.addChild(this.de);
            Laya.Tween.to(this.de, {y: 60}, 3000, Laya.Ease.bounceOut, null, 1000);

            texture = Laya.loader.getRes(resource.AMao);
            this.amao.graphics.drawTexture(texture);
            this.amao.pos(this.angry.x + this.angry.width + 40, -texture.height);
            this.amao.size(texture.width, texture.height);
            Laya.stage.addChild(this.amao);
            Laya.Tween.to(this.amao, {y: 80 + this.de.height}, 3000, Laya.Ease.elasticOut, null, 3000);

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
                .to(this.start, {scaleX: 0.95, scaleY: 0.95, rotation: 5}, 500, null, 0)
                .to(this.start, {scaleX: 1, scaleY: 1, rotation: 0}, 500, null, 0)
                .to(this.start, {scaleX: 0.95, scaleY: 0.95, rotation: -5}, 500, null, 0)
                .to(this.start, {scaleX: 1, scaleY: 1, rotation: 0}, 500, null, 0);
            this.timeLine.play(0, true);

            this.shopTimeLine.addLabel('shop_button', 0)
                .to(this.shop, {scaleX: 0.55, scaleY: 0.95, rotation: 5}, 100, Laya.Ease.circIn, 0)
                .to(this.shop, {scaleX: 0.95, scaleY: 0.55, rotation: -5}, 100, Laya.Ease.circOut, 0)
                .to(this.shop, {scaleX: 0.55, scaleY: 0.95, rotation: 5}, 100, Laya.Ease.circIn, 0)
                .to(this.shop, {scaleX: 0.95, scaleY: 0.55, rotation: -5}, 100, Laya.Ease.circOut, 0)
                .to(this.shop, {scaleX: 1, scaleY: 1, rotation: 0}, 100, null, 0)
                .to(this.shop, {scaleX: 1, scaleY: 1, rotation: 0}, 3000, null, 0);
            this.shopTimeLine.play(0, true);
            
            this.initShopUI();
        }

        private clear(del) {
            this.bg.destroy(del);
            this.angry.destroy(del);
            this.de.destroy(del);
            this.amao.destroy(del);
            this.start.destroy(del);
            this.shop.destroy(del);
            // this.rankList.destroy(del);
            this.timeLine.destroy();
            this.shopTimeLine.destroy();
        }

        private showShop(e: Event) {
            if (e.type == Laya.Event.CLICK ) {
                this.initShopTexture();
                this.shopui.popup();
            }
        }

        private initShopTexture() {
            let texture: Laya.Texture = Laya.loader.getRes(resource.SelectedBtn);
            let textureName: Laya.Texture;
            switch(config.currentSelect) {
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
        }

        private mouseHandler(type, e: Event): void {
            let texture: Laya.Texture = Laya.loader.getRes(resource.SelectedBtn);
            let texture2: Laya.Texture = Laya.loader.getRes(resource.BuyBtn);
            let textureName: Laya.Texture;

            switch (e.type) {
                case Laya.Event.CLICK:
                switch(type) {
                    case this.SelectGoldAMao:
                        if (config.currentSelect == 2) {
                            return;
                        }
                        if (!config.hasGoldAMao) {
                            if (config.coin > config.goldPrice) {
                                config.coin -= config.goldPrice;
                                config.hasGoldAMao = true;
                            } else {
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
                            } else {
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
        }

        private showAMaoRemark() {
            switch(config.currentSelect) {
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
        }

        private loadAmao() {
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
        }

        private onAmaoLoaded() {
            this.skeleton = this.template.buildArmature(0);
            this.skeleton.play('run', true);
            const bounds = this.skeleton.getBounds();
            this.skeleton.pivot(bounds.width / 2, bounds.height / 2);
            this.skeleton.x = this.shopui.AMao.width / 2 + bounds.width / 2;
            this.skeleton.y = this.shopui.AMao.height / 2 + bounds.height / 2;
            this.shopui.AMao.addChild(this.skeleton);
        }

        private startGame(e: Event) {
            if (e.type == Laya.Event.CLICK ) {
                this.clear(false);
                new Game();
            }
        }

    }
}