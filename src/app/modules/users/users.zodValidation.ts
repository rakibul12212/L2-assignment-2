import { z } from 'zod';

//create a schema validation using zod
const fullNameValidationSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const addressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const orderValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number().min(0),
  quantity: z.number().min(0),
});
const userValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().trim(),
  password: z.string().trim(),
  fullName: fullNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().trim()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
  isDeleted: z.boolean().default(false).optional(),
});
const updateFullNameValidationSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

const updateAddressValidationSchema = z.object({
  street: z.string().trim().optional(),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
});

export const updateValidationSchema = z.object({
  userId: z.number().min(1).optional(),
  username: z.string().trim().optional(),
  password: z.string().trim().optional(),
  fullName: updateFullNameValidationSchema.optional(),
  age: z.number().min(1).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().default(true).optional(),
  hobbies: z.array(z.string().trim()).optional(),
  address: updateAddressValidationSchema.optional(),
  orders: z.array(orderValidationSchema).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export default userValidationSchema;
