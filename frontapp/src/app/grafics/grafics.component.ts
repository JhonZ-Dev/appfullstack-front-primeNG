import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent  {
  diasSemana: string[] = [];
  totalProductos: number[] = [];
  chart: Chart;
  data: any;
  options: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8081/api/producto/product/dias/semana')
      .subscribe(data => {
        const labels: string[] = [];
        const valores: string[] = [];
        data.forEach(item => {
          labels.push(item[0]);
          valores.push(item[1]);
        });
        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Total de productos',
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              data: valores
            }
          ]
        };
      });

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }
}
