import {Component} from '@angular/core';
import {BaseChartDirective, NgChartsConfiguration} from 'ng2-charts';
import {Chart, ChartData, ChartOptions} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {RosconesService} from "../services/roscones.service";

@Component({
    selector: 'app-estadisticas',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './estadisticas.component.html',
    styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent {
    GRAPHICS_COLORS = {
        GRANDE: 'rgba(255, 63, 105, 0.8)',
        PEQUENO: 'rgba(3, 155, 255, 0.8)'
    }

    rosconService:RosconesService;

    // // Datos para cada segmento del gráfico
    doughnutChartData: ChartData<'doughnut'> = {
        labels: ['GRANDE', 'PEQUEÑO'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: [
                    this.GRAPHICS_COLORS.GRANDE,  // Color de la primera barra
                    this.GRAPHICS_COLORS.PEQUENO,  // Color de la segunda barra
                ],
            }
        ]
    };
    // // Tipo de gráfico (circular)
    // public doughnutChartType: string = 'doughnut';
    //
    // // Opciones de personalización (opcional)
    public doughnutChartOptions: any = {
        maintainAspectRatio: false, // Permitir que el gráfico se ajuste al tamaño del contenedor

        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 18
                    }
                }
            },
            datalabels: {
                display: true,  // Mostrar etiquetas
                color: 'white', // Color de las etiquetas
                font: {
                    weight: 'bold',
                    size: 18
                }
            }
        }
    };

    // / Datos para gráfico de barras
    barChartData: ChartData<'bar'> = {
        labels: ['NATA', 'SIN_RELLENO', 'ESPECIAL'],
        datasets: [
            {data: [0, 0, 0], label: 'GRANDE', backgroundColor: this.GRAPHICS_COLORS['GRANDE']},
            {data: [0, 0, 0], label: 'PEQUEÑO', backgroundColor: this.GRAPHICS_COLORS['PEQUENO']}
        ]
    };

    // Opciones de Chart.js, activando el plugin de DataLabels
    public chartOptions: ChartOptions = {
        maintainAspectRatio: false, // Permitir que el gráfico se ajuste al tamaño del contenedor
        responsive: true,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 18 // Tamaño de los labels en el eje X
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 18 // Tamaño de los labels en el eje Y
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 18
                    }
                }
            },
            datalabels: {
                display: true,  // Mostrar etiquetas
                color: 'white', // Color de las etiquetas
                anchor: 'end',  // Posición dentro de la barra
                align: 'start', // Alineación de las etiquetas
                font: {
                    weight: 'bold',
                    size: 18
                }
            }
        }
    };

    constructor(rosconService: RosconesService) {
        // Registrar manualmente el plugin en Chart.js
        this.rosconService = rosconService;
        this.rosconService.getSumBySize().subscribe(value => {
            console.log(value);
            console.log(this.doughnutChartData.datasets[0])
            this.doughnutChartData = {
                labels: ['GRANDE', 'PEQUEÑO'],
                datasets: [
                    {
                        data: [value.GRANDE, value.PEQUENO],
                        backgroundColor: [
                            this.GRAPHICS_COLORS.GRANDE,  // Color de la primera barra
                            this.GRAPHICS_COLORS.PEQUENO,  // Color de la segunda barra
                        ],
                    }
                ]
            };
        })

        this.rosconService.getSumBySizeAndFill().subscribe(value => {
            console.log(value);
            this.barChartData = {
                labels: ['NATA', 'SIN_RELLENO', 'ESPECIAL'],
                datasets: [
                    {data: [value.grNATA, value.grSin, value.grESP], label: 'GRANDE', backgroundColor: this.GRAPHICS_COLORS['GRANDE']},
                    {data: [value.peqNATA, value.peqSIN, value.peqESP], label: 'PEQUEÑO', backgroundColor: this.GRAPHICS_COLORS['PEQUENO']}
                ]
            };
        })

        Chart.register(ChartDataLabels);
    }

}
