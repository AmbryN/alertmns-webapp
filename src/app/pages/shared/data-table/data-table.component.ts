import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export type Column = {
  header: string;
  columnName: string;
  cell: Function;
};
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() columns: Column[] = [];
  @Input() items: any[] = [];
  @Input() hasUpdate = false;
  @Input() hasDelete = false;

  selectedId = 0;
  @Output() onUpdate: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  dataSource = new MatTableDataSource(this.items);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    const items: any[] = changes['items'].currentValue;
    this.dataSource = new MatTableDataSource(items);
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDisplayedColumns() {
    return this.columns.map((column) => column.columnName);
  }

  update(id: number) {
    this.selectedId = id;
    this.onUpdate.emit(this.selectedId);
  }

  delete(id: number) {
    this.selectedId = id;
    this.onDelete.emit(this.selectedId);
  }
}
