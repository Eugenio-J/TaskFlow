// src/components/features/tasks/TaskForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  status: z.number().min(0).max(2),
  priority: z.number().min(0).max(2),
  dueDate: z.string().optional(),
});

export default function TaskForm({ initialData, onSubmit, onCancel }) {
  const [serverError, setServerError] = useState('');
  const isEditing = !!initialData;

  const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status ?? 0,
      priority: initialData?.priority ?? 1,
      dueDate: formatDate(initialData?.dueDate),
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      setServerError('');
      await onSubmit({
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      });
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
        label="Task Title"
        placeholder="e.g., Design homepage mockup"
        {...register('title')}
        error={errors.title?.message}
        autoFocus
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Add more details..."
          className="w-full px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status & Priority - Stack on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            {...register('status', { valueAsNumber: true })}
            className="w-full px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>To Do</option>
            <option value={1}>In Progress</option>
            <option value={2}>Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            {...register('priority', { valueAsNumber: true })}
            className="w-full px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
        </div>
      </div>

      <Input label="Due Date" type="date" {...register('dueDate')} />

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
          {isEditing ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}