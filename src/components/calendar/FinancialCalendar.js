import React, { useState, useEffect } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  isSameDay,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameWeek,
  isBefore,
  isAfter,
  addMinutes,
  addMonths,
  addYears,
  isWithinInterval,
  differenceInDays
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarReminder from './CalendarReminder';
import RecurringPatternManager from '../common/RecurringPatternManager';

const FinancialCalendar = ({ 
  expenses, 
  recurringExpenses, 
  financialGoals,
  onEventClick 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month');
  const [filteredTypes, setFilteredTypes] = useState(['expense', 'recurring', 'reminder']);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [recurringPatterns, setRecurringPatterns] = useState([]);

  useEffect(() => {
    // Combine all financial events
    const allEvents = [
      ...expenses.map(expense => ({
        id: `expense-${expense.id}`,
        date: new Date(expense.date),
        title: expense.description,
        type: 'expense',
        amount: expense.amount,
        category: expense.category
      })),
      ...recurringExpenses.map(expense => ({
        id: `recurring-${expense.id}`,
        date: new Date(expense.nextDueDate),
        title: expense.description,
        type: 'recurring',
        amount: expense.amount,
        category: expense.category,
        pattern: expense.pattern
      })),
      ...financialGoals.map(goal => ({
        id: `goal-${goal.id}`,
        date: new Date(goal.targetDate),
        title: goal.name,
        type: 'goal',
        amount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        category: goal.category,
        priority: goal.priority,
        milestones: goal.milestones
      }))
    ];

    // Generate recurring events based on patterns
    const recurringEvents = recurringPatterns.flatMap(pattern => {
      const events = [];
      let currentDate = new Date(pattern.startDate);
      const endDate = pattern.neverEnds ? addYears(currentDate, 1) : new Date(pattern.endDate);

      while (isBefore(currentDate, endDate)) {
        if (pattern.frequency === 'daily') {
          events.push({
            id: `recurring-${pattern.id}-${currentDate.getTime()}`,
            date: new Date(currentDate),
            title: pattern.title,
            type: 'recurring',
            pattern: pattern
          });
          currentDate = addDays(currentDate, pattern.interval);
        } else if (pattern.frequency === 'weekly') {
          if (pattern.daysOfWeek.includes(currentDate.getDay())) {
            events.push({
              id: `recurring-${pattern.id}-${currentDate.getTime()}`,
              date: new Date(currentDate),
              title: pattern.title,
              type: 'recurring',
              pattern: pattern
            });
          }
          currentDate = addDays(currentDate, 1);
        } else if (pattern.frequency === 'monthly') {
          if (pattern.daysOfMonth.includes(currentDate.getDate())) {
            events.push({
              id: `recurring-${pattern.id}-${currentDate.getTime()}`,
              date: new Date(currentDate),
              title: pattern.title,
              type: 'recurring',
              pattern: pattern
            });
          }
          currentDate = addDays(currentDate, 1);
        } else if (pattern.frequency === 'yearly') {
          if (pattern.monthsOfYear.includes(currentDate.getMonth())) {
            events.push({
              id: `recurring-${pattern.id}-${currentDate.getTime()}`,
              date: new Date(currentDate),
              title: pattern.title,
              type: 'recurring',
              pattern: pattern
            });
          }
          currentDate = addDays(currentDate, 1);
        }
      }

      return events;
    });

    setEvents([...allEvents, ...recurringEvents]);
  }, [expenses, recurringExpenses, financialGoals, recurringPatterns]);

  const getDaysToShow = () => {
    if (view === 'month') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      return eachDayOfInterval({ start: monthStart, end: monthEnd });
    } else {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return eachDayOfInterval({ start: weekStart, end: weekEnd });
    }
  };

  const getEventsForDay = (day) => {
    return events
      .filter(event => isSameDay(event.date, day))
      .filter(event => filteredTypes.includes(event.type))
      .filter(event => 
        searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  };

  const getEventColor = (type, priority) => {
    if (type === 'goal') {
      return priority === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' : 
             priority === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
             'bg-gradient-to-r from-green-500 to-green-600';
    }
    switch (type) {
      case 'expense':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'recurring':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'reminder':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const toggleEventType = (type) => {
    setFilteredTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const navigateDate = (direction) => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + (direction * 7))));
    }
  };

  const handleAddReminder = (reminder) => {
    setEvents(prev => [...prev, { ...reminder, type: 'reminder' }]);
  };

  const handleAddRecurringPattern = (pattern) => {
    setRecurringPatterns(prev => [...prev, { ...pattern, id: Date.now() }]);
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => isAfter(event.date, now))
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
  };

  const getEventStatus = (event) => {
    const now = new Date();
    if (isBefore(event.date, now)) {
      return 'overdue';
    } else if (differenceInDays(event.date, now) <= 7) {
      return 'due-soon';
    }
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'due-soon':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      default:
        return 'bg-gradient-to-r from-green-500 to-green-600';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'expense':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'recurring':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'goal':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'reminder':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Financial Calendar
          </h2>
          <div className="flex space-x-2 bg-gray-800/50 p-1.5 rounded-xl border border-gray-700/50">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                view === 'month' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                view === 'week' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Week
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => navigateDate(-1)}
              className="p-2.5 bg-gray-800/50 text-white rounded-xl hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigateDate(1)}
              className="p-2.5 bg-gray-800/50 text-white rounded-xl hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {format(currentDate, view === 'month' ? 'MMMM yyyy' : "'Week of' MMMM d, yyyy")}
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowUpcoming(!showUpcoming)}
            className={`px-4 py-2.5 rounded-xl transition-all duration-200 ${
              showUpcoming 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
            }`}
          >
            {showUpcoming ? 'Hide Upcoming' : 'Show Upcoming'}
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setShowReminderModal(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Add Reminder</span>
            </button>
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setShowRecurringModal(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Add Recurring</span>
            </button>
          </div>
        </div>
      </div>

      {showUpcoming && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getUpcomingEvents().map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onEventClick(event)}
                className={`${getEventColor(event.type, event.priority)} p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  {getEventIcon(event.type)}
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{event.title}</div>
                    <div className="text-white/75 text-xs">
                      {format(event.date, 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(getEventStatus(event))}`}>
                    {getEventStatus(event) === 'overdue' ? 'Overdue' :
                     getEventStatus(event) === 'due-soon' ? 'Due Soon' : 'Upcoming'}
                  </div>
                </div>
                {event.type === 'goal' && (
                  <div className="mt-3">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(event.currentAmount / event.targetAmount) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-white/75 text-xs mt-2 flex justify-between">
                      <span>${event.currentAmount}</span>
                      <span>${event.targetAmount}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-7 gap-3 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {getDaysToShow().map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <motion.div
              key={day.toString()}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedDate(day);
                setShowReminderModal(true);
              }}
              className={`
                min-h-[140px] p-3 rounded-xl cursor-pointer
                ${isSameMonth(day, currentDate) ? 'bg-gray-800/30' : 'bg-gray-900/30'}
                ${isToday(day) ? 'ring-2 ring-blue-500/50' : ''}
                ${view === 'week' && isSameWeek(day, currentDate) ? 'ring-2 ring-purple-500/50' : ''}
                transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <div className={`text-sm font-medium ${
                  isToday(day) ? 'text-blue-400' : 
                  isSameMonth(day, currentDate) ? 'text-white' : 'text-gray-500'
                }`}>
                  {format(day, 'd')}
                </div>
                {dayEvents.length > 0 && (
                  <div className="text-xs text-gray-400">
                    {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                {dayEvents.map(event => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`
                      ${getEventColor(event.type, event.priority)} 
                      text-white text-xs p-2 rounded-lg cursor-pointer
                      hover:opacity-90 transition-all duration-200
                      flex items-center gap-2 shadow-md backdrop-blur-sm
                    `}
                  >
                    {getEventIcon(event.type)}
                    <span className="truncate">{event.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          {[
            { type: 'expense', label: 'Expenses', color: 'bg-gradient-to-r from-red-500 to-pink-500' },
            { type: 'recurring', label: 'Recurring', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
            { type: 'reminder', label: 'Reminders', color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
          ].map(({ type, label, color }) => (
            <div 
              key={type}
              className={`flex items-center cursor-pointer transition-opacity duration-200 ${
                !filteredTypes.includes(type) ? 'opacity-50' : ''
              }`}
              onClick={() => toggleEventType(type)}
            >
              <div className={`w-3 h-3 ${color} rounded-full mr-2`}></div>
              <span className="text-gray-400 text-sm">{label}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Today</span>
        </button>
      </div>

      <AnimatePresence>
        {showReminderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <CalendarReminder
              onAddReminder={handleAddReminder}
              onClose={() => setShowReminderModal(false)}
            />
          </motion.div>
        )}
        {showRecurringModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <RecurringPatternManager
              onSave={handleAddRecurringPattern}
              onClose={() => setShowRecurringModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinancialCalendar;