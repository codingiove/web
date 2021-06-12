import styled from "styled-components";
import playlist_sprite from "@/assets/img/playlist_sprite.png";
export const PlayListWrapper = styled.div`
  position: relative;
  width: 553px;
  padding-left: 2px;
  overflow: auto;
  &::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块*/
    border-radius: 10px;
    background: #434648;
  }
  &::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    background: #000;
  }
  .left {
    width: 100%;
  }
  .play-item {
    padding: 0 8px 0 25px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    line-height: 28px;
    color: #ccc;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      ::before {
        content: "";
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${playlist_sprite}) -182px 0;
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
    &:hover i {
      display: block;
    }
    i {
      width: 13px;
      height: 15px;
      display: none;
      overflow: hidden;
      margin-right: 10px;
      text-indent: -9999px;
      background-position: -51px 0;
      &:hover {
        background-position: -51px -20px;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .singer {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
      }

      .duration {
        width: 45px;
      }

      .link {
        margin-left: 20px;
        width: 14px;
        height: 16px;
        background-position: -100px 0;
      }
    }
  }
`;
