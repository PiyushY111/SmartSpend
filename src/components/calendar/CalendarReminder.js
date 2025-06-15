import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarReminder = ({ onAddReminder, onClose }) => {
  const [reminderData, setReminderData] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    type: 'notification',
    repeat: 'none',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reminderDateTime = new Date(`${reminderData.date}T${reminderData.time}`);
    onAddReminder({
      ...reminderData,
      date: reminderDateTime,
      id: Date.now().toString()
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Add Reminder</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Title</label>
          <input
            type="text"
            value={reminderData.title}
            onChange={(e) => setReminderData({ ...reminderData, title: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Date</label>
            <input
              type="date"
              value={reminderData.date}
              onChange={(e) => setReminderData({ ...reminderData, date: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Time</label>
            <input
              type="time"
              value={reminderData.time}
              onChange={(e) => setReminderData({ ...reminderData, time: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Type</label>
          <select
            value={reminderData.type}
            onChange={(e) => setReminderData({ ...reminderData, type: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="notification">Notification</option>
            <option value="email">Email</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Repeat</label>
          <select
            value={reminderData.repeat}
            onChange={(e) => setReminderData({ ...reminderData, repeat: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Priority</label>
          <div className="flex space-x-2">
            {['low', 'medium', 'high'].map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setReminderData({ ...reminderData, priority })}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  reminderData.priority === priority
                    ? priority === 'low'
                      ? 'bg-green-500 text-white'
                      : priority === 'medium'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Description</label>
          <textarea
            value={reminderData.description}
            onChange={(e) => setReminderData({ ...reminderData, description: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Reminder
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CalendarReminder; 