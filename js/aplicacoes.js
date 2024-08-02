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

  // Coordenadas dos pontos para desenhar o corpo sobre o plano
  var pontoA;
  var pontoB;
  var pontoC;
  var pontoD;

  var anguloRadAtualParaAnimacao; // ângulo NÃO CORRIGIDO pro canvas - O visto na tela!!!!
  var anguloGrauAtualParaAnimacao; // ângulo em GRAUs - para comparação
  var anguloRadAtualParaAnimacaoCorrigido;
  var aceleracaoAtualParaAnimacao;
  var BASE_Py;
  var BASE_Px;
  var animacao;

  // Variáveis para animação
  var initialTime; // Instante inicial da animação - precisa ser iniciado apenas quando der start na animação
  var currentTime;
    
  $(document).ready( function()
  {
    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();    
  })

  //funcao para parar animações, inclusive fora do arquivo
  var pararAnima = function(){
    if(animacao!=null)
      cancelAnimationFrame(animacao);
  }

  //Função Principal
  var inicio = function ()
  {    
    App.teoria.pararAnimacao();//se houver algo rodando, pára
    pararAnima();

    pontoA = null;
    pontoB = null;
    pontoC = null;
    pontoD = null;
    anguloRadAtualParaAnimacao = null; // ângulo NÃO CORRIGIDO pro canvas - O visto na tela!!!!
    anguloGrauAtualParaAnimacao = null; // ângulo em GRAUs - para comparação
    anguloRadAtualParaAnimacaoCorrigido = null;
    aceleracaoAtualParaAnimacao = null;
    BASE_Py = null;
    BASE_Px = null;
    initialTime = null;
    currentTime = null;

    //constantes para serem usadas pelas funções
    X_ZERO = objCanvas.canvasWidth/2;
    Y_ZERO = objCanvas.canvasHeight/2 + objCanvas.canvasHeight/5;
    BASE = (objCanvas.canvasWidth)/(reduzdimensao/p_inicial);
    BASE_Py_inicial = (objCanvas.canvasWidth)/(reduzdimensao/py_inicial);
    BASE_Px_inicial = (objCanvas.canvasWidth)/(reduzdimensao/px_inicial);

    document.getElementById("animar").onclick = function() {
      animarBloco();    
    };

    document.getElementById("voltar").onclick = function() {
      finalizaAnimacaoBloco();    
    };    

    document.getElementById("divEspelhoControles").style.display = 'none';
    document.getElementById("divControles").style.display = 'none';
    document.getElementById("divControlesAnima").style.display = 'block';
    document.getElementById("cvTrigonometrando3").style.display = 'block';
    
    document.getElementById("animar").disabled = false;
    document.getElementById("voltar").disabled = true;

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

    App.strategiesTela.limpaTela.executa([
      "3",
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
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 - 40,
      140,
      objCanvas.canvasWidth/2 - objCanvas.canvasWidth/8 + 40,
      objCanvas.canvasHeight/2 + objCanvas.canvasHeight/15 - 30
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
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        170
      ]);

      mensagem = "Massa do corpo sobre o plano inclinado:";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        195
      ]);

      mensagem = "10.0 kg";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#FFF",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)*18) - 25,
        // *7 se refere à posição horizontal e 250 à posição vertical
        195
      ]);

      mensagem = "Força Peso: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        220
      ]);
      mensagem = "Componente Px da Força Peso: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        245
      ]);
      
      mensagem = "Componente Py da Força Peso: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        270
      ]);

      mensagem = "Força Normal: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        295
      ]);

      mensagem = "Aceleração: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) + 165,
        295
      ]);

      mensagem = "Considerando: ";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        330
      ]);

      mensagem = "Aceleração da gravidade: 9,8m/s²";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        352
      ]);

      mensagem = "Sem atrito.";
      App.strategiesTela.construtorTexto.executa([
        "2",
        mensagem,
        "#0fc",
        "Bold 16px Trebuchet MS",
        objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/22)) - 25,
        374
      ]);
    

    //Base do plano inclinado - no canvas 2 pois não precisa redesenhar
    desenhaReta((X_ZERO)-(BASE), Y_ZERO, (X_ZERO), Y_ZERO, "#FFF", 4, "2");

    // Ângulo inicial: 30°
    var angRadInicial = (210*CENTO_OITENTA)/180;
    anguloRadAtualParaAnimacaoCorrigido = angRadInicial;

    // Coordenadas do ponto inicial para desenhar o plano inclinado
    var ponto = App.strategiesCalculadora.ponto.calcula([angRadInicial, X_ZERO, Y_ZERO, BASE]);

    reDesenha(ponto[0], ponto[1], angRadInicial);

    var calculos = calculaForcasAceleracao((30*CENTO_OITENTA)/180);  
    // linha a seguir determina quantas variáveis calculadas podem ficar visíveis na tela  
    reescreve(30, calculos[0], calculos[1], calculos[2], calculos[3], calculos[4]);
    
    // Guarda dados iniciais para animação
    aceleracaoAtualParaAnimacao = calculos[4];
  }

  var reescreve = function(angulo, p, px, py, n, a){

    // Guarda para a animação
    anguloRadAtualParaAnimacao = (angulo*CENTO_OITENTA)/180;
    anguloGrauAtualParaAnimacao = angulo;
    aceleracaoAtualParaAnimacao = a;

    var mensagem = angulo + "°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*15) - 20,
      170
    ]);

    mensagem = p + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*5) - 20,
      220
    ]);

    mensagem = px + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*12) - 20,
      245
    ]);

    mensagem = py + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*12) - 20,
      270
    ]);

    mensagem = n + " N";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFF",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*6) - 20,
      295
    ]);

    mensagem = a + " m/s²";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#FFFS",
      "Bold 16px Trebuchet MS",
      objCanvas.canvasWidth/2 + objCanvas.canvasWidth/22 + ((BASE/18)*5) + 170,
      295
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
    BASE_Py = (objCanvas.canvasWidth)/(reduzdimensao/py);
    BASE_Px = (objCanvas.canvasWidth)/(reduzdimensao/px);
      
    //limpeza inicial da tela, para reconstrução
    //somente o canvas superior
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight,
    ]);

    App.strategiesTela.limpaTela.executa([
      "3",
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

    // Coordenadas dos pontos para desenhar o corpo sobre o plano
    pontoA = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, (BASE/18)*9]);
    pontoB = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, (BASE/18)*12]);
    pontoC = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA, pontoB[0], pontoB[1], (BASE/18)*3]);
    pontoD = App.strategiesCalculadora.ponto.calcula([angRad + NOVENTA, pontoA[0], pontoA[1], (BASE/18)*3]);

    // desenha o corpo sobre o plano
    desenhaCorpo(pontoA, pontoB, pontoC, pontoD, "#e01010");

    // Desenha as forças
    desenhaForcas(angRad, pontoA, pontoC, BASE_Px, BASE_Py);    

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

  var desenhaCorpo = function (pontoA, pontoB, pontoC, pontoD, cor){
    objCanvas.ctx3.beginPath();
    objCanvas.ctx3.fillStyle=cor;
    objCanvas.ctx3.moveTo(pontoA[0], pontoA[1]);
    objCanvas.ctx3.lineTo(pontoB[0], pontoB[1]);
    objCanvas.ctx3.lineTo(pontoC[0], pontoC[1]);
    objCanvas.ctx3.lineTo(pontoD[0], pontoD[1]);
    objCanvas.ctx3.lineTo(pontoA[0], pontoA[1]);    
    objCanvas.ctx3.fill();
    objCanvas.ctx3.closePath();
  }

  var desenhaForcas = function(angRad, pontoA, pontoC, BASE_Px, BASE_Py){
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
    desenhaReta(NovoXZero, NovoYZero, pontoE[0], pontoE[1], "#0F0", 3, "3");
    desenhaReta(pontoI[0], pontoI[1], pontoE[0], pontoE[1], "#0F0", 3, "3");
    desenhaReta(pontoJ[0], pontoJ[1], pontoE[0], pontoE[1], "#0F0", 3, "3");

    // Reta - Px
    desenhaReta(NovoXZero, NovoYZero, pontoH[0], pontoH[1], "#0fc", 3, "3");
    desenhaReta(pontoO[0], pontoO[1], pontoH[0], pontoH[1], "#0fc", 3, "3");
    desenhaReta(pontoP[0], pontoP[1], pontoH[0], pontoH[1], "#0fc", 3, "3");

    // Reta - Py
    desenhaReta(NovoXZero, NovoYZero, pontoF[0], pontoF[1], "#96f", 3, "3");
    desenhaReta(pontoK[0], pontoK[1], pontoF[0], pontoF[1], "#96f", 3, "3");
    desenhaReta(pontoL[0], pontoL[1], pontoF[0], pontoF[1], "#96f", 3, "3");

    // Reta - P
    desenhaReta(NovoXZero, NovoYZero, pontoG[0], pontoG[1], "#DAA520", 3, "3");
    desenhaReta(pontoM[0], pontoM[1], pontoG[0], pontoG[1], "#DAA520", 3, "3");
    desenhaReta(pontoN[0], pontoN[1], pontoG[0], pontoG[1], "#DAA520", 3, "3");

    escreveForcas(pontoE, pontoF, pontoG, pontoH);

    // Retas Pontilhadas
    var pontoQ = [pontoG[0], pontoG[1]];

    var pontoR = App.strategiesCalculadora.pontoPxPy.calcula([NovoXZero, NovoYZero, pontoH[0], pontoH[1], angRad + NOVENTA, pontoQ[0], pontoQ[1]]);
    desenhaReta(pontoQ[0], pontoQ[1], pontoR[0], pontoR[1], "#DAA520", 1, "3");

    var pontoS = App.strategiesCalculadora.pontoPxPy.calcula([NovoXZero, NovoYZero, pontoF[0], pontoF[1], angRad, pontoQ[0], pontoQ[1]]);
    desenhaReta(pontoQ[0], pontoQ[1], pontoS[0], pontoS[1], "#DAA520", 1, "3");
  }

  var escreveForcas = function (pontoE, pontoF, pontoG, pontoH){
    App.strategiesTela.construtorTexto.executa([
      "3",
      "N",
      "#0f0",
      "Bold 14px Trebuchet MS",
      pontoE[0] + 5,
      pontoE[1] + 5
    ]);

    App.strategiesTela.construtorTexto.executa([
      "3",
      "Px",
      "#0fc",
      "Bold 14px Trebuchet MS",
      pontoH[0] + 5,
      pontoH[1] + 5
    ]);

    App.strategiesTela.construtorTexto.executa([
      "3",
      "Py",
      "#96f",
      "Bold 14px Trebuchet MS",
      pontoF[0] - 25,
      pontoF[1] + 10
    ]);

    App.strategiesTela.construtorTexto.executa([
      "3",
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

  // Calcula o deslocamento na diagonal, e a partir dele a variação das coordenadas do ponto (X, Y)
  var calculaPosicaoNoTempo = function(seno, cosseno){
    if(initialTime == null || initialTime == "undefined"){ // não esquecer de limpar ao parar a animação!
      initialTime = Date.now();    
    }    
    currentTime = Date.now();    

    // A posição é com base no vértice do corpo que fica rente à superfície do plano inclinado e à esquerda
    // S = deslocamento sobre o plano inclinado - hipotenusa
    // ca = variação de X - cateto adjacente
    // co = variação de Y - cateto oposto
    // S = S0 + V0t + a.t²

    var S0 = 0; // Posição inicial é sempre 0
    var V0 = 0; // Velocidade inicial é sempre 0
    var t = (currentTime - initialTime)/1000;

    // Posição inicial é sempre Zero, pois vamos considerar como se fosse o o movimento sempre a partir do ponto inicial
    // O mesmo vale para a velocidade inicial, sempre zero, pela mesma razão.
    // O tempo atualizado com a aceleração vão garantir o espaço e velocidade corretos no fim
    var S = 0 + 0*t + 0.5 * aceleracaoAtualParaAnimacao * Math.pow(t, 2);
    var ca = cosseno * (S * 3779.527559); // Somar à coordenada X dos pontos para redesenhar
    var co = seno * (S * 3779.527559); // Somar à coordenada Y dos pontos para redesenhar
    
    return [ca, co];
  }

  var animarBloco = function (){

    document.getElementById("animar").disabled = true;
    document.getElementById("voltar").disabled = true;

    //desvincula os eventos existentes (todos os keydowns)
    objCanvas.doc.unbind("keydown");

    // Ao chamar ANIMAR, bloquear TODOS os botões, inclusive do MENU, para não ter interferência em outras telas
    // Ao terminar animação, limpar as variáveis da animação e desbloquear os botões.

    if(anguloGrauAtualParaAnimacao === 0) {
      document.getElementById("animar").disabled = false;
      ajustaKeyDown();
      return; // Se o ângulo for zero, o bloco não se mexe
    }

    var senoAngulo = Math.sin(anguloRadAtualParaAnimacao);
    var cossenoAngulo = Math.cos(anguloRadAtualParaAnimacao);

    var deslocamento = calculaPosicaoNoTempo(senoAngulo, cossenoAngulo);
    // Mover lógica toda de calculo das coordenadas para os desenhos do redesenha, incluindo calculo dos pontos, para um método
    // A referência sempre será os pontos originais iniciais, e o deslocamento é que será maior a cada iteração
    var pontoA1 = [pontoA[0] + deslocamento[0], pontoA[1] + deslocamento[1]];
    var pontoB1 = [pontoB[0] + deslocamento[0], pontoB[1] + deslocamento[1]];
    var pontoC1 = [pontoC[0] + deslocamento[0], pontoC[1] + deslocamento[1]];
    var pontoD1 = [pontoD[0] + deslocamento[0], pontoD[1] + deslocamento[1]];
    
    // limpa o corpo todo
    //limpeza inicial da tela, para reconstrução // Criar um canvas só para o bloco! QUw só ficará em primeiro plano nessa tela
    App.strategiesTela.limpaTela.executa([
      "3",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    // desenha o corpo sobre o plano
    desenhaCorpo(pontoA1, pontoB1, pontoC1, pontoD1, "#e01010");

    // Desenha as forças
    desenhaForcas(anguloRadAtualParaAnimacaoCorrigido, pontoA1, pontoC1, BASE_Px, BASE_Py);

    // Solicita a próxima animação somente enquanto o bloco estiver no limite do plano inclinado
    var parar = pontoA1[1] >= Y_ZERO + 150 || pontoA1[0] >= X_ZERO + 200;

    if(parar){ // TODO Fazer a validação correta aqui 
      document.getElementById("voltar").disabled = false;
    }
    else{
      animacao = requestAnimationFrame(animarBloco);      
    }
  }

  var finalizaAnimacaoBloco = function (){

    pararAnima();

    // Quando o vértice do bloco coincidir com o vértice do ângulo do plano, pára!
    // Desbloquear os botões todos

    // anulando initialTime e currentTime
    initialTime = null;
    currentTime = null;
    
    // limpa o corpo todo
    //limpeza inicial da tela, para reconstrução // Criar um canvas só para o bloco! QUw só ficará em primeiro plano nessa tela
    App.strategiesTela.limpaTela.executa([
      "3",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    // volta o corpor para a posição inicial aqui -- isso precisa ficar num método chamado por botão!
    desenhaCorpo(pontoA, pontoB, pontoC, pontoD, "#e01010");

    // Desenha as forças
    desenhaForcas(anguloRadAtualParaAnimacaoCorrigido, pontoA, pontoC, BASE_Px, BASE_Py);

    document.getElementById("animar").disabled = false;
    document.getElementById("voltar").disabled = true;

    ajustaKeyDown();
  }



  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // ------------------------ Funções de Eventos do Teclado e Mouse ------------------------
  //----------------------------------------------------------------------------------------

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

      anguloRadAtualParaAnimacaoCorrigido = angRad;
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
    inicio: inicio, //única função visível externamente ao módulo
    pararAnimacao: pararAnima
  }
})();
