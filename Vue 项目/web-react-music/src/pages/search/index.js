import React, { memo, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import { withRouter } from "react-router-dom";
import { SearchAxios } from "../../services/search.js";
import { Wrap, WrapContent } from "./style";
import { formatMinuteSecond } from "../../utils/format-utils";
import { getSongDetailAction } from "../Player/store/action";
import Pagination from "../../components/Pagination/index.js";
import SongSheetCover from "../../components/SongsCover/index.js";
import MV from "../../components/Mv/index.js";

const Search = memo(function Search(props) {
  // 歌曲列表
  const [SongList, SetSongList] = useState([]);
  // 歌单
  const [SongSheet, SetSongSheet] = useState([]);
  // MV
  const [SongMv, SetSongMv] = useState([]);
  // 当前页数 默认第一页
  const [Paging, SetPaging] = useState(1);
  // 总条数
  const [SongCount, SetSongCount] = useState(0);
  // 搜索类型
  const [type, SetType] = useState(1);

  let search = props.location.pathname.split("/")[2];

  const dispatch = useDispatch();

  // 请求歌曲 useCallback 会返回一个记忆值
  const SearchResult = useCallback(
    (offset = 0) => {
      SearchAxios({
        keywords: search,
        limit: 10,
        offset,
        type,
      }).then((res) => {
        if (type === 1) {
          SetSongList(res.result.songs); // 设置歌曲列表
          SetSongCount(res.result.songCount); // 数量
        } else if (type === 1000) {
          SetSongSheet(res.result.playlists); // 设置歌单
          SetSongCount(res.result.playlistCount);
        } else {
          SetSongMv(res.result.mvs);
          SetSongCount(res.result.mvCount);
        }
      });
    },
    [search, type]
  );

  useEffect(() => {
    SearchResult();
  }, [SearchResult]);

  // 换首歌
  const PlayMusic = (id) => dispatch(getSongDetailAction(id));
  // 下一页
  const onChange = (page) => {
    SetPaging(page); // 设置当前页数
    SearchResult((page - 1) * 10); // 偏移量
  };
  // Tabs 面板切换
  const PanelSwitching = (key) => {
    SetType(+key); // 修改搜索类型
    SetPaging(1); // 设置到第一页
  };
  // 歌单详情页
  const ToSong = (id) => props.history.push(`/playlist?id=${id}`);
  return (
    <Wrap>
      {
        <WrapContent>
          <Tabs defaultActiveKey="歌曲" onTabClick={PanelSwitching}>
            <Tabs.TabPane tab="歌曲" key="1">
              <div>
                <div className="title">
                  <div className="empty"></div>
                  <div className="Music-title">音乐标题</div>
                  <div className="singer">歌手</div>
                  <div className="album">专辑</div>
                  <div className="duration">时长</div>
                </div>
                {SongList.map((item, index) => {
                  return (
                    <div
                      className="content"
                      key={item.id}
                      onClick={() => PlayMusic(item.id)}
                    >
                      <div className="Index">{index + 1}</div>
                      <div className="Music-title">{item.name}</div>
                      <div className="singer">{item.artists[0].name}</div>
                      <div className="album">{item.album.name}</div>
                      <div className="duration">
                        {formatMinuteSecond(item.duration)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="歌单" key="1000">
              <div className="Song-Sheet-list">
                {SongSheet.map((item) => (
                  <div key={item.id} onClick={() => ToSong(item.id)}>
                    <SongSheetCover info={item} right="40px" />
                  </div>
                ))}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="MV" key="1004">
              <div className="Mv">
                {SongMv.map((item) => (
                  <div key={item.id}>
                    <MV info={item} />
                  </div>
                ))}
              </div>
            </Tabs.TabPane>
          </Tabs>
          {/* 分页 */}
          <Pagination
            Paging={Paging}
            SongCount={SongCount}
            simple={true}
            ChangePages={onChange}
          />
        </WrapContent>
      }
    </Wrap>
  );
});

export default withRouter(Search);
