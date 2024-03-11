import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-task-list',
  templateUrl: './view-task-list.component.html',
  styleUrls: ['./view-task-list.component.css']
})
export class ViewTaskListComponent implements OnInit {

  taskMaster: any[]=[];

  showModal: String = 'none';
  showModalUpdate: String = 'none';
  taskId: any;


  currentPageNo: number = 1;
  totalRecords: any;
  pageSize: number = 10;

  taskForm = new FormGroup({
    activeFlag: new FormControl('Active'),
    taskName: new FormControl(''),
    dueDate:new FormControl(''),
});

updateTaskForm = new FormGroup({
  activeFlag: new FormControl('Active'),
  taskName: new FormControl(''),
  dueDate:new FormControl(''),
});



  constructor(private toastr: ToastrService, private userService: UserService) {}

  ngOnInit(): void {
    this.showModal = 'none';
    this.getTaskList()
  }

  createTask()
  {
    this.taskForm.get('taskName')?.patchValue('');
    this.taskForm.get('dueDate')?.patchValue('');
    this.showModal = 'block';
  }

  update(task:any)
  {
    this.taskId = task.taskId;
    this.showModalUpdate = 'block';
  }

  delete(task:any)
  {
    this.taskId = task.taskId;
  }

  closeModal()
  {
    this.showModal='none';
  }

  closeModalUpdate()
  {
    this.showModalUpdate='none';
  }

  saveTask()
  {

    if(this.taskForm.get('taskName')?.value == null || this.taskForm.get('taskName')?.value == "")
    {
      this.toastr.error('Please Enter Task Name');
      return;
    }

    if(this.taskForm.get('dueDate')?.value == null || this.taskForm.get('dueDate')?.value == "")
    {
      this.toastr.error('Please Select Due Date');
      return;
    }
   
    let postJson = {
      activeFlag: "Active",
      taskName: this.taskForm.get('taskName')?.value,
      dueDate: this.taskForm.get('dueDate')?.value,
    }
    
        this.userService.createTask(postJson).subscribe((res:any)=>{
          console.log(res)
    
          if(res.status=="200")
          {
            this.toastr.success('Task Created Successfully.');
            this.closeModal();
            this.getTaskList();
          }
        });
  }

  updateTask()
  {

    if(this.updateTaskForm.get('taskName')?.value == null || this.updateTaskForm.get('taskName')?.value == "")
    {
      this.toastr.error('Please Enter Task Name');
      return;
    }

    let postJson = {
      activeFlag: "Active",
      taskName: this.updateTaskForm.get('taskName')?.value,
      dueDate: this.updateTaskForm.get('dueDate')?.value,
      taskId: this.taskId
    }
    
        this.userService.updateTask(postJson, this.taskId).subscribe((res:any)=>{
          console.log(res)
    
          if(res.status=="200")
          {
            this.toastr.success('Task Update Successfully.');
            this.closeModalUpdate();
            this.getTaskList();
          }
        });
  }

  deleteTask(taskId:any)
  {
          this.userService.deleteTask(taskId).subscribe((res:any)=>{
          console.log(res)
    
          if(res.status=="200")
          {
            this.toastr.error('Task Deleted Successfully.');
            this.getTaskList();
          }
        });
  }

  getTaskList()
  {
    this.userService.getTaskList().subscribe((res: any) => {
      this.taskMaster = res.data
      console.log(this.taskMaster)
  });
  }

  pageChange(event: any) {
    this.currentPageNo = event;
     this.getTaskList();
  }

}
