// Lógica para crear/actualizar el gráfico embebido
let chart = null;

const sample = {
  title: 'Ventas por mes',
  labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio'],
  values: [120,150,90,200,170,220],
  type: 'bar'
};

function parseCSVNumbers(s) {
  return s
    .split(',')
    .map(x => x.trim())
    .filter(x => x !== '')
    .map(x => Number(x));
}

function parseCSVStrings(s) {
  return s
    .split(',')
    .map(x => x.trim())
    .filter(x => x !== '');
}

function createOrUpdateChart(type, labels, values, title) {
  const ctx = document.getElementById('chartCanvas').getContext('2d');

  const data = {
    labels: labels,
    datasets: [{
      label: title || '',
      data: values,
      backgroundColor: labels.map((_,i) => `hsl(${(i*40)%360} 70% 60%)`),
      borderColor: labels.map((_,i) => `hsl(${(i*40)%360} 70% 40%)`),
      borderWidth: 1
    }]
  };

  const config = {
    type: type,
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: type !== 'bar' },
        title: { display: !!title, text: title }
      }
    }
  };

  if (chart) {
    // actualizar
    chart.config.type = type;
    chart.data = data;
    chart.options.plugins.title.text = title;
    chart.update();
  } else {
    chart = new Chart(ctx, config);
  }
}

function showSample() {
  document.getElementById('chart-type').value = sample.type;
  document.getElementById('title').value = sample.title;
  document.getElementById('labels').value = sample.labels.join(',');
  document.getElementById('values').value = sample.values.join(',');
  createOrUpdateChart(sample.type, sample.labels, sample.values, sample.title);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('data-form');
  const loadSampleBtn = document.getElementById('load-sample');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const type = document.getElementById('chart-type').value;
    const title = document.getElementById('title').value.trim();
    const labelsRaw = document.getElementById('labels').value;
    const valuesRaw = document.getElementById('values').value;

    const labels = parseCSVStrings(labelsRaw);
    const values = parseCSVNumbers(valuesRaw);

    if (labels.length === 0 || values.length === 0) {
      alert('Ingrese etiquetas y valores válidos (separados por comas).');
      return;
    }
    if (labels.length !== values.length) {
      alert('La cantidad de etiquetas y valores debe coincidir.');
      return;
    }

    createOrUpdateChart(type, labels, values, title);
  });

  loadSampleBtn.addEventListener('click', () => showSample());

  // Mostrar ejemplo al cargar la página
  showSample();
});
