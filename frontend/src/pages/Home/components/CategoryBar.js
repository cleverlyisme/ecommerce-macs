import { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const CategoryBar = (props) => {
  const { categories, setCategoryId, setCpuId } = props;

  const [open, setOpen] = useState("0");
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [value, setValue] = useState("");
  const [check, setCheck] = useState(false);

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
                className="fs-6 "
                targetId={category._id}
                style={{ width: 200, fontSize: 12 }}
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
                        type="checkbox"
                        name="radio1"
                        checked={item.text == value ? true : false}
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
