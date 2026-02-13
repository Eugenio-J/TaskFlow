// src/pages/Projects/ProjectsPage.jsx
import { useState, useCallback } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { projectService } from '../../services/projectService';
import ProjectCard from '../../components/features/projects/ProjectCard';
import ProjectForm from '../../components/features/projects/ProjectForm';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import Spinner from '../../components/common/Spinner/Spinner';
import EmptyState from '../../components/EmptyState/EmptyState';

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: projects, loading, error, refetch } = useFetch(
    useCallback(() => projectService.getAll(), [])
  );

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (data) => {
    try {
      await projectService.create(data);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  const handleUpdate = async (data) => {
    try {
      await projectService.update(editingProject.id, data);
      setEditingProject(null);
      refetch();
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
          <p className="font-medium">Error loading projects</p>
          <p className="text-sm mt-1">{error}</p>
          <Button onClick={refetch} className="mt-4">Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header - Stack on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage and organize your projects
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Button>
      </div>

      {/* Search Bar */}
      {projects?.length > 0 && (
        <div className="mb-6">
          <div className="relative w-full sm:max-w-md">
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
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Project Grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
      {projects?.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
              />
            </svg>
          }
          title="No projects yet"
          description="Create your first project to start organizing your tasks"
          action={
            <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
              Create Your First Project
            </Button>
          }
        />
      ) : filteredProjects?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => setEditingProject(project)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )
      }

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <ProjectForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
      >
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProject(null)}
        />
      </Modal>
    </div>
  );
}