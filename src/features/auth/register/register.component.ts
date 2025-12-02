import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  forms = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  loading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async register() {
    if (!this.forms.valid) {
      this.toastr.error('Заповніть форму правильно');
      return;
    }

    this.loading = true;
    try {
      const email = this.forms.value.email!;
      const password = this.forms.value.password!;
      await this.authService.register(email, password);
      this.toastr.success('Реєстрація успішна!');
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.toastr.error(err.message || 'Помилка реєстрації');
    } finally {
      this.loading = false;
    }
  }
}
