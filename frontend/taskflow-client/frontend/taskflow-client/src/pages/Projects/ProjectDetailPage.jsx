// src/pages/Projects/ProjectDetailPage.jsx
import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import TaskCard from '../../components/features/tasks/TaskCard';
import TaskForm from '../../components/features/tasks/TaskForm';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import Spinner from '../../components/common/Spinner/Spinner';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('board');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: project, loading: projectLoading, error: projectError } = useFetch(
    useCallback(() => projectService.getById(id), [id])
  );

  const { data: tasks, loading: tasksLoading, refetch: refetchTasks } = useFetch(
    useCallback(() => taskService.getByProject(id), [id])
  );

  const filteredTasks = tasks?.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === parseInt(statusFilter);
    const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      task.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const tasksByStatus = {
    todo: filteredTasks?.filter((t) => t.status === 0) || [],
    inProgress: filteredTasks?.filter((t) => t.status === 1) || [],
    done: filteredTasks?.filter((t) => t.status === 2) || [],
  };

  const handleCreateTask = async (data) => {
    try {
      await taskService.create({ ...data, projectId: parseInt(id) });
      setIsTaskModalOpen(false);
      refetchTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await taskService.update(editingTask.id, data);
      setEditingTask(null);
      refetchTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      await taskService.delete(taskId);
      refetchTasks();
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await taskService.updateStatus(taskId, newStatus);
    refetchTasks();
  };

  if (projectLoading || tasksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project not found</h2>
        <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back Button & Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="text-blue-600 hover:text-blue-800 mb-3 sm:mb-4 flex items-center gap-1 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{project.name}</h1>
            {project.description && (
              <p className="mt-2 text-sm sm:text-base text-gray-600">{project.description}</p>
            )}
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              {tasks?.length || 0} tasks · Created {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button onClick={() => setIsTaskModalOpen(true)} className="w-full sm:w-auto justify-center flex-shrink-0">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </Button>
        </div>
      </div>

      {/* Toolbar - Stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          {/* Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-none px-3 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="0">To Do</option>
            <option value="1">In Progress</option>
            <option value="2">Done</option>
          </select>

          {/* View Toggle - Hide on mobile, show inline on desktop */}
          <div className="hidden sm:flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium ${
                viewMode === 'board' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 sm:px-4 py-2 text-sm font-medium ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View Toggle */}
      <div className="sm:hidden mb-4">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            onClick={() => setViewMode('board')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium ${
              viewMode === 'board' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Board View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Tasks */}
      {tasks?.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-sm text-gray-600 mb-4">Create your first task to get started</p>
          <Button onClick={() => setIsTaskModalOpen(true)} className="w-full sm:w-auto">
            Add Your First Task
          </Button>
        </div>
      ) : viewMode === 'board' ? (
        /* Kanban Board - Horizontal scroll on mobile, grid on desktop */
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 min-w-[768px] sm:min-w-0">
            {/* To Do Column */}
            <div className="flex-shrink-0 w-72 sm:w-auto bg-gray-100 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-400" />
                To Do 
                <span className="text-gray-500 font-normal">({tasksByStatus.todo.length})</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {tasksByStatus.todo.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
                {tasksByStatus.todo.length === 0 && (
                  <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No tasks</p>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="flex-shrink-0 w-72 sm:w-auto bg-blue-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-400" />
                In Progress 
                <span className="text-gray-500 font-normal">({tasksByStatus.inProgress.length})</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {tasksByStatus.inProgress.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
                {tasksByStatus.inProgress.length === 0 && (
                  <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No tasks</p>
                )}
              </div>
            </div>

            {/* Done Column */}
            <div className="flex-shrink-0 w-72 sm:w-auto bg-green-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                Done 
                <span className="text-gray-500 font-normal">({tasksByStatus.done.length})</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {tasksByStatus.done.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
                {tasksByStatus.done.length === 0 && (
                  <p className="text-xs sm:text-sm text-gray-500 text-center py-4">No tasks</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          {filteredTasks?.map((task) => (
            <div key={task.id} className="p-3 sm:p-4">
              <TaskCard
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                variant="list"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Create New Task">
        <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsTaskModalOpen(false)} />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
        <TaskForm initialData={editingTask} onSubmit={handleUpdateTask} onCancel={() => setEditingTask(null)} />
      </Modal>
    </div>
  );
}