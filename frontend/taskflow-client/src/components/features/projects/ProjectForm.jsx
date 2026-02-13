// src/components/features/projects/ProjectForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(500).optional(),
});

export default function ProjectForm({ initialData, onSubmit, onCancel }) {
  const [serverError, setServerError] = useState('');
  const isEditing = !!initialData;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      setServerError('');
      await onSubmit(data);
    } catch (error) {
      setServerError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <Input
        label="Project Name"
        placeholder="e.g., Website Redesign"
        {...register('name')}
        error={errors.name?.message}
        autoFocus
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="What is this project about?"
          className={`
            w-full px-3 py-2.5 sm:py-2 text-base border rounded-lg shadow-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${errors.description ? 'border-red-500' : 'border-gray-300'}
          `}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
          {isEditing ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}