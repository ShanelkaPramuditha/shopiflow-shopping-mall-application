import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Zod validation schema
const validationSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    mobile: z
      .string()
      .regex(/^\d{10}$/, 'Invalid mobile number'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female']),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export default function Register() {
  const [form, setForm] = useState('user');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      gender: 'male',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success('User registered successfully');
    reset();
  };

  // Text input field component
  const TextInputField = ({
    label,
    name,
    type = 'text',
  }) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={label}
        {...register(name)}
        aria-invalid={errors[name] ? 'true' : 'false'}
        aria-describedby={`${name}-error`}
      />
      {errors[name] && (
        <span
          id={`${name}-error`}
          className="text-sm text-red-500"
        >
          {errors[name]?.message}
        </span>
      )}
    </div>
  );

  TextInputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  };

  // User registration form
  const UserRegisterForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="p-2">
        <CardTitle className="text-2xl text-center">
          User Registration
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details to register.
        </CardDescription>
      </CardHeader>
      <div className="border-t border-gray-300" />
      <CardContent className="space-y-4 px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <TextInputField
            label="First Name"
            name="firstName"
          />
          <TextInputField
            label="Last Name"
            name="lastName"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInputField
            label="Email"
            name="email"
            type="email"
          />
          <TextInputField label="Mobile" name="mobile" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              name="gender"
              id="gender"
              className="flex gap-8"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  id="male"
                  {...register('gender')}
                />
                <Label htmlFor="male" className="ms-3">
                  Male
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  id="female"
                  {...register('gender')}
                />
                <Label htmlFor="female" className="ms-3">
                  Female
                </Label>
              </div>
            </RadioGroup>
            {errors.gender && (
              <span className="text-sm text-red-500">
                {errors.gender?.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInputField
            label="Password"
            name="password"
            type="password"
          />
          <TextInputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button type="submit" className="w-full">
          Register
        </Button>
      </CardFooter>
    </form>
  );

  // Shop registration form
  const ShopRegisterForm = () => <div>Shop Register</div>;

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-2xl mx-4 my-16 h-full">
        <div className="flex h-12">
          <Button
            className="w-1/2 rounded-none rounded-tl-xl h-full text-lg"
            onClick={() => setForm('user')}
          >
            User Register
          </Button>
          <div className="w-px bg-gray-300" />
          <Button
            className="w-1/2 rounded-none rounded-tr-xl h-full text-lg"
            onClick={() => setForm('shop')}
          >
            Shop Register
          </Button>
        </div>
        {form === 'user' && <UserRegisterForm />}
        {form === 'shop' && <ShopRegisterForm />}
      </Card>
    </div>
  );
}
