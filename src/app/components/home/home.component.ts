import {Component, HostListener, OnInit, ViewChild} from '@angular/core';

import {SizeNotifierService} from '../../services/sizeNotifier/sizeNotifier.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import {IProject} from '../../Interfaces/IProject';
import {DialogService} from '../../services/dialogService/dialog.service';
import {AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {IEmail} from '../../Interfaces/IEmail';
import {EmailSenderService} from '../../services/emailSender/email-sender.service';

const SOCIAL_CONSTS = {
  GITHUB: 'https://github.com/ArtinRezaee',
  LINKEDIN: 'https://www.linkedin.com/in/artin-rezaee-anzabee/',
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  scrolled = false;
  selectedSection = '';
  screenType = '';
  mobileMenuCollapse = false;
  mobileMenuIcon = 'menu';
  toolbarSections: string[] = ['Home', 'About', 'Experience', 'Projects', 'Contact'];
  projects: IProject[] = [
    {
      name: 'Kongcrete',
      description: 'A progressive web application that allows constructions crews ' +
        'to order concrete and other materials and manage their deliveries to the construction site.' +
        'As the lead developer of the project, I collaborated with the stakeholders, project managers, and other developers to' +
        'ensure the timely delivery of the desired products',
      tags: ['Web', 'ReactJS', 'NodeJS', 'Google Cloud', 'Lead Developer'],
      imgUrl: '../../../assets/kongcrete.jpeg'
    },
    {
      name: 'Ignite Learning Management System',
      description: 'An access based progressive web application that allows instructors ' +
        'to take attendance, view class lists, add or remove students from a class, ' +
        'and share session slides with students in an organized manner. Contributed to creating the application\'s front-end',
      tags: ['Web', 'Angular', 'Angular Material', 'Non-profit', 'NodeJS', 'Google App Engine'],
      imgUrl: '../../../assets/ignite.jpg',
      demoLink: 'https://www.ignitebrite.ca/login'
    },
    {
      name: 'DeliverUs',
      description: 'DeliverUs is a cross platform mobile application ' +
        'that allows students and faculty to order food and drink from various locations on ' +
        'campus and have it delivered to their location. As a developer at deliverUs I ' +
        'contributed to creating the application\'s front-end in a SCRUM team setting.',
      tags: ['Mobile', 'Ionic Framework', 'Angular', 'Firebase', 'Google Cloud Functions'],
      imgUrl: '../../../assets/deliverus.png'
    },
    {
      name: 'Alarm Clock',
      description: 'Alarm clock is application written for android and desktop platfroms. ' +
        'In a team of six, we used SCRUM methodology and Java to create an android and JavaFX application. ' +
        'Alarm clock allows users to view current time and setup multiple alarms on their devices.',
      tags: ['Mobile', 'Desktop', 'Android', 'Java', 'SCRUM Agile'],
      imgUrl: '../../../assets/alarm.jpg',
    },
    {
      name: 'Flight Reservation System',
      description: 'Flight Reservation System is a Java client-server application that allows client to book flights,' +
        ' and admins to manage clients\' bookings. This application involved streaming data through network sockets and ' +
        'reconstructing files from output stream',
      tags: ['Desktop', 'Java'],
      imgUrl: '../../../assets/flight.png',
      repoLink: 'https://github.com/satyakig/ENSF-409Project'
    },
    {
      name: 'Point of Sales System',
      description: 'Created a demo of a Point of Sales system based on the request of a local barbershop',
      tags: ['Web', 'Angular', 'Angular Material', 'NodeJS', 'Google App Engine'],
      imgUrl: '../../../assets/pos.jpg',
      demoLink: 'https://pos-system-demo.web.app'
    },
  ];

  @ViewChild(FormGroupDirective, { static: true }) myForm;
  form: FormGroup;
  constructor(
    private sizeNotifier: SizeNotifierService,
    private scrollToService: ScrollToService,
    private dialog: DialogService,
    private fb: FormBuilder,
    private mailService: EmailSenderService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.sizeNotifier.checkScreenSize().subscribe((screen) => {
      this.screenType = screen;
    });
  }

  /**
   * Scrolls to the selected section
   * @param section Section to scroll to
   */
  onSectionSelect(section: string) {
    this.selectedSection = section;
    const config: ScrollToConfigOptions = {
      target: section,
    };
    this.scrollToService.scrollTo(config);
    if (this.mobileMenuCollapse) {
      this.mobileMenuCollapse = !this.mobileMenuCollapse;
      this.mobileMenuIcon = 'menu';
    }
  }

  /**
   * Event to call the dialogService and show the project
   * @param project Project to be shown
   */
  onProjectSelect(project: IProject) {
    this.dialog.showProject(project);
  }

  /**
   * Listens to the scroll event in order to determine whether the toolbar should be transparent or not
   */
  @HostListener('window: scroll') onWindowScroll() {
    window.scrollY <= 15 ? this.scrolled = false : this.scrolled = true;
  }

  /**
   * Toggles the mobile menu
   */
  toggleMobileMenu() {
    this.mobileMenuCollapse = !this.mobileMenuCollapse;
    this.mobileMenuIcon = this.mobileMenuCollapse ? 'close' : 'menu';
  }

  /**
   * Open my social media in a new tab
   * @param social Which social account
   */
  onSocial(social: string) {
    if (social === 'github') {
      window.open(SOCIAL_CONSTS.GITHUB, '_blank');
    } else if (social === 'linkedIn') {
      window.open(SOCIAL_CONSTS.LINKEDIN, '_blank');
    }
  }

  /**
   * Extract form inputs and use the mail service to send the email
   */
  onSendEmail() {
    const name: AbstractControl = this.form.get('name');
    const email: AbstractControl = this.form.get('email');
    const message: AbstractControl = this.form.get('message');
    if (!name.value || !email.value || !message.value) {
      return;
    }

    let dialogRef = this.dialog.showLoader('Sending your email ...');

    const mailInfo: IEmail = {
      name: name.value,
      fromEmail: email.value,
      message: message.value,
    };

    this.mailService.sendEmail(mailInfo).subscribe((res) => {
      dialogRef.close();
      dialogRef = this.dialog.showMessage('Thank you!',
        'I have received your message and will get back to you shortly');
      this.form.reset();
      this.myForm.resetForm();
      this.form.setErrors(null);
    }, (err) => {
      dialogRef.close();
      dialogRef = this.dialog.showMessage('Oops!',
        'Something went wrong. Please contact me at artin.anzabee@gmail.com');
    });
  }
}
