import { memo } from "react";
import s from "./ContentLayout.module.css";
import logo from '../../../assets/smallLogo.svg';

interface ContentLayoutProps {}

const ContentLayout: React.FC<ContentLayoutProps> = memo(({ children }) => {
  return (
    <div className={s.layout}>
      {children}
      <div className={s.footer}>
        <img src={logo}></img>
      </div>
    </div>
  );
});

export default ContentLayout;
