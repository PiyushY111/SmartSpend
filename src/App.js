import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/auth/Login';
import ExpenseDetailModal from './components/expenses/ExpenseDetailModal';
import Header from './components/layout/Header';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import Footer from './components/layout/Footer';
import LeftColumn from './components/layout/LeftColumn';
import RightColumn from './components/layout/RightColumn';
import KeyboardShortcutsModal from './components/common/KeyboardShortcutsModal';
import ExpenseInsights from './components/expenses/ExpenseInsights';
import ExpenseGoals from './components/goals/ExpenseGoals';
import FinancialCalendar from './components/calendar/FinancialCalendar';
import useExpenseTrackerData from './hooks/useExpenseTrackerData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-violet-800">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 max-w-lg w-full mx-4">
            <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-red-200 mb-4">{this.state.error?.toString()}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { currentUser, logout } = useAuth();
  const {
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
    setLoading,
    searchQuery,
    handleSearch,
    handleFilter,
  } = useExpenseTrackerData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-white text-xl flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />; 
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} hideProgressBar={true} />
      
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute w-[40rem] h-[40rem] rounded-full bg-blue-900/20 blur-3xl -top-40 -left-40 animate-pulse-glow"></div>
        <div className="absolute w-[40rem] h-[40rem] rounded-full bg-indigo-900/20 blur-3xl -bottom-40 -right-40 animate-pulse-glow delay-1000"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-900/20 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow delay-2000"></div>
      </div>

      <Header currentUser={currentUser} totalBalance={totalBalance} onLogout={logout} expenses={expenses} />
      
      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <HeroSection />
          
          <FeaturesSection />

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <LeftColumn 
                onAddExpense={handleAddExpense}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategory}
                onAddRecurringExpense={handleAddRecurringExpense}
                categories={categories}
                loading={loading}
                recurringExpenses={recurringExpenses}
              />
              <div className="lg:col-span-2">
                <RightColumn 
                  filteredExpenses={filteredExpenses}
                  expenses={expenses}
                  categories={categories}
                  financialGoals={financialGoals}
                  loading={loading}
                  handleFilterExpenses={handleFilterExpenses}
                  handleRemoveExpense={handleRemoveExpense}
                  handleUpdateExpense={handleUpdateExpense}
                  handleViewExpenseDetails={handleViewExpenseDetails}
                  handleAddFinancialGoal={handleAddFinancialGoal}
                  handleUpdateFinancialGoal={handleUpdateFinancialGoal}
                  handleRemoveFinancialGoal={handleRemoveFinancialGoal}
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <FinancialCalendar
              expenses={expenses}
              recurringExpenses={recurringExpenses}
              financialGoals={financialGoals}
              onEventClick={handleViewExpenseDetails}
            />
          </div>
        </div>
      </main>

      {isModalOpen && selectedExpense && (
        <ExpenseDetailModal
          expense={selectedExpense}
          categories={categories}
          onSave={handleUpdateExpense}
          onDelete={handleRemoveExpense}
          onClose={handleCloseModal}
        />
      )}

      <KeyboardShortcutsModal
        showShortcuts={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
