import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILoaderData } from '../../Interfaces/ILoaderData';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ILoaderData) { }

  ngOnInit() {
  }

}
