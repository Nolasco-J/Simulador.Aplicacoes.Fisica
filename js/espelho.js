"use strict";

var App = App || {};

let w_canvas = 500
let h_canvas = 500
let canvas;
let ctx;
let animate;
let angle;
let deg;
let xx;
let yy;
let init_x;
let init_y;
let end_x;
let end_y;
let end_y_r;
let end_x_r;
let flash_light;
let isStart;

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

    angle = 0;
    deg = 0;
    xx = 0;
    yy = 0;
    init_x = 100
    init_y = 300
    end_x = 300
    end_y = 300
    end_y_r = 0;
    end_x_r = 0;

    canvas = document.getElementById('plot');
    ctx = canvas.getContext('2d');

    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
 
    flash_light = objImagens.img["lanterna"];

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
        objCanvas.canvasWidth/2 + 175,
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
    images(flash_light, 75, 318, deg);

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
    document.getElementById("pos-y").onchange = function() {
      let last_angle = document.getElementById("pos-y").value;
      if (parseInt(last_angle) < angle) {
        down();
      } else {
        up();
      }
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
    if (type_pos == 'up') {
      deg = deg - 0.2
      end_y = end_y - 1
      end_x_r = end_x - end_x

      if (end_y_r === 0) {
        end_y_r = end_y
      }

      end_y_r = end_y_r - 2.25
      init_x = (init_x - 0.07)
      init_y = (init_y - 0.07)

    } else {

      deg = deg + 0.2
      end_y = end_y + 1
      end_x_r = end_x - end_x

      if (end_y_r === 0) {
        end_y_r = end_y
      }
      
      end_y_r = end_y_r + 2.25
      init_x = (init_x + 0.07)
      init_y = (init_y + 0.07)
    }

    ctx.clearRect(0, 0, w_canvas, h_canvas)
    
    if(!isStart){
      axis(end_y);
      ctx.strokeStyle = '#0CF'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.lineCap = "round";
      ctx.moveTo(init_x, init_y)
      ctx.lineTo(end_x, end_y)
      ctx.lineTo(end_x_r, end_y_r)
      ctx.stroke()
    }
    
    images(flash_light, 75, 318, deg);
    document.getElementById("pos-y").value = new_pos;
  }

  function images(img, x, y, degrees) {      

      if(isStart){
        axis(end_y);
        ctx.strokeStyle = '#0CF'
        ctx.lineWidth = 4
        ctx.lineCap = "round";
        ctx.beginPath()
        ctx.moveTo(init_x, init_y)
        ctx.lineTo(end_x, end_y)        
        ctx.stroke()
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(0.017453292519943295 * degrees); // 0.017453292519943295 == Math.PI / 180
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

    if (angle < 200) {
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