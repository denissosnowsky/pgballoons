import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import cs from "classnames";
import React from "react";
import s from './NavC.module.css';
import { useGetBasketValues } from "../../hooks/useGetBasketValues";

interface NavCPropsType {
  clb?: (arg: boolean)=>void
}

const NavC: React.FC<NavCPropsType> = ({clb}) => {

  const basket = useGetBasketValues(); 


  return (
      <Nav className={cs([s.bootNav], "flex-column")} onClick={()=>clb && clb(false)}>
        <Link href="/bouqcatalog">
          <a>
            <i className="bi bi-book"></i>Букети кульок
          </a>
        </Link>
        <Link href="/atomcatalog">
          <a>
            <i className="bi bi-layers"></i>Скласти букет кульок
          </a>
        </Link>
        <Link href="/price">
          <a>
            <i className="bi bi-tag"></i>Ціни
          </a>
        </Link>
        <Link href="/calculator">
          <a>
            <i className="bi bi-calculator"></i>Калькулятор цін
          </a>
        </Link>
        <Link href="/delivery">
          <a>
            <i className="bi bi-truck"></i>Доставка і оплата
          </a>
        </Link>
        <Link href="/contacts">
          <a>
            <i className="bi bi-telephone"></i>Контакти
          </a>
        </Link>
        <Link href="/basket">
          <a>
            <i className="bi bi-cart2"></i>Кошик{" "}
            <Badge bg="danger">{basket.length}</Badge>
          </a>
        </Link>
      </Nav>
  );
};

export default NavC;
