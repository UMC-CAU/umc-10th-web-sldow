import './index.css';
import { TodoInput, TodoList, ThemeToggle } from './components';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function MainLayout() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-[#eef2f3] dark:bg-gray-900 min-h-screen flex justify-center items-center transition-colors duration-300 relative">
        <div className="bg-white p-5 rounded-xl shadow-md w-[350px] text-center dark:bg-gray-800 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300 m-0">SLDOW TODO</h1>
            <ThemeToggle />
          </div>
          <TodoInput />
          <div className="flex justify-between gap-5">
            <TodoList title="할 일" isDone={false} />
            <TodoList title="완료" isDone={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <MainLayout />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
