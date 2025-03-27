import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler  // Register the Filler plugin to enable fill option
);

/**
 * Creates a line chart with the given data and options
 * @param {HTMLCanvasElement} ctx - The canvas element to render the chart on
 * @param {Object} data - The chart data
 * @param {Object} options - Additional chart options
 * @returns {Chart} The chart instance
 */
export const createLineChart = (ctx, data, options = {}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return new Chart(ctx, {
    type: 'line',
    data: data,
    options: { ...defaultOptions, ...options },
  });
};

/**
 * Creates a bar chart with the given data and options
 * @param {HTMLCanvasElement} ctx - The canvas element to render the chart on
 * @param {Object} data - The chart data
 * @param {Object} options - Additional chart options
 * @returns {Chart} The chart instance
 */
export const createBarChart = (ctx, data, options = {}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return new Chart(ctx, {
    type: 'bar',
    data: data,
    options: { ...defaultOptions, ...options },
  });
};

/**
 * Creates a data object suitable for Chart.js
 * @param {Array} labels - The labels for the chart
 * @param {Array} datasets - The datasets for the chart
 * @returns {Object} The chart data object
 */
export const createChartData = (labels, datasets) => {
  return {
    labels,
    datasets,
  };
};

/**
 * Format numbers for chart display with thousands separators
 * @param {Number} value - The number to format
 * @returns {String} The formatted number
 */
export const formatChartNumber = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};