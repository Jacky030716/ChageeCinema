// formValidations.js
export const validateNumber = (number) => {
    const mobileRegex = /^01\d\d{3,4}\d{4}$/;
    return mobileRegex.test(number);
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  export const formatDateYMD = (date) => {
    const d = new Date(date);

    if (d.getMonth() + 1 < 10) {
      return `${d.getFullYear()}/0${d.getMonth() + 1}/${d.getDate()}`;
    }else if (d.getDate() < 10) {
      return `${d.getFullYear()}/${d.getMonth() + 1}/0${d.getDate()}`;
    }else{
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    }

  };