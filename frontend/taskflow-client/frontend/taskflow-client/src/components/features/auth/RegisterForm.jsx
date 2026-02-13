// src/components/features/auth/RegisterForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string().min(1, 'Confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function RegisterForm() {
  const [serverError, setServerError] = useState('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      debugger; // ← This WILL pause execution when DevTools is open
      setServerError('');
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      {/* Name Fields - Stack on very small screens */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
        <Input label="First name" {...register('firstName')} error={errors.firstName?.message} />
        <Input label="Last name" {...register('lastName')} error={errors.lastName?.message} />
      </div>

      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
      <Input label="Confirm password" type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />

      <div className="text-xs text-gray-500 space-y-0.5">
        <p className="font-medium">Password requirements:</p>
        <ul className="list-disc list-inside ml-1">
          <li>At least 8 characters</li>
          <li>One uppercase & lowercase letter</li>
          <li>One number</li>
        </ul>
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Create Account
      </Button>

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign in</Link>
      </p>
    </form>
  );
}