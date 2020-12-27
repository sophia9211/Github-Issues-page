import React, { FC } from "react";
import "./TitleText.scss";

interface ITitleTextProps {
  title?: string;
}

const TitleText: FC<ITitleTextProps> = ({ issueNum, title, commentCount, writer, writeDate }) => {
  return (
    <div className="a_title_text_wrap">
      <div className="left_wrap">
        <div className="text_wrap">
          <p className="issue_title_text"># {issueNum}</p>
          <p className="issue_title_text">{title}</p>
        </div>
        <div className="sub_text_wrap">
          <p className="issue_sub_text">작성자: {writer}</p>
          <p className="issue_sub_text">작성일: {writeDate}</p>
        </div>
      </div>
      <div className="right_wrap">
        <div className="issue_comment_count">코멘트: {commentCount}</div>
      </div>
    </div>
  );
};

export default TitleText;
