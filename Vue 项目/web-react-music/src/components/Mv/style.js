import styled from "styled-components";

export const MV = styled.div`
  width: 240px;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  color: #fff;

  .img-wrap {
    img {
      width: 100%;
      border-radius: 8px;
    }
    .play-volume {
      position: absolute;
      top: 4px;
      right: 10px;
    }
    .play-time {
      position: absolute;
      right: 8px;
      top: 110px;
    }
  }

  .info-wrap {
    width: 240px;
    height: 41px;
    margin-top: 8px;
    color: #000;
    .titles {
      width: 100%;
      font-size: 15px;
    }
    .author {
      font-size: 14px;
      color: #c5c5c5;
    }
  }
`;
