import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;

  diasSemana: string[] = [];
  totalProductos: number[] = [];
  chart: Chart;
  data: any;
  options: any;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.http.get<any[]>('http://localhost:8081/api/producto/product/dias/semana')
      .subscribe(data => {
        data.forEach(item => {
          this.diasSemana.push(item[0]);
          this.totalProductos.push(item[1]);
        });
        this.createChart();
      });
  }

  createChart(): void {
    if (this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.diasSemana,
          datasets: [{
            label: 'Total de productos',
            data: this.totalProductos,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('canvasRef is undefined');
    }
  }
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
              backgroundColor: '#42A5F5',
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
