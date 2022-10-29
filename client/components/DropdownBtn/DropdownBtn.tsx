import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import s from "./DropdownBtn.module.css";
import { Maybe } from "graphql/jsutils/Maybe";

interface DropdownBtnProps {
  title: string;
  items: Maybe<{ id: string; name: string }>[];
  externalClb?: (arg: string | undefined) => void;
}

const DropdownBtn: React.FC<DropdownBtnProps> = ({ title, items, externalClb }) => {
  const [chosen, setChosen] = useState<string>(title);

  const handleAllBtn = () => {
    setChosen("Всі");
    externalClb && externalClb(undefined);
  };

  const handleItemBtn = (id: string, name: string) => {
    setChosen(name);
    externalClb && externalClb(id);
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={chosen}
      variant="outline-primary"
      className={s.btn}
    >
      <Dropdown.Item onClick={handleAllBtn}>{"All"}</Dropdown.Item>
      {items &&
        (items.length > 0 &&
        items.map((item) => (
          <Dropdown.Item
            key={item?.id}
            onClick={() => handleItemBtn(item?.id!, item?.name!)}
          >
            {item?.name}
          </Dropdown.Item>
        )))}
    </DropdownButton>
  );
};

export default DropdownBtn;
