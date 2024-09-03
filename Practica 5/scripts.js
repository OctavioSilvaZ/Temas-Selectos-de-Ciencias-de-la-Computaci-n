class Logo {
  constructor(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.x = canvasWidth / 2; // Centra en el ancho del canvas
    this.y = canvasHeight / 2; // Centra en el alto del canvas
    this.circleColor = '#08F7FE'; // Color inicial del círculo exterior
    this.innerCircleColor = '#39FF14'; // Color inicial del círculo interior
    this.lineColor = '#FFFFFF'; // Color inicial de las líneas
  }

  // Dibujar Logo
  draw() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Limpiar canvas

    // Dibuja el círculo exterior
    this.context.beginPath();
    this.context.arc(this.x, this.y, 100, 0, Math.PI * 2, true); // Círculo exterior
    this.context.strokeStyle = this.circleColor; // Color del círculo exterior
    this.context.lineWidth = 5; // Ancho de línea
    this.context.stroke();
    
    // Círculo interior
    this.context.beginPath();
    this.context.arc(this.x, this.y, 50, 0, Math.PI * 2, true); // Círculo interior
    this.context.strokeStyle = this.innerCircleColor; // Color del círculo interior
    this.context.lineWidth = 3; // Ancho de línea
    this.context.stroke();

    // Dibuja las dos líneas horizontales dentro del círculo interior
    this.context.beginPath();
    this.context.moveTo(this.x - 30, this.y - 40); // Línea superior
    this.context.lineTo(this.x + 47, this.y + 19);
    this.context.moveTo(this.x - 45, this.y - 20); // Línea inferior
    this.context.lineTo(this.x + 30, this.y + 40);
    this.context.strokeStyle = this.lineColor; // Color de las líneas
    this.context.lineWidth = 3; // Ancho de líneas
    this.context.stroke();
  }

  // Cambia el color del logo
  changeColor() {
    this.circleColor = this.getRandomFluorescentColor(); // Color random fosforescente del círculo principal
    this.innerCircleColor = this.getRandomFluorescentColor(); // Color random fosforescente del círculo interno
    this.lineColor = this.getRandomFluorescentColor(); // Color random fosforescente de las líneas
    this.draw(); // Redibujar el logo con los nuevos colores
  }

  // Colores fosforescentes aleatorios
  getRandomFluorescentColor() {
    const colors = ['#39FF14', '#FF41A0', '#08F7FE', '#FE53BB', '#FFACFC', '#FF5F1F', '#CFFF04'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

// Configuración inicial
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('logoCanvas'); // ID del canvas de HTML
  const context = canvas.getContext('2d');
  const video = document.getElementById('video'); // ID del video de HTML
  const playIcon = document.getElementById('playIcon'); // ID del ícono de play

  // Crea el objeto logo con el tamaño del canvas
  const logo = new Logo(context, canvas.width, canvas.height);
  logo.draw();

  // Agrega función al botón para cambiar el color del logo
  const cambiarColorBtn = document.getElementById('colorButton');
  cambiarColorBtn.addEventListener('click', function () {
    if (!video.paused) { // Solo cambia el color si el video está en reproducción
      logo.changeColor();
    }
  });

  // Agrega función al botón de apagar
  const apagar = document.getElementById('apagar');
  apagar.addEventListener('click', function() {
    video.currentTime = 0; // Reinicia el video al principio
    video.pause(); // Pausa el video
    playIcon.style.display = 'block'; // Muestra el ícono de play
  });

  const play = document.getElementById('playIcon'); 
  play.addEventListener('click', function() {
    video.play(); // Reproduce el video cuando se hace click en la imagen
    pausareanudar.style.backgroundImage = "url('Imagenes/2.PNG')"
  });

  // Configura el botón de pausa/reanudación
  const pausareanudar = document.getElementById('pausar');
  pausareanudar.addEventListener('click', function() {
    if (!video.paused && !video.ended) {
      video.pause();
      playIcon.style.display = 'block'; // Muestra el ícono de play
      pausareanudar.style.backgroundImage = "url('Imagenes/1.PNG')";
    } else {
      video.play();
      playIcon.style.display = 'none'; // Oculta el ícono de play
      pausareanudar.style.backgroundImage = "url('Imagenes/2.PNG')";
    }
  });

  // Oculta el ícono de play cuando el video está en reproducción
  video.addEventListener('play', function() {
    playIcon.style.display = 'none';
  });

  // Muestra el ícono de play cuando el video está pausado
  video.addEventListener('pause', function() {
    playIcon.style.display = 'block';
    pausareanudar.style.backgroundImage = "url('Imagenes/1.PNG')";
  });
});
