import styled from "styled-components";
export const PlaylistWrapTop = styled.div`
  padding: 77px 30px 40px 30px;
  width: 700px;
  margin: 0 auto;
  background-color: #fff;
  &::after {
    content: "";
    clear: both;
    display: table;
  }
  .playlist-img-wrap {
    float: left;
  }
  .song-list {
    width: 410px;
    float: left;
    margin-left: 30px;
    .song-head {
      display: flex;
      align-items: center;
      margin: 0 0 12px;
      i {
        display: inline-block;
        min-width: 55px;
        height: 24px;
        position: relative;
        background-position: 0 -243px;
      }
      .title {
        margin-left: 10px;
        line-height: 24px;
        font-size: 20px;
      }
    }
    .song-user {
      display: inline-block;
      margin-bottom: 20px;
      img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
      .name {
        color: #0c73c2;
      }
      .time {
        margin-left: 28px;
        color: #999;
      }
    }
    .content-operation {
      line-height: 30px;
      display: flex;
      align-items: content;
      margin-bottom: 25px;
      .playA {
        float: left;
        height: 30px;
        color: #fff;
        background-position: right -428px;
        text-decoration: none;
        i {
          padding: 0 7px 0 8px;
          color: #fff;
          background-position: 0 -387px;
          display: inline-block;
        }
        .play {
          float: left;
          width: 20px;
          height: 18px;
          margin: 6px 2px 2px 0;
          background-position: 0 -1622px;
          overflow: hidden;
        }
        &:hover i {
          background-position: 0 -469px;
        }
        &:hover i em {
          background-position: -28px -1622px;
        }
      }
      .add {
        width: 31px;
        height: 30px;
        background-position: 0 -1588px;
        display: inline-block;
        margin-left: -3px;
        margin-right: 5px;
        &:hover {
          background-position: -40px -1588px;
        }
      }
      .comment {
        min-width: 50px;
        height: 30px;
        padding-right: 5px;
        background-position: right -1020px;
        display: inline-block;
        i {
          background-position: 0 -1465px;
          padding: 0 7px 0 36px;
          display: inline-block;
          .comment_count {
          }
        }
        &:hover {
          background-position: right -1106px;
        }
        &:hover i {
          background-position: 0 -1508px;
        }
      }
    }
    .song-Tag {
      display: flex;
      line-height: 25px;
      margin-bottom: 5px;
      span {
        line-height: 20px;
        margin: 0px 10px 3px 0;
        border-radius: 30px;
        text-align: center;
        background-color: #f5f5f5;
        padding: 0 12px;
        cursor: pointer;
        border: 1px solid #cdc8c8;
      }
    }
    .song-introduce {
      margin-top: 4px;
      line-height: 18px;
      color: #666;
      font-size: 12px;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        b {
          font-weight: normal;
          color: #666;
        }
      }
    }
    .song-spread-wrap {
      a {
        color: #0c73c2;
        text-align: right;
        display: block;
      }
    }
  }
`;
export const SongWarp = styled.div`
  padding: 0 30px 20px 30px;
  background-color: #fff;
  width: 700px;
  margin: 0 auto;
  .wrap {
    width: 640px;
    .song-title {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #c20c0c;
      h3 {
        font-size: 20px;
        margin-right: 20px;
      }
      .Playback-times-wrap {
        margin-left: auto;
        strong {
          color: #c20c0c;
        }
      }
    }
  }
  .table {
    width: 100%;
    border: 1px solid #d9d9d9;
    .w1 {
      width: 74px;
    }
    th {
      height: 35px;
      background-color: #f7f7f7;
      padding: 0 10px;
    }
    .w2 {
      width: 111px;
    }
    .w3 {
      width: 14%;
    }
    .w4 {
      width: 20%;
    }
    td {
      padding: 6px 10px;
      line-height: 18px;
      text-align: left;
      max-width: 100px;
    }
    tr:nth-child(odd) {
      background-color: #f7f7f7;
    }
    tr:hover {
    }
  }
`;
export const Tr = styled.tr`
  .hd {
    height: 18px;
    .ply {
      float: right;
    }
  }
  .ply {
    width: 17px;
    height: 17px;
    cursor: pointer;
    background-position: 0 -103px;
  }
  .plyRed {
    background-position: -20px -128px;
  }
`;
