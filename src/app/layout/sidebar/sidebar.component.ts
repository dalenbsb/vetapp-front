import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => this.router.navigate(['/home'])
    },
    {
      label: 'Pacientes',
      icon: 'pi pi-heart',
      command: () => this.router.navigate(['/pacientes'])
    },
    {
      label: 'Consultas',
      icon: 'pi pi-calendar',
      command: () => this.router.navigate(['/consultas'])
    },
    {
      label: 'Espécies',
      icon: 'pi pi-tag',
      command: () => this.router.navigate(['/especies'])
    },
    {
      label: 'Cores',
      icon: 'pi pi-palette',
      command: () => this.router.navigate(['/cores'])
    }
  ];
}