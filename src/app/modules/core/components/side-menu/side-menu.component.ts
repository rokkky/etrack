import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  links = [
    {
      routerLink: '/home',
      fontIcon: 'gite',
      label: 'Home',
    },
    {
      routerLink: '/expenses',
      fontIcon: 'shopping_cart',
      label: 'Expenses',
    },
    {
      routerLink: '/income',
      fontIcon: 'attach_money',
      label: 'Income',
    },
    {
      routerLink: '/goals',
      fontIcon: 'savings',
      label: 'Goals',
    },
    {
      routerLink: '/profile',
      fontIcon: 'account_circle',
      label: 'Profile',
    },
    {
      routerLink: '/settings',
      fontIcon: 'settings',
      label: 'Settings',
    },
  ];
}
