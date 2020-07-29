import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUpload} from '../../../model/upload-file';
import {HttpClient} from '@angular/common/http';
import {UploadFileService} from '../../../service/upload-file.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {IPost} from '../../../model/Post';
import {promises} from "fs";
import {any} from "codelyzer/util/function";

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/vndreamer-fontend.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=00e955b1-7332-4c37-af5b-5aa8472ad1ca';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {
  status = new FormControl('1');
  postForm: FormGroup = new FormGroup({
    status: this.status,
    content: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  @Input() currentUser: IUser;
  @Input() userRequest: IUser;

  @Output() onClickPostButton = new EventEmitter<IPost>();

  file: any;
  imageFile: any;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  percentage: number;
  url: string | ArrayBuffer = '';

  constructor(private postService: PostService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private http: HttpClient,
              private uploadFileService: UploadFileService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    // this.postService.shouldRefresh.subscribe(result => {
    //   this.postForm.reset();
    // });
  }

  // async asyncCall(): void {
  //   async function asyncCall() {
  //     console.log('calling');
  //     const result = await resolveAfter2Seconds();
  //     console.log(result);
  //     // expected output: "resolved"
  //   }
  // }

  async onSubmit(): promises {

    if (this.imageFile !== undefined) {
      upload: any = this.upload();
       setValue: any() = this.setDefaultValue();
    }
    this.postForm.markAllAsTouched();
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value).subscribe(result => {
        this.snackBar.open('Post bài thành công', '', {
          duration: 2500
        });
        // this.postService.shouldRefresh.next(result);
        this.onClickPostButton.emit(result);
        this.url = '';
        this.postForm.reset();
      }, error => {
        this.snackBar.open('Post bài không thành công', '', {
          duration: 2500
        });
        console.log(error);
      });
    } else {
      this.snackBar.open('Nội dung không được để trống!', '', {
        duration: 1000
      });
    }
  }

  displayImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
    this.selectedImage = event.target.files;
  }

  setDefaultValue(): void {
    this.postForm.value.image = FRONT_LINK + this.imageFile.name + BACK_LINK;
  }

  upload(): void {
    this.imageFile = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.currentImageUpload = new FileUpload(this.imageFile);
    this.uploadFileService.pushFileToStorage(this.currentImageUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

}
