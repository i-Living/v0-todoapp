"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function AppPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodoText.trim(), completed: false },
      ]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Todo List</h2>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          aria-label="New todo"
        />
        <Button type="submit">Add</Button>
      </form>

      {todos.length === 0 ? (
        <p className="text-muted-foreground">
          Your todo list is empty. Add some todos to get started!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 bg-muted p-2 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="form-checkbox h-5 w-5 text-primary"
              />
              <span
                className={`flex-grow ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete todo: ${todo.text}`}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
