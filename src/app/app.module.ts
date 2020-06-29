import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ScrollToModule, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { AppRoutingModule } from './app-routing.module';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from './services/dialogService/dialog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectDialogComponent,
    LoaderComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ScrollToModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ScrollToService, DialogService, MatIconRegistry],
  bootstrap: [AppComponent],
  entryComponents: [ProjectDialogComponent, LoaderComponent, MessageComponent]
})
export class AppModule { }
