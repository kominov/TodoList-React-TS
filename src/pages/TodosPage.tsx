import React, { useState, useEffect } from 'react'
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { ITodo } from '../interfaces';


export const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
        setTodos(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addHandler = (title: string) => {
        const newTodo = {
            title: title,
            id: Date.now(),
            completed: false
        }
        setTodos(prev => [newTodo, ...todos])
    }

    const ToggleHandler = (id: number) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        }))
    }
    const RemoveHandler = (id: number) => {
        const deletHandler = window.confirm('Удалить элемент?');
        if (deletHandler) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
    }

    return <React.Fragment>
        <TodoForm onAdd={addHandler} />
        <TodoList todos={todos} onRemove={RemoveHandler} onToggle={ToggleHandler} />
    </React.Fragment>
}