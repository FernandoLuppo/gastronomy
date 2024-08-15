import * as yup from 'yup'

const baseUserSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name field is required.')
    .min(3, 'Name field must have at least 3 characters.')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Please insert your name correctly.'
    ),

  email: yup
    .string()
    .required('Email field is required.')
    .email('This field must be a valid email'),

  password: yup
    .string()
    .required('Password field is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
    )
})

export const registerSchema = baseUserSchema.shape({
  confirmPassword: yup
    .string()
    .required('Confirm Password field is required.')
    .oneOf([yup.ref('password')], 'Passwords must match.')
})

export const loginSchema = baseUserSchema.pick(['email', 'password'])

export const updateUserInfosSchema = baseUserSchema.shape({
  confirmPassword: yup
    .string()
    .required('Confirm Password field is required.')
    .oneOf([yup.ref('password')], 'Passwords must match.'),

  oldPassword: yup
    .string()
    .required('Old Password field is required.')
    .min(8, 'Old Password must be at least 8 characters long.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must contain 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
    )
})
