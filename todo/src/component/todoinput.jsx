/* eslint-disable react/prop-types */
import { useState } from 'react';

const TodoInput = ({ addTodo }) => {
    const [input, setInput] = useState('');

    // 할 일 추가 함수
    const handleAdd = () => {
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    };

    // Enter 키 입력 감지
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="오늘 해야하는 일을 등록해 주세요🙌"
        />
        <button onClick={handleAdd}>할 일 등록</button>
        </div>
    );
};

export default TodoInput;
