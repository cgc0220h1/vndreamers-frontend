import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUpload} from '../../../model/upload-file';
import {HttpClient} from '@angular/common/http';
import {UploadFileService} from '../../../service/upload-file.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/project-module-5.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=fad94b03-0cbe-49a5-b06f-4c2284bc4bd8';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    status: new FormControl(''),
    content: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  @Input() currentUser: IUser;
  @Input() userRequest: IUser;
  imgSrc: any;
  isShowSuccess = false;
  message: string;
  file: any;
  imageFile: any;
  selectedFile: FileList;
  selectedImage: any = null;
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
    this.postService.shouldRefresh.subscribe(result => {
      this.postForm.reset();
    });
  }

  onSubmit(): void {
    if (this.selectedImage !== null) {
      const filePath = `avatar/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgSrc = url;
          });
        })
      ).subscribe();
    }
    this.postForm.markAllAsTouched();
    if (this.postForm.valid) {
      this.postForm.value.status = 1;
      this.postService.createPost(this.postForm.value).subscribe(result => {
        this.snackBar.open('Post bài thành công', '', {
          duration: 2500
        });
        this.postService.shouldRefresh.next(result);
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

  showPriview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.onSubmit();
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
}
