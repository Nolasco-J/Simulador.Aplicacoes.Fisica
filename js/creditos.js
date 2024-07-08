"use strict";

var App = App || {};

//Apresenta os créditos e observações sobre o sistema
App.creditos = (function ()
{
  
  var linkBackground = "https://www.vecteezy.com/vector-art/6699602-hologram-digital-technology-furturistic-with-light-star";
  var linkFrame = "https://www.vecteezy.com/vector-art/2082105-hud-ui-gui-futuristic-user-interface-screen-elements-high-tech-screen-for-video-game-sci-fi-concept-design";
  //linkFrameFree = "https://static.vecteezy.com/ti/vetor-gratis/p1/2082105-hud-ui-gui-futuristic-user-interface-screen-elements-high-tech-screen-for-video-game-sci-fi-concept-design-vetor";

  var objCanvas;
  var objImagens;
  var mensagem;
  
  $(document).ready( function()
  {
    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
  })

  //Função Principal
  var inicio = function ()
  {
    document.getElementById("divEspelhoControles").style.display = 'none';
    document.getElementById("divControles").style.display = 'none';
    document.getElementById("divControlesAnima").style.display = 'none';
    document.getElementById("cvTrigonometrando3").style.display = 'none';

    App.teoria.pararAnimacao();//se houver algo rodando, pára
    App.aplicacoes.pararAnimacao();//se houver algo rodando, pára

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

    mensagem = "Algumas imagens utilizadas foram retiradas de bancos de imagens";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 20,
      110
    ]);

    mensagem = "gratuitas, que requerem apenas atribuição para uso livre.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 18,
      150
    ]);

    mensagem = "Abaixo, as referências das fontes, com link.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 15,
      190
    ]);

    mensagem = "Imagem background da página";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "20px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 189,
      250
    ]);

    mensagem = "Imagem de fundo do canvas";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "20px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 200,
      280
    ]);

    mensagem = "Demais imagens, foram construídas pelo próprio desenvolvedor";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "20px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 25,
      350
    ]);

    mensagem = "ou a licença livre não requer atribuição.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "20px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 25,
      380
    ]);

  }
  /*
    Detecta botões do teclado pressionados
  */
  var ajustaKeyDown = function ()
  {
    //Para garantir nenhuma sobreposição de ações do evento keydown,
    //prevenindo execuções em telas erradas,
    //desvincula os eventos existentes
    objCanvas.doc.unbind("keydown");
  }

  /*
    Detecta cliques
  */
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();

    objCanvas.canvas1.bind("mousedown.LinksImagens", function(event)
    {
      var x, y;

      var posicaoOffset = objCanvas.canvas1.offset();

      x = event.clientX + objCanvas.doc[0].body.scrollLeft
          + objCanvas.doc[0].documentElement.scrollLeft
          - Math.floor(posicaoOffset.left);

      y = event.clientY + objCanvas.doc[0].body.scrollTop
          + objCanvas.doc[0].documentElement.scrollTop
          - Math.floor(posicaoOffset.top) + 1;

      //Primeiro Link - backgroung
      if(x >= objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 189
        && x <= objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 465
        && y >= 235
        && y <= 250)
      {
        // window.location.href = linkBackground;
        window.open(linkBackground,'_blank');
      }
      //Botão 45°
      else if(x >= objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 200
        && x <= objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 455
        && y >= 260
        && y <= 280)
      {
        // window.location.href = linkFrame;
        window.open(linkFrame,'_blank');
      }
    });
  }


  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }
})();
