import styled from "styled-components";

export const Wrap = styled.div`
  background-color: #fff;
  .Mv {
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* flex布局最后一行列表左对齐 */
    &::after {
      content: "";
      width: 528px;
      height: 135px;
    }
    /* flex布局最后一行列表左对齐 */
    /* i {
      width: 240px;
      height: 135px;
    } */
  }
`;

export const WrapContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  .title,
  .content {
    display: flex;
    align-items: center;
    color: #909399;
    font-weight: 500;
    padding: 10px 20px;
    .empty,
    .Index {
      width: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .Music-title,
    .Music-title,
    .singer {
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .album {
      flex: 10;
    }
    .duration {
      flex: 1;
    }
  }
  .content {
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  .Song-Sheet-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
