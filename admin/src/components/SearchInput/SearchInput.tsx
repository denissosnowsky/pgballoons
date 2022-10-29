import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

interface SearchInputPropsType {
  externalClb?: (value: string) => void;
  emptify?: boolean;
}

const SearchInput: React.FC<SearchInputPropsType> = ({ externalClb, emptify }) => {
  const [input, setInput] = useState("");

  const handleInput = (value: string) => {
    setInput(value);
  };

  const handleSearch = () => {
    externalClb && externalClb(input);
  };

  useEffect(()=>{
    emptify && setInput("");
  }, [emptify]);

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Знайти продукт через артикул"
        aria-label="Search a product by code"
        aria-describedby="basic-addon2"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        as="input"
        type="number"
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleSearch}
      >
        Шукати
      </Button>
    </InputGroup>
  );
};

export default SearchInput;
