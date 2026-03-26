import './index.css';
import { TodoInput, TodoList } from './components';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">SLDOW TODO</h1>
        <TodoInput />
        <div className="render-container">
          <TodoList title="할 일" isDone={false} />
          <TodoList title="완료" isDone={true} />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
