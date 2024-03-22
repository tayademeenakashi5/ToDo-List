import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive-task.component.html',
  styleUrls: ['./archive-task.component.css']
})
export class ArchiveTaskComponent implements OnInit {
  archivedTaskList: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getArchivedTasks();
  }

  getArchivedTasks() {
    this.authService.getAllUserTasks(true).subscribe(
      (response: any[]) => {
        console.log('All Archived Tasks:', response);
        // Filter out tasks that are completed or archived
        this.archivedTaskList = response.filter(task => task.taskStatus === 'Completed' || task.archivedTasks);
      },
      (error: any) => {
        console.error('Error retrieving archived tasks:', error);
      }
    );
  }

 
}
