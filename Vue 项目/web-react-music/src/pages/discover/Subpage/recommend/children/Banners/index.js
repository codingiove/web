import React, { memo, useEffect, useRef, useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Carousel } from "antd";
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from "./style";
import { getBannersAction } from "../../store/action";
export default memo(function Banners() {
  // 记录当前是第几张轮播图
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();

  const { Banners } = useSelector((state) => {
    return {
      Banners: state.getIn(["recommend", "Banners"]),
    };
  }, shallowEqual);

  useEffect(() => {
    // 请求轮播图数据
    dispatch(getBannersAction());
  }, [dispatch]);

  // 操作 Carousel 轮播图
  const bannerRef = useRef();

  // 切换背景图片
  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to);
  }, []);

  // 取出当前轮播图(模糊图)
  const bgImage =
    Banners[currentIndex] &&
    Banners[currentIndex].imageUrl + "?imageView&blur=40x20";
  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            effect="fade"
            autoplay
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {Banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
});
