function RemoveDuplicates(ajaxData, theData) {

  ajaxData.map(function(val,i){
    theData.data.push(val);
  });

  theData.data = Array.from(new Set(theData.data.map(a => a.id))).map(id => {
    return theData.data.find(a => a.id === id)
  })

  return theData;
}

export {RemoveDuplicates}
