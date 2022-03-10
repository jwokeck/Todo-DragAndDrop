import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './SingleTodo.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
	index: number;
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
		);
		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided, snapshot) => (
				<form
					className={`SingleTodo ${snapshot.isDragging ? 'dragging' : ''}`}
					onSubmit={(e) => handleEdit(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{edit ? (
						<input
							value={editTodo}
							ref={inputRef}
							onChange={(e) => setEditTodo(e.target.value)}
							className='SingleTodo-text'
						/>
					) : todo.isDone ? (
						<s className='SingleTodo-text'>{todo.todo}</s>
					) : (
						<span className='SingleTodo-text'>{todo.todo}</span>
					)}

					<div>
						<span
							className='icon'
							title='Edit'
							onClick={() => {
								if (!edit && !todo.isDone) {
									setEdit(!edit);
								}
							}}
						>
							<EditIcon />
						</span>
						<span
							className='icon'
							title='Delete'
							onClick={() => handleDelete(todo.id)}
						>
							<DeleteIcon />
						</span>
						<span
							className='icon'
							title='Done'
							onClick={() => handleDone(todo.id)}
						>
							<CheckCircleIcon />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleTodo;
