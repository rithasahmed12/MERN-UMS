export const validateSignupForm = (name,email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isNameValid = /^[a-zA-Z _-]{3,16}$/.test(name);
    let errors = {};

    if (!isNameValid || name.trim()=='') {
        errors.name = 'Please Enter a valid name'
    }
    if (!isEmailValid || email.trim()=='') {
        errors.email = 'Please Enter a valid email';
    }

    if (password.length < 5 || password.trim()==''){
        errors.password = 'Please enter password with minimum 5 characters';
    }

    return errors;
}


export const validateLoginForm = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    let errors = {};
  
    // Email validation
    if (!isEmailValid || email.trim()=='') {
      errors.email = 'Email is Invalid';
    }
  
    // Password validation
    if (password.trim()=='' || password.length < 5 ) {
      errors.password = 'Password is invalid and must contain 5 characters';
    }
  
    return errors;
  };


  