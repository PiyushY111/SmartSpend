import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecurringPatternManager = ({ onSave, onClose, initialData = null }) => {
  const [pattern, setPattern] = useState(initialData || {
    frequency: 'weekly',
    interval: 1,
    daysOfWeek: [],
    daysOfMonth: [],
    monthsOfYear: [],
    endDate: null,
    endAfterOccurrences: null,
    neverEnds: true,
    startDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(pattern);
    onClose();
  };

  const toggleDayOfWeek = (day) => {
    setPattern(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  const toggleDayOfMonth = (day) => {
    setPattern(prev => ({
      ...prev,
      daysOfMonth: prev.daysOfMonth.includes(day)
        ? prev.daysOfMonth.filter(d => d !== day)
        : [...prev.daysOfMonth, day]
    }));
  };

  const toggleMonthOfYear = (month) => {
    setPattern(prev => ({
      ...prev,
      monthsOfYear: prev.monthsOfYear.includes(month)
        ? prev.monthsOfYear.filter(m => m !== month)
        : [...prev.monthsOfYear, month]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Recurring Pattern</h3>
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
          <label className="block text-gray-400 text-sm mb-1">Frequency</label>
          <select
            value={pattern.frequency}
            onChange={(e) => setPattern({ ...pattern, frequency: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">Repeat Every</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={pattern.interval}
              onChange={(e) => setPattern({ ...pattern, interval: parseInt(e.target.value) })}
              className="w-20 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-400">
              {pattern.frequency === 'daily' ? 'days' :
               pattern.frequency === 'weekly' ? 'weeks' :
               pattern.frequency === 'monthly' ? 'months' : 'years'}
            </span>
          </div>
        </div>

        {pattern.frequency === 'weekly' && (
          <div>
            <label className="block text-gray-400 text-sm mb-1">Days of Week</label>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDayOfWeek(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    pattern.daysOfWeek.includes(index)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {pattern.frequency === 'monthly' && (
          <div>
            <label className="block text-gray-400 text-sm mb-1">Days of Month</label>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDayOfMonth(day)}
                  className={`p-2 rounded-lg transition-colors ${
                    pattern.daysOfMonth.includes(day)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {pattern.frequency === 'yearly' && (
          <div>
            <label className="block text-gray-400 text-sm mb-1">Months of Year</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ].map((month, index) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => toggleMonthOfYear(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    pattern.monthsOfYear.includes(index)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-400 text-sm mb-1">Start Date</label>
          <input
            type="date"
            value={pattern.startDate}
            onChange={(e) => setPattern({ ...pattern, startDate: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">End Options</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={pattern.neverEnds}
                onChange={() => setPattern({ ...pattern, neverEnds: true })}
                className="text-blue-500"
              />
              <span className="text-white">Never ends</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!pattern.neverEnds && pattern.endDate !== null}
                onChange={() => setPattern({ ...pattern, neverEnds: false, endAfterOccurrences: null })}
                className="text-blue-500"
              />
              <span className="text-white">Ends on</span>
              <input
                type="date"
                value={pattern.endDate || ''}
                onChange={(e) => setPattern({ ...pattern, endDate: e.target.value })}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={pattern.neverEnds}
              />
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!pattern.neverEnds && pattern.endAfterOccurrences !== null}
                onChange={() => setPattern({ ...pattern, neverEnds: false, endDate: null })}
                className="text-blue-500"
              />
              <span className="text-white">Ends after</span>
              <input
                type="number"
                min="1"
                value={pattern.endAfterOccurrences || ''}
                onChange={(e) => setPattern({ ...pattern, endAfterOccurrences: parseInt(e.target.value) })}
                className="w-20 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={pattern.neverEnds}
              />
              <span className="text-white">occurrences</span>
            </label>
          </div>
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
            Save Pattern
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RecurringPatternManager; 