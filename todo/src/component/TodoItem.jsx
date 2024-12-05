// TodoItem.jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from "../css/TodoItem.module.css";

const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDeadline, setEditDeadline] = useState(todo.deadline);

  // 할 일 수정 함수
    const handleEdit = () => {
        if (isEditing && editText.trim()) {
            updateTodo(todo.id, editText, editDeadline);
        }
        setIsEditing(!isEditing);
    };
  // Enter 키 입력 감지
    const handleKeyDown = (e) => {
        if (e.keyCode === 229) return;
        if (e.key === 'Enter') handleEdit();
    };

    return (
        <li className={style.li}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
        />

        {isEditing ? (
            <div>
            <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
            />
            </div>
        ) : (
            <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span>{todo.text}</span>
            <span>{todo.time}</span>
            <span>마감일: {todo.deadline}</span>
            </div>
        )}

        <button onClick={handleEdit}>
            {isEditing ? '수정 완료' : '수정'}
        </button>

        <button onClick={() => deleteTodo(todo.id)}>
            삭제
        </button>
        </li>
    );
};

export default TodoItem;
