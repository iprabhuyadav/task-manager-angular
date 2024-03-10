import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-task-list',
  templateUrl: './view-task-list.component.html',
  styleUrls: ['./view-task-list.component.css']
})
export class ViewTaskListComponent implements OnInit {

  taskMaster: any[]=[];

  showModal: String = 'none';

  taskForm = new FormGroup({
    activeFlag: new FormControl('Active'),
    taskName: new FormControl(''),
    dueDate:new FormControl(''),
});

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getTaskList()
  }

  createTask()
  {
    this.showModal = 'block';
  }

  closeModal()
  {
    this.showModal='none';
  }

  submit()
  {
   
    let postJson = {
      activeFlag: "Active",
      taskName: this.taskForm.get('taskName')?.value,
      dueDate: this.taskForm.get('dueDate')?.value,
    }
    
        this.userService.createTask(postJson).subscribe((res:any)=>{
          console.log(res)
    
          if(res.statusCode=="200")
          {
            this.closeModal();
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

}
