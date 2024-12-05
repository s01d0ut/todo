// TodoInput.jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoInput.module.css";

const TodoInput = ({ addTodo }) => {
    const [input, setInput] = useState('');
    const [deadline, setDeadline] = useState('');

  // 할 일 추가 함수
    const handleAdd = () => {
        if (input.trim() && deadline) {
            addTodo(input, deadline);
            setInput('');
            setDeadline('');
        }
    };
  // Enter 키 입력 감지
    const handleKeyDown = (e) => {
        if (e.keyCode === 229) return;
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div className={style.container}>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="오늘 해야하는 일을 등록해 주세요🙌"
            className={style.todoInput}
        />
        <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={style.deadlineInput}
            placeholder="마감일을 선택하세요"
        />
        <button onClick={handleAdd}> 할 일 등록 </button>
        </div>
    );
};

export default TodoInput;

