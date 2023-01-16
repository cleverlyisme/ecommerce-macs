import { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const list = [
  { id: "1", category: "Macbook Pro", chips: ["M1", "Inter"] },
  { id: "2", category: "Macbook Air", chips: ["M1", "Inter"] },
];

const CategoryBar = (props) => {
  const { categories, setCategoryId, setCpuId } = props;

  const [open, setOpen] = useState("0");
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [value, setValue] = useState("");

  return (
    <div>
      <Accordion
        open={open}
        toggle={(id) => (open === id ? setOpen() : setOpen(id))}
      >
        {categories.map((category) => {
          return (
            <AccordionItem>
              <AccordionHeader
                targetId={category._id}
                style={{ fontSize: 12, width: 150 }}
                onClick={() => {
                  open !== category._id
                    ? setCategoryId(category._id)
                    : setCategoryId("");
                  setCpuId("");
                  setValue("");
                }}
              >
                {category.name}
              </AccordionHeader>
              {category.cpu.map((item) => {
                return (
                  <AccordionBody accordionId={category._id}>
                    <FormGroup check tag="fieldset">
                      <Input
                        id={item.name}
                        type="radio"
                        name="radio1"
                        onClick={() => {
                          setValue(item.text);
                          setCpuId(item._id);
                        }}
                        value={item.text}
                      />
                      <Label
                        check
                        style={{
                          color: value == item.text ? "#0d6efd" : "black",
                          cursor: "pointer",
                        }}
                      >
                        {item.text}
                      </Label>
                    </FormGroup>
                  </AccordionBody>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CategoryBar;
