import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import sweetalert2 from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMessage: String = '';
  constructor(
    private _myservice: MyserviceService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.myForm.controls.password.valueChanges.subscribe((x) =>
      this.myForm.controls.cnfpass.updateValueAndValidity()
    );
  }

  ngOnInit() {}

  registerUser() {
    this._myservice.submitRegister(this.myForm.value).subscribe((data) => {
      if (data) {
        sweetalert2.fire('Successfully Added', '', 'success').then(() => {
          this.router.navigate(['/']);
        });
      } else {
        console.log('Network Error');
        sweetalert2.fire('Network Error', 'Please do after sometime ', 'error').then(
          () => {
            this.router.navigate(['/register']);
          }
        );
      }
    });
  }

  movetologin() {
    this.router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
