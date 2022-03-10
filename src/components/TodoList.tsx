import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './TodoList.css';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
}: Props) => {
	return (
		<div className='container'>
			<Droppable droppableId='TodoActive'>
				{(provided, snapshot) => (
					<div
						className={`TodoList ${
							snapshot.isDraggingOver ? 'drag-active' : ''
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className='TodoList-heading'>Active Tasks</span>
						{todos.map((todo, index) => (
							<SingleTodo
								index={index}
								todo={todo}
								key={todo.id}
								todos={todos}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>

			<Droppable droppableId='TodoCompleted'>
				{(provided, snapshot) => (
					<div
						className={`TodoList remove ${
							snapshot.isDraggingOver ? 'drag-complete' : ''
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className='TodoList-heading'>Completed Tasks</span>
						{completedTodos.map((todo, index) => (
							<SingleTodo
								index={index}
								todo={todo}
								key={todo.id}
								todos={completedTodos}
								setTodos={setCompletedTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TodoList;
