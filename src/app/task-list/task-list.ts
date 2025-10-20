import { Component } from '@angular/core';
import { Task, TaskService } from '../service/task-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFilterComponent } from '../task-filter/task-filter';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, TaskFilterComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent {
  activeEditTaskId: number | null = null;
  activeEditTaskDescription: string = '';
  newTaskDescription: string = '';

  selectedFilterStatus: 'all' | 'pending' | 'completed' = 'all';
  isFilterApplied = false;

  constructor(private taskManagerService: TaskService) {}

  get allTasks(): Task[] {
    return this.taskManagerService.getTasks();
  }

  get totalTaskCount(): number {
    return this.taskManagerService['tasks'].length;
  }

  get completedTaskCount(): number {
    return this.taskManagerService['tasks'].filter(task => task.isCompleted).length;
  }

  get pendingTaskCount(): number {
    return this.taskManagerService['tasks'].filter(task => !task.isCompleted).length;
  }

  addNewTask() {
    if (this.newTaskDescription.trim()) {
      this.taskManagerService.addTask(this.newTaskDescription.trim());
      this.newTaskDescription = '';
    }
  }

  removeTaskById(taskId: number) {
    this.taskManagerService.deleteTask(taskId);
  }

  toggleTaskCompletion(taskId: number) {
    this.taskManagerService.toggleTaskCompletion(taskId);
  }

  applyFilter(filterStatus: 'all' | 'pending' | 'completed') {
    this.selectedFilterStatus = filterStatus;
    this.taskManagerService.setFilter(filterStatus);
    this.isFilterApplied = true;
  }

  startTaskEditing(task: Task) {
    this.activeEditTaskId = task.id;
    this.activeEditTaskDescription = task.description;
  }

  confirmTaskEditing(task: Task) {
    if (this.activeEditTaskId !== null) {
      this.taskManagerService.editTask(task.id, this.activeEditTaskDescription.trim());
      this.activeEditTaskId = null;
      this.activeEditTaskDescription = '';
    }
  }

  handleKeyDown(event: KeyboardEvent, task: Task) {
    if (event.key === 'Enter') {
      this.confirmTaskEditing(task);
    }
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
  }

  get visibleTasks(): Task[] {
    return this.taskManagerService.getFilteredTasks();
  }

  get currentFilterStatus(): 'all' | 'completed' | 'pending' {
    return this.taskManagerService.getCurrentFilter();
  }
}