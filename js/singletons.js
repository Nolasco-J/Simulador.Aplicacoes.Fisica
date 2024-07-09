"use strict";

var App = App || {};

/*
  Módulo Singletons
*/
//quando o DOCUMENTO HTML estiver pronto, o módulo SINGLETOns pode ser
// carregado
$(document).ready( function()
{
  //Módulo Singletons --> Contém a declaração dos Singletons para uso no sistema
  //Retorna a referência aos singletons para acesso externo ao módulo
  //
  App.singletons = (function ()
  {
    //--------------------------------------------------------------------------
    // Singleton CANVAS com Module Pattern
    //--------------------------------------------------------------------------
    // Para criar uma única instância do singletonCanvas --> dados de acesso
    // criação do canvas no HTML
    // Só é necessário criar uma única vez, e pode ser necessário acessar esses
    // dados diversas vezes,
    // Por isso a utilização do padrão Singleton
    //--------------------------------------------------------------------------
    //
    var singletonCanvas = (function ()
    {
        // armazena uma referência a si próprio (ao singleton)
        var instancia;

        function inicia()
        {
          // métodos e propriedades do singleton vão aqui

          // atributos / objetos privados
          var CV1 = $("#cvTrigonometrando");
          var CONTEXT1 = CV1.get(0).getContext("2d");

          var CV2 = $("#cvTrigonometrando2");
          var CONTEXT2 = CV2.get(0).getContext("2d");

          var CV3 = $("#cvTrigonometrando3");
          var CONTEXT3 = CV3.get(0).getContext("2d");

          var CT = $(CV1).parent(); // Elemento pai do Canvas ---> uma div
          var CV_WIDTH = ($(CT).width() - 1);
          var CV_HEIGHT = $(CT).height();
          var DOCUMENTO = $(document); //para necessidade

          return {
            // Método (função) que especifica os dados/configurações do canvas
            carregaMedidas: function () {
                //
                //Especifica as dimensões do canvas de acordo com o tamanho do
                // container
                //
                CV1.attr("width", $(CT).width() - 10); //largura máxima
                CV1.attr("height", $(CT).height() - 10);  //altura máxima

                CV2.attr("width", $(CT).width() - 10); //largura máxima
                CV2.attr("height", $(CT).height() - 10);  //altura máxima

                CV3.attr("width", $(CT).width()/2 + 1); //largura máxima
                CV3.attr("height", $(CT).height() - 10);  //altura máxima
              },

            // atributos / objetos públicos
            // necessários externamente à função
            doc: DOCUMENTO,
            ctx1: CONTEXT1,
            ctx2: CONTEXT2,
            ctx3: CONTEXT3,
            canvasWidth: CV_WIDTH,
            canvasHeight: CV_HEIGHT,
            canvas1: CV1,
            canvas2: CV2,
            canvas3: CV3
          }
        }

        // retorna sempre a mesma instância dessa classe
        return {
          // se a instância existir, retorna ela, se não, cria uma nova
          getInstancia: function () {

            if ( !instancia )
              instancia = inicia();

            return instancia;
          }
        }
      })();
    // FIM singletonCanvas
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    // Singleton IMAGENS com Module Pattern
    //--------------------------------------------------------------------------
    // Para criar uma única instância do singletonImagens -->
    // Instancia todas as imagens uma única vez
    // Só é necessário criar uma única vez, e pode ser necessário acessar esses
    // dados diversas vezes,
    // Por isso a utilização do padrão Singleton
    // Assim, economiza tempo/processamento relacionado ao carregamento das img
    //--------------------------------------------------------------------------
    //
    var singletonImagens = (function ()
    {
        // armazena uma referência a si mesmo (ao singleton)
        var instancia;

        function inicia()
        {
          // objeto privado
          var imagem = [];

          imagem["frame"] = new Image();
          imagem["frame"].src = "./imagens/frame.png";

          imagem["frame2"] = new Image();
          imagem["frame2"].src = "./imagens/frame2.png";

          imagem["teclas"] = new Image();
          imagem["teclas"].src = "./imagens/teclas2.png";

          imagem["btTrinta"] = new Image();
          imagem["btTrinta"].src = "./imagens/30.png";

          imagem["btQuarentaCinco"] = new Image();
          imagem["btQuarentaCinco"].src = "./imagens/45.png";

          imagem["btSessenta"] = new Image();
          imagem["btSessenta"].src = "./imagens/60.png";

          imagem["btVoltar"] = new Image();
          imagem["btVoltar"].src = "./imagens/btVolta.png";

          imagem["btAvancar"] = new Image();
          imagem["btAvancar"].src = "./imagens/btAvanca.png";

          imagem["IA"] = new Image();
          imagem["IA"].src = "./imagens/IA.png";

          imagem["btOk"] = new Image();
          imagem["btOk"].src = "./imagens/ok.png";

          imagem["btSolucao"] = new Image();
          imagem["btSolucao"].src = "./imagens/btSolucao.png"

          imagem["lanterna"] = new Image();
          imagem["lanterna"].src = "./imagens/flashlight.png"

          imagem["espelho"] = new Image();
          imagem["espelho"].src = "./imagens/mirror_01.png"

          return {
            img: imagem
          }
        }

        // retorna sempre a mesma instância dessa classe
        return {
            // se a instância existir, retorna ela, senão cria uma nova
            getInstancia: function () {

              if ( !instancia )
                instancia = inicia();

              return instancia;
            }
        }
    })();
    // FIM singletonImagens
    //-------------------------------------------------------------------------

    //retorna os singletons, para acesso externo
    return {
      singletonCanvas: singletonCanvas,
      singletonImagens: singletonImagens
    }
  })(); //FIM App.modulos.singletons
}) //FIM $(document).ready
