import React, { memo } from "react";
import { Pagination } from "antd";
import { Wrap } from "./style";

export default memo(function index(props) {
  let { Paging, SongCount, simple, ChangePages } = props;
  
  const onChange = (page) => ChangePages(page);
  return (
    <Wrap>
      <Pagination
        current={Paging}
        total={SongCount}
        simple={simple}
        onChange={onChange}
        className="Own-Pagination"
      />
    </Wrap>
  );
});
