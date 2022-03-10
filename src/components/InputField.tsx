import React, { useRef } from 'react';
import './InputField.css';

interface props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className='InputField'
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}
		>
			<input
				type='text'
				placeholder='Enter a Task'
				value={todo}
				ref={inputRef}
				onChange={(e) => setTodo(e.target.value)}
				className='input-box'
			/>
			<button type='submit' className='input-submit'>
				GO
			</button>
		</form>
	);
};

export default InputField;
