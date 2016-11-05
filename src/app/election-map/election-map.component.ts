import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import 'rxjs/add/operator/map';

const topojson = require('topojson');

@Component({
  selector: 'boss-election-map',
  templateUrl: './election-map.component.html',
  styleUrls: ['./election-map.component.css']
})
export class ElectionMapComponent implements OnInit {
  private d3: D3;
  private parentElement: any;

  constructor(element: ElementRef, d3Service: D3Service, private http: Http) {
    this.d3 = d3Service.getD3();
    this.parentElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3; // convenient alias
    let d3ParentElement: Selection<any, any, any, any>; // TODO: Fix types later

    if (this.parentElement === null) { return; }

    d3ParentElement = d3.select(this.parentElement);

    let [width, height] = [960, 500];

    let projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(1000);

    let path = d3.geoPath().projection(projection);

    let svg = d3ParentElement.append('svg')
      .attr('width', width)
      .attr('height', height);

    this.http.get('assets/us-states.json')
      .map(res => res.json())
      .subscribe(data => {
        svg.selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', path)
          .style('stroke', '#fff')
          .style('stroke-width', '1')
          .style('fill', '#999');
      });
    // TODO: Do D3 stuff!
    // let width = 960,
    //   height = 600;

    // let path = d3.geoPath().projection(null);

    // let svg = d3.select('#us-map').append('svg')
    //   .attr('width', width)
    //   .attr('height', height);

    // this.http.get('assets/us-states.json')
    //   .map(value => value.json())
    //   .subscribe(us => {
    //     svg.append('path')
    //       .datum(topojson.mesh(us))
    //       .attr('d', path);
    //   },
    //   error => console.log(error),
    //   () => console.log('Complete'));
  }

}
