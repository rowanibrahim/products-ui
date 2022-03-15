import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IProduct, ProductService } from '../../services/product/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','code', 'nameAr', 'nameEn', 'categoryNameAr', 'categoryNameEn'
  , "price", "quantity", "active"];
  public dataSource: MatTableDataSource<IProduct>;
  products: IProduct[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.getAllProducts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAllProducts(){
    this.productService.getProducts(50,0).subscribe(
      (response)=>{
        this.products = response;
        this.dataSource = new MatTableDataSource(response);
      }
    )
  }

  onFileChange(event:any){
    const formData = new FormData();
    for (const file of event.target.files) {
      formData.append("file", file)
    }
    this.productService.upload(formData).subscribe(
      (response)=>{
        this.getAllProducts();
      }
    )
  }
}