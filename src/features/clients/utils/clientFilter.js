// import { clientFilterSchema } from "../validators/clientFilterSchema";

export const getSelect = (min, max) => {
  if (!min && !max) return {};
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
  // console.log("Min", min, "; max = ", max);
  // console.log("selectObject  = ", selectObject);
  return selectObject;
};

export const getOrderBy = (order) => {
  if (!order) return {}; // early return
  const sortObject = {};
  const parts = order.split(";");
  parts.forEach((part) => {
    const [prop, val] = part.split("=");
    const value = Number(val);
    if (
      prop && // prop doesn't have got empty
      (value === 1 || value == -1)
    ) {
      sortObject[prop.trim()] = value;
      // console.log("sortObject = ", sortObject);
    }
  });
  return sortObject;
};

/*
  const validProps = ["name", "age", "clientType"];
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

*/
