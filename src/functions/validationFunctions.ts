export interface iValidationResponse {
  valid: boolean;
  message: string;
}

export function validatePassword(password: string): iValidationResponse {
  if (!password) {
    return {
      message: "Required",
      valid: false,
    };
  } else if (password.length < 8) {
    return {
      message: "Password must be at least 8 characters long",
      valid: false,
    };
  } else if (!/[A-Z]/.test(password)) {
    return {
      message: "Password must contain at least one uppercase letter",
      valid: false,
    };
  } else if (!/[a-z]/.test(password)) {
    return {
      message: "Password must contain at least one lowercase letter",
      valid: false,
    };
  } else if (!/[0-9]/.test(password)) {
    return {
      message: "Password must contain at least one number",
      valid: false,
    };
  } else if (!/[!@#$%^&*()_+\-=\[\]{}|;':"\\/?]/.test(password)) {
    return {
      message: "Password must contain at least one symbol",
      valid: false,
    };
  }

  return {
    valid: true,
    message: "",
  };
}

export function validateUsername(username: string): iValidationResponse {
  if (!username) {
    return {
      message: "Required",
      valid: false,
    };
  } else if (username.length < 4) {
    return {
      message: "Username must be at least 4 characters long",
      valid: false,
    };
  }

  return {
    valid: true,
    message: "",
  };
}

export function validateEmail(email: string): iValidationResponse {
  if (!email) {
    return {
      message: "Required",
      valid: false,
    };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return {
      message: "Invalid Email Address",
      valid: false,
    };
  }

  return {
    valid: true,
    message: "",
  };
}
