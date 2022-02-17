import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css']
})
export class CarousselComponent implements OnInit {

  constructor(private uploadService: UserService) { }

  imageInfos?: Observable<any>;

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }
    
}
