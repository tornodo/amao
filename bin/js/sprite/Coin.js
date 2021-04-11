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
var sprites;
(function (sprites) {
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        function Coin(counts, y) {
            var _this = _super.call(this) || this;
            _this.counts = 0;
            _this.timeLine = new Laya.TimeLine();
            _this.diff = config.jumpDistance + 20;
            _this.minY = 0;
            _this.counts = counts;
            _this.initCoin(y);
            _this.timeLine.addLabel('coinTimeline', 0)
                .to(_this, { y: _this.y - 10 }, 500, null, 0)
                .to(_this, { y: _this.y }, 500, null, 0)
                .to(_this, { y: _this.y + 10 }, 500, null, 0)
                .to(_this, { y: _this.y }, 500, null, 0).play(0, true);
            return _this;
        }
        Coin.prototype.initCoin = function (y) {
            // let min = y - config.jumpDistance + 50;
            for (var i = 0; i < this.counts; i++) {
                var coin = new Laya.Sprite();
                var texture = Laya.loader.getRes(resource.Coin);
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
        };
        // public update(speed) {
        //     for(let i = 0;i < this.counts;i++) {
        //         let coin = <Laya.Sprite>this.getChildAt(i);
        //         coin.x -= speed;
        //     }
        // }
        Coin.prototype.resetCoin = function (y) {
            for (var i = 0; i < this.counts; i++) {
                var coin_1 = this.getChildAt(i);
                coin_1.pos(i * coin_1.width + 10, Math.random() * this.diff + this.minY);
                coin_1.visible = true;
                coin_1.scale(1, 1);
            }
            var coin = this.getChildAt(this.numChildren - 1);
            this.width = coin.x + coin.width;
        };
        Coin.prototype.release = function () {
            this.timeLine.destroy();
            this.destroyChildren();
            this.destroy();
        };
        return Coin;
    }(Laya.Sprite));
    sprites.Coin = Coin;
})(sprites || (sprites = {}));
//# sourceMappingURL=Coin.js.map