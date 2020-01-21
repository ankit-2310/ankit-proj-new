import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component'
import {HitsService} from './hits.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ankit-proj-new';

  constructor(public dialog: MatDialog,
    public hitsService: HitsService) {}

    interval : any
  
  ngOnInit(){
    this.showData()
    this.setNewInterval()
  }

  ngOnDestrory(){
    clearInterval(this.interval)
  }

  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  dataSource:any  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showData() {
    this.hitsService.get()
      .subscribe((data: {}) => {
          this.dataSource = new MatTableDataSource(data['hits'])
      });
  }

  setNewInterval(){
    this.interval = setInterval(() => {this.showData();},10000)
  }
}

