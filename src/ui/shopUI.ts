
namespace ui {
    export class ShopUI extends Dialog {
		public ShowName:Laya.Sprite;
		public ShowRemark:laya.display.Text;
		public AMao:Laya.Sprite;
		public SelectGold:Laya.Image;
		public GoldPrice:Laya.Image;
		public SelectBian:Laya.Image;
		public BianPrice:Laya.Image;
		public SelectAMao:Laya.Image;
		public CloseBtn:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"shop/buybg.png"},"child":[{"type":"Sprite","props":{"y":126,"x":509,"width":136,"var":"ShowName","height":41}},{"type":"Text","props":{"y":190,"x":442,"width":277,"var":"ShowRemark","height":90}},{"type":"Sprite","props":{"y":283,"x":441,"width":282,"var":"AMao","height":241}}]},{"type":"Image","props":{"y":106,"x":71,"skin":"shop/buydash.png"}},{"type":"Image","props":{"y":256,"x":71,"skin":"shop/buydash.png"}},{"type":"Image","props":{"y":405,"x":71,"skin":"shop/buydash.png"}},{"type":"Image","props":{"y":120,"x":92,"skin":"shop/amaoavatar.png"}},{"type":"Image","props":{"y":145,"x":206,"skin":"shop/price.png"}},{"type":"Image","props":{"y":156,"x":216,"skin":"shop/have.png"}},{"type":"Image","props":{"y":270,"x":92,"skin":"shop/goldamao.png"}},{"type":"Image","props":{"y":293,"x":206,"skin":"shop/price.png"}},{"type":"Image","props":{"y":297,"x":336,"var":"SelectGold","skin":"shop/buy.png"}},{"type":"Image","props":{"y":312,"x":225,"var":"GoldPrice","skin":"shop/5000.png"}},{"type":"Image","props":{"y":421,"x":92,"skin":"shop/bianyiamao.png"}},{"type":"Image","props":{"y":444,"x":206,"skin":"shop/price.png"}},{"type":"Image","props":{"y":448,"x":336,"var":"SelectBian","skin":"shop/buy.png"}},{"type":"Image","props":{"y":462,"x":212,"var":"BianPrice","skin":"shop/20000.png"}},{"type":"Image","props":{"y":148,"x":336,"var":"SelectAMao","skin":"shop/buy.png"}},{"type":"Image","props":{"y":67,"x":697,"var":"CloseBtn","skin":"shop/close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.ShopUI.uiView);

        }

    }
}
