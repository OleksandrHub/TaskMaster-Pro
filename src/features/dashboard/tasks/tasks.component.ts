import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Task } from '../../../core/models/task.models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks.component',
  imports: [FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  tasks: Task[] = [];
  showModal = false;
  isEdit = false;
  currentTaskId: string | null = null;

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl<'todo' | 'in-progress' | 'done'>(
      'todo',
      Validators.required
    ),
  });

  private taskService = inject(TaskService);
  protected authService = inject(AuthService);
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // console.log('Отримано завдання:', tasks);
        this.tasks = tasks;
      },
      error: (err) => console.error('Помилка завантаження:', err),
    });
  }

  openCreateModal() {
    this.isEdit = false;
    this.taskForm.reset({ status: 'todo' });
    this.showModal = true;
  }

  openEditModal(task: Task) {
    this.isEdit = true;
    this.currentTaskId = task.id!;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentTaskId = null;
  }

  async saveTask() {
    if (this.taskForm.invalid) return;

    const taskData = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description || '',
      status: this.taskForm.value.status!,
    };

    try {
      if (this.isEdit && this.currentTaskId) {
        await this.taskService.updateTask(this.currentTaskId!, taskData);
        this.toastr.success('Завдання оновлено');
      } else {
        await this.taskService.addTask(taskData);
        this.toastr.success('Завдання створено');
      }
      this.closeModal();
    } catch {
      this.toastr.error('Помилка');
    }
  }

  async deleteTask(id: string) {
    if (!confirm('Видалити завдання?')) return;
    try {
      await this.taskService.deleteTask(id);
      this.toastr.success('Завдання видалено');
    } catch {
      this.toastr.error('Помилка видалення');
    }
  }
  logout() {
    this.authService.logout();
  }
}
