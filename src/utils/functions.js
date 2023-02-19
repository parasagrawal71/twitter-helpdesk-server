const util = require("util");

module.exports.isObject = (variable) => {
  return typeof variable === "object" && !Array.isArray(variable);
};

module.exports.isEmptyObject = (obj) => {
  if (typeof obj === "object" && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }

  return true;
};

module.exports.isArray = (variable) => {
  return Array.isArray(variable);
};

module.exports.isEmptyArray = (array) => {
  if (Array.isArray(array)) {
    return array.length === 0;
  }

  return true;
};

module.exports.isString = (variable) => {
  return typeof variable === "string";
};

module.exports.deepObject = (obj) => {
  return util.inspect(obj, {
    showHidden: false,
    depth: null,
  });
};

module.exports.randomNumbers = (length) => {
  const multipleOf10s = 10 ** length;
  const min = multipleOf10s * 0.1;
  const max = multipleOf10s * 0.9;
  return Math.floor(min + Math.random() * max);
};
