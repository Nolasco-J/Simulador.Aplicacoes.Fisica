"use strict";

// Namespace App - centralizando todo o código como um único objeto chamado App
var App = App || {};

App.ciclo = (function ()
{
  var objCanvas; 
  var objImagens; 
  var mensagem; 
  var primeiraTela; 

  //constantes
  var X_ZERO;
  var Y_ZERO;
  var RAIO;

  //Constantes numéricas - ângulos principais
  var CENTO_OITENTA = Math.PI;
  var TREZENTOS_SESSENTA = 2*Math.PI;

  $(document).ready( function()
  {
    //instância de singletons
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();

    //constantes para serem usadas pelas funções
    X_ZERO = objCanvas.canvasWidth/4 + objCanvas.canvasWidth/20 - 30;
    Y_ZERO = objCanvas.canvasHeight/2.1 + 20;
    RAIO = objCanvas.canvasHeight/3;
  })

  //- Primeria função executada, base para executar as demais
  //- Carrega todos os elementos iniciais
  //----------------------------------------------------------------------------
  // Primeira função - Início
  //----------------------------------------------------------------------------
  var inicio = function ()
  {
    document.getElementById("divEspelhoControles").style.display = 'none';
    document.getElementById("divControles").style.display = 'none';
    document.getElementById("divControlesAnima").style.display = 'none';
    document.getElementById("cvTrigonometrando3").style.display = 'none';

    App.teoria.pararAnimacao();//se houver algo rodando, pára
    App.aplicacoes.pararAnimacao();//se houver algo rodando, pára

    //quando início é executado, a primeira tela do módulo é renderizada
    //aqui, indica que é a primeira tela
    primeiraTela = true;

    //Ajusta eventos KeyDown e mouseDown
    ajustaKeyDown();
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

    //Imagem de Fundo
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "frame",
      5,
      5,
      objCanvas.canvasWidth - 5,
      objCanvas.canvasHeight - 5
    ]);

    //Desenha a circunferência inicial e todos os elementos relacionados
    //no canvas de baixo, para não ser redesenhado

    // Desenhando a circunferência
    App.strategiesTela.construtorArco.executa([
        "2",
        X_ZERO,
        Y_ZERO,
        RAIO,
        0,
        TREZENTOS_SESSENTA,
        "#FFF",
        4
    ]);

    //Eixo dos Cossenos
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)-(RAIO) + 1,
      Y_ZERO,
      (X_ZERO)+(RAIO) + 20,
      Y_ZERO,
      "#96f",
      4
    ]);
    //Seta do eixo dos cossenos
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 20,
      Y_ZERO,
      (X_ZERO)+(RAIO) + 10,
      Y_ZERO - 5,
      "#96f",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 20,
      Y_ZERO,
      (X_ZERO)+(RAIO) + 10,
      Y_ZERO + 5,
      "#96f",
      3
    ]);

    mensagem = "cos";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#96f",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+(RAIO) + 6,
      Y_ZERO + 17
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#96f",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+(RAIO) - 13,
      Y_ZERO + 17
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#96f",
      "Bold 16px Trebuchet MS",
      (X_ZERO)-(RAIO) + 4,
      Y_ZERO + 17
    ]);

    //Eixo dos Senos
    App.strategiesTela.construtorReta.executa([
      "2",
      X_ZERO,
      (Y_ZERO)-(RAIO) - 20,
      X_ZERO,
      (Y_ZERO)+(RAIO) + 1,
      "#0f0",
      4
    ]);
    //Seta do eixo dos senos
    App.strategiesTela.construtorReta.executa([
      "2",
      X_ZERO,
      (Y_ZERO)-(RAIO) - 20,
      X_ZERO - 5,
      (Y_ZERO)-(RAIO) - 10,
      "#0f0",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      X_ZERO,
      (Y_ZERO)-(RAIO) - 20,
      X_ZERO + 5,
      (Y_ZERO)-(RAIO) - 10,
      "#0f0",
      3
    ]);

    mensagem = "sen";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0f0",
      "Bold 16px Trebuchet MS",
      (X_ZERO) - 35,
      Y_ZERO - RAIO - 4
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0f0",
      "Bold 16px Trebuchet MS",
      (X_ZERO) - 13,
      Y_ZERO - RAIO + 17
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0f0",
      "Bold 16px Trebuchet MS",
      (X_ZERO) - 20,
      Y_ZERO + RAIO - 5
    ]);

    //Eixo das Tangentes
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO)+2,
      51,
      (X_ZERO)+(RAIO)+2,
      objCanvas.canvasHeight - 71,
      "#DAA520",
      4
    ]);
    //seta do eixo das Tangentes
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO)+2,
      51,
      (X_ZERO)+(RAIO) - 3,
      61,
      "#DAA520",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO)+2,
      51,
      (X_ZERO)+(RAIO) + 7,
      61,
      "#DAA520",
      3
    ]);

    mensagem = "tg";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#DAA520",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+(RAIO) + 6,
      80
    ]);

    //Ponto de Origem - 0
    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#CCF",
      "Bold 16px Trebuchet MS",
      (X_ZERO) - 12,
      Y_ZERO + 13
    ]);

    //Reta vermelha inicial
    //com as coordenadas para a reta vermelha (que delimita o ângulo),
    //em 0 graus
    reDesenha(X_ZERO + RAIO + 4, Y_ZERO, 0);

    //Imagem demonstrativa das Teclas direcionais (teclado)
    //imagem, x0, y0, x, y
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "teclas",
      (X_ZERO)+(2*RAIO) + 40,
      objCanvas.canvasHeight/4 - 5,
      RAIO/1.5,
      (RAIO/1.5)*0.64
    ]);

    mensagem = "Ciclo Trigonométrico";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 35px Trebuchet MS",
      (X_ZERO)+(RAIO) + 90,
      objCanvas.canvasHeight/4 - 35
    ]);

    mensagem = "Com as teclas direcionais do seu teclado";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO) + 90,
      objCanvas.canvasHeight/2 - 10
    ]);

     mensagem = "(imagem acima) você consegue interagir com";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO) + 60,
      objCanvas.canvasHeight/2 + 15
    ]);

    mensagem = "o ciclo e verificar as relações trigonométricas.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO) + 60,
      objCanvas.canvasHeight/2 + 40
    ]);

    mensagem = "Também pode usar os botões abaixo:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO) + 60,
      objCanvas.canvasHeight/2 + 65
    ]);

    //Botão 30°
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btTrinta",
      2*objCanvas.canvasWidth/3 -20,
      objCanvas.canvasHeight/2 + 125,
      60,
      40
    ]);
    //Botão 45°
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btQuarentaCinco",
      2*objCanvas.canvasWidth/3 + 65,
      objCanvas.canvasHeight/2 + 125,
      60,
      40
    ]);
    //Botão 60°
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSessenta",
      2*objCanvas.canvasWidth/3 + 150,
      objCanvas.canvasHeight/2 + 125,
      60,
      40
    ]);

  }// fim função início

  //Recebe as coordenadas para calcular o novo ponto
  //para a reta pontilhada que cruza a tangente, as coordenadas das demais retas
  //pontilhadas, da reta vermelha
  //Redesenha o ciclo completamente
  //----------------------------------------------------------------------------
  // Segunda função - reDesenha
  //----------------------------------------------------------------------------
  var reDesenha = function (pontoX, pontoY, angRad)
  {
    //limpeza inicial da tela, para reconstrução
    //somente o canvas superior
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight,
    ]);

    // chamada do novo ponto aqui para desenhar as retas pontilhadas
    var novoP = App.strategiesCalculadora.novoPonto.calcula([pontoX, pontoY, 0, X_ZERO, Y_ZERO, RAIO]);

    //Para a reta pontilhada laranja, somente se ângulo for diferente de 90
    //e de 270
    if(angRad!= (90*CENTO_OITENTA)/180 && angRad!= (270*CENTO_OITENTA)/180)
    {
      /*
      Desenhando a reta Laranja PONTILHADA
      */
      App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        pontoX,
        pontoY,
        novoP[0],
        novoP[1],
        "#DAA520",
        3,
        [5] //dashed
      ]);
    }

    //pontilhado até os senos ---> mesmo y, x0
      App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        X_ZERO,
        pontoY,
        pontoX,
        pontoY,
        "#090",  
        3,
        [5] //dashed
      ]);

      //pontilhado até os cossenos ---> mesmo x, y0
      App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        pontoX,
        Y_ZERO,
        pontoX,
        pontoY,
        "#96f",
        3,
        [5] //dashed
      ]);

    if(angRad>0 || angRad!=(359*CENTO_OITENTA)/180)
    {
    //Preenche o ângulo com arcos coloridos, para indicar a área que ele representa
        for(var i = RAIO - 2; i >= 4; i = i-4)
        {
          // Desenhando as circunferências
          App.strategiesTela.construtorArco.executa([
              "1",
              X_ZERO,
              Y_ZERO,
              i,
              0,
              angRad,
              "#FCF",
              0.7
          ]);
        }
    }

    //Reta Vermelha que delimita o ângulo
    //Por último, para ficar sobreposta aos demais
    App.strategiesTela.construtorReta.executa([
      "1",
      X_ZERO,
      Y_ZERO,
      pontoX,
      pontoY,
      "#B22222",
      4
    ]);
  }// Fim Função Redesenha

  // Recebe o valor do ângulo
  // chama a função para calcular seno, cosseno e tangente
  // Exibe na tela os valores (ângulo, seno, cosseno e tangente)

  //----------------------------------------------------------------------------
  // Terceira função - reEscreve
  //----------------------------------------------------------------------------
  var reEscreve = function (graus)
  {
    var rad = graus*CENTO_OITENTA/180;

    //Fundo Azul - Ângulo
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#006",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 30,
      2*(RAIO) + 90,
      30
    ]);

    //Valor ângulo
    mensagem = graus + "°  ||  " + parseFloat(rad.toFixed(5)) + " rad  ||  "
                     + parseFloat((rad/CENTO_OITENTA).toFixed(5)) + " π rad";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.5 + 20,
      objCanvas.canvasHeight/4 + 50
    ]);

    mensagem = "Medida do Ângulo: ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 18px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.5 - 10,
      objCanvas.canvasHeight/4 + 20
    ]);

    //Fundo Azul - Seno
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#006",
      (X_ZERO)+(RAIO)*1.75 - 65,
      objCanvas.canvasHeight/4 + 95,
      2*(RAIO) - 100,
      30
    ]);

    //valor Seno
    mensagem = App.strategiesTrigo.seno.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.75 + 50,
      objCanvas.canvasHeight/4 + 115
    ]);

    mensagem = "Seno:     ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0ff",
      "Bold 18px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 115
    ]);

    //Fundo Azul - Cosseno
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#006",
      (X_ZERO)+(RAIO)*1.75 - 65,
      objCanvas.canvasHeight/4 + 135,
      2*(RAIO) - 100,
      30
    ]);

    //valor cosseno
    mensagem = App.strategiesTrigo.cosseno.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.75 + 50,
      objCanvas.canvasHeight/4 + 155
    ]);

    mensagem = "Cosseno:  ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0ff",
      "Bold 18px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 155
    ]);

    //Fundo Azul - Tangente
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#006",
      (X_ZERO)+(RAIO)*1.75 - 65,
      objCanvas.canvasHeight/4 + 175,
      2*(RAIO) - 100,
      30
    ]);

    //valor Tangente
    mensagem = App.strategiesTrigo.tangente.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 20px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.75 + 50,
      objCanvas.canvasHeight/4 + 195
    ]);

    mensagem = "Tangente: ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0ff",
      "Bold 18px Trebuchet MS",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 195
    ]);

    //Fundo AZUL da Observação
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#006",
      (X_ZERO)+2.8*(RAIO) + 15,
      objCanvas.canvasHeight/4 + 95,
      185,
      110
    ]);

    mensagem = "Aqui, os valores são";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+2.8*(RAIO) + 25,
      objCanvas.canvasHeight/4 + 125
    ]);

    mensagem = "arredondados para até ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+2.8*(RAIO) + 25,
      objCanvas.canvasHeight/4 + 155
    ]);

    mensagem = "cinco casas decimais.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+2.8*(RAIO) + 25,
      objCanvas.canvasHeight/4 + 185
    ]);

  }//Fim Função reEscreve

  //----------------------------------------------------------------------------
  // Quarta Função - ajustaKeydown
  // Quando um botão do teclado é pressionado...
  // Caso seja seta para cima ou seta para baixo, segue:
  //----------------------------------------------------------------------------

  // Fora da função, pois deve guardar o valor final dentro da função
  //var angFinal = 0;
  var angFinal;

  var ajustaKeyDown = function ()
  {
    //desvincula os eventos existentes (todos os keydowns)
    objCanvas.doc.unbind("keydown");

    objCanvas.doc.on("keydown.ciclo", function (evt)
    {
      var angRad; // para uso interno na função

      // garante que o ângulo sempre comece em ZERO quando entrar no módulo
      if(primeiraTela)
      {
        angFinal = 0;
        primeiraTela = false;
      }

      switch (evt.keyCode) //Testa o código do evento do teclado
      {
        //
        /*
        código 40 -> seta para baixo --------------------------------------------
        Faz a reta andar no sentido antihorário, fazendo o ângulo decrescer
        */
        case 40:
          if(angFinal==360)
            angFinal=1;
          else
            angFinal++;

          if(angFinal==360)
            angRad = 0;

          else
            angRad = (angFinal*CENTO_OITENTA)/180;// valor corrigido, em Rad

          break;

        //
        /*
        seta para cima ----------------------------------------------
        */
        case 38:
          if(angFinal==0)
            angFinal=359;
          else
            angFinal--;

          //somente depois de tomada a decisão acima, aplica-se a decisão a seguir
          //para o angFinal atualizado
          if(angFinal==0)
            angRad = (360*CENTO_OITENTA)/180;

          else
            angRad = (angFinal*CENTO_OITENTA)/180;

          break;

        /*
        Para qualquer outra tecla, encerra a execução dessa função
        */
        default:
          return;
      }
      //chama função para calcular o ponto da reta vermelha,
      // para redesenhar e escreescrever
      var ponto = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, RAIO]);
      reDesenha(ponto[0], ponto[1], angRad);
      reEscreve(360-angFinal);
    });
  } //Fim ajustaKeydown

  /*
  // Função para detectar o clique e verificar se as coordenadas dele estão
  // dentro da área de algum dos botões,
  // para direcionar à ação adequada
  */
  //----------------------------------------------------------------------------
  // Quinta Função - ajustaMouseDown
  //----------------------------------------------------------------------------
  //
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();

    objCanvas.canvas1.bind("mousedown.Ciclo", function(event)
    {
      var x, y;

      var posicaoOffset = objCanvas.canvas1.offset();

      x = event.clientX + objCanvas.doc[0].body.scrollLeft
          + objCanvas.doc[0].documentElement.scrollLeft
          - Math.floor(posicaoOffset.left);

      y = event.clientY + objCanvas.doc[0].body.scrollTop
          + objCanvas.doc[0].documentElement.scrollTop
          - Math.floor(posicaoOffset.top) + 1;

      //Botão 30°
      if(x >= 2*objCanvas.canvasWidth/3 - 20
        && x <= 2*objCanvas.canvasWidth/3 + 40
        && y >= objCanvas.canvasHeight/2 + 125
        && y <= objCanvas.canvasHeight/2 + 165)

      {
        angFinal = 330;
        primeiraTela = false;
        var ponto = App.strategiesCalculadora.ponto.calcula([
          330*CENTO_OITENTA/180,
          X_ZERO,
          Y_ZERO,
          RAIO
        ]);
        reDesenha(ponto[0], ponto[1], 330*CENTO_OITENTA/180);
        reEscreve(360-angFinal);
      }
      //Botão 45°
      else if(x >= 2*objCanvas.canvasWidth/3 + 65
        && x <= 2*objCanvas.canvasWidth/3 + 125
        && y >= objCanvas.canvasHeight/2 + 125
        && y <= objCanvas.canvasHeight/2 + 165)
      {
        angFinal = 315;
        primeiraTela = false;
        var ponto = App.strategiesCalculadora.ponto.calcula([
          315*CENTO_OITENTA/180,
          X_ZERO,
          Y_ZERO,
          RAIO
        ]);
        reDesenha(ponto[0], ponto[1], 315*CENTO_OITENTA/180);
        reEscreve(360-angFinal);
      }
      //Botão 60°
      else if(x >= 2*objCanvas.canvasWidth/3 + 150
        && x <= 2*objCanvas.canvasWidth/3 + 210
        && y >= objCanvas.canvasHeight/2 + 125
        && y <= objCanvas.canvasHeight/2 + 165)
      {
        angFinal = 300;
        primeiraTela = false;
        var ponto = App.strategiesCalculadora.ponto.calcula([
          300*CENTO_OITENTA/180,
          X_ZERO,
          Y_ZERO,
          RAIO
        ]);
        reDesenha(ponto[0], ponto[1], 300*CENTO_OITENTA/180);
        reEscreve(360-angFinal);
      }
    });
  } //Fim ajustaMouseDown

  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }
})();
