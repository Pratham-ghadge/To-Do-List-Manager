import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit2, X, Calendar, Circle } from 'lucide-react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [editDueDate, setEditDueDate] = useState(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');

  const handleUpdate = () => {
    if (!editTitle.trim()) return;
    onUpdate(task._id, { 
      title: editTitle, 
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate || null
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(task._id, { completed: !task.completed });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border-t-4 shadow-sm flex flex-col transition-colors ${
        task.completed ? 'border-t-emerald-500 opacity-60 hover:opacity-100' : 
        task.priority === 'high' ? 'border-t-rose-500' :
        task.priority === 'low' ? 'border-t-blue-500' :
        'border-t-amber-500'
      }`}
    >
      {isEditing ? (
        <div className="space-y-4 flex-1">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-primary-500 transition-colors"
              autoFocus
            />
          </div>
          <div>
             <label className="text-xs text-slate-500 mb-1 block">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-primary-500 text-sm min-h-[80px] resize-none transition-colors"
              placeholder="Description..."
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">Priority</label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-primary-500 text-sm transition-colors"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 mb-1 block">Due Date</label>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-primary-500 text-sm [color-scheme:dark] transition-colors"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 transition-colors rounded-xl flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors rounded-xl flex items-center gap-2 shadow-lg shadow-primary-500/20"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={`text-lg font-bold transition-colors line-clamp-2 ${
              task.completed ? 'text-slate-400 line-through' : 'text-white'
            }`}>
              {task.title}
            </h3>
            <button
              onClick={handleToggleComplete}
              className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                task.completed 
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'border-slate-500 hover:border-primary-400 text-transparent hover:text-primary-400 bg-slate-800'
              }`}
            >
              {task.completed ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex-1">
            {task.description && (
              <p className={`text-sm transition-colors line-clamp-3 mb-4 ${
                task.completed ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {task.description}
              </p>
            )}
          </div>
          
          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {task.priority && (
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                  task.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  task.priority === 'low' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-amber-500/10 text-amber-400 border-amber-500/20'
                } ${task.completed ? 'opacity-50' : ''}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
              )}
              
              {task.dueDate && (
                <span className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
                  task.completed ? 'bg-slate-800 text-slate-500 border-slate-700' : 
                  new Date(task.dueDate) < new Date() ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
               <div className="text-xs text-slate-500 font-medium">
                {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-primary-500 hover:text-white rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;
