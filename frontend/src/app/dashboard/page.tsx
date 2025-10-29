'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
}

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other'];
const priorities = ['low', 'medium', 'high'];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Write and finalize the Q1 project proposal',
      completed: false,
      priority: 'high',
      category: 'Work',
      dueDate: '2024-01-15',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Weekly grocery shopping',
      completed: true,
      priority: 'medium',
      category: 'Shopping',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('Other');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showCompleted, setShowCompleted] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
      const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'All' ||
                          (filterStatus === 'Completed' && task.completed) ||
                          (filterStatus === 'Pending' && !task.completed);

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [tasks, searchTerm, filterCategory, filterPriority, filterStatus]);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      priority: newTaskPriority,
      category: newTaskCategory,
      dueDate: newTaskDueDate || undefined,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">TaskFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, User!</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
              <p className="text-3xl font-bold text-indigo-600">{totalTasks}</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-semibold mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
              <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
              <p className="text-3xl font-bold text-blue-600">{completionRate}%</p>
            </div>
          </div>

          {/* Add New Task */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6 mb-8`}>
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                  </option>
                ))}
              </select>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <textarea
                placeholder="Task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
              <div>
                <label className="block text-sm font-medium mb-1">Due Date (Optional)</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
            <button
              onClick={addTask}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Add Task
            </button>
          </div>

          {/* Filters */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6 mb-8`}>
            <h2 className="text-xl font-semibold mb-4">Filters & Search</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="All">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Tasks List */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Your Tasks ({filteredTasks.length})</h3>
                <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  {showCompleted ? 'Hide' : 'Show'} Completed
                </button>
              </div>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-all hover:shadow-md ${
                      darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
                    } ${task.completed ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {task.category}
                          </span>
                        </div>
                        <p className={`text-sm ${task.completed ? 'text-gray-400' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                        {task.dueDate && (
                          <p className="text-xs text-orange-600 mt-1">
                            Due: {new Date(task.dueDate).toLocaleDateString('en-US')}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                {filteredTasks.length === 0 && (
                  <div className="text-center py-8">
                    <p className={`text-gray-500 ${darkMode ? 'text-gray-400' : ''}`}>
                      {searchTerm || filterCategory !== 'All' || filterPriority !== 'All' || filterStatus !== 'All'
                        ? 'No tasks match your filters.'
                        : 'No tasks yet. Add one above!'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
