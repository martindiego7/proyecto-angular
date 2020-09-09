import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.services';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>
  public save_prject;
  public url:string;

  constructor(
    private _projectService: ProjectService,
    private _uploadservice: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar Projecto";
    this.url = Global.url;
   }

   ngOnInit(): void {
    this._route.params.subscribe(params =>{
      var id = params.id

      this.getProject(id)
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response =>{
          this.project = response.project;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  onSubmit(){
    this._projectService.updateProjet(this.project).subscribe(
      response =>{
        console.log(response.project);
        if(response){
          
          //subir la imagen
          if(this.filesToUpload){
            this._uploadservice.makeFileRequest(Global.url+'upload-image/'+response.project._id,[],this.filesToUpload,'image')
            .then((result: any) =>{
  
              this.save_prject = result.project;
  
              this.status = 'success';
            });
          }
          else{
            this.save_prject = response.project;
  
              this.status = 'success';
          }
        }
        else{
          this.status = 'failed';
        }
        
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
}


}
