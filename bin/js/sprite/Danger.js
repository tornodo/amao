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
    var Danger = /** @class */ (function (_super) {
        __extends(Danger, _super);
        function Danger(y) {
            var _this = _super.call(this) || this;
            _this.timeLine = new Laya.TimeLine();
            _this.diff = config.jumpDistance - 200;
            _this.minY = 0;
            _this.timeLine.addLabel('coinTimeline', 0)
                .to(_this, { y: _this.y - 10 }, 500, null, 0)
                .to(_this, { y: _this.y }, 500, null, 0)
                .to(_this, { y: _this.y + 10 }, 500, null, 0)
                .to(_this, { y: _this.y }, 500, null, 0).play(0, true);
            _this.init(y);
            return _this;
        }
        Danger.prototype.init = function (y) {
            var texture = Laya.loader.getRes(resource.Danger + ' (' + 1 + ').png');
            if (this.minY == 0) {
                this.minY = y - this.diff - texture.height / 2;
            }
        };
        Danger.prototype.resetDanger = function (y, counts) {
            this.destroyChildren();
            for (var i = 0; i < counts; i++) {
                var index = Math.floor(Math.random() * config.dangerCounts) + 1;
                var danger_1 = new Laya.Sprite();
                var texture = Laya.loader.getRes(resource.Danger + ' (' + index + ').png');
                danger_1.graphics.drawTexture(texture);
                danger_1.size(texture.width, texture.height);
                danger_1.pivot(texture.width / 2, texture.height / 2);
                danger_1.pos(i * danger_1.width + 30, Math.random() * this.diff + this.minY);
                this.addChild(danger_1);
                danger_1.visible = true;
            }
            var danger = this.getChildAt(this.numChildren - 1);
            this.width = danger.x + danger.width;
        };
        Danger.prototype.release = function () {
            this.timeLine.destroy();
            this.destroyChildren();
            this.destroy();
        };
        return Danger;
    }(Laya.Sprite));
    sprites.Danger = Danger;
})(sprites || (sprites = {}));
//# sourceMappingURL=Danger.js.map