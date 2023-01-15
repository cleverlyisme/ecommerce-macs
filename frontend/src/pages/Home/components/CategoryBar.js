import { useState } from "react";
import { Button } from "reactstrap";
const list = [
  { category: "Loại máy", items: ["Macbook Pro", "Macbook Air"] },
  { category: "Chíp", items: ["M1", "Inter"] },
];

const CategoryBar = (props) => {
  const { categories, setCategoryId } = props;
  console.log(categories);

  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");

  return (
    <div className="d-flex flex-column" style={{ gap: 10 }}>
      {list.map((item) => {
        return (
          <div>
            <div
              style={{
                width: 150,
                backgroundColor: "#e4e4e4",
                fontSize: 16,
                borderRadius: 4,
                padding: 4,
                fontWeight: 600,
              }}
            >
              {item.category}
            </div>
            <div className="d-flex flex-column" style={{ gap: 5 }}>
              {item.items.map((name) => {
                return (
                  <div
                    color="success"
                    size="sm"
                    style={{
                      width: "100%",
                      fontSize: 12,
                      cursor: "pointer",
                      paddingLeft: 4,
                    }}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;
