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

  empForm!: FormGroup;

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
  dynamicEducations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    // this.dynamicEducations.forEach((educationItem: any) => {
    //   this.addEducation(educationItem);
    // });


  }


  get f() {
    return (this.empForm.controls);
  }

  get educationGroups(): FormArray {
    return this.empForm.get('educations') as FormArray;
  }

  addDynamicEducation(educationItem: any) {
    this.dynamicEducations.push(educationItem);
  }


  ngOnInit(): void {
    if (this.data) {
      this.empForm = this.fb.group({
        firstName: [this.data.firstName, Validators.required],
        lastName: [this.data.lastName, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        dob: [this.data.dob, Validators.required],
        gender: [this.data.gender, Validators.required],
        company: [this.data.company, Validators.required],
        experience: [this.data.experience, [Validators.required, Validators.min(0)]],
        package: [this.data.package, [Validators.required, Validators.min(0)]],
        educations: this.fb.array([])
      });
      if (this.data?.educations) {
        this.data.educations.forEach((educationItem: any) => {
          this.educationGroups.push(this.addEducation(educationItem));
        });
      }
    } else {
      this.empForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        company: ['', Validators.required],
        experience: ['', [Validators.required, Validators.min(0)]],
        package: ['', [Validators.required, Validators.min(0)]],
        educations: this.fb.array([this.addEducation()])
      });
    }
  }
  addEducation(educationItem?: any) {
    return this.fb.group({
      education: [educationItem ? educationItem.education : '', Validators.required],
      score: [educationItem ? educationItem.score : '', [Validators.required, Validators.min(1), Validators.max(500)]],
      cgp: [educationItem ? educationItem.cgp : '', Validators.required],
      year: [educationItem ? educationItem.year : '', [Validators.required, Validators.min(0), Validators.max(2023)]]
    });
  }

  newAddEducation() {
    this.educationGroups.push(this.addEducation());
  }

  removeEducation(index: number) {
    (this.empForm.get('educations') as FormArray).removeAt(index);
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
    console.log('event', event);
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

  onlyNumberKey(event: any): boolean {
    const ASCIICode = event.which ? event.which : event.keyCode;
    if (ASCIICode < 48 || ASCIICode > 57) {
      return false;
    }
    return true;
  }
  

  // onFormSubmit(event: Event) {
  //   event.preventDefault();
  //   if (this.empForm.valid) {
  //     const data = this.empForm.getRawValue();

  //     // Gather dynamically added education items
  //     const dynamicEducations = this.dynamicEducations.map((educationItem: any) => ({
  //       education: educationItem.get('education').value,
  //       score: educationItem.get('score').value,
  //       cgp: educationItem.get('cgp').value,
  //       year: educationItem.get('year').value
  //     }));

  //     // Merge the dynamically added education items with the existing educations
  //     data.educations = [...data.educations, ...dynamicEducations];

  //     if (this.data) {
  //       const id = this.data.id;

  //       this.empService.updateEmployee(id, data).subscribe({
  //         next: (val: any) => {
  //           console.log('value of updateEmp', val);
  //           this.dialogRef.close(true);
  //         },
  //         error: (err: any) => {
  //           console.error(err);
  //         },
  //       });
  //     } else {
  //       this.empService.addEmployee(data).subscribe({
  //         next: (val: any) => {
  //           console.log('value of addEmp', val);
  //           this.dialogRef.close(true);
  //         },
  //         error: (err: any) => {
  //           console.error(err);
  //         },
  //       });
  //     }
  //   }
  // }

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

  // createEducationGroup() {
  //   return this.fb.group({
  //     education: ['', Validators.required],
  //     score: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
  //     cgp: [{ value: '', disabled: true }, Validators.required],
  //     year: ['', Validators.required]
  //   });
  // }

}



