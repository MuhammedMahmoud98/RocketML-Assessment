import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Store} from "@ngrx/store";
import {logOut} from "../../store/actions/login.action";

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logOut());
  }
}
