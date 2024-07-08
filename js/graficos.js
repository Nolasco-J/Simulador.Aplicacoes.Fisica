"use strict";

// Namespace App - centralizando todo o código como um único objeto chamado App
var App = App || {};

App.graficos = (function ()
{
  var objCanvas; // para a instância de Singleton Canvas
  var objImagens; // para a instância de Singleton Imagens
  var mensagem; // para textos
  var X_ZERO; // constante para o módulo todo
  var Y_ZERO; // constante para o módulo todo
  var RAIO; // constante para o módulo todo
  var primeiraTela; // indica a primeira tela, para sempre começar com 0°

  //Constantes numéricas - ângulos principais
  var NOVENTA = Math.PI/2;
  var CENTO_OITENTA = Math.PI;
  var DUZENTOS_SETENTA = 3*Math.PI/2;
  var TREZENTOS_SESSENTA = 2*Math.PI;

  //Variáveis para o módulo completo
  var aux; //para qualquer ponto que necessite uma aux
  var amplitude; //para uso nos gráficos
  var x; //coordenada x dos gráficos e outras necessidades
  var y; //coordenada y dos gráficos e outras necessidades
  var x0; // coordenada x0 dos gráficos
  var y0; // coordenada y0 dos gráficos

  $(document).ready( function()
  {
    //instância de singletons
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
    document.getElementById("cvTrigonometrando3").style.display = 'none';

    //constantes para serem usadas pelas funções
    X_ZERO = objCanvas.canvasWidth/4 + objCanvas.canvasWidth/20 - 130;
    Y_ZERO = 3*objCanvas.canvasHeight/5 + 40;
    RAIO = objCanvas.canvasHeight/5;
  })

    /*
  - Única função a ser chamada de fora do módulo.
  - Primeria função executada, base para executar as demais
  - Carrega todos os elementos iniciais
  */
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

    //quando início é executado, a primeira tela do módulo é printada
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
    //limpeza inicial da tela, para reconstrução
    App.strategiesTela.limpaTela.executa([
      "2",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    //imagem, x0, y0, x, y
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "frame",
      5,
      5,
      objCanvas.canvasWidth - 5,
      objCanvas.canvasHeight - 5
    ]);

    /*
      Mensagem de Informação e Título
    */
    mensagem = "Gráficos";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 32px Trebuchet MS",
      140,
      65
    ]);

    mensagem = "Utilize as teclas direcionais";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 18px Trebuchet MS",
      90,
      95
    ]);
    mensagem = "do seu teclado para interagir.";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 18px Trebuchet MS",
      90,
      120
    ]);

    //Fundo AZUL - valores ângulo e funções
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#006",
      55,
      140,
      objCanvas.canvasWidth/2 - 185,
      60,
    ]);

    // Desenhando a circunferência
    // no fundo, pois não precisa redesenhar
    App.strategiesTela.construtorArco.executa([
        "2",
        X_ZERO,
        Y_ZERO,
        RAIO,
        0,
        TREZENTOS_SESSENTA,
        "#fff",
        3
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
    //Seta do eixo dos Cossenos
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
      (X_ZERO)+(RAIO) + 4,
      Y_ZERO + 18
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#96f",
      "Bold 12px Trebuchet MS",
      (X_ZERO)+(RAIO) - 10,
      Y_ZERO + 13
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#96f",
      "Bold 12px Trebuchet MS",
      (X_ZERO)-(RAIO) + 2,
      Y_ZERO + 13
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
    //Seta do eixo SENO
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
      Y_ZERO - RAIO - 2
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0f0",
      "Bold 12px Trebuchet MS",
      (X_ZERO) - 9,
      Y_ZERO - RAIO + 12
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0f0",
      "Bold 12px Trebuchet MS",
      (X_ZERO) - 13,
      Y_ZERO + RAIO - 3
    ]);

    //Eixo das Tangentes
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 2,
      (Y_ZERO)-(RAIO) - 20,
      (X_ZERO)+(RAIO) + 2,
      (Y_ZERO)+(RAIO) + 10,
      "#DAA520",
      4
    ]);
    //Seta do eixo Tangente
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 2,
      (Y_ZERO)-(RAIO) - 20,
      (X_ZERO)+(RAIO) - 3,
      (Y_ZERO)-(RAIO) - 10,
      "#DAA520",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 2,
      (Y_ZERO)-(RAIO) - 20,
      (X_ZERO)+(RAIO) + 7,
      (Y_ZERO)-(RAIO) - 10,
      "#DAA520",
      3
    ]);

    mensagem = "tg";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#DAA520",
      "Bold 16px Trebuchet MS",
      (X_ZERO)+(RAIO) + 4,
      (Y_ZERO)-(RAIO) + 7,
    ]);

    //Ponto 0
    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#CCF",
      "Bold 14px Trebuchet MS",
      X_ZERO - 10,
      Y_ZERO + 15
    ]);

    //SENO

    //Fundo do gráfico do Seno
    //cor, x0, y0, x, y
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#006",
      objCanvas.canvasWidth/2 - 120,
      objCanvas.canvasHeight/2 - 190,
      objCanvas.canvasWidth/2 + 260 - (objCanvas.canvasWidth/2),
      objCanvas.canvasHeight/2 + 190 - (objCanvas.canvasHeight/2)
    ]);

    //mensagem título do gráfico
    mensagem = "f(x)=sen x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#f00",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 60,
      objCanvas.canvasHeight/2 - 165,
    ]);

    //Eixos do gráfico do seno

    //Eixo X ----->SENO
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 100,
      objCanvas.canvasHeight/2 - 95,
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 - 95,
      "#fff",
      1
    ]);

    //seta do eixo x
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 - 95,
      objCanvas.canvasWidth/2 + 115,
      objCanvas.canvasHeight/2 - 90,
      "#fff",
      1
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 - 95,
      objCanvas.canvasWidth/2 + 115,
      objCanvas.canvasHeight/2 - 100,
      "#fff",
      1
    ]);

    //mensagem do eixo x
    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 - 80,
    ]);

    //Eixo Y ----->SENO
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 - 170,
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 - 35,
      "#fff",
      1
    ]);

    //seta do eixo y
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 - 170,
      objCanvas.canvasWidth/2 - 85,
      objCanvas.canvasHeight/2 - 165,
      "#fff",
      1
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 - 170,
      objCanvas.canvasWidth/2 - 75,
      objCanvas.canvasHeight/2 - 165,
      "#fff",
      1
    ]);

    //mensagem do eixo y
    mensagem = "f(x)";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 - 110,
      objCanvas.canvasHeight/2 - 160,
    ]);

    //marcação do eixo y

    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 - 90,
      - Math.round(Math.sin(0)*50) + objCanvas.canvasHeight/2 - 83,
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 - 95,
      - Math.round(Math.sin(NOVENTA)*50) + objCanvas.canvasHeight/2 - 90,
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 85,
      - Math.round(Math.sin(NOVENTA)*50) + objCanvas.canvasHeight/2 - 95,
      objCanvas.canvasWidth/2 - 75,
      - Math.round(Math.sin(NOVENTA)*50) + objCanvas.canvasHeight/2 - 95,
      "#fff",
      1
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 - 100,
      - Math.round(Math.sin(DUZENTOS_SETENTA)*50) + objCanvas.canvasHeight/2 - 90,
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 85,
      - Math.round(Math.sin(DUZENTOS_SETENTA)*50) + objCanvas.canvasHeight/2 - 95,
      objCanvas.canvasWidth/2 - 75,
      - Math.round(Math.sin(DUZENTOS_SETENTA)*50) + objCanvas.canvasHeight/2 - 95,
      "#000",
      1
    ]);

    //Pontilhados indicativos Arco no gráfico

    //pontilhado π/2
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        NOVENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 150,
        NOVENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 35,
        "#ccc",
        1,
        [5]
      ]);
mensagem = "π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      NOVENTA * 150/5 + objCanvas.canvasWidth/2 - 90,
      objCanvas.canvasHeight/2 - 20
    ]);
//pontilhado π
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 150,
        CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 35,
        "#ccc",
        1,
        [5]
      ]);
mensagem = "π";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 - 85,
      objCanvas.canvasHeight/2 - 20
    ]);
//pontilhado 3π/2
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 150,
        DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 35,
        "#ccc",
        1,
        [5]
      ]);
mensagem = "3π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 - 95,
      objCanvas.canvasHeight/2 - 20
    ]);
//pontilhado 2π
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 150,
        TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 35,
        "#ccc",
        1,
        [5]
      ]);
mensagem = "2π";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 90,
      objCanvas.canvasHeight/2 - 20
    ]);


    /*
    // Curva - SENO
    */
    x0 = TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 80;
    y0 = objCanvas.canvasHeight/2 - 95;
    aux = 0;
    amplitude = 0;

    // de 0 a 360º (*150 --> para interpolação - melhora a definição da imagem)
    // aux --> altura, abertura em y

    for(aux=TREZENTOS_SESSENTA * 150; aux >= 0; aux = aux - 2)
    {
        //amplitude é a abertura em x --> cresce ou decresce y para alterar
        //a abertura x
        //*50 -> escala -> de 50 em 50 px
        amplitude = - Math.round(Math.sin(aux/150)*50);

        x = aux/5 + objCanvas.canvasWidth/2 - 80;
        y = amplitude + objCanvas.canvasHeight/2 - 95;

        App.strategiesTela.construtorReta.executa([
          "2",
          x0,
          y0,
          x,
          y,
          "#0f0",
          2.5
        ]);

        x0 = x;
        y0 = y;
    }

    //COSSENO

    //Fundo do gráfico do COsseno
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#006",
      objCanvas.canvasWidth/2 - 120,
      objCanvas.canvasHeight/2 + 15,
      objCanvas.canvasWidth/2 + 260 - (objCanvas.canvasWidth/2),
      objCanvas.canvasHeight/2 + 185 - (objCanvas.canvasHeight/2)
    ]);

    //mensagem título do gráfico
    mensagem = "f(x)=cos x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#f00",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 60,
      objCanvas.canvasHeight/2 + 40,
    ]);

    //Eixos do gráfico da cosseno

    //Eixo X ----->COSSENO
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 100,
      objCanvas.canvasHeight/2 + 110,
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 + 110,
      "#fff",
      1
    ]);
    //seta eixo X
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 + 110,
      objCanvas.canvasWidth/2 + 115,
      objCanvas.canvasHeight/2 + 105,
      "#fff",
      1
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 + 110,
      objCanvas.canvasWidth/2 + 115,
      objCanvas.canvasHeight/2 + 115,
      "#fff",
      1
    ]);

    //mensagem do eixo x
    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 120,
      objCanvas.canvasHeight/2 + 125,
    ]);

    //Eixo Y ----->COSSENO
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 + 35,
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 + 170,
      "#fff",
      1
    ]);
    //seta eixo y
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 + 35,
      objCanvas.canvasWidth/2 - 85,
      objCanvas.canvasHeight/2 + 40,
      "#fff",
      1
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      objCanvas.canvasHeight/2 + 35,
      objCanvas.canvasWidth/2 - 75,
      objCanvas.canvasHeight/2 + 40,
      "#fff",
      1
    ]);

    //mensagem do eixo y
    mensagem = "f(x)";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 - 110,
      objCanvas.canvasHeight/2 + 45,
    ]);

    //marcação do eixo y

    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 - 90,
      objCanvas.canvasHeight/2 + 121,
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 - 95,
      - Math.round(Math.cos(TREZENTOS_SESSENTA)*50) + objCanvas.canvasHeight/2 + 115,
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 85,
      - Math.round(Math.cos(TREZENTOS_SESSENTA)*50) + objCanvas.canvasHeight/2 + 110,
      objCanvas.canvasWidth/2 - 75,
      - Math.round(Math.cos(TREZENTOS_SESSENTA)*50) + objCanvas.canvasHeight/2 + 110,
      "#fff",
      1
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 - 100,
      - Math.round(Math.cos(CENTO_OITENTA)*50) + + objCanvas.canvasHeight/2 + 115,
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 85,
      - Math.round(Math.cos(CENTO_OITENTA)*50) + objCanvas.canvasHeight/2 + 110,
      objCanvas.canvasWidth/2 - 75,
      - Math.round(Math.cos(CENTO_OITENTA)*50) + objCanvas.canvasHeight/2 + 110,
      "#fff",
      1
    ]);

    //Pontilhados indicativos Arco no gráfico

    //pontilhado π/2
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        NOVENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 55,
        NOVENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 175,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      NOVENTA * 150/5 + objCanvas.canvasWidth/2 - 90,
      objCanvas.canvasHeight/2 + 185
    ]);

    //pontilhado π
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 55,
        CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 175,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "π";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 - 85,
      objCanvas.canvasHeight/2 + 185
    ]);

    //pontilhado 3π/2
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 55,
        DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 175,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "3π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 - 95,
      objCanvas.canvasHeight/2 + 185
    ]);

    //pontilhado 2π
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 55,
        TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 175,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "2π";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 90,
      objCanvas.canvasHeight/2 + 185
    ]);

    /*
    // Curva - COSSENO
    */
    x0 = TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 - 80;
    y0 = - Math.round(Math.cos(0/150)*50) + objCanvas.canvasHeight/2 + 110;
    aux = 0;
    amplitude = 0;

    // de 0 a 360º (*150 --> para interpolação - melhora a definição da imagem)
    // aux --> altura, abertura em y

     for(aux = TREZENTOS_SESSENTA * 150; aux >= 0; aux = aux - 2)
     {
        //amplitude é a abertura em x --> cresce ou decresce y para alterar
        //a abertura x
        //*50 -> escala -> de 50 em 50 px
        amplitude = - Math.round(Math.cos(aux/150)*50);

        x = aux/5 + objCanvas.canvasWidth/2 - 80;
        y = amplitude + objCanvas.canvasHeight/2 + 110;

        App.strategiesTela.construtorReta.executa([
          "2",
          x0,
          y0,
          x,
          y,
          "#96f",
          2.5
        ]);

        x0 = x;
        y0 = y;
     }

     //TANGENTE

    //Fundo do gráfico do Tangente
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#006",
      objCanvas.canvasWidth/2 + 155,
      objCanvas.canvasHeight/2 - 180,
      objCanvas.canvasWidth/2 + 440 - (objCanvas.canvasWidth/2 + 160),
      objCanvas.canvasHeight/2 + 160 - (objCanvas.canvasHeight/2 - 205)
    ]);

    //mensagem título do gráfico
    mensagem = "f(x)=tan x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#f00",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 355,
      objCanvas.canvasHeight/2 - 155,
    ]);

    //Eixos do gráfico da tangente

    //Eixo X
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 175,
      objCanvas.canvasHeight/2,
      objCanvas.canvasWidth/2 + 415,
      objCanvas.canvasHeight/2,
      "#fff",
      1
    ]);

    //seta do eixo x
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 415,
      objCanvas.canvasHeight/2,
      objCanvas.canvasWidth/2 + 410,
      objCanvas.canvasHeight/2 + 5,
      "#fff",
      1
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 415,
      objCanvas.canvasHeight/2,
      objCanvas.canvasWidth/2 + 410,
      objCanvas.canvasHeight/2 - 5,
      "#fff",
      1
    ]);
    //mensagem do eixo x
    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 415,
      objCanvas.canvasHeight/2 + 15,
    ]);

    //Eixo Y
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 195,
      objCanvas.canvasHeight/2 - 145,
      objCanvas.canvasWidth/2 + 195,
      objCanvas.canvasHeight/2 + 145,
      "#fff",
      1
    ]);
    //seta do eixo y
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 195,
      objCanvas.canvasHeight/2 - 145,
      objCanvas.canvasWidth/2 + 200,
      objCanvas.canvasHeight/2 - 140,
      "#fff",
      1
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 195,
      objCanvas.canvasHeight/2 - 145,
      objCanvas.canvasWidth/2 + 190,
      objCanvas.canvasHeight/2 - 140,
      "#fff",
      1
    ]);

    //mensagem do eixo y
    mensagem = "f(x)";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + 165,
      objCanvas.canvasHeight/2 - 145,
    ]);

    //marcação do eixo y

    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 + 185,
      - Math.round(Math.tan(TREZENTOS_SESSENTA)*50) + objCanvas.canvasHeight/2 + 13,
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 + 180,
      - Math.round(Math.tan(CENTO_OITENTA/4)*50) + objCanvas.canvasHeight/2 + 5,
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 190,
      - Math.round(Math.tan(CENTO_OITENTA/4)*50) + objCanvas.canvasHeight/2,
      objCanvas.canvasWidth/2 + 200,
      - Math.round(Math.tan(CENTO_OITENTA/4)*50) + objCanvas.canvasHeight/2,
      "#fff",
      1
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 14px Trebuchet MS",
      objCanvas.canvasWidth/2 + 175,
      - Math.round(Math.tan(3*CENTO_OITENTA/4)*50) + objCanvas.canvasHeight/2 + 5,
    ]);

    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 + 190,
      - Math.round(Math.tan(3*CENTO_OITENTA/4)*50) + objCanvas.canvasHeight/2,
      objCanvas.canvasWidth/2 + 200,
      - Math.round(Math.tan(3*CENTO_OITENTA/4)*50) + objCanvas.canvasHeight/2,
      "#fff",
      1
    ]);

     //Pontilhados indicativos Arco no gráfico

    //pontilhado π/2
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        NOVENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 - 145,
        NOVENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 + 155,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      NOVENTA * 150/5 + objCanvas.canvasWidth/2 + 185,
      objCanvas.canvasHeight/2 + 170
    ]);

    //pontilhado π
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 - 145,
        CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 + 155,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "π";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      CENTO_OITENTA * 150/5 + objCanvas.canvasWidth/2 + 190,
      objCanvas.canvasHeight/2 + 170
    ]);

    //pontilhado 3π/2
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 - 145,
        DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 + 155,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "3π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      DUZENTOS_SETENTA * 150/5 + objCanvas.canvasWidth/2 + 180,
      objCanvas.canvasHeight/2 + 170
    ]);

    //pontilhado 2π
    App.strategiesTela.construtorRetaPontilhada.executa([
        "2",
        TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 - 145,
        TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 + 195,
        objCanvas.canvasHeight/2 + 155,
        "#ccc",
        1,
        [5]
      ]);

    mensagem = "2π";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      TREZENTOS_SESSENTA * 150/5 + objCanvas.canvasWidth/2 + 185,
      objCanvas.canvasHeight/2 + 170
    ]);

    /*
    // Primeira curva - TANGENTE
    */
    // "a" começando em 0, indo até 90 graus (na verdade, antes de chegar em 90,
    // pois não existe tangente de 90)
    aux = 0;
    amplitude = 0;

    x0 = (71*CENTO_OITENTA/180) * 150/5 + objCanvas.canvasWidth/2 + 195;
    y0 = - Math.round(Math.tan(71*CENTO_OITENTA/180)*50) + objCanvas.canvasHeight/2;

    //de 0 a 70º
    //começando em 70 graus -- parte visível da curva da tangente
    for(aux = (71*CENTO_OITENTA/180) * 150; aux >=0; aux = aux - 2)
    {

        amplitude = - Math.round(Math.tan(aux/150)*50);

        x = aux/5 + objCanvas.canvasWidth/2 + 195;
        y = amplitude + objCanvas.canvasHeight/2;

        App.strategiesTela.construtorReta.executa([
          "2",
          x0,
          y0,
          x,
          y,
          "#DAA520",
          2.5
        ]);

        x0 = x;
        y0 = y;
     }//fim curva 1 - tangente

    /*
    //Segunda Curva - TANGENTE
    */
    //"aux" começando em 91 graus, aumentado 150 vezes pela interpolação
    aux = (NOVENTA + CENTO_OITENTA/180) * 150;
    amplitude = 0;

    x0 = (251*CENTO_OITENTA/180) * 150/5 + objCanvas.canvasWidth/2 + 195;
    y0 = - Math.round(Math.tan(251*CENTO_OITENTA/180)*50) + objCanvas.canvasHeight/2;

    // de 109 a 251 graus (pois em 270, não existe tangente e tbm parte visível)
    // somente parte visível do gráfico
    for(aux = (251*CENTO_OITENTA/180) * 150; aux >=(109*CENTO_OITENTA/180) * 150; aux = aux - 2)
    {
        amplitude = - Math.round(Math.tan(aux/150)*50);

        x = aux/5 + objCanvas.canvasWidth/2 + 195;
        y = amplitude + objCanvas.canvasHeight/2;

        App.strategiesTela.construtorReta.executa([
          "2",
          x0,
          y0,
          x,
          y,
          "#DAA520",
          2.5
        ]);

        x0 = x;
        y0 = y;
     }//fim curva 2 - tangente

     /*
     //Terceira Curva - TANGENTE
     */
     // "aux" começando em 269 graus aumentado 150 vezes (interpolação)
    aux = (DUZENTOS_SETENTA + CENTO_OITENTA/180) * 150;
    amplitude = 0;

    x0 = TREZENTOS_SESSENTA*150/5 + objCanvas.canvasWidth/2 + 195;
    y0 = - Math.round(Math.tan(TREZENTOS_SESSENTA)*50) + objCanvas.canvasHeight/2;

    //de 289 até 360 graus --> parte visível do gráfico somente
    for(aux = TREZENTOS_SESSENTA*150; aux >=(289*CENTO_OITENTA/180) * 150; aux = aux - 2)
    {
        amplitude = - Math.round(Math.tan(aux/150)*50);

        x = aux/5 + objCanvas.canvasWidth/2 + 195;
        y = amplitude + objCanvas.canvasHeight/2;

        App.strategiesTela.construtorReta.executa([
          "2",
          x0,
          y0,
          x,
          y,
          "#DAA520",
          2.5
        ]);

        x0 = x;
        y0 = y;
     } //fim curva 3 - tangente

    //Desenha os demais elementos (dinâmicos) em tela,
    //em 0 graus
    reDesenha(X_ZERO + RAIO + 4, Y_ZERO, 0);

    //Printa o texto inicial na tela
    reEscreve(0);
  }

  /*
  //Recebe as coordenadas do novo ponto (ou chama pra calcular aqui dentro esse)
  //para a reta pontilhada que cruza a tangente, as coordenadas das demais retas
  //pontilhadas, da reta vermelha
  //Redesenha o ciclo completamente
  */
  //----------------------------------------------------------------------------
  // Segunda função - reDesenha
  //----------------------------------------------------------------------------
  var reDesenha = function (pontoX, pontoY, angRad)
  {
    //limpeza inicial da tela, para reconstrução
    //somente a tela superior
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    /*
    elementos da CIRCUNFERENCIA TRIGONOMETRICA
    */

    // chamada do novo ponto aqui para desenhar as retas pontilhadas
    var novoP = App.strategiesCalculadora.novoPonto.calcula([
      pontoX,
      pontoY,
      (Y_ZERO)-(RAIO)-60,
      X_ZERO,
      Y_ZERO,
      RAIO
    ]);

    /*
      Para a reta pontilhada laranja, somente se ângulo for diferente de 90
      e de 270
    */
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
        "#0f0",
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
        for(aux = RAIO - 2; aux >= 5; aux = aux - 4)
        {
          // Desenhando os arcos (ângulo)
          App.strategiesTela.construtorArco.executa([
              "1",
              X_ZERO,
              Y_ZERO,
              aux,
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
    // FIM CIRCUNFERENCIA TRIGONOMETRICA

    /*
    // Gráfico SENO
    */

    //PONTO sobre curva SENO
    //corrigindo caso seja 0 ou 360 graus
    aux = angRad;

    if(aux == 0 || aux == TREZENTOS_SESSENTA)
    {
      aux = TREZENTOS_SESSENTA - aux;
    }
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.sin(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 - 95,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        3
    ]);

    //pontilhado vermelho do ponto sobre a curva até os eixos
    // ----do ponto ao eixo x
    App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.sin(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 - 95,
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 - 95,
        "#f00",
        2,
        [5]
      ]);
    // ---- do ponto ao eixo y
    App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.sin(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 - 95,
        objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.sin(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 - 95,
        "#f00",
        2,
        [5]
      ]);

     // FIM - GRÁFICO SENO

    /*
    // Gráfico COSSENO
    */

     //PONTO sobre curva COSSENO
     //corrigindo caso seja 0 ou 360 graus
    aux = angRad;
    if(aux == 0 || aux == TREZENTOS_SESSENTA)
    {
      aux = TREZENTOS_SESSENTA - aux;
    }
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.cos(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 + 110,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        3
    ]);
    //pontilhado vermelho do ponto sobre a curva até os eixos
    // ----do ponto ao eixo x
    App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.cos(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 + 110,
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        objCanvas.canvasHeight/2 + 110,
        "#f00",
        2,
        [5]
      ]);
    // ---- do ponto ao eixo y
    App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.cos(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 + 110,
        objCanvas.canvasWidth/2 - 80,
        - Math.round(Math.cos(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2 + 110,
        "#f00",
        2,
        [5]
      ]);

     // FIM - GRÁFICO COSSENO

    /*
    // Gráfico TANGENTE
    */

    //PONTO sobre curva Tangente
    //tem que ser diferente de 90 e 270, e y dentro dos limites
    if(angRad != NOVENTA && angRad != DUZENTOS_SETENTA)
    {
      //corrigindo caso seja 0 ou 360 graus
      aux = angRad;
      if(aux == 0 || aux == TREZENTOS_SESSENTA)
      {
        aux = TREZENTOS_SESSENTA - aux;
      }
      y = - Math.round(Math.tan(TREZENTOS_SESSENTA - aux)*50) + objCanvas.canvasHeight/2;

      if(y >= objCanvas.canvasHeight/2 - 145 && y <= objCanvas.canvasHeight/2 + 145)
      {
        //ponto sobre curva tangente
        App.strategiesTela.construtorCirculo.executa([
            "1",
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            y,
            4,
            0,
            TREZENTOS_SESSENTA,
            "#f00",
            3
        ]);

        //enquanto o ponto vermelho sobre a curva for visível, os dois
        //pontilhados seguem normalmente
        //pontilhado vermelho do ponto sobre a curva até os eixos
        // ----do ponto ao eixo x
        App.strategiesTela.construtorRetaPontilhada.executa([
            "1",
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            y,
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            objCanvas.canvasHeight/2,
            "#f00",
            2,
            [5]
          ]);
        // ---- do ponto ao eixo y
        App.strategiesTela.construtorRetaPontilhada.executa([
            "1",
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            y,
            objCanvas.canvasWidth/2 + 195,
            y,
            "#f00",
            2,
            [5]
          ]);
      }
      else if(y < objCanvas.canvasHeight/2 - 145)
      {
        //Aqui, o ponto vermelho sobre a curva não é visível por questão
        //apenas de espaço, mas o pontilhado vermelho vertical continua visível,
        //mantido dentro do if para marcar o limite inferior máximo (y)
        //pontilhado vermelho do ponto sobre a curva até os eixos
        // ----do ponto ao eixo x
        App.strategiesTela.construtorRetaPontilhada.executa([
            "1",
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            objCanvas.canvasHeight/2 - 145,
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            objCanvas.canvasHeight/2,
            "#f00",
            2,
            [5]
          ]);
      }
      else
      {
        //Aqui, o ponto vermelho sobre a curva não é visível por questão
        //apenas de espaço, mas o pontilhado vermelho vertical continua visível,
        //mantido dentro do if para marcar o limite superior
        //pontilhado vermelho do ponto sobre a curva até os eixos
        // ----do ponto ao eixo x
        App.strategiesTela.construtorRetaPontilhada.executa([
            "1",
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            objCanvas.canvasHeight/2 + 145,
            (TREZENTOS_SESSENTA - aux)*150/5 + objCanvas.canvasWidth/2 + 195,
            objCanvas.canvasHeight/2,
            "#f00",
            2,
            [5]
          ]);
      }

    }
     // FIM - GRÁFICO TANGENTE
  }

  /*
  // Recebe o valor do ângulo em rad
  // chama a função para calcular seno, cosseno e tangente
  // Exibe na tela os valores (ângulo, seno, cosseno e tangente)
  */
  //----------------------------------------------------------------------------
  // Terceira Função - reEscreve
  //----------------------------------------------------------------------------
  var reEscreve = function (graus)
  {
    var rad = graus*CENTO_OITENTA/180;
    /*
      Valores (ângulo e funções)
    */

    //Ângulo em Graus
    mensagem ="Ângulo: "+ graus + "º";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      60,
      160
    ]);
    //Valor do SENO
    mensagem = "Seno: "+ App.strategiesTrigo.seno.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      205,
      160
    ]);
    //Valor do COSSENO
    mensagem ="Cosseno: "+App.strategiesTrigo.cosseno.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      60,
      190
    ]);
    //Valor do TANGENTE
    mensagem = "Tangente: " + App.strategiesTrigo.tangente.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      205,
      190
    ]);
  }

  /*
    Detecta botões do teclado pressionados
    Similar ao ajustaKeyDown do módulo CIclo
  */
  //----------------------------------------------------------------------------
  // Quarta Função - ajustaKeydown
  //----------------------------------------------------------------------------
 // Fora da função, pois deve guardar o valor final dentro da função
  var angFinal;
  var ajustaKeyDown = function ()
  {
    //Para garantir nenhuma sobreposição de ações do evento keydown,
    //prevenindo execuções em telas erradas,
    //desvincula os eventos existentes (todos os keydowns)
    objCanvas.doc.unbind("keydown");

    objCanvas.doc.on("keydown.graficos", function(evt)
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
          /*
          Como a coordenada Y no canvas é invertida em relação ao plano cartesiano,
          é preciso pensar no ciclo com sentido invertido.
          Quando o angFinal anterior for 360 (ou, corrigido o sentido,
          angFinal anterior = 0), queremos que o valor a seguir não seja mais
          acrescido, e sim que retorne ao valor inicial 1 (pois vamos trabalhar
          com ângulos apenas de 0 à 360).
          */
          if(angFinal==360)
            angFinal=1;
          else
            angFinal++;

          //somente depois de tomada a decisão acima, aplica-se a decisão a seguir
          //para o angFinal atualizado
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
          /*
          Como a coordenada Y no canvas é invertida em relação ao plano cartesiano,
          é preciso pensar no ciclo com sentido invertido.
          Quando o angFinal anterior for 0 (ou, corrigido o sentido,
          angFinal anterior = 360), queremos que o valor a seguir não seja mais
          descrescido, e sim que retorne ao valor 359 (pois vamos trabalhar
          com ângulos apenas de 0 à 360).
          */
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
  }

  /*
  // Função para detectar o clique e verificar se as coordenadas dele está
  // dentro da área de agum dos botões,
  // para direcionar à ação adequada
  */
  //----------------------------------------------------------------------------
  // Quinta Função -  ajustaMouseDown
  //----------------------------------------------------------------------------
  //
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();
  }

  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }

})();
