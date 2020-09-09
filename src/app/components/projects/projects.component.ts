import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.services';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
 public projects: Project[];
 public url: string;
  constructor(
    //las propiedades se declaran dentro del contructor
    private _projectService: ProjectService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(){
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
          if(response.project){
            this.projects = response.project;
          }
      },
      error => {
          console.log(<any>error);
      });
  }

}
