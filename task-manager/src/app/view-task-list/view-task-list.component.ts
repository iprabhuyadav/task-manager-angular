import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task-list',
  templateUrl: './view-task-list.component.html',
  styleUrls: ['./view-task-list.component.css']
})
export class ViewTaskListComponent implements OnInit {

  taskMaster: any[] = [];

  sharedTaskMaster: any[] = [];


  showModal: String = 'none';
  showModalUpdate: String = 'none';
  taskId: any;

  collabratorEmail: any;

  emailAddress: any;


  currentPageNo: number = 1;
  totalRecords: any;
  pageSize: number = 10;

  taskForm = new FormGroup({
    activeFlag: new FormControl('Active'),
    taskName: new FormControl(''),
    dueDate: new FormControl(''),
    collaboratorEmail: new FormControl('')
  });

  updateTaskForm = new FormGroup({
    activeFlag: new FormControl('Active'),
    taskName: new FormControl(''),
    dueDate: new FormControl(''),
    collaboratorEmail: new FormControl('')
  });



  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) { }
  userId: any;
  userName: any;
  ngOnInit(): void {
    this.showModal = 'none';

    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    console.log(this.userId)

    this.getTaskListByUserId(this.userId);
    this.showtableTaskList=true;
  }

  createTask() {
    this.taskForm.get('taskName')?.patchValue('');
    this.taskForm.get('dueDate')?.patchValue('');
    this.taskForm.get('collaboratorEmail')?.patchValue('');
    this.showModal = 'block';
  }

  update(task: any) {
    this.taskId = task.taskId;
    this.showModalUpdate = 'block';

    this.updateTaskForm.patchValue({
      taskName: task.taskName,
      dueDate: task.dueDate,
      collaboratorEmail: task.collaboratorEmail,
    })
  }

  delete(task: any) {
    this.taskId = task.taskId;
  }

  closeModal() {
    this.showModal = 'none';
  }

  closeModalUpdate() {
    this.showModalUpdate = 'none';
  }

  saveTask() {

    if (this.taskForm.get('taskName')?.value == null || this.taskForm.get('taskName')?.value == "") {
      this.toastr.error('Please Enter Task Name');
      return;
    }

    if (this.taskForm.get('dueDate')?.value == null || this.taskForm.get('dueDate')?.value == "") {
      this.toastr.error('Please Select Due Date');
      return;
    }

    if (this.taskForm.get('dueDate')?.value == null || this.taskForm.get('dueDate')?.value == "") {
      this.toastr.error('Please Select Due Date');
      return;
    }

    if (this.taskForm.get('collaboratorEmail')?.value == null || this.taskForm.get('collaboratorEmail')?.value == "") {
    
    }

    else {
      this.emailAddress = this.taskForm.get('collaboratorEmail')?.value;
      let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
      if (!emailReg.test(this.emailAddress.trim())) {
        this.toastr.error('Please Enter Vaild Email Address');
        return;
      }
    }

    let postJson = {
      activeFlag: "Active",
      taskName: this.taskForm.get('taskName')?.value,
      dueDate: this.taskForm.get('dueDate')?.value,
      collaboratorEmail: this.taskForm.get('collaboratorEmail')?.value,
      userId: this.userId
    }

    this.userService.createTask(postJson).subscribe((res: any) => {
      console.log(res)

      if (res.status == "200") {
        this.toastr.success('Task Created Successfully.');
        this.closeModal();
        this.getTaskListByUserId(this.userId);
      }
    });
  }

  updateTask() {

    if (this.updateTaskForm.get('taskName')?.value == null || this.updateTaskForm.get('taskName')?.value == "") {
      this.toastr.error('Please Enter Task Name');
      return;
    }

    if (this.updateTaskForm.get('collaboratorEmail')?.value == null || this.updateTaskForm.get('collaboratorEmail')?.value == "") {
    
    }

    else {
      this.emailAddress = this.updateTaskForm.get('collaboratorEmail')?.value;
      let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
      if (!emailReg.test(this.emailAddress.trim())) {
        this.toastr.error('Please Enter Vaild Email Address');
        return;
      }
    }

    let postJson = {
      activeFlag: "Active",
      taskName: this.updateTaskForm.get('taskName')?.value,
      dueDate: this.updateTaskForm.get('dueDate')?.value,
      collaboratorEmail: this.updateTaskForm.get('collaboratorEmail')?.value,
      taskId: this.taskId
    }

    this.userService.updateTask(postJson, this.taskId).subscribe((res: any) => {
      console.log(res)

      if (res.status == "200") {
        this.toastr.success('Task Update Successfully.');
        this.closeModalUpdate();
        this.getTaskListByUserId(this.userId);
        this.getSharedTaskListByUserId(this.userId);
      }
    });
  }

  deleteTask(taskId: any) {
    this.userService.deleteTask(taskId).subscribe((res: any) => {
      console.log(res)

      if (res.status == "200") {
        this.toastr.error('Task Deleted Successfully.');
        this.getTaskListByUserId(this.userId);
        this.getSharedTaskListByUserId(this.userId);
      }
    });
  }

  getTaskList() {
    this.userService.getTaskList().subscribe((res: any) => {
      this.taskMaster = res.data
      console.log(this.taskMaster)
    });
  }

  getTaskListByUserId(userId: any) {
    this.userService.getTaskListByUserId(userId).subscribe((res: any) => {
      this.taskMaster = res.data
      console.log(this.taskMaster)
    });
  }

  getSharedTaskListByUserId(userId: any) {
    this.userService.getSharedTaskListByUserId(userId).subscribe((res: any) => {
      this.sharedTaskMaster = res.data
      console.log(this.sharedTaskMaster)
    });
  }

  pageChange(event: any) {
    this.currentPageNo = event;
    this.getTaskList();
  }

  logout() {
    this.router.navigate(['/user-login']);
  }

  showtableTaskList:boolean=false;
  showtableSharedTaskList:boolean=false;


  viewTable(value:any){
    if(value==1)
    {this.showtableTaskList=true;
      this.showtableSharedTaskList=false;
  }
  if(value==2)
    {this.showtableTaskList=false;
      this.showtableSharedTaskList=true;
      this.getSharedTaskListByUserId(this.userId);

  }
  }
  

}
