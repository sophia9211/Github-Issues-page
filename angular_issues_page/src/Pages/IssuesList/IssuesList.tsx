import React, { FC } from "react";
import "./IssuesList.scss";
import Header from "Components/Header";

interface ITitleTexIIssuesListPropstProps {
  type?: string;
}

const IssuesList: FC<IIssuesListProps> = () => {
  return (
    <div className="a_title_text_wrap">
      <Header title="Angular/Angular-cli" />
    </div>
  );
};

export default IssuesList;
