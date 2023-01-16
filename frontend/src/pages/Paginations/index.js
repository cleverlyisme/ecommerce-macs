import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Select from "react-select";
const Paginations = ({ page, setPage, totalPages }) => {
  let getPage = [];
  for (let i = 1; i <= totalPages; i++) {
    getPage[i - 1] = { value: i, label: i };
  }

  return (
    <Select
      className="basic-single "
      style={{ width: 80 }}
      classNamePrefix="select"
      value={{ value: page, label: page }}
      name="category"
      menuPlacement="top"
      options={getPage}
      onChange={(selectedOption) => {
        selectedOption !== null ? setPage(selectedOption.value) : setPage(page);
      }}
    />
  );
};

export default Paginations;
