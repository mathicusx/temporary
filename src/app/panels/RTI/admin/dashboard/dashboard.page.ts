import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { multi, single, multiLine, singleNumberChart } from './dashboard.data';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrl: './dashboard.page.scss',
    standalone: false
})
export class DashboardPage implements OnInit {
  groupedCities: any[] = [];

  selectedCity: string | undefined;

  date1: Date | undefined;

  date2: Date | undefined;

  date3: Date | undefined;

  single: any[] = [];
  singleNumberChart: any[] = [];
  multi: any[] = [];
  multiLine: any[] = [];
  cardColor: string = '#232837';

  view: [number, number] = [200, 200];
  selectedDate: string = '';

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  // options
  legend: boolean = true;
  // animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  xAxisLabelCapita: string = 'GDP Per capita';
  yAxisLabelCapita: string = 'Country';
  timeline: boolean = true;

  colorScheme: string | Color = {
    domain: ['#F89D3E', '#E54C7A', '#2AA5AA', '#AEBF30'], // Array of color codes
    selectable: true, // Optional: Indicates if the color scheme is selectable
    name: 'custom-scheme', // Optional: Name of the color scheme
    group: ScaleType.Linear, // Optional: Group for the color scheme
  };

  constructor() {
    Object.assign(this, { single });
    Object.assign(this, { multi });
    Object.assign(this, { multiLine });
    Object.assign(this, { singleNumberChart });
  }
  ngOnInit(): void {
    this.groupedCities = [
      {
        label: 'Area View',
        value: 'areaView',
        items: [
          { label: 'Area 1', value: 'area1' },
          { label: 'Area 2', value: 'area2' },
          { label: 'Area 3', value: 'area3' },
          { label: 'Area 4', value: 'area4' },
        ],
      },
      {
        label: 'Site View',
        value: 'siteView',
        items: [
          { label: 'Site 1', value: 'site1' },
          { label: ' Site 2', value: 'site2' },
          { label: ' Site 3', value: 'site3' },
          { label: ' Site 4', value: 'site4' },
        ],
      },
      {
        label: 'Shift View',
        value: 'shiftView',
        items: [
          { label: 'Shift 1', value: 'shift1' },
          { label: 'Shift 2', value: 'shift2' },
          { label: 'Shift 3', value: 'shift3' },
          { label: 'Shift 4', value: 'shift4' },
        ],
      },
      {
        label: 'Dept View',
        value: 'deptView',
        items: [
          { label: 'Dept 1', value: 'dept1' },
          { label: 'Dept 2', value: 'dept2' },
          { label: 'Dept 3', value: 'dept3' },
          { label: 'Dept 4', value: 'dept4' },
        ],
      },
    ];
  }
}
