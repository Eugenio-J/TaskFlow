// src/components/features/tasks/TaskCard.jsx
const statusConfig = {
  0: { label: 'To Do', bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  1: { label: 'In Progress', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  2: { label: 'Done', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
};

const priorityConfig = {
  0: { label: 'Low', color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-l-gray-300' },
  1: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-l-yellow-400' },
  2: { label: 'High', color: 'text-red-600', bg: 'bg-red-50', border: 'border-l-red-500' },
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 2;

  return (
    <div 
      className={`
        bg-white rounded-xl shadow-card border-l-4 p-4
        transition-all duration-200 hover:shadow-card-hover
        ${priority.border}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h4 className={`font-medium text-gray-900 ${task.status === 2 ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status */}
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, parseInt(e.target.value))}
          className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer border-0 ${status.bg} ${status.text}`}
        >
          <option value={0}>To Do</option>
          <option value={1}>In Progress</option>
          <option value={2}>Done</option>
        </select>

        {/* Priority */}
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priority.bg} ${priority.color}`}>
          {priority.label}
        </span>

        {/* Due Date */}
        {task.dueDate && (
          <span className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded-full ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}