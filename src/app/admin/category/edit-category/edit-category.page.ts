import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  urlParam = this.activRouter.snapshot.paramMap.get('category');
  description;
  selectedFile: File;

  constructor(private location: LocationService,
              private activRouter: ActivatedRoute, ) { }

  ngOnInit() {
    this.location.getCategoryInformation(this.urlParam).forEach(cat =>
      cat.forEach( c => {
        this.description = c.description;
      })
    );
  }
  detectFiles(event) {
    this.selectedFile = event.target.files;
    console.log('event', this.selectedFile);
}
  save() {
    if (this.selectedFile) {
      console.log(this.location.saveImg(this.selectedFile[0], this.description));
    }
    if (this.urlParam === 'new') {
      this.location.setCategory(this.description);
    } else {
      this.location.updateCategory(this.urlParam, this.description);
    }
  }
}
