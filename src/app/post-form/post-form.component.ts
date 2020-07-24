import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    status: new FormControl(''),
    content: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.postForm.value.status = 1;
    console.log(this.postForm.value);
  }
}
