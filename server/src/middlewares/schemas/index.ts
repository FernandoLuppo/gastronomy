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

const registerSchema = baseUserSchema.shape({
  confirmPassword: yup
    .string()
    .required('Confirm Password field is required.')
    .oneOf([yup.ref('password')], 'Passwords must match.')
})

const loginSchema = baseUserSchema.pick(['email', 'password'])

const updateUserInfosSchema = baseUserSchema.shape({
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

const checkEmailSchema = baseUserSchema.pick(['email'])

const checkCodeSchema = yup.object().shape({
  securityCode: yup
    .string()
    .required('Security code field is required.')
    .max(5, 'Field min length character is 5')
    .max(5, 'Field max length character is 5')
})

const newPasswordSchema = baseUserSchema.pick(['password']).shape({
  confirmPassword: yup
    .string()
    .required('Confirm Password field is required.')
    .oneOf([yup.ref('password')], 'Passwords must match.')
})

export {
  registerSchema,
  loginSchema,
  updateUserInfosSchema,
  checkEmailSchema,
  checkCodeSchema,
  newPasswordSchema
}
