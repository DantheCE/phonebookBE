const average = (array) => {
  const reducer = (sum, item) => {
    console.log('sum value:', sum)
    console.log('item value:', item)
    return sum + item
  }
  return array.reduce(reducer) / array.length
}


arrayTest = [1,2,3,4]
average(arrayTest)