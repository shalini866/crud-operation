import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empform: FormGroup<any> | any;

 

  constructor(
    private dialog: MatDialog ,
    private empService : EmployeeService
    ){

  }
  ngOnInit(): void {
    this.getEmployeeList()
  }


  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe((val)=>{
    console.log('value of openaddedit',val);
    if(val){
     this.getEmployeeList();
    }
    });
  }



  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
        console.log('getEmpreslist',res);
        
      },
      error: (err) => {
        console.error(err); 
      }
    });
  }
  

  deleteEmployee(id:number){
   this.empService.deleteEmployee(id).subscribe({
    next : (res) =>{
      console.log('emp delet');
      this.getEmployeeList()
    },
    error: console.log,
   })
  }

  openEditForm(data: any) {
    console.log('openeditform',data);
    
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => { 
        console.log();
        
        if (val) {
          this.getEmployeeList();

        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
