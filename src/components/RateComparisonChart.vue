<template>
  <Line
    :data="chartData"
    :options="chartOptions"
    aria-label="Chart showing rate comparison by experience level"
  />
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'

// Register the required components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default {
  name: 'RateComparisonChart',
  components: { Line },
  props: {
    professionRates: {
      type: Array,
      required: true,
      default: () => [0, 0, 0, 0]
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['0-2 yrs', '2-5 yrs', '5-8 yrs', '8+ yrs'],
        datasets: [
          {
            label: 'Your Rate Range',
            data: this.professionRates,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Rate: KES ${context.raw.toLocaleString()}`
              }
            }
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `KES ${value.toLocaleString()}`
            }
          }
        }
      }
    }
  }
}
</script>
