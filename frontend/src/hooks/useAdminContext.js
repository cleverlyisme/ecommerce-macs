import { useContext } from "react";

import { AdminContext } from "../contexts/admin.context";

const useAdminContext = () => {
  const context = useContext(AdminContext);

  return context;
};

export default useAdminContext;
