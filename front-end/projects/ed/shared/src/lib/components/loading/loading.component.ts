import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ed-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit
{
  @Input() show: boolean = false;

  ngOnInit(): void
  {
  }
}
