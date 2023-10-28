"use strict";

var App = App || {};

/*
// Strategies TELA
//
Como as funções que desenham os elementos em tela tem um "método" em comum
(desenha, ou executa...),Para economia de código, facilidade de desenvolvimento,
organização e entendimento, uma adequação do padrão Strategy se encaixa bem

--- Strategy: É uma interface comum para todas as subclasses, ou para todos os
algoritmos que são suportados (prototype).
O Contexto usa essa interface para chamar uma das subclasses ConcreteStrategy
ou um dos algoritmos definidos.
--- ConcreteStrategy: A classe concreta que herda da Strategy abstrata está
definida como as subclasses concrete strategies
--- Context: É aquele que vai acessar um dos algoritmos das subclasses de
interface Strategy --> cttTela
//
*/
App.strategiesTela = (function ()
{
  var objCanvas;

  $(document).ready( function()
  {
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
  })
  //
  //Context
  //
  var cttTela = function(strategy)
  {
    this.funcao = strategy;
  }
  //
  // aqui a função executa a construção dos itens na tela,
  // de acordo com a strategy passada pelo construtor acima
  // Recebe um array de especificações para criação do elementos a serem
  // inseridos e retorna a chamada da função (strategy) específica, passando
  // esse array
  // ----- Executa ------> faz o papel da interface strategy, no padrão strategy
  //
  cttTela.prototype.executa = function(array)
  {
    return this.funcao(array);
  }
  //
  //Concrete Strategies
  //
  //Seta imagens na tela
  //Esse tem as duas opções de canvas, pq pode ser necessário nos dois
  var strategyImagem = function (array)
  {//camada, imagem, x0, y0, x, y
    var imagem = null;
    imagem = array[1];

    if(array[0]=="1") //canvas 1
    {
      objCanvas.ctx1.beginPath();
      if(objImagens.img[imagem].complete) //se a imagem já foi carregada antes
      {
        objCanvas.ctx1.drawImage(objImagens.img[imagem], array[2], array[3], array[4], array[5]);
      }
      else
      objImagens.img[imagem].onload = function()
      {
        objCanvas.ctx1.drawImage(objImagens.img[imagem], array[2], array[3], array[4], array[5]);

      }
      objCanvas.ctx1.closePath();
    }
    else //canvas 2
    {
      objCanvas.ctx2.beginPath();
      if(objImagens.img[imagem].complete) //se a imagem já foi carregada antes
      {
        objCanvas.ctx2.drawImage(objImagens.img[imagem], array[2], array[3], array[4], array[5]);
      }
      else
      objImagens.img[imagem].onload = function()
      {
        objCanvas.ctx2.drawImage(objImagens.img[imagem], array[2], array[3], array[4], array[5]);

      }
      objCanvas.ctx2.closePath();
    }
  }

  //Pinta áreas retas da tela
  var strategyCorFundo = function (array)
  { //cor, x0, y0, x, y
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.fillStyle = array[1];
      objCanvas.ctx1.shadowColor = "#99f"; // Cor da sombra;
      objCanvas.ctx1.shadowOffsetX = - 2;
      objCanvas.ctx1.shadowOffsetY = 2;
      objCanvas.ctx1.shadowBlur = 5; // integer
      objCanvas.ctx1.fillRect (array[2], array[3], array[4], array[5]);

      objCanvas.ctx1.shadowOffsetX = 0;
      objCanvas.ctx1.shadowOffsetY = 0;
      objCanvas.ctx1.shadowBlur = 0; // integer
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.fillStyle = array[1];
      objCanvas.ctx2.shadowColor = "#99f"; // Cor da sombra;
      objCanvas.ctx2.shadowOffsetX = - 2;
      objCanvas.ctx2.shadowOffsetY = 2;
      objCanvas.ctx2.shadowBlur = 5; // integer
      objCanvas.ctx2.fillRect (array[2], array[3], array[4], array[5]);

      objCanvas.ctx2.shadowOffsetX = 0;
      objCanvas.ctx2.shadowOffsetY = 0;
      objCanvas.ctx2.shadowBlur = 0; // integer
      objCanvas.ctx2.closePath();
    }
  }

  //Pinta contornos retos na tela
  var strategyMoldura = function (array)
  { //cor, x0, y0, x, y
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.strokeStyle = array[1];
      objCanvas.ctx1.lineWidth = array[6];
      objCanvas.ctx1.strokeRect (array[2], array[3], array[4], array[5]);
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.strokeStyle = array[1];
      objCanvas.ctx2.lineWidth = array[6];
      objCanvas.ctx2.strokeRect (array[2], array[3], array[4], array[5]);
      objCanvas.ctx2.closePath();
    }
  }

  //Desenha Arcos de qualquer medida
  var strategyArco = function (array)
  {//array ----> xZero, yZero, raio, angInicialRad, angRad, cor, espessura
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.lineWidth = array[7];
      objCanvas.ctx1.strokeStyle = array[6];//cor;
      //--->arc(x, y, raio, ângulo inicial, ângulo final, sentido)
      objCanvas.ctx1.arc(array[1], array[2], array[3], array[4], array[5], true);
      objCanvas.ctx1.stroke();
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.lineWidth = array[7];
      objCanvas.ctx2.strokeStyle = array[6];//cor;
      //--->arc(x, y, raio, ângulo inicial, ângulo final, sentido)
      objCanvas.ctx2.arc(array[1], array[2], array[3], array[4], array[5], true);
      objCanvas.ctx2.stroke();
      objCanvas.ctx2.closePath();
    }
  }

  //Desenha Círculos preenchidos de qualquer medida
  var strategyCirculo = function (array)
  {//array ----> xZero, yZero, raio, angInicialRad, angRad, cor, espessura
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.lineWidth = array[7];
      objCanvas.ctx1.fillStyle = array[6];//cor;
      //--->arc(x, y, raio, ângulo inicial, ângulo final, sentido)
      objCanvas.ctx1.arc(array[1], array[2], array[3], array[4], array[5], true);
      objCanvas.ctx1.fill();
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.lineWidth = array[7];
      objCanvas.ctx2.fillStyle = array[6];//cor;
      //--->arc(x, y, raio, ângulo inicial, ângulo final, sentido)
      objCanvas.ctx2.arc(array[1], array[2], array[3], array[4], array[5], true);
      objCanvas.ctx2.fill();
      objCanvas.ctx2.closePath();
    }
  }

  //Desenha Retas Inteiras
  var strategyReta = function (array)
  {//array ----> xZero, yZero, x, y, cor, espessura
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.strokeStyle = array[5];
      objCanvas.ctx1.lineWidth = array[6];
      objCanvas.ctx1.lineCap = "round"; //pontas arredondadas
      objCanvas.ctx1.moveTo(array[1], array[2]);
      objCanvas.ctx1.lineTo(array[3], array[4]);
      objCanvas.ctx1.stroke();
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.strokeStyle = array[5];
      objCanvas.ctx2.lineWidth = array[6];
      objCanvas.ctx2.lineCap = "round"; //pontas arredondadas
      objCanvas.ctx2.moveTo(array[1], array[2]);
      objCanvas.ctx2.lineTo(array[3], array[4]);
      objCanvas.ctx2.stroke();
      objCanvas.ctx2.closePath();
    }
  }

  //Desenha retas pontilhadas
  var strategyPontilhada = function (array)
  {//array ----> xZero, yZero, x, y, cor, espessura, dashed
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.strokeStyle = array[5];
      objCanvas.ctx1.setLineDash(array[7]);
      objCanvas.ctx1.lineCap = "round"; //pontas arredondadas
      objCanvas.ctx1.lineWidth = array[6];
      objCanvas.ctx1.moveTo(array[1], array[2]);
      objCanvas.ctx1.lineTo(array[3], array[4]);
      objCanvas.ctx1.stroke();
      //Remove a propriedade de pontilhado, para não afetar os demais desenhos
      objCanvas.ctx1.setLineDash([0]);
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.strokeStyle = array[5];
      objCanvas.ctx2.setLineDash(array[7]);
      objCanvas.ctx2.lineCap = "round"; //pontas arredondadas
      objCanvas.ctx2.lineWidth = array[6];
      objCanvas.ctx2.moveTo(array[1], array[2]);
      objCanvas.ctx2.lineTo(array[3], array[4]);
      objCanvas.ctx2.stroke();
      //Remove a propriedade de pontilhado, para não afetar os demais desenhos
      objCanvas.ctx2.setLineDash([0]);
      objCanvas.ctx2.closePath();
    }
  }

  //Desenha textos
  //opção dos dois canvas, pq em alguns casos é melhor manter no fundo
  //fixo, pois texto é custoso para renderizar
  var strategyTexto = function (array)
  {//array ----> mensagem, cor, fonte (letra, tamanho), x, y
    if(array[0]=="1")
    {
      objCanvas.ctx1.beginPath();
      objCanvas.ctx1.font = array[3]; //Define Tamanho e fonte
      objCanvas.ctx1.fillStyle = array[2]; //Define a cor

      objCanvas.ctx1.fillText(array[1], array[4], array[5]); //Desenha a mensagem
      objCanvas.ctx1.fill();
      objCanvas.ctx1.closePath();
    }
    else
    {
      objCanvas.ctx2.beginPath();
      objCanvas.ctx2.font = array[3]; //Define Tamanho e fonte
      objCanvas.ctx2.fillStyle = array[2]; //Define a cor

      objCanvas.ctx2.fillText(array[1], array[4], array[5]); //Desenha a mensagem
      objCanvas.ctx2.fill();
      objCanvas.ctx2.closePath();
    }

  }

  //Limpador de Área em Tela
  var strategyLimpaTela = function (array)
  {//array ----> xo, yo, x, y
    var zIndex = array[0];

    if(array[0]=="1")
    {
      objCanvas.ctx1.clearRect(array[1], array[2], array[3], array[4]);
    }
    else
      objCanvas.ctx2.clearRect(array[1], array[2], array[3], array[4]);
  }

  /*
  As funções concrete strategy não são visíveis fora do módulo,
  Assim, não são reconhecidas quando passadas como parâmetro para instanciar um
  strategy em outros módulo.
  Por isso:
  Instanciando aqui, para que seja acessível fora do módulo
  Serão instanciados uma única vez, ao carregar o arquivo
  */
  var construtorCor = new cttTela(strategyCorFundo);
  var construtorContorno = new cttTela(strategyMoldura);
  var construtorImagem = new cttTela(strategyImagem);
  var construtorTxt = new cttTela(strategyTexto);
  var construtorArc = new cttTela(strategyArco);
  var construtorCirc = new cttTela(strategyCirculo);
  var construtorRt = new cttTela(strategyReta);
  var limpa = new cttTela(strategyLimpaTela);
  var construtorPt = new cttTela(strategyPontilhada);

  return {
    construtorCorFundo : construtorCor,
    construtorMoldura: new cttTela(strategyMoldura),
    construtorImagemFundo : construtorImagem,
    construtorTexto : construtorTxt,
    construtorArco : construtorArc,
    construtorCirculo: construtorCirc,
    construtorReta : construtorRt,
    construtorRetaPontilhada : construtorPt,
    limpaTela : limpa
  }

})();
//
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
/*
// Strategies Trigo
//
Utilização de um Strategy para Abstrair a Execução do Cálculo das Funções
Trigonométricas
//
Cálculo de Seno, Cosseno e Tangente
*/
App.strategiesTrigo = (function ()
{
  //Constantes numéricas - ângulos principais
  var NOVENTA = Math.PI/2;
  var CENTO_OITENTA = Math.PI;
  var DUZENTOS_SETENTA = 3*Math.PI/2;
  var TREZENTOS_SESSENTA = 2*Math.PI;
  //
  // funcaoTrigonometica é a classe que pode aprender
  // a calcular diferentes funções (seno, cosseno, tangente).
  // Ela funciona como um construtor para o uso das Strategies ----> é o context,
  // no padrão strategy
  //
  var FuncaoTrigonometrica = function(strategy)
  {
    this.funcao = strategy;
  }
  //
  // aqui a função Calcula, que vai realizar a operação
  // de acordo com a strategy passada pelo construtor acima
  // Recebe um valor (angulo, em radianos) e retorna a chamada da função
  //(strategy) específica, passando o angulo recebido
  // ---- calcula -----> faz o papel da interface strategy, no padrão strategy
  //
  FuncaoTrigonometrica.prototype.calcula = function(angulo)
  {
    return this.funcao(angulo);
  }
  //
  // Strategies -> funções que encapsulam um algoritmo específico
  //
  // Aqui, as Strategies ------------> concrete strategies, no padrão strategy
  // Recebem um valor (angulo, em radianos) e retorna o resultado do cálculo
  // específico
  //
  var strategySeno = function(angulo) // calcula o seno
  {
    if(angulo == NOVENTA || angulo == DUZENTOS_SETENTA)
    {
      if(angulo == NOVENTA)
        return 1;
      else
        return -1;
    }
    else if(angulo == CENTO_OITENTA || angulo == TREZENTOS_SESSENTA || angulo == 0)
      return 0;
    else
      return parseFloat(Math.sin(angulo)).toFixed(5);
  }

  var strategyCosseno = function(angulo) // calcula o cosseno
  {
    if(angulo == NOVENTA || angulo == DUZENTOS_SETENTA)
      return 0;
    else if(angulo == CENTO_OITENTA || angulo == TREZENTOS_SESSENTA || angulo == 0)
    {
      if(angulo == CENTO_OITENTA)
        return -1;
      else
        return 1;
    }
    else
      return parseFloat(Math.cos(angulo)).toFixed(5);
  }

  var strategyTangente = function(angulo) // calcula a tangente
  {
    if(angulo == NOVENTA || angulo == DUZENTOS_SETENTA)
      return "Não Existe";
    else if(angulo == CENTO_OITENTA || angulo == TREZENTOS_SESSENTA || angulo == 0)
      return 0;
    else
      return parseFloat(Math.tan(angulo)).toFixed(5);
  }
  //
  // Utilizando as strategies
  // Instanciando a classe funcaoTrignonométrica, indicando a strategy requerida
  //
  var seno = new FuncaoTrigonometrica(strategySeno);
  var cosseno = new FuncaoTrigonometrica(strategyCosseno);
  var tangente = new FuncaoTrigonometrica(strategyTangente);

  return {
    seno : seno,
    cosseno : cosseno,
    tangente : tangente
  }
})();

//
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
/*
// Strategies Calculadora
//
Utilização de um Strategy para Abstrair a Execução do Cálculo de Coordenadas
//
Cálculo de Coordenadas de Pontos
*/
App.strategiesCalculadora = (function ()
{
  //
  // Calculadora é a classe que pode aprender
  // a calcular diferentes calculos.
  // Ela funciona como um construtor para o uso das Strategies ----> é o context,
  // no padrão strategy
  //
  var Calculadora = function(strategy)
  {
    this.funcao = strategy;
  }
  //
  // aqui a função Calcula, que vai realizar a operação
  // de acordo com a strategy passada pelo construtor acima
  // Recebe um valor (angulo, em radianos) e retorna a chamada da função
  //(strategy) específica, passando o angulo recebido
  // ---- calcula -----> faz o papel da interface strategy, no padrão strategy
  //
  Calculadora.prototype.calcula = function(array)
  {
    return this.funcao(array);
  }
  //
  //
  // Strategies -> funções que encapsulam um algoritmo específico
  //
  // Aqui, as Strategies ------------> concrete strategies, no padrão strategy
  // Recebem um valor (angulo, em radianos) e retorna o resultado do cálculo
  // específico
  //
  var strategyNovoPonto = function(array) // calcula o novo ponto (reta tangnete)
  {//array ----> c, d, limSuperior, xZero, yZero, raio
    //(c,d) --> Ponto externo da Reta Ângulo (sobre a circunferência)

    var x; // Coordenada X do novo ponto
    var y; // Coordenada y do novo ponto
    var c = array[0];
    var d = array[1];
    var limite = 50 + array[2]; //limite superior para o pontlhado
    var xZero = array[3];
    var yZero = array[4];
    var raio = array[5];

    // Seto em X um valor um pouco maior do que a abcissa da reta tangente
    // Assim, garanto que a reta pontilhada laranja terá esse valor máximo,
    // sem ultrapassar a reta tangente
    x = (xZero)+(raio)+ 4;

   // calcula o valor de y a partir do valor de X e das coordenadas dos
   // pontos da reta vermelha (que delimita o ângulo)
   // Usando Equação da Reta
    y = ((c * yZero) + (d * x) - (yZero * x) - (d * xZero)) / (c - xZero);

    // A reta pontilhada laranja não deve ultrapassar os limites superior e
    // inferior do espaço destinado à circunferência dentro do Canvas.
    // Então, caso a coordenada y esteja fora desses limites, é preciso
    // fazer as correções de x e y abaixo:

    if(y<limite) // Limite superior máximo do canvas
    {
      y = limite;
      x = 0;
      x = ((c * yZero) + (xZero * y) - (c * y) - (d * xZero))/(yZero - d);
    }

    else if(y >(objCanvas.canvasHeight - 55))//Limite inferior máximo do canvas
    {
      y = (objCanvas.canvasHeight - 55);
      x = 0;
      x = ((c * yZero) + (xZero * y) - (c * y) - (d * xZero))/(yZero - d);
    }

    //retorna as coordenadas calculadas
    return [x, y];
  }

  /*
    -- calcula coordenadas (x, y) sobre a circunferência, a partir do ângulo.
    -- Chama funções reDesenha e reEscreve;
    //
    Para calcular:
    Pensando num triângulo retângulo sobre a circunferência,
    Tendo o ângulo interno ao triângulo sobreposto ao ângulo exato no ciclo,
    a base do ângulo reto sobre o eixo x (cossenos) e o ponto exato do ângulo
    oposto sobre a circunferência.
    Assim, aplica-se as fórmulas básicas de seno e cosseno no triângulo
    retângulo para se encontrar as coordenadas, tendo em mente que
    X possui valor igual ao ponto no cosseno do ângulo e Y igual ao seno,
    então as medidas de X e Y representam, respectivamente, o cateto adjacente
    e o cateto oposto. A hipotenusa tem medida igual ao raio.
  */
  var strategyPonto= function(array) // calcula o ponto (reta vermelha)
  {//array ---> angRad, xZero, yZero, raio
    var angRad = array[0];
    var xZero = array[1];
    var yZero = array[2];
    var raio = array[3];

    // cos(angRad) = x/raio
    // ou: x = cos(angRad) * raio (soma com xZero para corrigir a posição)
    var x = (Math.cos(angRad) * raio) + xZero;

    // sen(angRad) = y/raio
    // ou: y = sen(angRad) * raio (soma com yZero para corrigir a posição)
    var y = (Math.sin(angRad) * raio) + yZero;

    return [x, y];
  }

  var strategyPontoPxPy = function(array)
  {
    // Pontos que delimitam a reta destino
    var Xa = array[0];
    var Ya = array[1];
    var Xb = array[2];
    var Yb = array[3];

    // Angulo base
    var ang = array[4];

    // Ponto sobre P
    var X0 = array[5];
    var Y0 = array[6];

    // Equação da reta - buscando os coeficientes
    var m = (Ya - Yb)/(Xa - Xb);

    var a = m;
    var b = -1;
    var c = (-m*Xa) + Ya;

    // Distância entre ponto e reta
    var d = Math.abs((a*X0) + (b * Y0) + c) / Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    return strategyPonto([ang, X0, Y0, d]);
  }

  //
  // Utilizando as strategies
  // Instanciando a classe funcaoTrignonométrica, indicando a strategy requerida
  //
  var pt = new Calculadora(strategyPonto);
  var novoPt = new Calculadora(strategyNovoPonto);
  var ptPxPy = new Calculadora(strategyPontoPxPy);

  return {
    ponto : pt,
    novoPonto : novoPt,
    pontoPxPy : ptPxPy,
  }
})();
