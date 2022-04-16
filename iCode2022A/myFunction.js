var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x^2)',
    color: 'black'
 }
        ],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 5*Math.PI]}
};

functionPlot(parameters);
