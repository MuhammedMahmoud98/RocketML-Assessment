import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  usersForm: FormGroup;

  userList = [
    {
      name: 'ahmed',
      age: 24,
    },
    {
      name: 'muhammed',
      age: 25,
    },
  ];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createUsersForm();
    this.loadInitialUsers();
    console.log(this.usersForm);
    console.log(this.getUsers.value, 'GET');
  }

  createUsersForm(): void {
    this.usersForm = this.formBuilder.group({
      users: this.formBuilder.array([]),
      platformName: new FormControl('')
    });
  }

  get getUsers() {
    return this.usersForm.controls.users as FormArray;
  }

  addUser(): void {
    const user = this.formBuilder.group({
      name: ['', Validators.required],
      age: [24, Validators.required],
    });
    this.getUsers.push(user);
    console.log(this.getUsers);
  }

  loadInitialUsers(): void {
    this.userList.forEach((user) => {
      const newUser = this.formBuilder.group({
        name: [user.name, Validators.required],
        age: [user.age, Validators.required],
      });
      this.getUsers.push(newUser);
    });
  }
}
