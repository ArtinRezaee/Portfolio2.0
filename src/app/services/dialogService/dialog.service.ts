import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {IProject} from '../../Interfaces/IProject';
import {ProjectDialogComponent} from '../../components/project-dialog/project-dialog.component';
import {IMessage} from '../../Interfaces/IMessage';
import {ILoaderData} from '../../Interfaces/ILoaderData';
import {LoaderComponent} from '../../components/loader/loader.component';
import {MessageComponent} from '../../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  /**
   * Shows a project details in a modal
   * @param project Project data
   */
  // tslint:disable-next-line:no-any
  showProject(project: IProject): MatDialogRef<ProjectDialogComponent, any> {
    return this.dialog.open(ProjectDialogComponent, {
      width: '600px',
      height: '800px',
      data: project,
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });
  }

  // tslint:disable-next-line
  /**
   * Show a loading dialog
   * @param title Title of the loader dialog
   */
  // tslint:disable-next-line:no-any
  showLoader(title?: string): MatDialogRef<LoaderComponent, any> {
    const data: ILoaderData = {
      title: title ? title : 'Please wait ...',
    };

    return this.dialog.open(LoaderComponent, {
      data,
      hasBackdrop: true,
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
      width: '300px',
      height: '190px',
    });
  }

  /**
   * Show a message dialog
   * @param title Title of the dialog
   * @param message Message to display
   */
  showMessage(title: string, message: string): MatDialogRef<MessageComponent, boolean> {
    const data: IMessage = {
      title,
      message,
    };

    return this.dialog.open(MessageComponent, {
      data,
      width: '450px',
      height: '250px',
      hasBackdrop: true,
      autoFocus: true,
      closeOnNavigation: false,
      disableClose: false,
    });
  }

}
