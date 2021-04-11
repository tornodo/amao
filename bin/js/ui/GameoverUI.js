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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameoverUI = /** @class */ (function (_super) {
        __extends(GameoverUI, _super);
        function GameoverUI() {
            return _super.call(this) || this;
        }
        GameoverUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameoverUI.uiView);
        };
        GameoverUI.uiView = { "type": "Dialog", "props": { "width": 500, "height": 300 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "scene/gameover.png" } }, { "type": "Label", "props": { "y": 34, "x": 141, "width": 206, "var": "score", "valign": "middle", "overflow": "hidden", "height": 37, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 152, "x": 79, "var": "return", "skin": "scene/return.png" } }, { "type": "Image", "props": { "y": 152, "x": 274, "var": "replay", "skin": "scene/replay.png" } }] };
        return GameoverUI;
    }(Dialog));
    ui.GameoverUI = GameoverUI;
})(ui || (ui = {}));
//# sourceMappingURL=GameoverUI.js.map