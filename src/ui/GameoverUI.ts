
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
namespace ui {
    export class GameoverUI extends Dialog {
		public score:Laya.Label;
		public return:Laya.Image;
		public replay:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":500,"height":300},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"scene/gameover.png"}},{"type":"Label","props":{"y":34,"x":141,"width":206,"var":"score","valign":"middle","overflow":"hidden","height":37,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":152,"x":79,"var":"return","skin":"scene/return.png"}},{"type":"Image","props":{"y":152,"x":274,"var":"replay","skin":"scene/replay.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameoverUI.uiView);

        }

    }
}