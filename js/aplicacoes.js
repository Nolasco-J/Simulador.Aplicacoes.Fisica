"use strict";

var App = App || {};

//Apresenta uma aplicação na física
App.aplicacoes = (function ()
{  
  var primeiraTela; 
  var objCanvas;
  var mensagem;

  //constantes
  var X_ZERO;
  var Y_ZERO;
  var BASE;
  var BASE_Py_inicial;
  var BASE_Px_inicial;
  
  //Constantes numéricas - ângulos principais
  var CENTO_OITENTA = Math.PI;
  var NOVENTA = CENTO_OITENTA/2;
  var TRINTA = NOVENTA/3;
  var DUZENTOS_SETENTA = CENTO_OITENTA + NOVENTA;
    
   var massa_inicial = 10;
   var g_inicial = 9.8;
   var p_inicial = massa_inicial * g_inicial;
    
  var angRadInicial = TRINTA;
  var py_inicial = p_inicial * Math.cos(angRadInicial);
  var px_inicial = p_inicial * Math.sin(angRadInicial);
  var reduzdimensao = 250;
    
  $(document).ready( function()
  {
    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();

    //constantes para serem usadas pelas funções
    X_ZERO = objCanvas.canvasWidth/2;
    Y_ZERO = objCanvas.canvasHeight/2 + objCanvas.canvasHeight/5;
    BASE = (objCanvas.canvasWidth)/(reduzdimensao/p_inicial);
    BASE_Py_inicial = (objCanvas.canvasWidth)/(reduzdimensao/py_inicial);
    BASE_Px_inicial = (objCanvas.canvasWidth)/(reduzdimensao/px_inicial);
  })

  //Função Principal
  var inicio = function ()
  {    
    document.getElementById("divEspelhoControles").style.display = 'none';
    document.getElementById("divControles").style.display = 'none';
    
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

    //Fundo da área de texto
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#006",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22,
      140,
      objCanvas.canvasWidth/2 - objCanvas.canvasWidth/8,
      objCanvas.canvasHeight/2 + objCanvas.canvasHeight/15
    ]);

    /*
      Mensagem de Informação e Título
    */
      mensagem = "Aplicações na Física - Plano Inclinado";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 30px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 - ((BASE/18)*9),
        70
      ]);

    mensagem = "Utilize as teclas direcionais";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*3),
      100
    ]);
    mensagem = "do seu teclado para interagir.";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#0fc",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*3),
      125
    ]);

    mensagem = "Ângulo entre o plano inclinado e a base: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        170
      ]);

      mensagem = "Massa do corpo sobre o plano inclinado:";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        195
      ]);

      mensagem = "10.0 kg";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#FFF",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)*18),
        // *7 se refere à posição horizontal e 250 à posição vertical
        195
      ]);

      mensagem = "Força Peso: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        220
      ]);
      mensagem = "Componente Px da Força Peso: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        245
      ]);
      
      mensagem = "Componente Py da Força Peso: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        270
      ]);

      mensagem = "Força Normal: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        295
      ]);

      mensagem = "Aceleração: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        320
      ]);

      mensagem = "Considerando: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        360
      ]);

      mensagem = "Aceleração da gravidade: 9,8m/s²";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        385
      ]);

      mensagem = "Sem atrito.";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)),
        410
      ]);

    var calculos = calculaForcasAceleracao((30*CENTO_OITENTA)/180);  
    // linha a seguir determina quantas variáveis calculadas podem ficar visíveis na tela  
    reescreve(30, calculos[0], calculos[1], calculos[2], calculos[3], calculos[4]);

    //Base do plano inclinado - no canvas 2 pois não precisa redesenhar
    desenhaReta((X_ZERO)-(BASE), Y_ZERO, (X_ZERO), Y_ZERO, "#FFF", 4, "2");

    // Ângulo inicial: 30°
    var angRadInicial = (210*CENTO_OITENTA)/180;
    //angulos contados a partir do eixo x e caminhando no sentido horário ... por isso 30° = 210° (180° + 30°)
    // e cento_oitenta é uma variável criada anteriormente, a partir do Pi (Math.PI)

    //Preenche o ângulo com um segmento de arco, para indicar a área que ele representa    
    // Desenhando
    App.strategiesTela.construtorArco.executa([
        "1",
        X_ZERO,
        Y_ZERO,
        (BASE/18)*3,
        angRadInicial,
        CENTO_OITENTA,
        "#FFF",
        2
    ]);

    // Coordenadas do ponto inicial para desenhar o plano inclinado
    var ponto = App.strategiesCalculadora.ponto.calcula([angRadInicial, X_ZERO, Y_ZERO, BASE]);

    // Plano inclidado móvel - primeira posição: 30°
    desenhaReta(ponto[0], ponto[1], X_ZERO, Y_ZERO, "#FFF", 4, "1");

    // Coordenadas dos pontos vértices do quadrilátero (corpo sobre o plano inclinado)
    var pontoA = App.strategiesCalculadora.ponto.calcula([angRadInicial, X_ZERO, Y_ZERO, (BASE/18)*9]);
    var pontoB = App.strategiesCalculadora.ponto.calcula([angRadInicial, X_ZERO, Y_ZERO, (BASE/18)*12]);
    var pontoC = App.strategiesCalculadora.ponto.calcula([angRadInicial + NOVENTA, pontoB[0], pontoB[1], (BASE/18)*3]);
    var pontoD = App.strategiesCalculadora.ponto.calcula([angRadInicial + NOVENTA, pontoA[0], pontoA[1], (BASE/18)*3]);

    desenhaReta(pontoA[0], pontoA[1], pontoB[0], pontoB[1], "#B22222", 4, "1");
    desenhaReta(pontoB[0], pontoB[1], pontoC[0], pontoC[1], "#B22222", 4, "1");
    desenhaReta(pontoC[0], pontoC[1], pontoD[0], pontoD[1], "#B22222", 4, "1");
    desenhaReta(pontoA[0], pontoA[1], pontoD[0], pontoD[1], "#B22222", 4, "1");

    // Ângulo entre Py e P
    var angRetaP = CENTO_OITENTA-(DUZENTOS_SETENTA-angRadInicial)

    // Coornedadas do ponto central do quadrilátero, 
    // que será início para as retas N, P, Px e Py
    var NovoXZero = (pontoA[0]+pontoC[0])/2
    var NovoYZero = (pontoA[1]+pontoC[1])/2

    // Coordenadas dos pontos para:
    //  a reta que representa o sentido da força normal N ... ponto E
    //  a reta que representa a força peso (gravidade) P ... ponto G
    //  a reta Px ... ponto H
    //  a reta Py ... ponto F ... comprimento de E = F e ambos precisam ser menores que G ... ajustando valores em BASE/12 para Peso e BASE/14 para N  e BASE/24 para Px
    var pontoE = App.strategiesCalculadora.ponto.calcula([angRadInicial + NOVENTA, NovoXZero, NovoYZero, (BASE_Py_inicial/14)*4]);
    var pontoF = App.strategiesCalculadora.ponto.calcula([angRadInicial - NOVENTA, NovoXZero, NovoYZero, (BASE_Py_inicial/14)*4]);
    var pontoG = App.strategiesCalculadora.ponto.calcula([angRadInicial - angRetaP, NovoXZero, NovoYZero, (BASE/14)*4]);
    var pontoH = App.strategiesCalculadora.ponto.calcula([angRadInicial - CENTO_OITENTA, NovoXZero, NovoYZero, (BASE_Px_inicial/14)*4]);

    var pontoI = App.strategiesCalculadora.ponto.calcula([angRadInicial + NOVENTA - (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py_inicial/14)*3.5]);
    var pontoJ = App.strategiesCalculadora.ponto.calcula([angRadInicial + NOVENTA + (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py_inicial/14)*3.5]);
    var pontoK = App.strategiesCalculadora.ponto.calcula([angRadInicial - NOVENTA - (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py_inicial/14)*3.5]);
    var pontoL = App.strategiesCalculadora.ponto.calcula([angRadInicial - NOVENTA + (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py_inicial/14)*3.5]);
    var pontoM = App.strategiesCalculadora.ponto.calcula([angRadInicial - angRetaP - (TRINTA/10), NovoXZero, NovoYZero, (BASE/14)*3.5]);
    var pontoN = App.strategiesCalculadora.ponto.calcula([angRadInicial - angRetaP + (TRINTA/10), NovoXZero, NovoYZero, (BASE/14)*3.5]);
    var pontoO = App.strategiesCalculadora.ponto.calcula([angRadInicial - CENTO_OITENTA - (TRINTA/10), NovoXZero, NovoYZero, (BASE_Px_inicial/14)*3.5]);
    var pontoP = App.strategiesCalculadora.ponto.calcula([angRadInicial - CENTO_OITENTA + (TRINTA/10), NovoXZero, NovoYZero, (BASE_Px_inicial/14)*3.5]);

    // Reta - Força N e seta
    desenhaReta(NovoXZero, NovoYZero, pontoE[0], pontoE[1], "#0F0", 3, "1");
    desenhaReta(pontoI[0], pontoI[1], pontoE[0], pontoE[1], "#0F0", 3, "1");
    desenhaReta(pontoJ[0], pontoJ[1], pontoE[0], pontoE[1], "#0F0", 3, "1");

    // Reta - Px
    desenhaReta(NovoXZero, NovoYZero, pontoH[0], pontoH[1], "#0fc", 3, "1");
    desenhaReta(pontoO[0], pontoO[1], pontoH[0], pontoH[1], "#0fc", 3, "1");
    desenhaReta(pontoP[0], pontoP[1], pontoH[0], pontoH[1], "#0fc", 3, "1");

    // Reta - Py
    desenhaReta(NovoXZero, NovoYZero, pontoF[0], pontoF[1], "#96f", 3, "1");
    desenhaReta(pontoK[0], pontoK[1], pontoF[0], pontoF[1], "#96f", 3, "1");
    desenhaReta(pontoL[0], pontoL[1], pontoF[0], pontoF[1], "#96f", 3, "1");

    // Reta - P
    desenhaReta(NovoXZero, NovoYZero, pontoG[0], pontoG[1], "#DAA520", 3, "1");
    desenhaReta(pontoM[0], pontoM[1], pontoG[0], pontoG[1], "#DAA520", 3, "1");
    desenhaReta(pontoN[0], pontoN[1], pontoG[0], pontoG[1], "#DAA520", 3, "1");

    escreveForcas(pontoE, pontoF, pontoG, pontoH);

     // Retas Pontilhadas
     var pontoQ = [pontoG[0], pontoG[1]];

     var pontoR = App.strategiesCalculadora.pontoPxPy.calcula([NovoXZero, NovoYZero, pontoH[0], pontoH[1], angRadInicial + NOVENTA, pontoQ[0], pontoQ[1]]);
     desenhaReta(pontoQ[0], pontoQ[1], pontoR[0], pontoR[1], "#DAA520", 1, "1");
 
     var pontoS = App.strategiesCalculadora.pontoPxPy.calcula([NovoXZero, NovoYZero, pontoF[0], pontoF[1], angRadInicial, pontoQ[0], pontoQ[1]]);
     desenhaReta(pontoQ[0], pontoQ[1], pontoS[0], pontoS[1], "#DAA520", 1, "1");
  }

  var reescreve = function(angulo, p, px, py, n, a){

    var mensagem = angulo + "°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*15),
      170
    ]);

    mensagem = p + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*5),
      220
    ]);

    mensagem = px + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*12),
      245
    ]);

    mensagem = py + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*12),
      270
    ]);

    mensagem = n + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*6),
      295
    ]);

    mensagem = a + " m/s²";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFFS",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*5),
      320
    ]);
  }

  //Recebe as coordenadas para calcular o novo ponto
  //para a reta pontilhada que cruza a tangente, as coordenadas das demais retas
  //pontilhadas, da reta vermelha
  //Redesenha o ciclo completamente
  //----------------------------------------------------------------------------
  // ReDesenha
  //----------------------------------------------------------------------------
  var reDesenha = function (pontoX, pontoY, angRad)
  {

  //constantes
    var massa = 10;
    var g = 9.8;
    var p = massa * g;
    var px = p * Math.sin(angRad);
    var py = p * Math.cos(angRad);
    var n = p * Math.cos(angRad);
    var a = g * Math.sin(angRad);
    var BASE_Py = (objCanvas.canvasWidth)/(reduzdimensao/py);
    var BASE_Px = (objCanvas.canvasWidth)/(reduzdimensao/px);
      
    //limpeza inicial da tela, para reconstrução
    //somente o canvas superior
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight,
    ]);


    if(angRad>CENTO_OITENTA)
    {
      //Preenche o ângulo com um segmento de arco, para indicar a área que ele representa    
      // Desenhando
      App.strategiesTela.construtorArco.executa([
          "1",
          X_ZERO,
          Y_ZERO,
          (BASE/18)*3,
          angRad,
          CENTO_OITENTA,
          "#FFF",
          3
      ]);        
    }

    //
    desenhaReta(X_ZERO, Y_ZERO, pontoX, pontoY, "#FFF", 4, "1");

    // Coordenadas do ponto inicial para desenhar a base do corpo sobre o plano
    var pontoA = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, (BASE/18)*9]);
    var pontoB = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, (BASE/18)*12]);
    var pontoC = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA, pontoB[0], pontoB[1], (BASE/18)*3]);
    var pontoD = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA, pontoA[0], pontoA[1], (BASE/18)*3]);

    desenhaReta(pontoA[0], pontoA[1], pontoB[0], pontoB[1], "#B22222", 4, "1");
    desenhaReta(pontoB[0], pontoB[1], pontoC[0], pontoC[1], "#B22222", 4, "1");
    desenhaReta(pontoC[0], pontoC[1], pontoD[0], pontoD[1], "#B22222", 4, "1");
    desenhaReta(pontoA[0], pontoA[1], pontoD[0], pontoD[1], "#B22222", 4, "1");

    // Ângulo entre Py e P
    var angRetaP = CENTO_OITENTA-(DUZENTOS_SETENTA-angRad)

    // Coornedadas do ponto central do quadrilátero, 
    // que será início para as retas N, P, Px e Py
    var NovoXZero = (pontoA[0]+pontoC[0])/2
    var NovoYZero = (pontoA[1]+pontoC[1])/2

    // Coordenadas dos pontos para:
    //  a reta que representa o sentido da força normal N ... ponto E
    //  a reta que representa a força peso (gravidade) P ... ponto G
    //  a reta Px ... ponto H
    //  a reta Py ... ponto F ... comprimento de E = F e ambos precisam ser menores que G ... ajustando valores em BASE/12 para Peso e BASE/14 para N  e BASE/24 para Px
    var pontoE = App.strategiesCalculadora.ponto.calcula([angRad - NOVENTA, NovoXZero, NovoYZero, (BASE_Py/14)*4]);
    var pontoF = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA, NovoXZero, NovoYZero, (BASE_Py/14)*4]);
    var pontoG = App.strategiesCalculadora.ponto.calcula([angRad - angRetaP, NovoXZero, NovoYZero, (BASE/14)*4]);
    var pontoH = App.strategiesCalculadora.ponto.calcula([angRad, NovoXZero, NovoYZero, (BASE_Px/14)*4]);

    var pontoI = App.strategiesCalculadora.ponto.calcula([angRad - NOVENTA - (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py/14)*3.5]);
    var pontoJ = App.strategiesCalculadora.ponto.calcula([angRad - NOVENTA + (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py/14)*3.5]);
    var pontoK = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA - (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py/14)*3.5]);
    var pontoL = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA + (TRINTA/10), NovoXZero, NovoYZero, (BASE_Py/14)*3.5]);
    var pontoM = App.strategiesCalculadora.ponto.calcula([angRad - angRetaP - (TRINTA/10), NovoXZero, NovoYZero, (BASE/14)*3.5]);
    var pontoN = App.strategiesCalculadora.ponto.calcula([angRad - angRetaP + (TRINTA/10), NovoXZero, NovoYZero, (BASE/14)*3.5]);
    var pontoO = App.strategiesCalculadora.ponto.calcula([angRad - (TRINTA/10), NovoXZero, NovoYZero, (BASE_Px/14)*3.5]);
    var pontoP = App.strategiesCalculadora.ponto.calcula([angRad + (TRINTA/10), NovoXZero, NovoYZero, (BASE_Px/14)*3.5]);

    // Reta - Força N e seta
    desenhaReta(NovoXZero, NovoYZero, pontoE[0], pontoE[1], "#0F0", 3, "1");
    desenhaReta(pontoI[0], pontoI[1], pontoE[0], pontoE[1], "#0F0", 3, "1");
    desenhaReta(pontoJ[0], pontoJ[1], pontoE[0], pontoE[1], "#0F0", 3, "1");

    // Reta - Px
    desenhaReta(NovoXZero, NovoYZero, pontoH[0], pontoH[1], "#0fc", 3, "1");
    desenhaReta(pontoO[0], pontoO[1], pontoH[0], pontoH[1], "#0fc", 3, "1");
    desenhaReta(pontoP[0], pontoP[1], pontoH[0], pontoH[1], "#0fc", 3, "1");

    // Reta - Py
    desenhaReta(NovoXZero, NovoYZero, pontoF[0], pontoF[1], "#96f", 3, "1");
    desenhaReta(pontoK[0], pontoK[1], pontoF[0], pontoF[1], "#96f", 3, "1");
    desenhaReta(pontoL[0], pontoL[1], pontoF[0], pontoF[1], "#96f", 3, "1");

    // Reta - P
    desenhaReta(NovoXZero, NovoYZero, pontoG[0], pontoG[1], "#DAA520", 3, "1");
    desenhaReta(pontoM[0], pontoM[1], pontoG[0], pontoG[1], "#DAA520", 3, "1");
    desenhaReta(pontoN[0], pontoN[1], pontoG[0], pontoG[1], "#DAA520", 3, "1");

    escreveForcas(pontoE, pontoF, pontoG, pontoH);

    // Retas Pontilhadas
    var pontoQ = [pontoG[0], pontoG[1]];

    var pontoR = App.strategiesCalculadora.pontoPxPy.calcula([NovoXZero, NovoYZero, pontoH[0], pontoH[1], angRad + NOVENTA, pontoQ[0], pontoQ[1]]);
    desenhaReta(pontoQ[0], pontoQ[1], pontoR[0], pontoR[1], "#DAA520", 1, "1");

    var pontoS = App.strategiesCalculadora.pontoPxPy.calcula([NovoXZero, NovoYZero, pontoF[0], pontoF[1], angRad, pontoQ[0], pontoQ[1]]);
    desenhaReta(pontoQ[0], pontoQ[1], pontoS[0], pontoS[1], "#DAA520", 1, "1");


  }// Fim Função Redesenha

  // Função que chama o contrutor reta, passando os parâmetros recebidos
  var desenhaReta = function (pontoXo, pontoYo, pontoX, pontoY, cor, espessura, canvas){

    App.strategiesTela.construtorReta.executa([
      canvas,
      pontoXo,
      pontoYo,
      pontoX,
      pontoY,
      cor,
      espessura
    ]);
  }

  var escreveForcas = function (pontoE, pontoF, pontoG, pontoH){
    App.strategiesTela.construtorTexto.executa([
      "1",
      "N",
      "#0f0",
      "Bold 14px Trebuchet MS",
      pontoE[0] + 5,
      pontoE[1] + 5
    ]);

    App.strategiesTela.construtorTexto.executa([
      "1",
      "Px",
      "#0fc",
      "Bold 14px Trebuchet MS",
      pontoH[0] + 5,
      pontoH[1] + 5
    ]);

    App.strategiesTela.construtorTexto.executa([
      "1",
      "Py",
      "#96f",
      "Bold 14px Trebuchet MS",
      pontoF[0] - 25,
      pontoF[1] + 10
    ]);

    App.strategiesTela.construtorTexto.executa([
      "1",
      "P",
      "#DAA520",
      "Bold 14px Trebuchet MS",
      pontoG[0] + 10,
      pontoG[1] + 10
    ]);
  }

  var calculaForcasAceleracao = function(angFinal){
/*
      Ângulo entre o Plano Móvel e a Base: 

      Massa: 10kg
      g: 9,8 m/s
      Sem Atrito

      Aceleração do corpo -> a = g.senAngulo

      Força Peso = m*g
      Força Normal N = m*g*cosAngulo

      Considerando:
      Aceleração da Gravidade: 9,8m/s2.
      Sem atrito.
     */
      var massa = 10.0;
      var g = 9.8;
      var p = massa * g;
      var px = p * Math.sin(angFinal);
      var py = p * Math.cos(angFinal);
      var n = py;
      var a = px/massa;
      // parseFloat define quantas casas decimais são exibidas
      return [parseFloat(p).toFixed(1), parseFloat(px).toFixed(1), parseFloat(py).toFixed(1), parseFloat(n).toFixed(1), parseFloat(a).toFixed(1)];

  }

  // Fora da função, pois deve guardar o valor final dentro da função
  // Limitando o ângulo na tela entre 0° a 50°
  var angFinal;
  /*
    Detecta botões do teclado pressionados
  */
  var ajustaKeyDown = function ()
  {
    //desvincula os eventos existentes (todos os keydowns)
    objCanvas.doc.unbind("keydown");

    objCanvas.doc.on("keydown.planoinclinado", function (evt)
    {
      var angRad; // para uso interno na função

      // garante que o ângulo sempre comece em ZERO quando entrar no módulo
      if(primeiraTela)
      {
        angFinal = 210;
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
          if(angFinal<=180)
            angFinal=180;
          else
            angFinal--;

          if(angFinal==0)
            angRad = 0;

          else
            angRad = (angFinal*CENTO_OITENTA)/180;// valor corrigido, em Rad

          break;

        //
        /*
        seta para cima ----------------------------------------------
        */
        case 38:
          if(angFinal>=230)
            angFinal=230;
          else
            angFinal++;

          angRad = (angFinal*CENTO_OITENTA)/180;

          break;

        /*
        Para qualquer outra tecla, encerra a execução dessa função
        */
        default:
          return;
      }

      var calculos = calculaForcasAceleracao(angRad-CENTO_OITENTA);    

      //chama função para calcular o ponto da reta vermelha,
      // para redesenhar e escreescrever
      var ponto = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, BASE]);
      reDesenha(ponto[0], ponto[1], angRad);
      // linha a seguir determina quantas variáveis calculadas podem ficar visíveis na tela  
      reescreve(angFinal-180, calculos[0], calculos[1], calculos[2], calculos[3], calculos[4]);
    });
  } //Fim ajustaKeydown

  /*
    Detecta cliques
  */
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
