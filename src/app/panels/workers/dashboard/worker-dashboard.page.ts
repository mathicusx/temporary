import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import {
  stackedVerticalCharHours,
  stackedVerticalChartPay,
} from '../charts/charts.data';

@Component({
    selector: 'app-worker-dashboard',
    templateUrl: './worker-dashboard.page.html',
    styleUrls: ['./worker-dashboard.page.scss'],
    standalone: false
})
export class WorkerDashboardPage implements OnInit {
  stackedVerticalCharHours: any[] = [];
  stackedVerticalChartPay: any[] = [];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabelHours: string = 'Days';
  xAxisLabelPay: string = 'Pay Earned Per Week (GBP)';
  yAxisLabelHours: string = 'Hours Worked';
  yAxisLabelPay: string = 'Week';

  colorScheme: string | Color = {
    domain: ['#F89D3E', '#E54C7A', '#2AA5AA', '#AEBF30'], // Array of color codes
    selectable: true, // Optional: Indicates if the color scheme is selectable
    name: 'custom-scheme', // Optional: Name of the color scheme
    group: ScaleType.Linear, // Optional: Group for the color scheme
  };

  constructor() {
    Object.assign(this, { stackedVerticalCharHours });
    Object.assign(this, { stackedVerticalChartPay });
  }

  ngOnInit() {}
}
