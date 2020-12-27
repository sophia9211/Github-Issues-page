import React, { FC } from "react";
import "./Header.scss";

interface IHeaderProps {
  title?: string;
}

const Header: FC<IHeaderProps> = ({ title }) => {
  return (
    <div className="a_header_wrap">
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
