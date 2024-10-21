import { isObject } from "./isObject";

export const mergeObjects = (mainObject: any, secondaryObject: any): any => {
  const newObject: any = {};
  Object.keys(mainObject).forEach((key) => {
    const mainValue = mainObject[key];
    const secondaryValue = secondaryObject[key];
    const isObjectValues = isObject(mainValue) && isObject(secondaryValue);
    if (isObjectValues) {
      newObject[key] = mergeObjects(mainValue, secondaryValue);
    } else {
      newObject[key] = secondaryValue || mainValue;
    }
  });
  return newObject;
};