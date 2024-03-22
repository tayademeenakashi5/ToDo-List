import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.css']
})
export class TodoListFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskCredentials: any[] = [];
  isFormVisible: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  tasks: any[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.taskForm = this.formBuilder.group({
      taskName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      dueDate: ['', [Validators.required, this.futureDateValidator()]],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
      archivedTasks: [false],
    });
  }

  futureDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const isValid = selectedDate >= currentDate;

      return isValid ? null : { futureDateOnly: true };
    };
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskCredentials = this.taskForm.value;

      this.authService.taskAddDetails(this.taskCredentials)
        .subscribe(
          response => {
            console.log('Task added successfully:', response);
            this.getAllTasks();
            this.successMessage = 'Successfully Task Added!';
            this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/todo-list']);
            });
          },
          error => {
            console.error('Error adding task:', error);
            this.errorMessage = 'Task not added';
          }
        );

      this.taskForm.reset();
    } else {
      // Handle form validation error
    }
  }

  toggleAddNoteDisplay() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.taskForm.reset();
    }
  }

  getAllTasks() {
    this.authService.getAllUserTasks().subscribe(
      (response: any) => {
        this.tasks = response;
        console.log('Tasks:', this.tasks);
      },
      (error: any) => {
        console.error('Error retrieving tasks:', error);
      }
    );
  }
}
