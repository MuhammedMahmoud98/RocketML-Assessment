import {
  AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Comment } from '../../../models/comments.model';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.scss'],
})
export class CommentsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() comments: Comment[] = [];
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'email', 'body', 'createdAt'];
  dataSource: MatTableDataSource<Comment>;

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.comments, 'COMMENTS INPUT');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes, 'CHANGES');
    this.dataSource = new MatTableDataSource(this.comments);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
