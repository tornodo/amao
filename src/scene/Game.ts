
namespace scene {

    export class Game extends Laya.View {
        private speed = 10;
        private zhanLanSpeed = 8;
        private caodiSpeed = 5;
        private cloudSpeed = 3;
        private moutainSpeed = 1;

        private score = 0;//得分
        private dead = false;//死亡
        private isJumping = false;//跳跃状态

        private bitmapFont: Laya.BitmapFont;
        private scoreText = new Laya.Text();
        private coinText = new Laya.Text();
        
        private bg: Laya.Sprite = new Laya.Sprite();
        private caodi: Laya.Sprite = new Laya.Sprite();
        private caodi2: Laya.Sprite = new Laya.Sprite();
        private cloud: Laya.Sprite = new Laya.Sprite();
        private cloud2: Laya.Sprite = new Laya.Sprite();
        private land: Laya.Sprite = new Laya.Sprite();
        private land2: Laya.Sprite = new Laya.Sprite();
        private Moutain: Laya.Sprite = new Laya.Sprite();
        private Moutain2: Laya.Sprite = new Laya.Sprite();
        private Zhalan: Laya.Sprite = new Laya.Sprite();
        private Zhalan2: Laya.Sprite = new Laya.Sprite();

        private template = new Laya.Templet();
        private skeleton;

        private resources = [
                resource.GameBg, 
                resource.Caodi, 
                resource.Cloud,
                resource.Cloud2,
                resource.Land,
                resource.Moutain,
                resource.Moutain2,
                resource.Zhalan,
                resource.GoldAMaoPNG,
                resource.BianYiAMaoPNG,
                resource.Coin,
                resource.SuperCoin
                ];

        private jumpTimeLine = new Laya.TimeLine();
        private coins: sprites.Coin;
        private dangers: sprites.Danger;
        private gameOverUI: gameOverUI;
        private readonly ReturnButton = 1;
        private readonly ReplayButton = 2;
        private defenderTime = 0;

        constructor() {
            super();
            this.loadDragon();
            this.initGameoverUI();
        }

        private initGameoverUI() {
            this.gameOverUI = new gameOverUI();
            this.gameOverUI.popupCenter = true;
            this.gameOverUI.score.fontSize = 32;
            this.gameOverUI.score.font = resource.FontName;
            this.gameOverUI.return.mouseEnabled = true;
            this.gameOverUI.return.on(Laya.Event.CLICK, this, this.mouseHandler, [this.ReturnButton]);
            this.gameOverUI.replay.mouseEnabled = true;
            this.gameOverUI.replay.on(Laya.Event.CLICK, this, this.mouseHandler, [this.ReplayButton]);
        }

        private loadDragon() {
            this.template.on(Laya.Event.COMPLETE, this, this.dragonLoaded);
            switch (config.currentSelect) {
                case 2:
                this.template.loadAni(resource.GoldAMaoSK);
                this.defenderTime = 10;
                break;
                case 3:
                this.template.loadAni(resource.BianYiAMaoSK);
                this.defenderTime = 15;
                break;
                case 1:
                default:
                this.template.loadAni(resource.AMaoSK);
                break;
            }
        }

        private dragonLoaded() {
            this.skeleton = this.template.buildArmature(0);
            this.loadResource();
        }

        private loadResource(): void {
            for(let i = 1;i <= config.dangerCounts;i++) {
                this.resources.push(resource.Danger + ' (' + i + ').png');
            }
            Laya.loader.load(this.resources, Laya.Handler.create(this, this.assetsLoaded));
        }

        private assetsLoaded(): void {
            let texture: Laya.Texture = Laya.loader.getRes(resource.GameBg);
            this.bg.graphics.drawTexture(texture);
            this.bg.pos(0, 0);
            Laya.stage.addChild(this.bg);

            texture = Laya.loader.getRes(resource.Moutain2);
            this.Moutain2.graphics.drawTexture(texture);
            this.Moutain2.size(texture.width, texture.height);
            this.Moutain2.pos(0, 185);
            Laya.stage.addChild(this.Moutain2);

            texture = Laya.loader.getRes(resource.Moutain);
            this.Moutain.graphics.drawTexture(texture);
            this.Moutain.size(texture.width, texture.height);
            this.Moutain.pos(270, 60);
            Laya.stage.addChild(this.Moutain);

            texture = Laya.loader.getRes(resource.Cloud);
            this.cloud.graphics.drawTexture(texture);
            this.cloud.size(texture.width, texture.height);
            this.cloud.pos(280, 100);
            Laya.stage.addChild(this.cloud);

            texture = Laya.loader.getRes(resource.Cloud2);
            this.cloud2.graphics.drawTexture(texture);
            this.cloud2.size(texture.width, texture.height);
            this.cloud2.pos(Laya.stage.width - this.cloud2.width, 100);
            Laya.stage.addChild(this.cloud2);

            texture = Laya.loader.getRes(resource.Land);
            this.land.graphics.drawTexture(texture);
            this.land.size(texture.width, texture.height);
            this.land.pos(0, config.height - texture.height);
            this.land2.graphics.drawTexture(texture);
            this.land2.size(texture.width, texture.height);
            this.land2.pos(this.land.width, this.land.y);
            Laya.stage.addChild(this.land);
            Laya.stage.addChild(this.land2);

            texture = Laya.loader.getRes(resource.Caodi);
            this.caodi.graphics.drawTexture(texture);
            this.caodi.size(texture.width, texture.height);
            this.caodi.pos(0, this.land.y - texture.height - 80);
            this.caodi2.graphics.drawTexture(texture);
            this.caodi2.size(texture.width, texture.height);
            this.caodi2.pos(this.caodi.width, this.caodi.y);
            Laya.stage.addChild(this.caodi);
            Laya.stage.addChild(this.caodi2);

            texture = Laya.loader.getRes(resource.Zhalan);
            this.Zhalan.graphics.drawTexture(texture);
            this.Zhalan.size(texture.width, texture.height);
            this.Zhalan.pos(0, this.land.y - texture.height);
            this.Zhalan2.graphics.drawTexture(texture);
            this.Zhalan2.size(texture.width, texture.height);
            this.Zhalan2.pos(this.Zhalan.width, this.Zhalan.y);
            Laya.stage.addChild(this.Zhalan);
            Laya.stage.addChild(this.Zhalan2);

            Laya.timer.frameLoop(1, this, this.loop);
            Laya.timer.loop(1000, this, this.scoreLoop);

            this.initCoin();
            this.initDanger();
            this.initDragon();
            this.initJump();
            this.initText();
        }

        private initDragon() {
            this.skeleton.x = -300;
            this.skeleton.y = 0;
			this.skeleton.play('run', true);
            const bounds = this.skeleton.getBounds();
            this.skeleton.size(bounds.width, bounds.height);

            this.skeleton.x = Laya.stage.width / 2;
            this.skeleton.y = this.land.y - this.skeleton.height / 2 + 20;
            Laya.stage.addChild(this.skeleton);
        }

        private initCoin() {
            let height = this.land.y - 90;
            this.coins = new Coins(10, height);
            this.coins.pos(Laya.stage.width, height);
            Laya.stage.addChild(this.coins);
            this.coins.resetCoin(height);
        }

        private initDanger() {
            let height = this.land.y - 30;
            this.dangers = new Dangers(height);
            this.dangers.pos(this.coins.x + this.coins.width, height);
            Laya.stage.addChild(this.dangers);
            this.dangers.resetDanger(height, Math.random() * 2 + 1);
        }

        private initJump() {
            let jumpDistance = config.jumpDistance;
            let duration = 300;
            if (config.currentSelect == 2) {
                jumpDistance = Math.ceil(jumpDistance * 1.1);
                duration = 400;
            } else if (config.currentSelect == 3) {
                jumpDistance = Math.ceil(jumpDistance * 1.3);
                duration = 450;
            }
            this.jumpTimeLine.addLabel('jump', 0)
                .to(this.skeleton, {y: this.skeleton.y - jumpDistance}, duration, Laya.Ease.circOut, 0)
                .to(this.skeleton, {y: this.skeleton.y}, 300, Laya.Ease.circIn, 0);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyUp);
            this.jumpTimeLine.on(Laya.Event.COMPLETE, this, this.onComplete);
        }

        private onComplete() {
            this.isJumping = false;
        }

        private coinComplete(coin: Laya.Sprite) {
            coin.visible = false;
        }

        private onKeyUp(e: Event): void {
            // console.log(e["keyCode"]);
            if (this.dead || this.isJumping) {
                return;
            }
            this.isJumping = true;
            switch(e["keyCode"]) {
                case 32:
                case 38:
                case 87:
                    this.jumpTimeLine.play(0, false);
            }
        }

        private initText() {
            this.scoreText.width = 250;
			this.scoreText.wordWrap = true;
			this.scoreText.text = "分数：0";
			this.scoreText.font = resource.FontName;
			this.scoreText.leading = 0;
			this.scoreText.pos(Laya.stage.width - this.scoreText.width, this.scoreText.height + 10);
			Laya.stage.addChild(this.scoreText);
            
            this.coinText.width = 250;
			this.coinText.wordWrap = true;
			this.coinText.text = "金币：" + config.coin;
			this.coinText.font = resource.FontName;
			this.coinText.leading = 0;
			this.coinText.pos(this.scoreText.x - this.coinText.width, this.coinText.height + 10);
			Laya.stage.addChild(this.coinText);
        }

        private scoreLoop() {
            this.defenderTime--;
            this.score++;
			this.scoreText.text = "分数：" + this.score;
        }

        private loop() {

            if (this.land.x <= - this.land.width) {
                this.land.x = this.land2.x + this.land2.width;
            }
            if (this.land2.x <= - this.land2.width) {
                this.land2.x = this.land.x + this.land.width;
            }
            this.land.x -= this.speed;
            this.land2.x -= this.speed;

            if (this.Zhalan.x <= - this.Zhalan.width) {
                this.Zhalan.x = this.Zhalan2.x + this.Zhalan2.width;
            }
            if (this.Zhalan2.x <= - this.Zhalan2.width) {
                this.Zhalan2.x = this.Zhalan.x + this.Zhalan.width;
            }
            this.Zhalan.x -= this.zhanLanSpeed;
            this.Zhalan2.x -= this.zhanLanSpeed;

            if (this.caodi.x <= - this.caodi.width) {
                this.caodi.x = this.caodi2.x + this.caodi2.width;
            }
            if (this.caodi2.x <= - this.caodi2.width) {
                this.caodi2.x = this.caodi.x + this.caodi.width;
            }
            this.caodi.x -= this.caodiSpeed;
            this.caodi2.x -= this.caodiSpeed;

            if (this.Moutain.x <= -this.Moutain.width) {
                this.Moutain.x = Laya.stage.width;
            }
            if (this.Moutain2.x <= -this.Moutain2.width) {
                this.Moutain2.x = Laya.stage.width;
            }
            this.Moutain.x -= this.moutainSpeed;
            this.Moutain2.x -= this.moutainSpeed;

            if (this.cloud.x <= -this.cloud.width) {
                this.cloud.x = Laya.stage.width;
            }
            if (this.cloud2.x <= -this.cloud2.width) {
                this.cloud2.x = Laya.stage.width;
            }
            this.cloud.x -= this.cloudSpeed;
            this.cloud2.x -= this.cloudSpeed;

            for(let i = 0; i < this.coins.counts; i++) {
                let coin = <Laya.Sprite>this.coins.getChildAt(i);
                if (!coin.visible) {
                    continue;
                }
                let x = coin.x + this.coins.x;
                if (this.defenderTime > 0) {
                     Laya.Tween.to(coin, {x: 0, y: 0, scaleX: 0.5, scaleY: 0.8}, 
                        1000, Laya.Ease.expoOut, Laya.Handler.create(this, this.coinComplete, [coin]));
                    config.coin++;
                    this.coinText.text = "金币：" + config.coin;
                } else if (this.collision(x, coin.y, this.skeleton.x, 
                    this.skeleton.y, coin.width / 2, config.collisionWidth, coin.height / 2, config.collisionHeight)) {
                    Laya.Tween.to(coin, {x: 0, y: 0, scaleX: 0.5, scaleY: 0.8}, 
                        1000, Laya.Ease.expoOut, Laya.Handler.create(this, this.coinComplete, [coin]));
                    // coin.visible = false;
                    config.coin++;
                    this.coinText.text = "金币：" + config.coin;
                }
            }

            if (this.coins.x <= -this.coins.width) {
                this.coins.x = Laya.stage.width;
                this.coins.resetCoin(this.land.y - 90);
            }
            this.coins.x -= this.speed;

            for(let i = 0; i < this.dangers.numChildren; i++) {
                let danger = <Laya.Sprite>this.dangers.getChildAt(i);
                if (!danger.visible) {
                    continue;
                }
                let x = danger.x + this.dangers.x;
                
                if (this.collision(x, danger.y, this.skeleton.x, 
                    this.skeleton.y, danger.width / 2, config.collisionWidth, danger.height / 2, config.collisionHeight)) {
                        // 碰到了怪物
                        this.gameOver();
                    }
            }
            if (this.dangers.x <= -this.dangers.width) {
                this.dangers.x = Laya.stage.width;
                this.dangers.resetDanger(this.land.y - 30, Math.random() * 2 + 1);
            }
            this.dangers.x -= this.speed;
        }

        private collision(x1, y1, x2, y2, width1, width2, height1, height2): boolean {
            return Math.abs(x1 - x2) < (width1 + width2) && Math.abs(y1 - y2) < (height1 + height2);
        }

        private gameOver() {
            this.dead = true;
            this.skeleton.paused();
            this.jumpTimeLine.pause();
            this.isJumping = false;
            Laya.timer.clearAll(this);
            config.Save();
            this.gameOverUI.score.changeText("分数：" + this.score);
            this.gameOverUI.popup();
        }

        private replayGame() {
            this.dead = false;
            this.gameOverUI.close();
            if (config.currentSelect == 2) {
                this.defenderTime = 10;
            } else if (config.currentSelect == 3) {
                this.defenderTime = 15;
            }
            this.score = 0;
			this.scoreText.text = "分数：0";
            this.Moutain2.pos(0, 185);
            this.Moutain.pos(270, 60);
            this.cloud.pos(280, 100);
            this.cloud2.pos(Laya.stage.width - this.cloud2.width, 100);

            this.coins.x = Laya.stage.width;
            this.coins.resetCoin(this.land.y - 90);
            this.dangers.x = Laya.stage.width;
            this.dangers.resetDanger(this.land.y - 30, Math.random() * 2 + 1);
			this.skeleton.play('run', true);
            this.skeleton.x = Laya.stage.width / 2;
            this.skeleton.y = this.land.y - this.skeleton.height / 2 + 20;
            
            Laya.timer.frameLoop(1, this, this.loop);
            Laya.timer.loop(1000, this, this.scoreLoop);
            
        }

        private mouseHandler(type, e: Event): void {
            switch (e.type) {
                case Laya.Event.CLICK:
                switch(type) {
                    case this.ReturnButton:
                        this.clear(false);
                        this.destroy();
                        new MainMenu();
                        break;
                    case this.ReplayButton:
                        this.replayGame();
                        break;
                }
                break;
            }
        }

        private clear(del: boolean) {
            this.bg.destroy(del);
            this.caodi.destroy(del);
            this.caodi2.destroy(del);
            this.cloud.destroy(del);
            this.cloud2.destroy(del);
            this.land.destroy(del);
            this.land2.destroy(del);
            this.Moutain.destroy(del);
            this.Moutain2.destroy(del);
            this.Zhalan.destroy(del);
            this.Zhalan2.destroy(del);
            if (del) {
                this.jumpTimeLine.destroy();
            }

            this.coins.release();
            this.dangers.release();
            this.template.destroy();
            this.gameOverUI.close();
        }
    }
}