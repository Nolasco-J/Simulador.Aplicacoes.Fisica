"use strict";

var App = App || {};

App.teoria = (function ()
{
  var objCanvas; // para a instância de Singleton Canvas
  var objImagens; // para a instância de Singleton Imagens
  var xBtAvanca; // para facilitar as medidas dos botões
  var xBtVolta; // para facilitar as medidas dos botões
  var yBt; // para facilitar as medidas dos botões
  var hBotao; // para facilitar as medidas dos botões
  var wBotao; // para facilitar as medidas dos botões
  var funcaoAtual; // para saber em qual função (tela) está (direcionamento)
  var mensagem; // para textos no geral
  var i, aux; // auxiliar nas animações / loops
  var animacao; // para atribuir o requestAnimationFrame e tbm poder pará-lo
  var pararAnima; //para cancelAnimationFrame e poder parar fora do arquivo

  //Constantes numéricas - ângulos principais
  var GRAU = Math.PI/180;
  var CENTO_OITENTA = Math.PI;
  var TREZENTOS_SESSENTA = 2*Math.PI;

  $(document).ready( function()
  {
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();

    //para facilitar, já carrega as medidas fixas dos botões
    xBtAvanca = objCanvas.canvasWidth/2 + (objCanvas.canvasWidth/3.5) - 80;
    xBtVolta = objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3.5) - 60;
    yBt = objCanvas.canvasHeight/6 + 300;
    hBotao = objCanvas.canvasHeight/6 - 50;
    wBotao = objCanvas.canvasHeight/6 + 55;
  })

  //funcao para parar animações, inclusive fora do arquivo
  pararAnima = function(){
    if(animacao!=null)
      cancelAnimationFrame(animacao);
  }

  /*
  - Única função a ser chamada de fora do módulo.
  - Primeria função executada, base para executar as demais
  */
  //----------------------------------------------------------------------------
  // Primeira Tela da Teoria - Início
  //----------------------------------------------------------------------------
  var inicio = function ()
  {
    document.getElementById("divEspelhoControles").style.display = 'none';
    document.getElementById("divControles").style.display = 'none';

    pararAnima(); //caso alguma animação esteja rodando, pára!

    funcaoAtual = "inicio";

    ajustaKeyDown();
    ajustaMouseDown();

    /*
    //limpeza inicial da tela, para reconstrução
    */
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

    /*
    Chama botaoAvancar para desenhar o botao na tela
    */
    botaoAvancar();

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 50,
      "#f4f100",
      3
    ]);

    /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 40,
      "#e83131",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 35,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      "#e83131",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 35,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 40,
      "#e83131",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      "#e83131",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#edea10",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#edea10",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#edea10",
      2
    ]);

    /*
    Variáveis internas para função Anima
    */
    i = GRAU;// 1 Grau por vez
    aux = 0;

    /*
    Função Anima
    Cria a circunferência da ilustração, um grau por vez,
    Até 360 graus
    */
    function anima()
    {
      /*
      desenha o arco da ilustração
      */
      App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 40,
        objCanvas.canvasWidth/10,
        aux,
        TREZENTOS_SESSENTA - i,
        "#5c54cf",
        4
      ]);

      aux = TREZENTOS_SESSENTA - i + 0.009;
      i = i + GRAU;

      //requestAnimationFrame para gerar as repetições
      animacao = requestAnimationFrame(anima);
      /*
      quando i alcança 360 graus, para as repetições
      */
      if(i>TREZENTOS_SESSENTA)
      {
        pararAnima();
      }
    } //final da função Anima
    anima();

     /*
    Printa o texto na tela
    */
    //
    mensagem = "Trigonometria no Ciclo";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 42px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 40,
      objCanvas.canvasHeight/6 + 30
    ]);

    mensagem = "Aqui você pode consultar um resumo bem";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 80
    ]);

    mensagem = "sucinto dos tópicos básicos de trigonometria";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 30,
      objCanvas.canvasHeight/6 + 110
    ]);

    mensagem = "no ciclo, somente para refrescar a memória, ok?";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 30,
      objCanvas.canvasHeight/6 + 140
    ]);

    mensagem = "Assuntos:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 200
    ]);

    mensagem = "Arcos e Ângulos, Medidas, Circunferência,";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 230
    ]);

    mensagem = "Quadrantes, Funções Seno, Cosseno, Tangente";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 30,
      objCanvas.canvasHeight/6 + 260
    ]);

    mensagem = "e Arcos Notáveis.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 30,
      objCanvas.canvasHeight/6 + 290
    ]);
  }

  //----------------------------------------------------------------------------
  // Segunda Tela da Teoria - Arcos
  //----------------------------------------------------------------------------
  var arcos = function ()
  {
    funcaoAtual = "arcos";

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Desenhando o arco BA (azul)
    */
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth/4, //x
        objCanvas.canvasHeight/2.2 + 10, //y
        objCanvas.canvasWidth/10, //raio
        - CENTO_OITENTA/3 - 2*GRAU, //angulo inicial
        CENTO_OITENTA/6 + GRAU, //ângulo final
        "#5c54cf", //cor
        4 //espessura
    ]);

    /*
    Desenhando o ponto A
    */
    mensagem = "A";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/4 + objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/6 + 210
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth/4 + objCanvas.canvasWidth/10 - 15,
        objCanvas.canvasHeight/6 + 203,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto B
    */
    mensagem = "B";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/4 + objCanvas.canvasWidth/10 - 55,
      objCanvas.canvasHeight/6 + 55
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth/4 + objCanvas.canvasWidth/10 - 54,
        objCanvas.canvasHeight/6 + 63,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Variáveis internas para função Anima
    */
    i = GRAU;
    aux = CENTO_OITENTA/6;

    /*
    Função Anima
    Cria o arco AB (vermelho) da ilustração, um grau por vez
    */
    function anima()
    {
      /*
      desenha o arco vermelho da ilustração
      */
      App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth/4,
        objCanvas.canvasHeight/2.2 + 10,
        objCanvas.canvasWidth/10,
        aux,
        aux - i,
        "#ff1d3d",
        4
      ]);

      aux = aux - i - 0.001;
      i = i + GRAU;

      animacao = requestAnimationFrame(anima);
      /*
      quando i alcança o ponto B, limpa o intervalo para parar as repetições
      */
      if(aux <= -CENTO_OITENTA/3)
      {
        pararAnima();
      }
    } //final da função Anima
    anima();
     /*
    Printa o texto na tela
    */
    //
    mensagem = "1 - Arcos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 34px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Arco de circunferência é cada uma";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 + 30,
      objCanvas.canvasHeight/6 + 50
    ]);

    mensagem = " das partes em que uma circunferência";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2,
      objCanvas.canvasHeight/6 + 80
    ]);

    mensagem = " fica dividida por dois de seus pontos.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2,
      objCanvas.canvasHeight/6 + 110
    ]);

    mensagem = "Na figura ao lado, A e B são as";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 + 30,
      objCanvas.canvasHeight/6 + 160
    ]);

    mensagem = "extremidades do arco AB (vermelho),";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 ,
      objCanvas.canvasHeight/6 + 190
    ]);

    mensagem = "\u25e0"; //arco sobre AB no símbolo
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 + 220,
      objCanvas.canvasHeight/6 + 180
    ]);

    mensagem = "e do arco BA (azul).";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2,
      objCanvas.canvasHeight/6 + 220
    ]);

    mensagem = "\u25e0"; //arco sobre BA no símbolo
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 + 105,
      objCanvas.canvasHeight/6 + 210
    ]);
  }

  //----------------------------------------------------------------------------
  // Terceira Tela da Teoria - Ângulo Central
  //----------------------------------------------------------------------------
  var anguloCentral = function ()
  {
    funcaoAtual = "anguloCentral";

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Desenhando o arco BA (azul)
    */
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth/4 * 3,
        objCanvas.canvasHeight/2.5 + 10,
        objCanvas.canvasWidth/10,
        TREZENTOS_SESSENTA - CENTO_OITENTA/3 - 2*GRAU,
        CENTO_OITENTA/6,
        "#5c54cf",
        4
    ]);

    /*
      desenha o arco vermelho da ilustração
      */
      App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth/4 * 3,
        objCanvas.canvasHeight/2.5 + 10,
        objCanvas.canvasWidth/10,
        CENTO_OITENTA/6,
        -CENTO_OITENTA/3 - 2*GRAU,
        "#ff1d3d",
        4
    ]);

    /*
      desenha as retas da ilustração (do centro aos pontos A e B)
      */
      App.strategiesTela.construtorReta.executa([
        "1",
        objCanvas.canvasWidth/4 * 3 + objCanvas.canvasWidth/10 - 16,
        objCanvas.canvasHeight/6 + 173,
        objCanvas.canvasWidth/4 * 3,
        objCanvas.canvasHeight/2.5 + 10,
        "#cbe2a4",
        3
      ]);

      App.strategiesTela.construtorReta.executa([
        "1",
        objCanvas.canvasWidth/4 * 3 + objCanvas.canvasWidth/10 - 55,
        objCanvas.canvasHeight/6 + 39,
        objCanvas.canvasWidth/4 * 3,
        objCanvas.canvasHeight/2.5 + 10,
        "#cbe2a4",
        3
      ]);

    /*
    Desenhando o ponto A
    */
    mensagem = "A";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/4 * 3 + objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/6 + 183
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth/4 * 3 + objCanvas.canvasWidth/10 - 14,
        objCanvas.canvasHeight/6 + 175,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto B
    */
    mensagem = "B";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/4 * 3 + objCanvas.canvasWidth/10 - 55,
      objCanvas.canvasHeight/6 + 25
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth/4 * 3 + objCanvas.canvasWidth/10 - 54,
        objCanvas.canvasHeight/6 + 36,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto O
    */
    mensagem = "O";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/4 * 3 - 20,
      objCanvas.canvasHeight/2.5 + 20
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth/4 * 3,
        objCanvas.canvasHeight/2.5 + 10,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando a marca AÔB
    */
    mensagem = "AÔB";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth/4 * 3 + (objCanvas.canvasWidth/10 / 4) + 5,
      objCanvas.canvasHeight/2.5
    ]);

    /*
    Variáveis internas para função Anima
    */
    i = GRAU;
    aux = CENTO_OITENTA/6;
    /*
    Função Anima
    Cria o arco AB (vermelho) da ilustração, um grau por vez
    */
    function anima()
    {
      /*
      desenha o arco vermelho da ilustração
      */
      App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth/4 * 3,
        objCanvas.canvasHeight/2.5 + 10,
        objCanvas.canvasWidth/10 / 4,
        aux,
        aux - i,
        "#ff1d3d",
        3
      ]);

      aux = aux - i - 0.001;
      i = i + GRAU;

      animacao = requestAnimationFrame(anima);
      /*
      quando alcança a segunda reta, limpa o intervalo para parar as repetições
      */
      if(aux <= (- CENTO_OITENTA/3))
      {
        pararAnima();
      }
    } //final da função Anima
    anima();

    /*
    Printa o texto na tela
    */
    //
    mensagem = "2 - Ângulo Central";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Considerando o centro O da";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 30,
      objCanvas.canvasHeight/6 + 100
    ]);

    mensagem = "circunferência, se unirmos os";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 130
    ]);

    mensagem = "pontos A e B ao centro, teremos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 160
    ]);

    mensagem = "o ângulo central AÔB.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 190
    ]);
  }

  //----------------------------------------------------------------------------
  // Quarta Tela da Teoria - Medidas
  //----------------------------------------------------------------------------
  var medidas = function ()
  {
    funcaoAtual = "medidas";

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Printa o texto na tela
    */
    //
    mensagem = "3 - Medidas de Arcos e Ângulos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Utilizaremos o Grau e o Radiano para medir arcos e";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 210,
      objCanvas.canvasHeight/6 + 70
    ]);

    mensagem = "ângulos.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 180,
      objCanvas.canvasHeight/6 + 100
    ]);

    mensagem = "Uma volta completa na circunferência mede 360 graus";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 210,
      objCanvas.canvasHeight/6 + 130
    ]);

    mensagem = "(360°). Em radianos, isso equivale a 2 π radianos (2π rad).";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 180,
      objCanvas.canvasHeight/6 + 160
    ]);

    mensagem = "Sabendo disso, basta usar uma regra de três simples";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 210,
      objCanvas.canvasHeight/6 + 190
    ]);

    mensagem = "para converter valores entre essas unidades, quando";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 180,
      objCanvas.canvasHeight/6 + 220
    ]);

    mensagem = "necessário!";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 180,
      objCanvas.canvasHeight/6 + 250
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/7 - 60,
      objCanvas.canvasHeight/6 + 120,
      objCanvas.canvasWidth/7 + 170,
      objCanvas.canvasHeight/6 + 120,
      "#f66",
      3
    ]);

    mensagem = "360° = 2π rad";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 34px Trebuchet MS",
      objCanvas.canvasWidth/7 - 55,
      objCanvas.canvasHeight/6 + 160
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/7 - 60,
      objCanvas.canvasHeight/6 + 175,
      objCanvas.canvasWidth/7 + 170,
      objCanvas.canvasHeight/6 + 175,
      "#f66",
      3
    ]);

  }

  //----------------------------------------------------------------------------
  // Quinta Tela da Teoria - Circunferência
  //----------------------------------------------------------------------------
  var circunferencia = function ()
  {
    funcaoAtual = "circunferencia";

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 60,
      "#dedc28",
      3
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    /*
    Desenhando texto parte da imagem
    */
    mensagem = "r = 1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 18px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 70,
      objCanvas.canvasHeight/3 + 70,
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 - 12,
      objCanvas.canvasHeight/3 + 45
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 70
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 + 45
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 40
    ]);

    /*
    Desenhando o ponto A
    */
    mensagem = "A(1,0)";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 18px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 + 75
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10,
        objCanvas.canvasHeight/3 + 50,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto O
    */
    mensagem = "O";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 18px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 + 45,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 50,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Variáveis internas para função Anima
    */
    i = 3*GRAU;// 1 Grau por vez
    aux = TREZENTOS_SESSENTA  - i;
    /*
    Função Anima
    Cria a circunferência da ilustração, um grau por vez,
    Até 360 graus
    */
    function anima()
    {
      /*
      desenha o arco da ilustração
      */
      App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 50,
        objCanvas.canvasWidth/10,
        aux,
        TREZENTOS_SESSENTA - i,
        "#5c54cf",
        4
      ]);

      aux = TREZENTOS_SESSENTA - i + 0.009;
      i = i + GRAU;

      animacao = requestAnimationFrame(anima);
      /*
      quando i alcança 360 graus, limpa o intervalo para parar as repetições
      */
      if(i>TREZENTOS_SESSENTA - 2*GRAU)
      {
        pararAnima();
      }
    } //final da função Anima
    anima();

    /*
    Printa o texto na tela
    */
    //
    mensagem = "4 - O Ciclo";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Ciclo Trigonométrico ou Circunferência Trigonométrica ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 60
    ]);

    mensagem = "é uma circunferência de raio unitário (raio = 1) orientada";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 90,
      objCanvas.canvasHeight/6 + 90
    ]);

    mensagem = "(que tem um sentido positivo de percurso) em sentido";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 90,
      objCanvas.canvasHeight/6 + 120
    ]);

    mensagem = "anti-horário, cujo ponto de origem O é, também, a origem";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 90,
      objCanvas.canvasHeight/6 + 150
    ]);

    mensagem = "de um sistema de coordenadas cartesianas.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 90,
      objCanvas.canvasHeight/6 + 180
    ]);

    mensagem = "O ponto A(1,0) é a Origem dos Arcos, pois é o ponto";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 220
    ]);

     mensagem = "inicial para todos os Arcos Trigonométricos.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 90,
      objCanvas.canvasHeight/6 + 250
    ]);
  }

  //----------------------------------------------------------------------------
  // Sexta Tela da Teoria - Quadrantes
  //----------------------------------------------------------------------------
  var quadrantes = function ()
  {
    funcaoAtual = "quadrantes";

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

     /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 70,
      objCanvas.canvasWidth/3,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 90,
      "#f64c64",
      3
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 80,
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 80,
      "#25b81e",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 75,
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 85,
      "#25b81e",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 75,
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 80,
      "#25b81e",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 80,
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 85,
      "#25b81e",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 70,
      objCanvas.canvasWidth/3 + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 70,
      "#c83f52",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 70,
      objCanvas.canvasWidth/3,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 60,
      "#c83f52",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth/3 + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 70,
      objCanvas.canvasWidth/3,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 60,
      "#c83f52",
      2
    ]);

    /*
    Desenhando texto parte da imagem
    */
    mensagem = "X";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 + 15,
      objCanvas.canvasHeight/3 + 107
    ]);

    mensagem = "y";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/3 + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 60
    ]);

    /*
    Variáveis internas para função Anima
    */
    i = GRAU;// 1 Grau por vez
    var aux = 0;
    /*
    Função Anima
    Cria a circunferência da ilustração, um grau por vez,
    Até 360 graus
    */
    function anima()
    {
      /*
      desenha o arco da ilustração
      */
      App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth/3,
        objCanvas.canvasHeight/3 + 80,
        objCanvas.canvasWidth/10,
        aux,
        TREZENTOS_SESSENTA - i,
        "#5c54cf",
        4
      ]);

      aux = TREZENTOS_SESSENTA - i + 0.009;
      i = i + GRAU;

      animacao = requestAnimationFrame(anima);
      /*
      quando i alcança 360 graus, limpa o intervalo para parar as repetições
      */
      if(i>TREZENTOS_SESSENTA)
      {
        pararAnima();
      }
    } //final da função Anima
    anima();

    /*
    Printa o texto na tela
    */
    //
    mensagem = "5 - Quadrantes";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "As retas X e Y dividem";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      2*objCanvas.canvasWidth/3,
      objCanvas.canvasHeight/6 + 90
    ]);

    mensagem = "a circunferência em quatro";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      2*objCanvas.canvasWidth/3 - 30,
      objCanvas.canvasHeight/6 + 120
    ]);

    mensagem = "partes iguais, chamadas ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      2*objCanvas.canvasWidth/3 - 30,
      objCanvas.canvasHeight/6 + 150
    ]);

    mensagem = "Quadrantes.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      2*objCanvas.canvasWidth/3 - 30,
      objCanvas.canvasHeight/6 + 180
    ]);

    mensagem = "Primeiro Quadrante";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 20px Trebuchet MS",
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 - 12,
      objCanvas.canvasHeight/6 + 100
    ]);

    mensagem = "Segundo Quadrante";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      " Bold 20px Trebuchet MS",
      objCanvas.canvasWidth/3 - objCanvas.canvasWidth/10 - 180,
      objCanvas.canvasHeight/6 + 100
    ]);

    mensagem = "Terceiro Quadrante";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 20px Trebuchet MS",
      objCanvas.canvasWidth/3 - objCanvas.canvasWidth/10 - 170,
      objCanvas.canvasHeight/6 + 240
    ]);

    mensagem = "Quarto Quadrante";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 20px Trebuchet MS",
      objCanvas.canvasWidth/3 + objCanvas.canvasWidth/10 - 13,
      objCanvas.canvasHeight/6 + 240
    ]);
  }

  //----------------------------------------------------------------------------
  // Sétima Tela da Teoria - Funções
  //----------------------------------------------------------------------------
  var funcoes = function ()
  {
    funcaoAtual = "funcoes"; // indica a função atual

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Printa o texto na tela
    */
    //
    mensagem = "6 - Funções Trigonométricas";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Você já deve ter estudado as funções Seno, Cosseno e Tangente";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 30,
      objCanvas.canvasHeight/6 + 60
    ]);

    mensagem = "no triângulo retângulo, quando você trabalhava com as razões";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 90
    ]);

    mensagem = "trigonométricas para ângulos agudos, ou seja, menores que 90°, ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 120
    ]);

    mensagem = "internos ao triângulo, certo?";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 150
    ]);

    mensagem = "O estudo dessas funções no ciclo permite ampliar a noção sobre";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 30,
      objCanvas.canvasHeight/6 + 190
    ]);

    mensagem = "elas para casos em que o ângulo é maior do que 90°.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3),
      objCanvas.canvasHeight/6 + 220
    ]);

    mensagem = "Vamos nessa?";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 30,
      objCanvas.canvasHeight/6 + 250
    ]);

  }

  //----------------------------------------------------------------------------
  // Oitava Tela da Teoria - Seno
  //----------------------------------------------------------------------------
  var seno = function ()
  {
    funcaoAtual = "seno"; // indica a função atual

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 70,
      "#c18bd5",
      3
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 60,
      "#edea10",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 55,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 65,
      "#edea10",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 55,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasHeight/3 + 60,
      "#edea10",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 65,
      "#edea10",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#c18bd5",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#c18bd5",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#c18bd5",
      2
    ]);

    /*
    Desenha os textos parte da imagem
    */
    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5)+objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 80
    ]);

    mensagem = "y";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 - 12,
      objCanvas.canvasHeight/3 + 75
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 80
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 + 55
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 50
    ]);


    /*
    Desenhando o arco BA (azul)
    */
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 60,
        objCanvas.canvasWidth/10,
        TREZENTOS_SESSENTA - CENTO_OITENTA/5,
        0,
        "#5c54cf",
        4
    ]);

    /*
    desenha o arco vermelho externo  da ilustração
    */
    App.strategiesTela.construtorArco.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth/10,
      0,
      - CENTO_OITENTA/5 - 3*GRAU,
      "#f66",
      4
    ]);

    /*
    desenha o arco vermelho interno  da ilustração
    */
    App.strategiesTela.construtorArco.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth/30,
      0,
      - CENTO_OITENTA/5 - 3*GRAU,
      "#f66",
      3
    ]);

    /*
    Desenhando ALFA
    */
    mensagem = "\u237a";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 24px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/30,
      objCanvas.canvasHeight/3 + 50,
    ]);

    /*
    Desenhando a reta vermelha
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
      objCanvas.canvasHeight/6 + 76,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      "#f66",
      3
    ]);

    /*
    Desenhando a reta verde PONTILHADA
    */
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 72,
      objCanvas.canvasHeight/6 + 76,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/6 + 76,
      "#b3ee3a",
      3,
      [5] //dashed
    ]);

    /*
    Desenhando o ponto A
    */
    mensagem = "A";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 105,
      objCanvas.canvasHeight/6 + 135
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
        objCanvas.canvasHeight/6 + 141,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto B
    */
    mensagem = "B";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 80,
      objCanvas.canvasHeight/6 + 66
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
        objCanvas.canvasHeight/6 + 76,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto O
    */
    mensagem = "O";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 20,
      objCanvas.canvasHeight/3 + 80,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 60,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

     /*
    Desenhando o ponto em Y
    */
    mensagem = "(0,y)";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 38,
      objCanvas.canvasHeight/6 + 77,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/6 + 76,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);


    /*
    Printa o texto na tela
    */
    //
    mensagem = "7 - Função Seno";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Considere um arco sobre o ciclo trigonométrico";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 20,
      objCanvas.canvasHeight/6 + 50
    ]);

    mensagem = "determinado pelos pontos A e B, conforme o desenho.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 70,
      objCanvas.canvasHeight/6 + 80
    ]);

    mensagem = "Definimos como Seno do ângulo \u237a o valor da";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 20,
      objCanvas.canvasHeight/6 + 110
    ]);

    mensagem = "ordenada (coordenada sobre o eixo y) do ponto B.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 70,
      objCanvas.canvasHeight/6 + 140
    ]);


    mensagem = "Ou, de outra forma, o Seno de \u237a é a medida Oy.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 70,
      objCanvas.canvasHeight/6 + 170
    ]);

    mensagem = "Lembrando que o raio da circunferência é igual a";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 20,
      objCanvas.canvasHeight/6 + 200
    ]);

    mensagem = "1, então o valor máximo  da ordenada, internamente";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 70,
      objCanvas.canvasHeight/6 + 230
    ]);

    mensagem = " ao ciclo, é 1 e o valor mínimo é -1. ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 70,
      objCanvas.canvasHeight/6 + 260
    ]);

  }

  //----------------------------------------------------------------------------
  // Nona Tela da Teoria - Cosseno
  //----------------------------------------------------------------------------
  var cosseno = function ()
  {
    funcaoAtual = "cosseno";

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 70,
      "#edeb1b",
      3
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 60,
      "#c18bd5",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 55,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 65,
      "#c18bd5",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 55,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasHeight/3 + 60,
      "#c18bd5",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 65,
      "#c18bd5",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#edeb1b",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#edeb1b",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#edeb1b",
      2
    ]);

    /*
    Desenha os textos parte da imagem
    */
    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5)+objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 80
    ]);

    mensagem = "y";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 - 12,
      objCanvas.canvasHeight/3 + 55
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 80
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 + 55
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 50
    ]);

    /*
    Desenhando o arco BA (azul)
    */
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 60,
        objCanvas.canvasWidth/10,
        TREZENTOS_SESSENTA - CENTO_OITENTA/5,
        0,
        "#5c54cf",
        4
    ]);

    /*
    desenha o arco vermelho externo  da ilustração
    */
    App.strategiesTela.construtorArco.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth/10,
      0,
      - CENTO_OITENTA/5 - 3*GRAU,
      "#f66",
      4
    ]);

    /*
    desenha o arco vermelho interno  da ilustração
    */
    App.strategiesTela.construtorArco.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth/30,
      0,
      - CENTO_OITENTA/5 - 3*GRAU,
      "#f66",
      3
    ]);

    /*
    Desenhando ALFA
    */
    mensagem = "\u237a";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 24px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/30,
      objCanvas.canvasHeight/3 + 50,
    ]);



    /*
    Desenhando a reta vermelha
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
      objCanvas.canvasHeight/6 + 76,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      "#f66",
      3
    ]);

    /*
    Desenhando a reta verde PONTILHADA
    */
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
      objCanvas.canvasHeight/6 + 78,
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
      objCanvas.canvasHeight/3 + 60,
      "#b3ee3a",
      3,
      [5] //dashed
    ]);

    /*
    Desenhando o ponto A
    */
    mensagem = "A";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 105,
      objCanvas.canvasHeight/6 + 135
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
        objCanvas.canvasHeight/6 + 141,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto B
    */
    mensagem = "B";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 80,
      objCanvas.canvasHeight/6 + 66
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
        objCanvas.canvasHeight/6 + 76,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto O
    */
    mensagem = "O";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 20,
      objCanvas.canvasHeight/3 + 80,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 60,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

     /*
    Desenhando o ponto em X
    */
    mensagem = "(x,0)";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 60,
      objCanvas.canvasHeight/3 + 80,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth - (objCanvas.canvasWidth/5) + 75,
        objCanvas.canvasHeight/3 + 60,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Printa o texto na tela
    */
    //
    mensagem = "8 - Função Cosseno";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Considere o mesmo ciclo anterior.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 10,
      objCanvas.canvasHeight/6 + 80
    ]);

    mensagem = "Definimos como Cosseno de \u237a a abscissa";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 10,
      objCanvas.canvasHeight/6 + 110
    ]);

    mensagem = "(coordenada sobre o eixo x) do ponto B.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 140
    ]);

    mensagem = "Lembrando que o raio da circunferência é ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 10,
      objCanvas.canvasHeight/6 + 180
    ]);

    mensagem = "igual a 1, então o valor máximo  da abscissa, ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 210
    ]);

    mensagem = "internamente ao ciclo, é 1 e o valor mínimo é -1. ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 240
    ]);

  }

  //----------------------------------------------------------------------------
  // Décima Tela da Teoria - Tangente
  //----------------------------------------------------------------------------
  var tangente = function ()
  {
    funcaoAtual = "tangente"; //identifica a função atual

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();
    botaoAvancar();

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 70,
      "#d56efb",
      3
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 60,
      "#c3c3f9",
      3
    ]);

    /*
    Desenhando o eixo das Tangentes
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth - (objCanvas.canvasWidth/5) + 100,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth - (objCanvas.canvasWidth/5) + 100,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 80,
      "#ff0",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta TANGENTE do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 95,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 105,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#ff0",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 95,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#ff0",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 105,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#ff0",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 55,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 65,
      "#c3c3f9",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 55,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasHeight/3 + 60,
      "#c3c3f9",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 65,
      "#c3c3f9",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#d56efb",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#d56efb",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 20,
      "#d56efb",
      2
    ]);

    /*
    Desenha os textos parte da imagem
    */
    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5)+objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasHeight/3 + 80
    ]);

    mensagem = "y";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 - 12,
      objCanvas.canvasHeight/3 + 75
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 80
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 + 55
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 50
    ]);

    /*
    Desenhando o arco BA (azul)
    */
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 60,
        objCanvas.canvasWidth/10,
        TREZENTOS_SESSENTA - CENTO_OITENTA/5,
        0,
        "#5c54cf",
        4
    ]);

    /*
    desenha o arco vermelho externo  da ilustração
    */
    App.strategiesTela.construtorArco.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth/10,
      0,
      - CENTO_OITENTA/5 - 3*GRAU,
      "#f66",
      4
    ]);

    /*
    desenha o arco vermelho interno  da ilustração
    */
    App.strategiesTela.construtorArco.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      objCanvas.canvasWidth/30,
      0,
      - CENTO_OITENTA/5 - 3*GRAU,
      "#f66",
      3
    ]);

    /*
    Desenhando ALFA
    */
    mensagem = "\u237a";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 24px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/30,
      objCanvas.canvasHeight/3 + 50,
    ]);

    /*
    Desenhando a reta vermelha
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
      objCanvas.canvasHeight/6 + 76,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + 60,
      "#f66",
      3
    ]);
    /*
    Desenhando a reta verde PONTILHADA
    */
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 79,
      objCanvas.canvasHeight/6 + 73,
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
      objCanvas.canvasHeight/6 + 55,
      "#b3ee3a",
      3,
      [5] //dashed
    ]);

    /*
    Desenhando o ponto A
    */
    mensagem = "A";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 105,
      objCanvas.canvasHeight/6 + 135
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
        objCanvas.canvasHeight/6 + 141,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto B
    */
    mensagem = "B";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 22px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 70,
      objCanvas.canvasHeight/6 + 66
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 75,
        objCanvas.canvasHeight/6 + 76,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto O
    */
    mensagem = "O";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 20,
      objCanvas.canvasHeight/3 + 80,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 60,
        4,
        0,
        TREZENTOS_SESSENTA,
        "#f00",
        2
    ]);

    /*
    Desenhando o ponto em tg
    */
    mensagem = "tg";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 107,
      objCanvas.canvasHeight/6 + 60,
    ]);

    App.strategiesTela.construtorCirculo.executa([
      "1",
      objCanvas.canvasWidth -(objCanvas.canvasWidth/5) + 100,
      objCanvas.canvasHeight/6 + 55,
      4,
      0,
      TREZENTOS_SESSENTA,
      "#f00",
      2
    ]);

    /*
    Printa o texto na tela
    */
    //
    mensagem = "9 - Função Tangente";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = " O eixo das tangentes é paralelo ao eixo y (senos)";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 50,
      objCanvas.canvasHeight/6 + 80
    ]);

    mensagem = "do ciclo e tem um ponto em comum com a circunferência,";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 100,
      objCanvas.canvasHeight/6 + 110
    ]);

    mensagem = "conforme mostra a figura (eixo amarelo):";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 100,
      objCanvas.canvasHeight/6 + 140
    ]);

    mensagem = "A tangente do ângulo \u237a  é o ponto de intersecção";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 50,
      objCanvas.canvasHeight/6 + 200
    ]);

    mensagem = "da reta OB com o eixo das tangentes.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 100,
      objCanvas.canvasHeight/6 + 230
    ]);
  }

  //----------------------------------------------------------------------------
  // Décima Primeira Tela da Teoria - Arcos Notáveis
  //----------------------------------------------------------------------------
  var arcosNotaveis = function ()
  {
    funcaoAtual = "arcosNotaveis"; //identifica a função atual

    App.strategiesTela.limpaTela.executa([
      "1",
      50,
      38,
      objCanvas.canvasWidth - 90,
      objCanvas.canvasHeight - 90
    ]);

    botaoVoltar();

    //Tabela dos arcos notáveis
    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#b3ee3a",
      objCanvas.canvasWidth/2 + 50,
      100 + (objCanvas.canvasHeight - 200)/4,
      objCanvas.canvasWidth/12,
      objCanvas.canvasHeight - 200 - (objCanvas.canvasHeight - 200)/4,
      3
    ]);

    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#b3ee3a",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/12 + 50,
      100,
      objCanvas.canvasWidth/12,
      objCanvas.canvasHeight - 200,
      3
    ]);


    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#b3ee3a",
      objCanvas.canvasWidth/2 + 2*objCanvas.canvasWidth/12 + 50,
      100,
      objCanvas.canvasWidth/12,
      objCanvas.canvasHeight - 200,
      3
    ]);

    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#b3ee3a",
      objCanvas.canvasWidth/2 + 3*objCanvas.canvasWidth/12 + 50,
      100,
      objCanvas.canvasWidth/12,
      objCanvas.canvasHeight - 200,
      3
    ]);

    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#b3ee3a",
      objCanvas.canvasWidth/2 + 50,
      100 + (objCanvas.canvasHeight - 200)/4,
      4*objCanvas.canvasWidth/12,
      (objCanvas.canvasHeight - 200)/4,
      3
    ]);

    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#b3ee3a",
      objCanvas.canvasWidth/2 + 50,
      100 + (objCanvas.canvasHeight - 200)/2,
      4*objCanvas.canvasWidth/12,
      (objCanvas.canvasHeight - 200)/4,
      3
    ]);

    mensagem = "Sen";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#5c54cf",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/12 + 65,
      150,
    ]);

    mensagem = "Cos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#5c54cf",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 2*objCanvas.canvasWidth/12 + 65,
      150,
    ]);

    mensagem = "Tg";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#5c54cf",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 3*objCanvas.canvasWidth/12 + 75,
      150,
    ]);

    mensagem = "30°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#d56efb",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 75,
      145 + (objCanvas.canvasHeight - 200)/4,
    ]);

    mensagem = "45°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#d56efb",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 75,
      145 + 2*(objCanvas.canvasHeight - 200)/4,
    ]);

    mensagem = "60°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#d56efb",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 75,
      145 + 3*(objCanvas.canvasHeight - 200)/4,
    ]);


    //SENOS ------------------------------------------------------------------
    //Sen 30
    mensagem = "1/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/12 + 75,
      145 + (objCanvas.canvasHeight - 200)/4,
    ]);

    //Sen 45
    mensagem = "√2/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/12 + 65,
      145 + 2*(objCanvas.canvasHeight - 200)/4,
    ]);

    //Sen 60
    mensagem = "√3/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/12 + 65,
      145 + 3*(objCanvas.canvasHeight - 200)/4,
    ]);

//COSSENOS ----------------------------------------------------------------
    //Cos 30
    mensagem = "√3/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 2*objCanvas.canvasWidth/12 + 65,
      145 + (objCanvas.canvasHeight - 200)/4,
    ]);

    //Cos 45
    mensagem = "√2/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 2*objCanvas.canvasWidth/12 + 65,
      145 + 2*(objCanvas.canvasHeight - 200)/4,
    ]);

    //Cos 60
    mensagem = "1/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 2*objCanvas.canvasWidth/12 + 75,
      145 + 3*(objCanvas.canvasHeight - 200)/4,
    ]);

//TANGENTE ----------------------------------------------------------------
    //Tg 30
    mensagem = "√3/3";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 3*objCanvas.canvasWidth/12 + 65,
      145 + (objCanvas.canvasHeight - 200)/4,
    ]);

    //Tg 45
    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 3*objCanvas.canvasWidth/12 + 85,
      145 + 2*(objCanvas.canvasHeight - 200)/4,
    ]);

    //Tg 60
    mensagem = "√3";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f66",
      "Bold 25px Trebuchet MS",
      objCanvas.canvasWidth/2 + 3*objCanvas.canvasWidth/12 + 75,
      145 + 3*(objCanvas.canvasHeight - 200)/4,
    ]);


    //
    mensagem = "10 - Arcos Notáveis";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0fc",
      "Bold Italic 32px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 60,
      objCanvas.canvasHeight/6 + 10
    ]);

    mensagem = "Os ângulos 30°, 45° e 60° são";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 20,
      objCanvas.canvasHeight/6 + 80
    ]);

    mensagem = "chamados notáveis por aparecerem";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 50,
      objCanvas.canvasHeight/6 + 110
    ]);

    mensagem = "comumente em cálculos.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 50,
      objCanvas.canvasHeight/6 + 140
    ]);

    mensagem = "Na tabela ao lado, veja os valores";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 20,
      objCanvas.canvasHeight/6 + 190
    ]);

    mensagem = "seno, cosseno e tangente dos arcos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 50,
      objCanvas.canvasHeight/6 + 220
    ]);

    mensagem = "notáveis.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Trebuchet MS",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) - 50,
      objCanvas.canvasHeight/6 + 250
    ]);
  }

  /*
  // Desenha o botão avanças na tela
  */
  var botaoAvancar = function ()
  {
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "btAvancar",
      xBtAvanca - 5,
      yBt - 5,
      wBotao + 10,
      hBotao + 10
    ]);
  }

  /*
  // Desenha o botão voltar na tela
  */
  var botaoVoltar = function ()
  {
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "btVoltar",
      xBtVolta - 5,
      yBt - 5,
      wBotao + 10,
      hBotao + 10
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

  //
  //----------------------------------------------------------------------------
  // Função para detectar o clique e verificar se as coordenadas dele está
  // dentro da área de agum dos botões,
  // para direcionar à ação adequada
  //----------------------------------------------------------------------------
  //
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();

    objCanvas.canvas1.bind("mousedown.Teoria", function(event)
    {
      var x, y;

      //a função offset() indica a posição real de um objeto em relação à página
      //sempre com dois valores: .left-> distância à esquerda; .top -> do topo
      //assim, encontramos a posição exata do canvas.
      var posicaoOffset = objCanvas.canvas1.offset();

      /*
      // - clientX indica a posição x do elemento (ou evento, no caso, o clique)
      dentro da área útil do browser (excluindo abas, barras de rolagem, etc).
      // - document.body.scrollLeft -> distância de rolagem da página, à
      esquerda
      // - document.documentElement.scrollLeft -> distância de rolagem do
      elemento, à esquerda
      // - Assim, X = coordenada absoluta do clique + espaço rolado da página à
      esquerda + espaço rolado do elemento à esquerda - distância do elemento
      ao canto esquerdo da página
      */
      //nesse ponto, é preciso fazer o acesso ao DOM para verificar a rolagem.
      //objCanvas.doc[0] = document (o retorno de $(document) é um array de dois
      //elementos, o primeiro deles, de índice 0, é o document, como em js puro)
      //Assim, a função abaixo objCanvas.doc[0].body.scrollLeft é o mesmo que:
      //document.body.scrollLeft. Fazendo essa substituição, é possível
      //manter o acesso único ao DOM no singletonCanvas
      x = event.clientX + objCanvas.doc[0].body.scrollLeft
          + objCanvas.doc[0].documentElement.scrollLeft
          - Math.floor(posicaoOffset.left);

      /*
      Para y, todas as definições anteriores são válidas, para a coordenada
      na vertical (distância do topo)
      */
      y = event.clientY + objCanvas.doc[0].body.scrollTop
          + objCanvas.doc[0].documentElement.scrollTop
          - Math.floor(posicaoOffset.top)+ 1;

      //Se clicou no botão AVANÇAR
      if(x > xBtAvanca - 1 && x < xBtAvanca + wBotao + 2
           && y > yBt - 1 && y < yBt + hBotao + 2)
      {
        //Se clicou em AVANÇAR, vai para tela adiante, na ordem abaixo
        //antes, cancela qualquer animação
        pararAnima();

        switch(funcaoAtual)
        {
          case "inicio":
            arcos();
            break;
          case "arcos":
            anguloCentral();
            break;
          case "anguloCentral":
            medidas();
            break;
          case "medidas":
            circunferencia();
            break;
          case "circunferencia":
            quadrantes();
            break;
          case "quadrantes":
            funcoes();
            break;
          case "funcoes":
            seno();
            break;
          case "seno":
            cosseno();
            break;
          case "cosseno":
            tangente();
            break;
          case "tangente":
            arcosNotaveis();
            break;
          case "arcosNotaveis":
            return;
            break;
        }
      }

      //Se clicou no botão VOLTAR, em uma das telas da Teoria
      else if(x > xBtVolta - 1 && x < xBtVolta + wBotao + 2
              && y > yBt - 1 && y < yBt + hBotao + 2)
      {
        //cancela as animações
        if (funcaoAtual!="inicio")
          pararAnima();

        //Se clicou em VOLTAR, vai para tela anterior, na ordem abaixo
        switch(funcaoAtual)
        {
          case "arcos":
            inicio();
            break;
          case "anguloCentral":
            arcos();
            break;
          case "medidas":
            anguloCentral();
            break;
          case "circunferencia":
            medidas();
            break;
          case "quadrantes":
            circunferencia();
            break;
          case "funcoes":
            quadrantes();
            break;
          case "seno":
            funcoes();
            break;
          case "cosseno":
            seno();
            break;
          case "tangente":
            cosseno();
            break;
          case "arcosNotaveis":
            tangente();
            break;
          case "inicio":
            return;
            break;
        }
      }
    });
  }
  return {
    inicio: inicio,
    pararAnimacao: pararAnima
  }
})();
