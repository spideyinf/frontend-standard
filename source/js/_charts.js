'use strict';

// Set up some ultilities for randoming data.
window.chartColors = {
  red: '#FF7915',
  orange: '#ee6313',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  gray: '#8b8b8b'
};

let Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let Days = [];

for (let i = 1; i <= 31; i++) {
  Days.push(i);
}

let Weeks = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

let Earnings = [
  'Comunication',
  'Events',
  'Translation',
  'Interpreter',
  'Assistance'
];

let Fields = [
  'Investment',
  'Advertisement',
  'Savings',
  'Charity',
  'Social media'
];

// Style the chart
Chart.defaults.global.defaultFontFamily = 'Muli';

let ctx = document.getElementById('chart-0').getContext('2d');
let gradient = ctx.createLinearGradient(0, 0, 0, 450);
let gradient2 = ctx.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(255, 121, 21, 0.9)')
gradient.addColorStop(0.5, 'rgba(238, 99, 19, 0.25)');
gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

gradient2.addColorStop(0, 'rgba(184, 183, 183, 0.9)')
gradient2.addColorStop(1, 'rgba(184, 183, 183, 0.15)');
gradient2.addColorStop(1, 'rgba(255, 0, 0, 0)');

(function(global) {
  let Samples = global.Samples || (global.Samples = {});
  let Color = global.Color;

  Samples.utils = {

    seedRand: function(seed) {
      this.seedRand = seed;
    },

    // Function to get random repeated number
    rand: function(min, max) {
      let seed = this.seedRand;
      min = min === undefined ? 0 : min;
      max = max === undefined ? 0 : max;
      this.seedRand = (seed * 9301 + 49297) % 233280;
      return min + (seed / 233280) * (max - min);
    },

    numbers: function(config) {
      let min = config.min || 0;
      let max = config.max || 100;
      let from = config.from || [];
      let count = config.count || 7;
      let decimals = config.decimals || 2;
      let continuity = config.continuity || 1;
      let dfactor = Math.pow(10, decimals) || 0;
      let data = [];
      let i, value;

      for (i = 0; i < count; i++) {
        value = (from[i] || 0) + this.rand(min, max);
        if (this.rand() <= continuity) {
          data.push(Math.round(dfactor * value) / dfactor);
        } else {
          data.push(null);
        }
      }

      return data;
    },

    labels: function(config) {
      let min = config.min || 0;
      let max = config.max || 100;
      let count = config.count || 8;
      let step = (max - min) / count;
      let decimals = config.decimals || 8;
      let dfactor = Math.pow(10, decimals) || 0;
      let prefix = config.prefix || '';
      let values = [];
      let i;

      for (i = min; i < max; i += step) {
        values.push(prefix + Math.round(dfactor * i) / dfactor);
      }

      return values;
    },

    createLabels: function(config, type) {
      let count = config.count || {};
      let section = config.section;
      let values = [];
      let i, value;

      for (i = 0; i < count; i++) {
        if (type === 'all') {
          value = Months[Math.ceil(i) % 12];
        } else if (type === 'week' || type === '30days') {
          value = Weeks[Math.ceil(i) % 7];
        };
        values.push(value.substring(0, section));
      }

      return values;
    },

    transparentize: function(color, opacity) {
      let alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return Color(color).alpha(alpha).rgbString();
    },

    color: function(index) {
      COLORS[index % COLORS.length];
    }
  };
}(this));

// Start making charts

let presets = window.chartColors;
let utils = Samples.utils;

function generateData(config) {
  return utils.numbers(Chart.helpers.merge(inputs1, config || {}));
};

// Input for 30 days
let inputs1 = {
  min: -5,
  max: 100,
  count: 30,
  decimals: 2,
  continuity: 1
};

// Input for a week
let inputs2 =  {
  min: 0,
  max: 50,
  count: 7,
  decimals: 2,
  continuity: 1
}

// Input for all time
let inputs3 = {
  min: -20,
  max: 150,
  count: 20,
  decimals: 2,
  continuity: 1
}

utils.seedRand(35);

let lineChartData = {
  labels: utils.createLabels(
    {count: inputs1.count, section: 3},
    '30days'
  ),
  datasets: [
    {
      backgroundColor: gradient,
      borderCorlor: utils.transparentize(presets.orange),
      data: generateData(),
      label: 'Earnings'
    },
    {
      backgroundColor: gradient2,
      borderColor: gradient2,
      data: generateData(),
      label: 'Spendings'
    }
  ]
};

let comboChartData = {
  labels: utils.createLabels(
    {count: inputs1.count, section: 3},
    '30days'
  ),
  datasets: [
    {
      type: 'line',
      label: 'ROI',
      backgroundColor: gradient2,
      borderColor: utils.transparentize(presets.gray),
      borderWidth: 1,
      pointRadius: 3,
      pointHoverRadius: 5,
      data: generateData(),
      fill: false
    },
    {
      type: 'bar',
      label: 'Cash flow',
      backgroundColor: gradient,
      borderColor: gradient,
      hoverBackgroundColor: presets.orange,
      data: generateData()
    }
  ]
}

let doughnutChartData = {
  labels: Earnings,
  datasets: [
    {
      backgroundColor: [
        utils.transparentize(presets.red, .25),
        utils.transparentize(presets.orange, .25),
        utils.transparentize(presets.yellow, .25),
        utils.transparentize(presets.green, .25),
        utils.transparentize(presets.blue, .25),
      ],
      data: utils.numbers({count: 5}),
      label: 'Earnings'
    }
  ]
};

let radarChartData = {
  labels: Fields,
  datasets: [
    {
      backgroundColor: utils.transparentize(presets.orange),
      borderColor: utils.transparentize(presets.orange),
      pointBackgroundColor: utils.transparentize(presets.orange),
      data: utils.numbers({count: 5}),
      borderWidth: 1,
      label: 'You'
    },
    {
      backgroundColor: gradient2,
      borderColor: gradient2,
      pointBackgroundColor: utils.transparentize(presets.gray),
      data: utils.numbers({count: 5}),
      borderWidth: 1,
      label: 'Average'
    }
  ]
};

let basedOptions = {
  maintainAspectRatio: false,
  legend: {
    position: 'top'
  },
  title: {
    display: true,
    text: 'Basic Line Chart Demo',
    fontSize: 16
  },
  hover: {
    mode: 'nearest',
    intersect: true
  }
}

// Create the Basic Line Chart Demo
let chart0 = new Chart('chart-0', {
  type: 'line',
  data: lineChartData,
  options: {
    ...basedOptions,

    title: {
      display: true,
      text: 'Basic Line Chart Demo',
      fontSize: 16
    }
  }
});

// Create the Combo Line-Bar Chart Demo
let chart1 = new Chart('chart-1', {
  type: 'bar',
  data: comboChartData,
  options: {
    ...basedOptions,

    title: {
      display: true,
      text: 'Combo Line-Bar Chart Demo',
      fontSize: 16
    },
    elements: {
      line: {
        tension: 0.000001
      }
    }
  }
})

// Create the Doughnut Chart Demo
let chart2 = new Chart('chart-2', {
  type: 'doughnut',
  data: doughnutChartData,
  options: {
    maintainAspectRatio: false,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Doughnut Chart Demo',
      fontSize: 16
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
});

// Create the Radar Chart Demo
let chart3 = new Chart('chart-3', {
  type: 'radar',
  data: radarChartData,
  options: {
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Radar Chart Demo',
      fontSize: 16
    },
    scale: {
      ticks: {
        beginAtZero: true
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
})


