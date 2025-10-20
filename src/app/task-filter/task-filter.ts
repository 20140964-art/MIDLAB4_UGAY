import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../service/task-service';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.html',
  styleUrls: ['./task-filter.css']
})
export class TaskFilterComponent {
  @Output() filterChange = new EventEmitter<'all' | 'pending' | 'completed'>();

  tasks: any[] = [];

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  setFilter(filter: 'all' | 'pending' | 'completed') {
    this.filterChange.emit(filter);
  }
}