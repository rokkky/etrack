import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IUser } from '../../models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements AfterViewInit {
  user!: IUser;
  usernameField: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
    ]),
    email: new FormControl({ value: '', disabled: true }),
    registrationDate: new FormControl({ value: '', disabled: true }),
  });

  constructor(
    private profileService: ProfileService,
    private datePipe: DatePipe,
  ) {}

  ngAfterViewInit(): void {
    const userId = localStorage.getItem('userId') || '';

    this.profileService.getUserData(userId).subscribe((res) => {
      this.user = res.data.getUser;
      this.usernameField.patchValue({
        ...res.data.getUser,
        registrationDate: this.datePipe.transform(
          res.data.getUser.registrationDate,
          'MMMM d, y',
        ),
      });
    });
  }

  navigateToResetPassPage(): void {
    //TODO: Implement router redirect to reset password page after implementation
  }

  changeUsername(): void {
    const usernameControl = this.usernameField.get('username')!;
    if (usernameControl.valid && usernameControl.dirty) {
      this.profileService
        .changeUsername(this.user.id, usernameControl.value)
        .subscribe((res) => {
          this.user = res.data!.changeUsername;
          usernameControl.markAsPristine();
        });
    }
  }

  signOut(): void {
    this.profileService.signOutUser();
  }
}
