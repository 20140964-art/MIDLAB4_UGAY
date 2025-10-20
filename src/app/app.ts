import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './service/task-service';
import { TaskListComponent } from './task-list/task-list';
import { TaskFilterComponent } from './task-filter/task-filter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, TaskFilterComponent],
  providers: [TaskService],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('MIDLAB4_UGAY');
}