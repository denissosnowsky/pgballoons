import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import s from "./DropdownBtnWithColor.module.css";
import { useEffect, useState } from "react";
import { Maybe } from "graphql/jsutils/Maybe";

interface DropdownBtnWithColorProps {
  title: string;
  items: Maybe<{ id: string; name: string; cssName: string }>[];
  externalClb?: (arg: string | undefined) => void;
  emptify?: boolean
}

const DropdownBtnWithColor: React.FC<DropdownBtnWithColorProps> = ({
  title,
  items,
  externalClb,
  emptify
}) => {
  const [chosen, setChosen] = useState<string>(title);

  const handleAllBtn = () => {
    setChosen("Choose a color | All");
    externalClb && externalClb(undefined);
  };

  const handleItemBtn = (id: string, name: string) => {
    setChosen(name);
    externalClb && externalClb(id);
  };

  useEffect(()=>{
    emptify && setChosen("Choose a color | All");
  }, [emptify]);

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={chosen}
      variant="outline-primary"
      className={s.btn}
    >
      <Dropdown.Item onClick={handleAllBtn}>
        <div className={s.color} style={{ display: "none" }}></div>
        {"Все"}
      </Dropdown.Item>
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <Dropdown.Item key={item?.id} onClick={()=>handleItemBtn(item?.id!, item?.name!)}>
            <div
              className={s.color}
              style={{ backgroundColor: item?.cssName }}
            ></div>
            {item?.name}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
};

export default DropdownBtnWithColor;
