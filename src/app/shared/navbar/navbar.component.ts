import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ROUTES} from '../shared-routing.module';
import {IUser} from '../../model/User';

@Component({
  // moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Input()
  currentUser: IUser;

  @Input()
  userRequest: IUser;

  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild('navbar-cmp', {static: false}) button;

  constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    // const navbar: HTMLElement = this.element.nativeElement;
    // this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    // this.router.events.subscribe((event) => {
    //   this.sidebarClose();
    // });
  }

  getTitle(): string {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  sidebarToggle(): void {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen(): void {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement;
    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0] as HTMLElement;
    if (window.innerWidth < 991) {
      setTimeout(() => {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

}
