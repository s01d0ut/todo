import { useReducer, useEffect, useCallback } from 'react';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import styles from "./css/App.module.css";

/**
 * useReducer()에서 쓸 함수 정의
 * 파라미터로 상태와 액션을 받아서 '새로운 상태'를 반환하는 함수임
 * @param {*} state 현재의 상태, 리듀서 함수는 상태를 변경하지 않고 새로운 상태를 반환함.
 */
const todoReducer = (state, action) => {
  const dayOption = {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
    weekday: "long",
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        time: new Date().toLocaleString('ko-KR', dayOption),
        text: action.payload.text,
        completed: false,
        deadline: action.payload.deadline // 마감일 추가
      }];
    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, deadline: action.payload.deadline, time: new Date().toLocaleString('ko-KR', dayOption) }
          : todo
      );
    case 'TOGGLE_COMPLETE':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // CRUD 함수 모음 (dispatch로 정의)
  const addTodo = useCallback((text, deadline) => dispatch({ type: 'ADD_TODO', payload: { text, deadline } }), []);
  const updateTodo = useCallback((id, text, deadline) => dispatch({ type: 'UPDATE_TODO', payload: { id, text, deadline } }), []);
  const toggleComplete = useCallback((id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id }), []);
  const deleteTodo = useCallback((id) => dispatch({ type: 'DELETE_TODO', payload: id }), []);

  return (
    <div className={styles.app}>
      <h1>할 일 마감일 기능 추가된<br />React To-Do List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
