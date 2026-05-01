import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ClipboardList } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-16 flex flex-col items-center justify-center text-center mt-6"
      >
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <ClipboardList className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No tasks found</h3>
        <p className="text-slate-400">You're all caught up! Create a new task to get started.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
