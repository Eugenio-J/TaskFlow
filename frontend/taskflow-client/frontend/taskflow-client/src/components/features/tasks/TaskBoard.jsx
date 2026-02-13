// src/components/features/tasks/TaskBoard.jsx
import TaskCard from './TaskCard';

const columns = [
  { key: 'todo', status: 0, label: 'To Do', bgColor: 'bg-gray-100', dotColor: 'bg-gray-400' },
  { key: 'inProgress', status: 1, label: 'In Progress', bgColor: 'bg-blue-50', dotColor: 'bg-blue-400' },
  { key: 'done', status: 2, label: 'Done', bgColor: 'bg-green-50', dotColor: 'bg-green-400' },
];

export default function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }) {
  // Group tasks by status
  const tasksByStatus = {
    todo: tasks?.filter((t) => t.status === 0) || [],
    inProgress: tasks?.filter((t) => t.status === 1) || [],
    done: tasks?.filter((t) => t.status === 2) || [],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.key} className={`${column.bgColor} rounded-lg p-4`}>
          {/* Column Header */}
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${column.dotColor}`} />
            {column.label}
            <span className="text-gray-500 font-normal">
              ({tasksByStatus[column.key].length})
            </span>
          </h3>

          {/* Tasks */}
          <div className="space-y-3">
            {tasksByStatus[column.key].map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
            {tasksByStatus[column.key].length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No tasks
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}