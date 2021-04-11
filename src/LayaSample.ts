
import resource = util.Resource;
import main = scene.MainMenu;
import shopUI = ui.ShopUI;
import gameOverUI = ui.GameoverUI;
import game = scene.Game;
import Browser = Laya.Browser;
import config = util.Config;
import Coins = sprites.Coin;
import Dangers = sprites.Danger;
// 程序入口
class GameMain{
    private bitmapFont: Laya.BitmapFont;

    constructor()
    {
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

    private onLoaded(): void {
        this.initBitmapFont();
        new main();
    }

    private initBitmapFont(): void {
        this.bitmapFont.setSpaceWidth(10);
        Laya.Text.registerBitmapFont(resource.FontName, this.bitmapFont);
    }
}
new GameMain();