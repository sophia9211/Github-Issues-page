import React, { FC } from "react";
import "./TitleText.scss";

interface ITitleTextProps {
  title?: string;
}

const TitleText: FC<ITitleTextProps> = ({ issueNum, title, commentCount, writer, writeDate }) => {
  return (
    <div className="a_title_text_wrap">
      <div>
        <div>
          <p className="issue_num_text"># {issueNum}</p>
          <p className="issue_title_text">{title}</p>
        </div>
        <p>작성자: {writer}</p>
        <p>작성일: {writeDate}</p>
      </div>
      <div>코멘트: {commentCount}</div>
    </div>
  );
};

export default TitleText;
