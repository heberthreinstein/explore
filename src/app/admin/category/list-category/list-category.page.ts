import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.page.html',
  styleUrls: ['./list-category.page.scss'],
})
export class ListCategoryPage implements OnInit {

  constructor(
    private router: Router,
    private location: LocationService
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.location.getAllCategory();
  }

  editPage() {
    this.router.navigate(['admin/edit-category', 'new']);
  }
  editItem(description) {
    this.router.navigate(['admin/edit-category', description]);
  }
  deleteItem(description) {
    this.location.deleteCategory(description);
  }

}
