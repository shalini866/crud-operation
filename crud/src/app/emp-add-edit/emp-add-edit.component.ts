import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.fb.group({
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]], 
      dob: ['',], 
      gender: ['', Validators.required], 
      company: ['', Validators.required], 
      experience: ['', [Validators.required, Validators.min(0)]], 
      package: ['', [Validators.required, Validators.min(0)]], 
      educations: this.fb.array([
        this.createEducationGroup()
      ])
    });
  }

  get f() {
    return (this.empForm.controls);
  }

  get educationGroups(): FormArray {
    return this.empForm.get('educations') as FormArray;
  }
  createEducationGroup() {
    const educationGroup = this.fb.group({
      education: [''],
      cgp: [{ value: null, disabled: true }],
      score: [null], 
      year: ['']
    });
  
    // const scoreControl = educationGroup.get('score');
    // const cgpControl = educationGroup.get('cgp');
  
    // scoreControl.valueChanges.subscribe((score) => {
    //   const cgp = this.calculateCGP(score);
    //   cgpControl.setValue(cgp);
    // });
  
    // return educationGroup;
  }
  
  
  
  
  
  ngOnInit(): void {
     this.empForm.patchValue(this.data);
  }

 
  addEducation() {
    this.educationGroups.push(this.createEducationGroup());
  }

  removeEducation(index: number) {
    this.educationGroups.removeAt(index);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data.id, this.empForm.value).subscribe({
            next: (val: any) => {
              console.log('value',val);
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }


  // calculateCGP(score: number): number | null {
  //   if (!isNaN(score)) {
  //     if (score >= 90) {
  //       return 4.0;
  //     } else if (score >= 80) {
  //       return 3.7;
  //     } else if (score >= 75) {
  //       return 3.3;
  //     } else if (score >= 70) {
  //       return 3.0;
  //     } else if (score >= 65) {
  //       return 2.7;
  //     } else if (score >= 60) {
  //       return 2.3;
  //     } else if (score >= 55) {
  //       return 2.0;
  //     } else if (score >= 50) {
  //       return 1.7;
  //     } else if (score >= 45) {
  //       return 1.3;
  //     } else if (score >= 40) {
  //       return 1.0;
  //     } else {
  //       return null; // Handle non-numeric input or empty input
  //     }
  //   } else {
  //     return null; // Handle non-numeric input or empty input
  //   }
  // }
  
  

}



