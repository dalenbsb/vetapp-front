import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  //constructor(private router: Router) {}

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      //command: () => this.router.navigate(['/home'])
      routerLink: ['/cores']
    },
    {
      label: 'Pacientes',
      icon: 'pi pi-heart',
      //command: () => this.router.navigate(['/pacientes'])
      routerLink: ['/pacientes']
    },
    {
      label: 'Consultas',
      icon: 'pi pi-calendar',
      //command: () => this.router.navigate(['/consultas'])
      routerLink: ['/consultas']
    },
    {
      label: 'Espécies',
      icon: 'pi pi-tag',
      //command: () => this.router.navigate(['/especies'])
      routerLink: ['/especies']
    },
    {
      label: 'Cores',
      icon: 'pi pi-palette',
      //command: () => this.router.navigate(['/cores'])
      routerLink: ['/cores']
    },
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      //command: () => this.router.navigate(['/users'])
      routerLink: ['/users']
    },

  ];
}