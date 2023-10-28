"use strict";

var App = App || {};

let w_canvas = 500
let h_canvas = 500
let canvas;
let ctx;
let angle;
let xMax;
let init_x;
let init_y;
let end_y;
let flash_light;
let isStart;
var BASE;
var anguloTexto;

//Apresenta uma aplicação na física
App.espelho = (function ()
{  
  var primeiraTela; 
  var objCanvas;  
  var mensagem;

  //Função Principal
  var inicio = function ()
  {
    isStart = true;

    canvas = document.getElementById('plot');
    ctx = canvas.getContext('2d');

    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();

    BASE = canvas.width * 2;
    xMax = canvas.width - 140;
    angle = 0;
    init_x = 48;
    init_y = 300;
    end_y = 300;

    flash_light = objImagens.img["lanterna"];

    anguloTexto = "Ângulo: 0°";
    document.getElementById("pos-y").value = anguloTexto;
    document.getElementById("divEspelhoControles").style.display = 'block';
    document.getElementById("divControles").style.display = 'block';

    App.teoria.pararAnimacao();//se houver algo rodando, pára

    //quando início é executado, a primeira tela do módulo é renderizada
    //aqui, indica que é a primeira tela
    primeiraTela = true;

    //garante que o evento KeyDown vai sobrescrever outros keydowns não
    //utilizados aqui!
    ajustaKeyDown();

    //ajusta as configurações de evento mouse down
    ajustaMouseDown();

    //limpeza inicial da tela, para reconstrução
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    App.strategiesTela.limpaTela.executa([
      "2",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    ctx.clearRect(0, 0, w_canvas, h_canvas);

    /*
    carrega imagem de fundo
    */
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "frame",
      5,
      5,
      objCanvas.canvasWidth-5,
      objCanvas.canvasHeight - 5
    ]);
    
    //imagem, x0, y0, x, y 
    App.strategiesTela.construtorImagemFundo.executa([
        "2",
        "espelho",
        objCanvas.canvasWidth/2 + 225,
        40,
        231,
        400
      ]);

      // Fundo azul
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#006",
      70,
      70,
      objCanvas.canvasWidth/2 - 130,
      330,
    ]);

    mensagem = "Reflexão da Luz";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 32px Trebuchet MS",
      135,
      120
    ]);

    mensagem = "Utilize os botões abaixo para";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      120,
      195
    ]);

    mensagem = "para interagir e observar o"; 
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      127,
      225
    ]);

    mensagem = "comportamento da luz refletida"; 
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      105,
      255
    ]);

    mensagem = "no espelho."; 
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      195,
      285
    ]);


    // Lanterna na posição certa, mais primeiro feixe de luz
    images(flash_light, 75, 318, 0);

    //-----------------------------------------------------------
    //-----------------------------------------------------------
    // Comportamentos dos botões e input
    //-----------------------------------------------------------
    document.getElementById("btn-plus").onclick = function() {
      up();
    };
    document.getElementById("btn-minus").onclick = function() {
      down();
    };
    //-----------------------------------------------------------
    //-----------------------------------------------------------
  }

  /*
    Detecta botões do teclado pressionados
  */
  var ajustaKeyDown = function ()
  {
    //desvincula os eventos existentes (todos os keydowns)
    objCanvas.doc.unbind("keydown");
  } //Fim ajustaKeydown

  /*
    Detecta cliques
  */
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();   
  }

  function lines(new_pos, type_pos) {

    // new_pos é o ângulo em graus padrão do ciclo trigonométrico, em GRAUS
    // Corrigindo para o canvas -> 360 - new_pos = ângulo para o canvas

    var angCorrigidoGraus = 360 - new_pos;
    var angRad = (Math.PI/180) * angCorrigidoGraus;

    var ponto = App.strategiesCalculadora.ponto.calcula([angRad, init_x, init_y, BASE]);
    
    var m = (init_y - ponto[1]) / (init_x - ponto[0]);    
    var y = init_y + (m * (xMax - init_x));


    var angRefletido = 180 + new_pos;
    var angRefletidoRad = (Math.PI/180) * angRefletido;
    var ponto2 = App.strategiesCalculadora.ponto.calcula([angRefletidoRad, xMax, y, BASE]);

    ctx.clearRect(0, 0, w_canvas, h_canvas)
    
    if(!isStart){
      axis(y);
      ctx.strokeStyle = '#0CF'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.lineCap = "round";
      ctx.moveTo(init_x, init_y)
      ctx.lineTo(xMax, y)
      ctx.lineTo(ponto2[0], ponto2[1])
      ctx.stroke()
    }
    
    images(flash_light, 75 - (new_pos/1000), 318 - (new_pos/2.2), angCorrigidoGraus);
    anguloTexto = "Ângulo: " + new_pos + "°";
    document.getElementById("pos-y").value = anguloTexto;
  }

  function images(img, x, y, degrees) {      

      if(isStart){
        axis(end_y);
        ctx.strokeStyle = '#0CF'
        ctx.lineWidth = 4
        ctx.lineCap = "round";
        ctx.beginPath()
        ctx.moveTo(init_x, init_y)
        ctx.lineTo(xMax, end_y)        
        ctx.stroke()
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.PI/180) * degrees); // ângulo em radianos
      ctx.drawImage(img, -0.5 * img.width, -0.5 * img.width);
      ctx.restore();      
  }

  function axis(y) {
    ctx.strokeStyle = '#b4c9cb'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.setLineDash([3, 3]);
    ctx.moveTo(0, y)
    ctx.lineTo(500, y)
    ctx.stroke()
  }

  function up() {
    isStart = false;

    if (angle < 41) {
      angle++;
      lines(angle, 'up');
    }
  }

  function down() {
    if (angle > 0) {

      isStart = false;
      angle--;

      if(angle == 0)
        isStart = true;

      lines(angle, 'down');
    }
  }

  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }
})();
