"use strict";

// Namespace App - centralizando todo o código como um único objeto chamado App
var App = App || {};

var objCanvas;
var objImagens;

//
//Módulo Principal dentro do NAMESPACE APP
//
App.principal = (function ()
{
  $(document).ready( function()
  {
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
  })

  //função estática que chama funções genéricas para desenhar a tela inicial
  var desenhaTela = function ()
  {
    document.getElementById("divEspelhoControles").style.display = 'none';
    document.getElementById("divControles").style.display = 'none';

    App.teoria.pararAnimacao();//se houver algo rodando, pára

     //garante que o evento KeyDown e MouseDown serão ajustados
    ajustaKeyDown();
    ajustaMouseDown();

    //limpeza inicial da tela
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

    // Carrega uma imagem na tela, a partir dos parâmetros passados como
    // array --> local da imagem, x0, y0, x, y
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "frame",
      5,
      5,
      objCanvas.canvasWidth-5,
      objCanvas.canvasHeight - 5
    ]);

    //Aqui, desenha o texto na tela, com os parâmetros: mensagem, cor,
    //fonte (letra, tamanho), x, y
    var mensagem = "Olá. Eu sou o";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "32px Trebuchet MS",
      objCanvas.canvasWidth/7.2,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) -90
    ]);

    mensagem = "SIMULADOR DE FÍSICA/TRIGONOMETRIA.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "40px Trebuchet MS",
      objCanvas.canvasWidth/7.2,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) -5
    ]);

    mensagem = "Comigo, você pode consultar e praticar conceitos de plano inclinado,";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "24px Trebuchet MS",
      (objCanvas.canvasWidth/7.2),
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 55
    ]);

    mensagem = "reflexão e trigonometria na circunferência.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "24px Trebuchet MS",
      objCanvas.canvasWidth/7.2,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 115
    ]);

    mensagem = "Sinta-se à vontade para";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "24px Trebuchet MS",
      3*objCanvas.canvasWidth/5 + 50,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 170
    ]);

    mensagem = "navegar como quiser!";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "24px Trebuchet MS",
      3*objCanvas.canvasWidth/5 + 50,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 200
    ]);
  }
  //----------------------------------------------------------------------------
  //Detecta botões do teclado pressionados
  //----------------------------------------------------------------------------
  var ajustaKeyDown = function ()
  {
    //Para garantir nenhuma sobreposição de ações do evento keydown,
    //prevenindo execuções em telas erradas,
    //desvincula os eventos existentes
    objCanvas.doc.unbind("keydown");
  }

  //----------------------------------------------------------------------------
  // Detecta CLique
  //----------------------------------------------------------------------------
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();
  }

  return {
    inicio : desenhaTela
  }

})();

// Função para primeira execução, após o load
var loadAll = function(){
  var posLoad = function ()
      {
        objCanvas.carregaMedidas();
        $('#preloader').fadeOut(500);
        App.principal.inicio();
      }
      setTimeout(posLoad, 2000); 
}
