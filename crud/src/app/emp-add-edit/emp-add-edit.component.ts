import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  educationOptions: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  submitted = false;
  errField = [
    { key: 'firstName', name: 'First Name' },
  ];


  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.fb.group({
      firstName:['', Validators.required],     
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['',Validators.required],
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
    return this.fb.group({
      education: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      cgp: [{ value: '', disabled: true }, Validators.required],
      year: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);

  }

  addEducation() {
    const educations = this.empForm.get('educations') as FormArray;
    educations.push(this.createEducationGroup());
  }
  // addEducation() {
  //   const educationArray = this.empForm.get('educations') as FormArray;
  //   const newEducationGroup = this.fb.group({
  //     education: ['', Validators.required],
  //     cgp: [{ value: '', disabled: true }, Validators.required],
  //     year: ['', Validators.required],
  //     score: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
  //   });
  
  //   educationArray.push(newEducationGroup);
  // }

  removeEducation(index: number) {
    const educations = this.empForm.get('educations') as FormArray;
    educations.removeAt(index);
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.empForm.valid) {
      const data = this.empForm.getRawValue();
      console.log('Form Values:', this.empForm.value);
      if (this.data) {
  
        const id = this.data.id;
  
        this.empService.updateEmployee(id, data).subscribe({
          next: (val: any) => {
            console.log('value of updateEmp', val);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.empService.addEmployee(data).subscribe({
          next: (val: any) => {
            console.log('value of addEmp', val);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        }); 
      }
    }

  }



  
  changeCgp(event: any, index: number) {
    console.log('event',event);
    const educationArray = this.empForm.get('educations') as FormArray;
    const educationGroup = educationArray.at(index) as FormGroup;
    const scoreControl = educationGroup.get('score');
    const cgpControl = educationGroup.get('cgp');
  
    if (scoreControl!.valid) {
      const scoreValue = parseFloat(scoreControl!.value);
      const cgpValue = (scoreValue / 500) * 4.0;
      cgpControl!.setValue(cgpValue.toFixed(1) + ' %');
    }
  }

  // findInvalidControls() {
  //   const invalid = [];
  //   const controls = this.empForm.controls;
  //   for (const name in controls) {
  //     if (controls[name].invalid) {
  //       invalid.push(name);
  //     }
  //   }
  //   return invalid;
  // }
  
  

}



