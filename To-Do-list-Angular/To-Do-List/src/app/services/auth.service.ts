import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="http://localhost:9000"

  private authenticated = false;
  private tokenKey = 'authToken';
  restoreTask: any;
 
 

  constructor(private http:HttpClient, private router: Router) { }
   
  //login
  generateToken(credentials:any): Observable<any> {//token generate
    console.log("from service user",credentials);
    return this.http.post(`http://localhost:9000/api/v1/login`,credentials)   
  }

  //register 
  useUrl:string="http://localhost:9000/api/v2/register";
  postUserDetails(body:any):Observable<any>{
    console.log("from service user",body);
    return this.http.post<any>(this.useUrl,body)
  }

  //addtaskform  
  taskUrl:string = "http://localhost:9000/api/v2/user/task";
    taskAddDetails(taskDetails: any): Observable<any> {
    console.log("from service to list", taskDetails);
    return this.http.post<any>(this.taskUrl, taskDetails);
  }

  
  //allTask 
  getAllUserTasks(archived: boolean = false): Observable<any[]> {
    const tasksUrl = "http://localhost:9000/api/v2/user/tasks";
    const token = this.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    //return this.http.get(tasksUrl, httpOptions);
    return this.http.get<any[]>(tasksUrl, httpOptions);
  }


  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey) || null;
  }


  //delete
  deleteTask(taskId: string): Observable<any> {
    const deleteTaskUrl = `http://localhost:9000/api/v2/user/task/${taskId}`;
    return this.http.delete(deleteTaskUrl);
  }
  

  //edite
  updateTask(task: any): Observable<any> {
    const updateTaskUrl = `http://localhost:9000/api/v2/user/task`;
    return this.http.put(updateTaskUrl, task);
  }

  //complete
  markTaskAsCompleted(taskId: string): Observable<any> {
   /* const completeTaskUrl = `${this.url}/api/v2/user/task/complete/${taskId}`;*/
    const completeTaskUrl = `http://localhost:9000/api/v2/user/task/complete/${taskId}`;
    const token = this.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put(completeTaskUrl, null, httpOptions);
  }

  //archiveTask
  archiveTask(taskId: string): Observable<any> {
  
    const archiveTaskUrl = `http://localhost:9000/api/v2/user/task/archive/${taskId}`;
    const token = this.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put(archiveTaskUrl, null, httpOptions);
  }

  


    
 
  isLoggedIn(): boolean {
    return this.authenticated;
  }

  setAuthenticated(status: boolean, token?: string): void {
    this.authenticated = status;
    if (status) {
      localStorage.setItem(this.tokenKey, token || '');
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }
 

  logout(): void {
    this.authenticated = false;
    this.router.navigate(['/']);//back to home 
  }

}

/*function switchMap(arg0: () => Observable<Object>): import("rxjs").OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}*/
