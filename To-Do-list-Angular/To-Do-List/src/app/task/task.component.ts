import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: any;
  taskList: any[] = [];
  updateMode = false;
  updatedTask: any = {
    taskId: '',
    taskName: '',
    description: '',
    dueDate: '',
    taskPriority: '',
    taskStatus: '',
    archivedTasks: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(archived: boolean = false) {//archived: boolean = false
    this.authService.getAllUserTasks().subscribe(
      (response: any[]) => {
        console.log('Tasks:', response);
        this.taskList = response;
         // Filter out completed tasks
        this.taskList = response.filter(task => task.taskStatus !== 'Completed');
      },
      (error: any) => {
        console.error('Error retrieving tasks:', error);
      }
    );
  }
 

 /* deleteTask(taskId: string) {
    if (!this.taskList || !Array.isArray(this.taskList)) {
      console.error('Invalid task list:', this.taskList);
      return;
    }

    const taskIndex = this.taskList.findIndex((task: any) => task.taskId === taskId);

    if (taskIndex !== -1) {
      this.authService.deleteTask(taskId).subscribe(
        (response: any) => {
          console.log('Task deleted successfully:', response);
          this.taskList.splice(taskIndex, 1);
        },
        (error: any) => {
          console.error('Error deleting task:', error);
        }
      );
    } else {
      console.error('Task not found:', taskId);
    }
  }*/


  deleteTask(taskId: string) {
    if (!this.taskList || !Array.isArray(this.taskList)) {
      console.error('Invalid task list:', this.taskList);
      return;
    }
  
    const taskIndex = this.taskList.findIndex((task: any) => task.taskId === taskId);
  
    if (taskIndex !== -1) {
      const isConfirmed = confirm('Are you sure you want to delete this task?');
      if (isConfirmed) {
        this.authService.deleteTask(taskId).subscribe(
          (response: any) => {
            console.log('Task deleted successfully:', response);
            this.taskList.splice(taskIndex, 1);
          },
          (error: any) => {
            console.error('Error deleting task:', error);
          }
        );
      }
    } else {
      console.error('Task not found:', taskId);
    }
  }

  startUpdate(task: any) {
    this.updateMode = true;
    this.updatedTask = { ...task };
  }

  cancelEdit() {
    this.updateMode = false;
    // Reset the updatedTask object
    this.updatedTask = {
      taskId: '',
      taskName: '',
      description: '',
      dueDate: '',
      taskPriority: '',
      taskStatus: '',
      archivedTasks: ''
      
    };
  }

  saveEdit() {
    this.authService.updateTask(this.updatedTask).subscribe(
      (response: any) => {
        console.log('Task updated successfully:', response);
        const taskIndex = this.taskList.findIndex((task: any) => task.taskId === this.updatedTask.taskId);

        if (taskIndex !== -1) {
          this.taskList[taskIndex] = { ...this.updatedTask };
        }

        this.cancelEdit();
      },
      (error: any) => {
        console.error('Error updating task:', error);
      }
    );
  }


  /*
  markTaskAsCompleted(taskId: string) {
    this.authService.markTaskAsCompleted(taskId).subscribe(
      (response: any) => {
        console.log('Task marked as completed successfully:', response);
        
        
      },
      (error: any) => {
        console.error('Error marking task as completed:', error);
      }
    );
  }*/

  markTaskAsCompleted(taskId: string) {
    this.authService.markTaskAsCompleted(taskId).subscribe(
      (response: any) => {
        console.log('Task marked as completed successfully:', response);
        const completedTaskIndex = this.taskList.findIndex(task => task.taskId === taskId);
        if (completedTaskIndex !== -1) {
          this.taskList[completedTaskIndex].taskStatus = 'completed';
        }
      },
      (error: any) => {
        console.error('Error marking task as completed:', error);
      }
    );
  }

  archiveTask(taskId: string) {
    this.authService.archiveTask(taskId).subscribe(
      (response: any) => {
        console.log('Task archived successfully:', response);
        // Refresh needed
        //this.getAllTasks();
        this.router.navigate(['/archive-task']);
      },
      (error: any) => {
        console.error('Error archiving task:', error);
      }
    );
  }

  restoreTask(taskId: string) {
    this.authService.restoreTask(taskId).subscribe(
      (restoredTask: any) => {
        console.log('Task restored successfully:', restoredTask);
        // Add the restored task to the task list
        this.taskList.push(restoredTask);
       
      },
      (error: any) => {
        console.error('Error restoring task:', error);
      }
    );
  }
  
  private updateLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(this.taskList)); // Save taskList to local storage
  }


  hasUnsavedChanges(): boolean {
    // If updateMode is true, there are unsaved changes
    return this.updateMode;
  }

  
}