import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
const Paginations = ({ page, setPage, totalPages }) => {
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page === 1}>
        <PaginationLink previous href="#" onClick={() => setPage(page - 1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          onClick={() => setPage(1)}
          style={{ backgroundColor: page === 1 ? "#ced4da" : "white" }}
        >
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={totalPages < 2}>
        <PaginationLink
          href="#"
          onClick={() => setPage(2)}
          style={{ backgroundColor: page === 2 ? "#ced4da" : "white" }}
        >
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={totalPages < 3}>
        <PaginationLink
          href="#"
          onClick={() => setPage(3)}
          style={{ backgroundColor: page === 3 ? "#ced4da" : "white" }}
        >
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={page === totalPages}>
        <PaginationLink next href="#" onClick={() => setPage(page + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default Paginations;
