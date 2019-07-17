import {globalData} from "./api.js";

document.getElementById('btn-vis').addEventListener('click', function () {
    let chartData = prepareData();

    let chartType = [
        {type:'chart-popularity', title:'Song Popularity', method:'line'},
        {type:'chart-audio-features', title:'Audio Features', method:'line'}
    ];

    chartType[0].datasets = [{
        label: 'Song Popularity',
        data: chartData.popularity,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }];

    chartType[1].datasets =
        [{
            label: 'Danceability',
            data: chartData.danceability,
            backgroundColor: 'rgba(163, 203, 56, 0.2)',
            borderColor: 'rgba(163, 203, 56, 1)',
            borderWidth: 1
        },
        {
            label: 'Loudness',
            data: chartData.loudness,
            backgroundColor: 'rgba(181, 52, 113, 0.2)',
            borderColor: 'rgba(181, 52, 113, 1)',
            borderWidth: 1
        },
        {
            label: 'Energy',
            data: chartData.energy,
            backgroundColor: 'rgba(255, 195, 18, 0.2)',
            borderColor: 'rgba(255, 195, 18, 1)',
            borderWidth: 1
        },
        {
            label: 'Key',
            data: chartData.key,
            backgroundColor: 'rgba(18, 203, 196, 0.2)',
            borderColor: 'rgba(18, 203, 196, 1)',
            borderWidth: 1
        },
        {
            label: 'Mode',
            data: chartData.mode,
            backgroundColor: 'rgba(0, 148, 50, 0.2)',
            borderColor: 'rgba(0, 148, 50, 1)',
            borderWidth: 1
        },
        {
            label: 'Speechiness',
            data: chartData.speechiness,
            backgroundColor: 'rgba(217, 128, 250, 0.2)',
            borderColor: 'rgba(217, 128, 250, 1)',
            borderWidth: 1
        },
        {
            label: 'Acousticness',
            data: chartData.acousticness,
            backgroundColor: 'rgba(111, 30, 81, 0.2)',
            borderColor: 'rgba(111, 30, 81, 1)',
            borderWidth: 1
        },
        {
            label: 'Instrumentalness',
            data: chartData.instrumentalness,
            backgroundColor: 'rgba(196, 229, 56, 0.2)',
            borderColor: 'rgba(196, 229, 56, 1)',
            borderWidth: 1
        },
        {
            label: 'Liveness',
            data: chartData.liveness,
            backgroundColor: 'rgba(6, 82, 221, 0.2)',
            borderColor: 'rgba(6, 82, 221, 1)',
            borderWidth: 1
        },
        {
            label: 'Valence',
            data: chartData.valence,
            backgroundColor: 'rgba(234, 32, 39, 0.2)',
            borderColor: 'rgba(234, 32, 39, 1)',
            borderWidth: 1
        },
        {
            label: 'Tempo',
            data: chartData.tempo,
            backgroundColor: 'rgba(0, 98, 102, 0.2)',
            borderColor: 'rgba(0, 98, 102, 1)',
            borderWidth: 1
        }];

    loadGraph(chartData, chartType[0]);
    loadGraph(chartData, chartType[1]);
});

function prepareData() {
    let workedData = {
        names : [],
        popularity : [],
        danceability: [],
        energy: [],
        key: [],
        loudness: [],
        mode: [],
        speechiness: [],
        acousticness: [],
        instrumentalness: [],
        liveness: [],
        valence: [],
        tempo: []
    };

    globalData.forEach(function (e) {
        workedData.names.push(e.name);
        workedData.popularity.push(e.popularity);
        workedData.danceability.push(e.danceability);
        workedData.energy.push(e.energy);
        workedData.key.push(e.key);
        workedData.loudness.push(e.loudness);
        workedData.mode.push(e.mode);
        workedData.speechiness.push(e.speechiness);
        workedData.acousticness.push(e.acousticness);
    });

    return workedData;
}

function loadGraph(data, chart){
    var ctx = document.getElementById(chart.type).getContext('2d');
    var myChart = new Chart(ctx, {
        type: chart.method,
        data: {
            labels: data.names,
            datasets: chart.datasets
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            }
        }
    });
}