import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({ title, description, priority, dueDate });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 outline-none focus:border-primary-500/50 text-white placeholder:text-slate-500 transition-colors"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 outline-none focus:border-primary-500/50 transition-colors text-sm text-slate-300 placeholder:text-slate-500 resize-none min-h-[80px]"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Priority</label>
          <select
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 outline-none focus:border-primary-500/50 text-sm text-slate-300 transition-colors"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Due Date</label>
          <input
            type="date"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 outline-none focus:border-primary-500/50 text-sm text-slate-300 [color-scheme:dark] transition-colors"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={!title.trim()}
        className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-xl transition-colors shadow-lg shadow-primary-500/20 disabled:shadow-none flex items-center justify-center gap-2 font-medium mt-6"
      >
        <Plus className="w-5 h-5" />
        Add New Task
      </button>
    </motion.form>
  );
};

export default TaskForm;
