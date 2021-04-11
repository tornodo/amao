var resource = util.Resource;
var main = scene.MainMenu;
var shopUI = ui.ShopUI;
var gameOverUI = ui.GameoverUI;
var game = scene.Game;
var Browser = Laya.Browser;
var config = util.Config;
var Coins = sprites.Coin;
var Dangers = sprites.Danger;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(config.width, config.height, config.model);
        config.Load();
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = '';
        Laya.stage.bgColor = '#FFFFFF';
        UIConfig.closeDialogOnSide = false;
        // 开启调试
        // Laya.DebugTool.init();
        // 加载位图字体
        this.bitmapFont = new Laya.BitmapFont();
        this.bitmapFont.loadFont(resource.FontUrl, new Laya.Handler(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        this.initBitmapFont();
        new main();
    };
    GameMain.prototype.initBitmapFont = function () {
        this.bitmapFont.setSpaceWidth(10);
        Laya.Text.registerBitmapFont(resource.FontName, this.bitmapFont);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map