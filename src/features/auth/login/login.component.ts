import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected forms = new FormGroup({
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

  async login() {
    this.loading = true;
    try {
      if (this.forms.valid) {
        const email = this.forms.get('email')!.value as string;
        const password = this.forms.get('password')!.value as string;
        await this.authService.login(email, password);
        this.toastr.success('Успішний вхід!');
        this.router.navigate(['/tasks']);
        return;
      }
      this.toastr.error('Будь ласка, заповніть всі поля правильно.');
    } catch (err: any) {
      this.toastr.error(err.message || 'Помилка входу');
    } finally {
      this.loading = false;
    }
  }
}
