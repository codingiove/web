import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getNewAlbumAction } from "../../store/action";
import { AlbumWrapper } from "./style";
import { Carousel } from "antd";
import NewAlbumSlot from "@/components/Slot/index.js";
import AlbumCover from "@/components/album-cover/index.js";

export default memo(function NewAlbums() {
  const dispatch = useDispatch();

  const pageRef = useRef();

  const { NewAlbums } = useSelector((state) => {
    return {
      NewAlbums: state.getIn(["recommend", "NewAlbums"]),
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    <AlbumWrapper>
      <NewAlbumSlot title="新碟上架" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel ref={pageRef} dots={false}>
            {/* map 遍历了两次,第一次 item = 0 然后配合 slice 展示前五条 */}
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {/* 
                  slice(开始位置,个数)
                  第一次 0 * 5 = 0 , 0 + 1 * 5 = 5
                    slice(0,5) 

                  第二次 1 * 5 = 5 , 1 + 1 * 5 = 10
                    slice(5,10)
                  */}
                  {NewAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return (
                      <AlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp="-570px"
                      />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  );
});
