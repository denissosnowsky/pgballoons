import { memo } from "react";
import s from "./ContentLayout.module.css";

function ContentLayout({ children }){
  return (
    <div className={s.layout}>
      {children}
      <div className={s.footer}>
        <img src="/smallLogo.svg"></img>
      </div>
    </div>
  );
};

export default ContentLayout;
