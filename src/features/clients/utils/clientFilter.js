export const getSelect = (min, max) => {
  if (!min && !max) return {};
  // max -> min -> max

  // const parts = select.split(";");
  let selectObject = {};

  if (min && max && min === max) {
    selectObject = { $eq: Number(max) };
  } else {
    if (min && !max) {
      selectObject = { $lte: Number(min) };
    } else {
      if (max && !min) {
        selectObject = { $gte: Number(max) };
      } else {
        selectObject = { $lte: Number(min), $gte: Number(max) };
      }
    }
  }
  // const validProps = ["age"];
  console.log("Min", min, "; max = ", max);
  console.log("selectObject  = ", selectObject);

  // const selectAge = { age: { selectObject } };
  // console.log("select ", selectAge);

  return selectObject;
};

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
