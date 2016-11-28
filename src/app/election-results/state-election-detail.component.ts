import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'boss-state-election-detail',
  template: `<p>state-election-detail works!</p>`,
  styleUrls: [``]
})
export class StateElectionDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() { }

}
