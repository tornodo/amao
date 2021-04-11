namespace sprites {
    export class Coin extends Laya.Sprite {
        public counts = 0;
        private timeLine = new Laya.TimeLine();
        private diff = config.jumpDistance + 20;
        private minY = 0;

        constructor(counts: number, y: number) {
            super();
            this.counts = counts;
            this.initCoin(y);
            this.timeLine.addLabel('coinTimeline', 0)
                .to(this, {y: this.y - 10}, 500, null, 0)
                .to(this, {y: this.y}, 500, null, 0)
                .to(this, {y: this.y + 10}, 500, null, 0)
                .to(this, {y: this.y}, 500, null, 0).play(0, true);
        }

        private initCoin(y: number) {
            // let min = y - config.jumpDistance + 50;
            for(let i = 0;i < this.counts;i++) {
                let coin = new Laya.Sprite();
                let texture: Laya.Texture = Laya.loader.getRes(resource.Coin);
                coin.graphics.drawTexture(texture);
                coin.size(texture.width, texture.height);
                coin.pivot(texture.width / 2, texture.height / 2);
                // coin.pos(i * texture.width + 10 + positionX, Math.random() * (y - min) + min);
                this.addChild(coin);
                if (this.minY == 0) {
                    this.minY = y - this.diff - texture.height / 2;
                }
            }
            // let coin = <Laya.Sprite>this.getChildAt(this.numChildren - 1);
            // this.width = coin.x + coin.width;
            // this.width = this.counts * (coin.width + 10);
        }

        // public update(speed) {
        //     for(let i = 0;i < this.counts;i++) {
        //         let coin = <Laya.Sprite>this.getChildAt(i);
        //         coin.x -= speed;
        //     }
        // }

        public resetCoin(y: number) {
            for(let i = 0;i < this.counts;i++) {
                let coin = <Laya.Sprite>this.getChildAt(i);
                coin.pos(i * coin.width + 10, Math.random() * this.diff + this.minY);
                coin.visible = true;
                coin.scale(1, 1);
            }
            let coin = <Laya.Sprite>this.getChildAt(this.numChildren - 1);
            this.width = coin.x + coin.width;
        }

        public release() {
            this.timeLine.destroy();
            this.destroyChildren();
            this.destroy();
        }
    }
}