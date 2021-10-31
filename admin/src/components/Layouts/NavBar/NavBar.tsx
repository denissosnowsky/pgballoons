import Nav from "react-bootstrap/Nav";
import cs from "classnames";
import s from "./NavBar.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { memo } from "react";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = memo(({ children }) => {
  return (
    <>
      <Row className={cs([s.headerRow])}>
        <Col style={{ position: "relative" }} xs={{ span: 4, offset: 4 }} className={s.colImgWrap}>
          <img src={logo} alt="Logo" className={s.logo} />
        </Col>
      </Row>
      <Row className={s.mainRow}>
        <Col xs={2} className={s.col}>
          <nav className={s.navbar}>
            <Nav className={cs([s.bootNav], "flex-column")}>
              <div className={s.linkWrapper}>
                <NavLink to="/bouquets">
                  <i className="bi bi-book"></i>Manage bouquets
                </NavLink>
              </div>
              <div className={s.linkWrapper}>
                <NavLink to="/balloons">
                  <i className="bi bi-layers"></i>Manage balloons
                </NavLink>
              </div>
              <div className={s.linkWrapper}>
                <NavLink to="/assortment">
                  <i className="bi bi-tag"></i>Manage assortment
                </NavLink>
              </div>
              <div className={s.linkWrapper}>
                <NavLink to="/categories">
                  <i className="bi bi-stack"></i>Manage categories
                </NavLink>
              </div>
              <div className={s.linkWrapper}>
                <NavLink to="/colors">
                  <i className="bi bi-palette"></i>Manage colors
                </NavLink>
              </div>
              <div className={s.linkWrapper}>
                <NavLink to="/contacts">
                  <i className="bi bi-telephone"></i>Manage contacts
                </NavLink>
              </div>
              <div className={s.linkWrapper}>
                <NavLink to="/delivery">
                  <i className="bi bi-truck"></i>Manage delivery
                </NavLink>
              </div>
            </Nav>
          </nav>
        </Col>
        <Col xs={10} className={s.col}>
          <div className={s.mainWrapper}>
            <main className={s.main}>{children}</main>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default NavBar;
