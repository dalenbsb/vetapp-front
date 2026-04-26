import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/home'
    },
    {
      label: 'Pacientes',
      icon: 'pi pi-heart',
      routerLink: '/pacientes'
    },
    {
      label: 'Consultas',
      icon: 'pi pi-calendar',
      routerLink: '/consultas'
    }
  ];
}