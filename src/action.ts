enum actiontype {
    add,
    delete
}

interface People {
    id: number
    name: string,
    age: number,
}
/**
 * 
 * @param item  {People} People { name : string, age : number }
 */
const addList = (item: People) => ({
    type: actiontype.add,
    item,
})

export {
    actiontype,
    addList,
}