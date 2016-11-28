import { Component, OnChanges, OnInit, Input, Output, ElementRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import 'rxjs/add/operator/map';

import { StateInfo, StateInfoService } from '../state-info.service';

@Component({
  selector: 'boss-election-map',
  template: `
    <h2>Election Map</h2>
    <div id="us-map"></div>
  `,
  styles: [`
    .state {
      fill: #999;
      stroke: #fff;
      stroke-width: 1;
    }

    .state:hover {
      fill-opacity: 0.5;
    }

    .selected-state {
      fill: yellow;
      stroke: red;
    }

    #selectedState {
      fill: #ccc;
      stroke: #333;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ElectionMapComponent implements OnInit, OnChanges {
  private d3: D3;
  private componentElement: any;
  private svg;

  private statesData: Array<any> = [];
  private initialized = false;

  @Input('selectedState') private selectedStateAbbrev: string;

  @Output('stateSelected') private stateSelectedEmitter: EventEmitter<any> = new EventEmitter();
  @Output('stateHover') private stateHoverEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    element: ElementRef,
    d3Service: D3Service,
    private http: Http,
    private stateInfoService: StateInfoService) {
    this.d3 = d3Service.getD3();
    this.componentElement = element.nativeElement;
  }

  ngOnChanges() {
    let selectedState = this.stateInfoService.getStateByAbbrev(this.selectedStateAbbrev);
    this.statesData.forEach(s => s.properties.selected = (s.properties.name === selectedState.name));
    if (this.initialized) {
      this.render();
    }
  }

  ngOnInit() {
    let d3ParentElement: Selection<any, any, any, any>; // TODO: Fix types later

    if (this.componentElement === null) { return; }

    let [width, height] = [960, 500];

    this.svg = this.d3.select(this.componentElement).append('svg')
      .attr('width', width)
      .attr('height', height);

    this.svg.append('g').attr('id', 'states');
    this.svg.append('g').attr('id', 'selected-states');

    this.http.get('assets/us-states.json')
      .map(res => res.json())
      .subscribe(data => {
        this.statesData = data.features;
        this.statesData.forEach(s => {
          let state = this.stateInfoService.getStateByName(s.properties.name);
          if (state) {
            s.properties.abbrev = state.abbrev;
          }
        });
        this.render();
      });
  }

  render() {
    let states = this.svg.select('#states').selectAll('path').data(this.statesData);

    let [width, height] = [960, 500];

    let projection = this.d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(1000);

    let path = this.d3.geoPath().projection(projection);

    // Enter
    states.enter()
      // .each(() => console.log('adding a state'))
      .append('path')
      .attr('d', path)
      .attr('class', 'state')
      .on('click', datum => {
        this.statesData.forEach(d => d.properties.selected = false);
        datum.properties.selected = true;
        this.render();
        this.stateSelectedEmitter.emit(datum.properties);
      });

    let selectedStates = this.svg.select('#selected-states')
      .selectAll('path')
      .data(this.statesData.filter(s => s.properties.selected), s => s.properties.name);

    selectedStates.enter()
      // .each(() => console.log('adding a selected-state'))
      .append('path')
      .attr('d', path)
      .attr('class', 'selected-state')
      .on('click', (d: any) => {
        d.properties.selected = false;
        this.render();
      });

    selectedStates
      // .each(() => console.log('updating selected-state'))
      .attr('d', path);

    selectedStates.exit()
      // .each(() => console.log('removing a selected-state'))
      .remove();

    this.initialized = true;
  }

}
