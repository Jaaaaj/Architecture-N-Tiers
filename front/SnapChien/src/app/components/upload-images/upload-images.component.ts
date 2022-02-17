import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service'


@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  constructor(private uploadService: UserService) { }
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  comments: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  previewsFileNames: string[] = [];
  imageInfos?: Observable<any>;

  imageData: any[] = [];

  searchFilter: any ="";

  newcomment: string = "";
  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
    this.uploadService.getFiles().subscribe(data=> {// GET: list des photos
      for (let i = 0; i < data.length; i++) {
        this.imageData = [...this.imageData, {id:data[i].id,url:data[i].url,name:data[i].name,comment:data[i].comment}];
      }
    })
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    this.previewsFileNames = [];
    this.comments = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result.name);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
        this.previewsFileNames = this.selectedFileNames
      }
    }
  }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };

  //   if (file) {
  //     this.uploadService.upload(file, "test").subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //         } else if (event instanceof HttpResponse) {
  //           const msg = 'Uploaded the file successfully: ' + file.name;
  //           this.message.push(msg);
  //           this.imageInfos = this.uploadService.getFiles();
  //         }
  //       },
  //       (err: any) => {
  //         console.log(err)
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'Could not upload the file: ' + file.name;
  //         this.message.push(msg);
  //       });
  //   }
  // }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload2(this.selectedFiles[i],this.comments[i]);
      }
      window.location.reload();
    }
  }

  upload2(file: File,comment : string) {
    this.uploadService.upload(file, comment).subscribe(data => {
        const msg = 'Uploaded the file successfully: ' + file.name;
        console.log("uploaded")
        this.imageInfos = this.uploadService.getFiles();
    },
      err => {
        console.log(err)
        this.imageInfos = this.uploadService.getFiles();
    })
  }

  delete(id: number) {
    this.uploadService.delete(id).subscribe(data => {
      console.log("deleted Image id:" +id)
      this.imageInfos = this.uploadService.getFiles();

  },
    err => {
      console.log(err)
      this.imageInfos = this.uploadService.getFiles();
  })
  }

  updateComment(id:number,newcomment: string) {
    this.uploadService.update(id,newcomment).subscribe(data => {
      console.log("updated Image id:" +id)
      this.imageInfos = this.uploadService.getFiles();

  },
    err => {
      console.log(err)
      this.imageInfos = this.uploadService.getFiles();
  })
  }

}
