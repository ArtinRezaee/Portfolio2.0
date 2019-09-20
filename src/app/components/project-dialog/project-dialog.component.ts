import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IProject} from '../../Interfaces/IProject';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public project: IProject
  ) { }

  ngOnInit() {
  }

  /**
   * Opens a new tab to the supplied link
   * @param link Link to open in a new tab
   */
  goToLink(link: string) {
    window.open(link, '_blank');
  }
}
