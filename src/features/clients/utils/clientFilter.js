export const getOrderBy = (order) => {
  if (!order) return {}; // early return
  const validProps = ["name", "age", "clientType"];
  const sortObject = {};
  const parts = order.split(";");

  console.log("Parts = ", parts);
  console.log("Parts length ", parts.length);

  parts.forEach((part) => {
    const [prop, val] = part.split("=");
    const value = Number(val);
    if (
      prop && // prop doesn't have got empty
      validProps.includes(prop.trim()) && // validation props
      (value === 1 || value == -1)
    ) {
      sortObject[prop.trim()] = value;
      console.log("sortObject = ", sortObject);
    }
  });

  return sortObject;
};
