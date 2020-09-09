import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.services';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>
  public save_prject;

  constructor(
    private _projectService: ProjectService,
    private _uploadservice: UploadService
  ) {
    this.title = "Crear Projecto";
    this.project = new Project('','','','',2020,'','');
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    //guardar los datos
    this._projectService.saveProject(this.project).subscribe(
        response =>{
          console.log(response.pro);
          if(response){
            
            //subir la imagen
            if(this.filesToUpload){
              this._uploadservice.makeFileRequest(Global.url+'upload-image/'+response.pro._id,[],this.filesToUpload,'image')
              .then((result: any) =>{
                this.save_prject = result.project;
                this.status = 'success';
                form.reset();
              });
            }
            else{
              this.save_prject = response.project;
                this.status = 'success';
                form.reset();
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
