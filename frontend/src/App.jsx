import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle2, LayoutDashboard, CheckSquare, Clock, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      if (updatedData.completed !== undefined) {
         toast.success(updatedData.completed ? 'Task completed!' : 'Task unmarked');
      } else {
         toast.success('Task updated successfully');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="flex h-screen bg-[#0b1120] text-slate-200 overflow-hidden font-sans">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        }} 
      />

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-primary-500/20 rounded-xl border border-primary-500/30">
            <CheckCircle2 className="w-6 h-6 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        <div className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setFilter('all')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${filter === 'all' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${filter === 'pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium">Pending</span>
            <span className="ml-auto bg-slate-800 text-xs py-1 px-2 rounded-full">{stats.pending}</span>
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${filter === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="font-medium">Completed</span>
            <span className="ml-auto bg-slate-800 text-xs py-1 px-2 rounded-full">{stats.completed}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="p-8 max-w-6xl mx-auto w-full relative z-10 space-y-8">
          
          <header>
            <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
            <p className="text-slate-400">Track and manage your tasks efficiently.</p>
          </header>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-rose-500/20 rounded-xl text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">High Priority</p>
                <p className="text-2xl font-bold text-white">{stats.highPriority}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {filter === 'all' ? 'All Tasks' : filter === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}
                </h3>
                <div className="md:hidden flex gap-2">
                  <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm rounded-lg ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-slate-800 text-slate-400'}`}>All</button>
                  <button onClick={() => setFilter('pending')} className={`px-3 py-1 text-sm rounded-lg ${filter === 'pending' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400'}`}>Pending</button>
                  <button onClick={() => setFilter('completed')} className={`px-3 py-1 text-sm rounded-lg ${filter === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}>Done</button>
                </div>
              </div>
              <TaskList 
                tasks={filteredTasks} 
                loading={loading}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </div>
            
            <div className="xl:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-xl font-bold text-white mb-6">Create New Task</h3>
                <TaskForm onAdd={addTask} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
