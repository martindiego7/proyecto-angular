import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $:any


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public withSlider: number;
  public anchuraToSlider:any;
  public captions:boolean;
  public autor: any;

  @ViewChild('textos') textos;
  @ViewChild('title') title;

  constructor() {
    this.captions = true;
   }

  ngOnInit(): void {
    var opcion_clasica = document.querySelector('#texto');
    //console.log(opcion_clasica);
    //console.log("title:", this.title);
    console.log(this.textos);
  }

  cargarSlider(){
    this.anchuraToSlider = this.withSlider;
  }

  recargarSlider(){
    this.anchuraToSlider = null;
    this.autor = null;
  }

  getAutor(event){
    this.autor = event;
  }

}
