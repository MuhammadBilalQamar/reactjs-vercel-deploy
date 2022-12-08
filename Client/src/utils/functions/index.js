// REUSABLE FUCNTION FOR REMOVING SINGLE QUOTE FROM STRING
export const removeSingleQuote = (str) => {
  let newString = str.replace(/['']/gim, " ");
  let finalString = newString.replace(/[']/gim, " ");
  finalString = finalString.replace(/["]/gim, " ");
  return finalString;
};

// REUSABLE FUCNTION FOR TRIM STRING
export const trimString = (str) => str.trim();
