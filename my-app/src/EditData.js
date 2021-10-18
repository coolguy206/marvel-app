var EditData = (arr) => {
  // console.log(`EditData.js`);
  // console.log(arr);
  var updatedArray = [];
  var array = arr;
  array.map((obj, i) => {
    updatedArray.push(obj.doc);
  });
  return updatedArray;
};

export default EditData;
