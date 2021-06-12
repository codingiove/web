let Same = "https://api-hmugo-web.itheima.net/api/public/v1/";
let http = {
  //首页
  Carousel: `${Same}home/swiperdata`,
  NegotiateMenus: `${Same}home/catitems`,
  Floor: `${Same}home/floordata`,
  //分类
  Goodscategory: `${Same}categories`,
  //商品列表
  GoodsList:`${Same}goods/search`,
  //商品详情
  GoodsDetail:`${Same}goods/detail?goods_id`,


}
export default http