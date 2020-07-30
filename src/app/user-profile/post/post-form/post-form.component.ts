import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../model/User';
import {PostService} from '../../../service/user/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUpload} from '../../../model/upload-file';
import {HttpClient} from '@angular/common/http';
import {UploadFileService} from '../../../service/public/upload-file.service';
import {IPost} from '../../../model/Post';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {

  constructor(private postService: PostService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private http: HttpClient,
              private uploadFileService: UploadFileService) {
  }

  postForm: FormGroup;
  status: FormControl;

  @Input() currentUser: IUser;

  @Output() whenClickPostButton = new EventEmitter<IPost>();

  file: any;
  imageFile: any;
  selectedImage: FileList;
  imageToUpload: FileUpload;
  imageUploadUrl: string;
  percentage: number;
  isShowProgressBar = false;

  ngOnInit(): void {
    this.status = new FormControl();
    this.postForm = new FormGroup({
      status: this.status,
      content: new FormControl('', Validators.required),
      image: new FormControl('')
    });
    this.postForm.get('status').setValue('1');
  }

  onSubmit(): void {
    this.postForm.markAllAsTouched();
    if (this.postForm.valid && !this.isShowProgressBar) {
      this.postService.createPost(this.postForm.value).subscribe(result => {
        this.snackBar.open('Post bài thành công', '', {
          duration: 2500
        });
        this.whenClickPostButton.emit(result);
        this.imageUploadUrl = '';
        this.postForm.reset();
        this.postForm.get('status').setValue('1');
      }, () => {
        this.snackBar.open('Post bài không thành công', '', {
          duration: 2500
        });
      });
    } else if (!this.isShowProgressBar) {
      this.snackBar.open('Nội dung không được để trống!', '', {
        duration: 1000
      });
    } else {
      this.snackBar.open('Vui lòng chờ File Upload xong!', '', {
        duration: 1000
      });
    }
  }

  uploadImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files;
      this.isShowProgressBar = true;

      this.upload().subscribe(next => {
        this.percentage = Math.round(next * 100) / 100;
      }, () => {
        this.snackBar.open('Có lỗi xảy ra', '', {
          duration: 2500
        });
      });

      this.uploadFileService.uploadSubject.subscribe((downloadUrl: string) => {
        this.imageUploadUrl = downloadUrl;
        this.isShowProgressBar = false;
        this.postForm.get('image').setValue(downloadUrl);
      });
    }
  }

  upload(): Observable<any> {
    this.imageFile = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.imageToUpload = new FileUpload(this.imageFile);
    return this.uploadFileService.pushFileToStorage(this.imageToUpload);
  }
}
