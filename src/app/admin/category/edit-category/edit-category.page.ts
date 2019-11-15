import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  urlParam = this.activRouter.snapshot.paramMap.get('category');
  description;

  constructor(private location: LocationService,
              private activRouter: ActivatedRoute) { }

  ngOnInit() {
    this.location.getLocationInformation(this.urlParam).forEach(ls =>
      ls.forEach(l => {
        console.log(l);
        this.description = l.description;
      })
    );
  }

  save() {
    if (this.urlParam === 'new') {
      this.location.setCategory(this.description);
    } else {
      this.location.updateCategory(this.urlParam, this.description);
    }
  }
}
