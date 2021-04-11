namespace sprites {
    export class Danger extends Laya.Sprite {
        private timeLine = new Laya.TimeLine();
        private diff = config.jumpDistance - 200;
        private minY = 0;

        constructor(y: number) {
            super();
            this.timeLine.addLabel('coinTimeline', 0)
                .to(this, {y: this.y - 10}, 500, null, 0)
                .to(this, {y: this.y}, 500, null, 0)
                .to(this, {y: this.y + 10}, 500, null, 0)
                .to(this, {y: this.y}, 500, null, 0).play(0, true);
                
            this.init(y);
        }

        private init(y: number) {
            let texture: Laya.Texture = Laya.loader.getRes(resource.Danger + ' (' + 1 + ').png');
            if (this.minY == 0) {
                this.minY = y - this.diff - texture.height / 2;
            }
        }

        public resetDanger(y: number, counts: number) {

            this.destroyChildren();
            for(let i = 0; i < counts; i++) {
                let index = Math.floor(Math.random() * config.dangerCounts) + 1;
                let danger = new Laya.Sprite();
                let texture: Laya.Texture = Laya.loader.getRes(resource.Danger + ' (' + index + ').png');
                danger.graphics.drawTexture(texture);
                danger.size(texture.width, texture.height);
                danger.pivot(texture.width / 2, texture.height / 2);
                danger.pos(i * danger.width + 30, Math.random() * this.diff + this.minY);
                this.addChild(danger);
                danger.visible = true;
            }
            let danger = <Laya.Sprite>this.getChildAt(this.numChildren - 1);
            this.width = danger.x + danger.width;
        }

        public release() {
            this.timeLine.destroy();
            this.destroyChildren();
            this.destroy();
        }
    }
}