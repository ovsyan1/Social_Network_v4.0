 export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items?.users?.map(user => {
    if(user[objPropName] === itemId){
        return{...user, ...newObjProps}
    }
    return user;
})
} 