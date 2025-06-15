import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const useExpenseTrackerData = () => {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [financialGoals, setFinancialGoals] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K to show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowShortcuts(true);
      }
      // Esc to close shortcuts modal
      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (currentUser) {
      const savedExpenses = localStorage.getItem(`expenses_${currentUser.uid}`);
      const savedCategories = localStorage.getItem(`categories_${currentUser.uid}`);
      const savedRecurringExpenses = localStorage.getItem(`recurringExpenses_${currentUser.uid}`);
      const savedFinancialGoals = localStorage.getItem(`financialGoals_${currentUser.uid}`);
      
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
        setFilteredExpenses(JSON.parse(savedExpenses));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        // Initialize default categories for new users
        const defaultCategories = [
          { id: '1', name: 'Food & Dining', budget: 0 },
          { id: '2', name: 'Housing & Rent', budget: 0 },
          { id: '3', name: 'Transportation', budget: 0 },
          { id: '4', name: 'Entertainment', budget: 0 },
          { id: '5', name: 'Shopping', budget: 0 },
          { id: '6', name: 'Healthcare', budget: 0 },
        ];
        setCategories(defaultCategories);
        localStorage.setItem(`categories_${currentUser.uid}`, JSON.stringify(defaultCategories));
      }

      if (savedRecurringExpenses) {
        setRecurringExpenses(JSON.parse(savedRecurringExpenses));
      }

      if (savedFinancialGoals) {
        setFinancialGoals(JSON.parse(savedFinancialGoals));
      }
    }
  }, [currentUser]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`expenses_${currentUser.uid}`, JSON.stringify(expenses));
      localStorage.setItem(`categories_${currentUser.uid}`, JSON.stringify(categories));
      localStorage.setItem(`recurringExpenses_${currentUser.uid}`, JSON.stringify(recurringExpenses));
      localStorage.setItem(`financialGoals_${currentUser.uid}`, JSON.stringify(financialGoals));
    }
  }, [expenses, categories, recurringExpenses, financialGoals, currentUser]);

  const handleAddExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setExpenses(prev => [...prev, newExpense]);
    setFilteredExpenses(prev => [...prev, newExpense]);
    toast.success('Expense added successfully! 🎉');
  };

  const handleRemoveExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    setFilteredExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.info('Expense removed.');
    if (selectedExpense && selectedExpense.id === id) {
      handleCloseModal();
    }
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
    ));
    setFilteredExpenses(prev => prev.map(expense => 
      expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
    ));
    toast.success('Expense updated successfully!');
    handleCloseModal();
  };

  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success('Category added successfully!');
  };

  const handleRemoveCategory = (id) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    toast.info('Category removed.');
  };

  const handleUpdateCategoryBudget = (id, newBudget) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id ? { ...category, budget: newBudget } : category
      )
    );
    toast.success('Category budget updated!');
  };

  const handleAddRecurringExpense = (recurringExpense) => {
    const newRecurringExpense = {
      ...recurringExpense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setRecurringExpenses(prev => [...prev, newRecurringExpense]);
    toast.success('Recurring expense added successfully! 🔁');
  };

  const handleRemoveRecurringExpense = (id) => {
    setRecurringExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.info('Recurring expense removed.');
  };

  const handleAddFinancialGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setFinancialGoals(prev => [...prev, newGoal]);
    toast.success('Financial goal added successfully! 🎯');
  };

  const handleUpdateFinancialGoal = (id, updateFn) => {
    setFinancialGoals(prev =>
      prev.map(goal => (goal.id === id ? updateFn(goal) : goal))
    );
    toast.success('Financial goal updated!');
  };

  const handleRemoveFinancialGoal = (id) => {
    setFinancialGoals(prev => prev.filter(goal => goal.id !== id));
    toast.info('Financial goal removed.');
  };

  const handleFilterExpenses = (filters) => {
    let filtered = [...expenses];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(expense => expense.category === filters.category);
    }

    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      let startDate, endDate;

      switch (filters.dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date(now.setDate(now.getDate() - now.getDay() + 6));
          endDate.setHours(23, 59, 59, 999);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
          break;
        default:
          break;
      }
      if (startDate && endDate) {
        filtered = filtered.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= startDate && expenseDate <= endDate;
        });
      }
    }

    if (filters.amountRange && filters.amountRange !== 'all') {
      const [minStr, maxStr] = filters.amountRange.split('-');
      const min = parseFloat(minStr);
      const max = maxStr ? parseFloat(maxStr) : Infinity;

      filtered = filtered.filter(expense => {
        const amount = expense.amount;
        return amount >= min && amount <= max;
      });
    }

    if (filters.searchTerm) {
      const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        expense.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        (expense.notes && expense.notes.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (expense.tags && expense.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)))
      );
    }

    setFilteredExpenses(filtered);
  };

  const handleViewExpenseDetails = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedExpense(null);
    setIsModalOpen(false);
  };

  const totalBalance = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return {
    expenses,
    categories,
    filteredExpenses,
    recurringExpenses,
    financialGoals,
    selectedExpense,
    isModalOpen,
    loading,
    showShortcuts,
    totalBalance,
    handleAddExpense,
    handleRemoveExpense,
    handleUpdateExpense,
    handleAddCategory,
    handleRemoveCategory,
    handleUpdateCategoryBudget,
    handleAddRecurringExpense,
    handleRemoveRecurringExpense,
    handleAddFinancialGoal,
    handleUpdateFinancialGoal,
    handleRemoveFinancialGoal,
    handleFilterExpenses,
    handleViewExpenseDetails,
    handleCloseModal,
    setShowShortcuts,
    setLoading, // Expose setLoading as it's used for loading state
  };
};

export default useExpenseTrackerData; 