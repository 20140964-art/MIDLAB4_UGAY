import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  currentFilter: 'all' | 'completed' | 'pending' = 'all';

  getTasks(): Task[] {
    if (this.currentFilter === 'all') {
      return this.tasks;
    } else if (this.currentFilter === 'pending') {
      return this.tasks.filter(t => !t.isCompleted);
    } else {
      return this.tasks.filter(t => t.isCompleted);
    }
  }

  addTask(description: string): void {
    const newTask: Task = {
      id: this.nextId++,
      description,
      isCompleted: false,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  editTask(id: number, newDescription: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.description = newDescription;
    }
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.currentFilter = filter;
  }

  getFilteredTasks(): Task[] {
    if (this.currentFilter === 'all') {
      return this.tasks;
    } else if (this.currentFilter === 'completed') {
      return this.tasks.filter(t => t.isCompleted);
    } else {
      return this.tasks.filter(t => !t.isCompleted);
    }
  }

  getCurrentFilter(): 'all' | 'completed' | 'pending' {
    return this.currentFilter;
  }

  totalCount(): number {
    return this.tasks.length;
  }

  completedCount(): number {
    return this.tasks.filter(task => task.isCompleted).length;
  }

  pendingCount(): number {
    return this.tasks.filter(task => !task.isCompleted).length;
  }
}