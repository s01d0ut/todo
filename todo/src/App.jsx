import { useState, useEffect } from 'react';
import TodoInput from './component/todoinput';
import TodoList from './component/todolist';

function App() {
  // todos 상태 정의
  const [todos, setTodos] = useState(() => {
    // 초기 상태 설정 시 로컬 스토리지에서 불러오기
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // todos가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   * C 생성하기 - todo 등록
   * @param {*} text todo의 내용
   */
  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
