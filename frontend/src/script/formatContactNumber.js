export const formatContactNumber = (contactNum) => {
    // Format into 012-345 6789 
    return contactNum.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2 $3');
}
