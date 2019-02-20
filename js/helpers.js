export function formatObjectForAttribute(obj) {
  return JSON.stringify(obj).replace(/"/g, `'`);
}

export function formatAttributeAsObject(val) {
  // console.log(val);
  // console.log(val.replace(/'/g, `"`));
  return JSON.parse(val.replace(/'/g, `"`));
}
