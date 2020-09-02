import 'chart.js/dist/Chart.bundle.min';


const STATES = {
    JAN: {
        data: [20, 30, 50],
        labels: ['Bitcoin', 'Ethereum', 'Ripple'],
    },
    FEB: {
        data: [33.33, 33.33, 33.33],
        labels: ['Bitcoin', 'Ethereum', 'Ripple'],
    },
    MAR: {
        data: [25, 25, 50],
        labels: ['Bitcoin', 'Ethereum', 'Ripple'],
    },
    APR: {
        data: [14.29, 14.29, 71.43],
        labels: ['Bitcoin', 'Ethereum', 'Ripple'],
    },
    MAY: {
        data: [8, 15, 77],
        labels: ['Bitcoin', 'Ethereum', 'Ripple'],
    },
    JUN: {
        data: [100],
        labels: ['Ripple'],
    },
    JUL: {
        data: [33.33, 66.67],
        labels: ['Bitcoin', 'Ripple'],
    },
    AUG: {
        data: [33.33, 66.67],
        labels: ['Bitcoin', 'Ripple'],
    },
    SEP: {
        data: [15, 25, 60],
        labels: ['Bitcoin', 'Ethereum', 'Ripple'],
    },
    OCT: {
        data: [30, 70],
        labels: ['Bitcoin', 'Ripple'],
    },
    NOV: {
        data: [50, 50],
        labels: ['Bitcoin', 'Ripple'],
    },
    DEC: {
        data: [100],
        labels: ['Bitcoin'],
    }
};

let ctx = document.getElementById('ct-chart').getContext("2d");
let ctxMob = document.getElementById('ct-chart-mob').getContext("2d");


let gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
gradientFill.addColorStop(0, "rgba(67, 192, 86, .3)");
gradientFill.addColorStop(1, "rgba(67, 192, 86, 0)");

let gradientFillMob = ctxMob.createLinearGradient(0, 0, 0, 350);
gradientFillMob.addColorStop(0, "rgba(67, 192, 86, .3)");
gradientFillMob.addColorStop(1, "rgba(67, 192, 86, 0)");


const options = {
    type: 'line',
    data: {
        labels: ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', ''],
        datasets: [{
            borderColor: "#43c056",
            pointBorderColor: "#121215",
            pointBackgroundColor: "#43c056",
            pointHoverBackgroundColor: "#121215",
            pointHoverBorderColor: "#43c056",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 12,
            pointBorderWidth: 2,
            pointRadius: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0],
            fill: true,
            borderWidth: 3,
            backgroundColor: gradientFill,
            data: [0.5, 0.93, 1.24, 1.04, 1.09, 3.25, 0.42, 2.05, 2.32, 4.95, 5.93, 1.75, 0.32, 0.5]
        }]
    },
    options: {
        tooltips: {
            enabled: false,
            custom: function (tooltipModel) {

                var tooltipEl = document.getElementById('chartjs-tooltip');

                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    document.body.appendChild(tooltipEl);
                }

                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = 0;
                    return;
                }

                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }

                var position = this._chart.canvas.getBoundingClientRect();

                if (tooltipModel.title[0]) {
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.minWidth = '30%';
                    tooltipEl.style.backgroundColor = '#151a1b';
                    tooltipEl.style.borderRadius = '14px';
                    tooltipEl.style.padding = '2rem';
                    tooltipEl.style.pointerEvents = 'none';

                    if (this._chart.width - tooltipModel.caretX < tooltipEl.offsetWidth) {
                        tooltipEl.style.left =
                            position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.offsetWidth + 'px';
                    } else {
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    }

                    if (this._chart.height - tooltipModel.caretY < tooltipEl.offsetHeight) {
                        tooltipEl.style.top =
                            position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.offsetHeight + 'px';
                    } else {
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    }

                    while (tooltipEl.firstChild) {
                        tooltipEl.removeChild(tooltipEl.firstChild);
                    }

                    getDoughnut(tooltipEl, tooltipModel.title[0]);
                }
            }
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                position: 'right',
                ticks: {
                    stepSize: 0.9,
                    labelOffset: 16,
                    fontFamily: 'Gilroy',
                    fontSize: '12',
                    fontColor: "rgba(255,255,255,0.3)",
                    fontStyle: "500",
                    padding: -32,
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
            }],
            xAxes: [{
                display: false
            }]
        }
    }
};

const optionsMob = {
    type: 'line',
    data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
            borderColor: "#43c056",
            point: false,
            pointRadius: 0,
            fill: true,
            borderWidth: 3,
            backgroundColor: gradientFillMob,
            data: [0.93, 1.24, 1.04, 1.09, 3.25, 0.42, 2.05, 2.32, 4.95, 5.93, 1.75, 0.32]
        }]
    },
    options: {
        tooltips: {
            enabled: false,
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
};


function getDoughnut(element, title) {
    let canvas = document.createElement('canvas');

    element.appendChild(canvas);

    let ctx = canvas.getContext("2d");

    let labels = [];

    STATES[title].labels.forEach((element, index) => {
        labels.push(element + ' ' + STATES[title].data[index] + '%')
    });

    let Doughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: ['#fcc538', '#43c056', '#3f67f1'],
                borderWidth: 0,
                data: STATES[title].data
            }],
            labels: labels
        },
        options: {
            tooltips: {
                enabled: false,
            },
            cutoutPercentage: 85,
            legend: {
                position: 'right',
                labels: {
                    fontSize: 16,
                    fontFamily: 'Gilroy',
                    fontColor: 'rgb(255, 255, 255)',
                    fontStyle: '500',
                    padding: 24,
                    boxWidth: 15,
                },
            }
        }
    })
}

let myChartMob = new Chart(ctxMob, optionsMob);
let myChart = new Chart(ctx, options);



// TABS


const tabs = [].slice.call(document.getElementsByClassName('chart-xAxis__item'));

tabs.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        e.target.classList.add('chart-xAxis__item_active');
        for (let i = 0; i < tabs.length; i++) {
            if (i !== index) {
                tabs[i].classList.remove('chart-xAxis__item_active');
            }
        }
        let month = STATES[e.target.innerHTML];
        let labels = month.labels;
        let values = month.data;
        let tooltips = document.querySelector('.tooltips');
        tooltips.innerHTML = "";
        for (let i = 0; i < labels.length; i++) {
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            let key = document.createElement('p');
            key.classList.add('tooltip__key');
            key.innerHTML = labels[i];
            let value = document.createElement('p');
            value.classList.add('tooltip__value');
            value.innerHTML = values[i] + '%';
            tooltip.appendChild(key);
            tooltip.appendChild(value);
            tooltips.appendChild(tooltip);
        }
    });
});

