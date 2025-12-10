# Formulario con Gráfico Embebido

Proyecto de demostración que muestra un formulario que pasa datos a una librería de gráficos (Chart.js) y renderiza el gráfico embebido en la misma página.

## Uso rápido

- Abrir `index.html` directamente en el navegador (arrastrar al navegador o doble clic).
- O ejecutar un servidor estático desde PowerShell (recomendado para evitar restricciones de CORS con algunos navegadores):

```powershell
Set-Location -Path "C:\Users\Owner\Downloads\formgrafic"; python -m http.server 8000
```

Luego abrir http://localhost:8000 en el navegador.

## Cómo usar la app

- El formulario permite elegir el tipo de gráfico, el título, las etiquetas (coma separadas) y los valores (coma separados).
- Presione "Generar / Actualizar gráfico" para pasar la data al gráfico embebido.
- Presione "Cargar ejemplo (ventas)" para pre-cargar un dataset de ejemplo.

## Notas técnicas

- El archivo `app.js` contiene la lógica que parsea los campos del formulario y llama a Chart.js para crear o actualizar el gráfico en el `canvas` embebido.
- Chart.js se carga desde CDN en `index.html`.
