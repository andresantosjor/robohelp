(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Lunr languages, `Portuguese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Mihai Valentin
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.pt = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.pt.trimmer,
        lunr.pt.stopWordFilter,
        lunr.pt.stemmer
      );

      // for lunr version 2
      // this is necessary so that every searched word is also stemmed before
      // in lunr <= 1 this is not needed, as it is done using the normal pipeline
      if (this.searchPipeline) {
        this.searchPipeline.reset();
        this.searchPipeline.add(lunr.pt.stemmer)
      }
    };

    /* lunr trimmer function */
    lunr.pt.wordCharacters = "A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A";
    lunr.pt.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.pt.wordCharacters);

    lunr.Pipeline.registerFunction(lunr.pt.trimmer, 'trimmer-pt');

    /* lunr stemmer function */
    lunr.pt.stemmer = (function() {
      /* create the wrapped stemmer object */
      var Among = lunr.stemmerSupport.Among,
        SnowballProgram = lunr.stemmerSupport.SnowballProgram,
        st = new function PortugueseStemmer() {
          var a_0 = [new Among("", -1, 3), new Among("\u00E3", 0, 1),
              new Among("\u00F5", 0, 2)
            ],
            a_1 = [new Among("", -1, 3),
              new Among("a~", 0, 1), new Among("o~", 0, 2)
            ],
            a_2 = [
              new Among("ic", -1, -1), new Among("ad", -1, -1),
              new Among("os", -1, -1), new Among("iv", -1, 1)
            ],
            a_3 = [
              new Among("ante", -1, 1), new Among("avel", -1, 1),
              new Among("\u00EDvel", -1, 1)
            ],
            a_4 = [new Among("ic", -1, 1),
              new Among("abil", -1, 1), new Among("iv", -1, 1)
            ],
            a_5 = [
              new Among("ica", -1, 1), new Among("\u00E2ncia", -1, 1),
              new Among("\u00EAncia", -1, 4), new Among("ira", -1, 9),
              new Among("adora", -1, 1), new Among("osa", -1, 1),
              new Among("ista", -1, 1), new Among("iva", -1, 8),
              new Among("eza", -1, 1), new Among("log\u00EDa", -1, 2),
              new Among("idade", -1, 7), new Among("ante", -1, 1),
              new Among("mente", -1, 6), new Among("amente", 12, 5),
              new Among("\u00E1vel", -1, 1), new Among("\u00EDvel", -1, 1),
              new Among("uci\u00F3n", -1, 3), new Among("ico", -1, 1),
              new Among("ismo", -1, 1), new Among("oso", -1, 1),
              new Among("amento", -1, 1), new Among("imento", -1, 1),
              new Among("ivo", -1, 8), new Among("a\u00E7a~o", -1, 1),
              new Among("ador", -1, 1), new Among("icas", -1, 1),
              new Among("\u00EAncias", -1, 4), new Among("iras", -1, 9),
              new Among("adoras", -1, 1), new Among("osas", -1, 1),
              new Among("istas", -1, 1), new Among("ivas", -1, 8),
              new Among("ezas", -1, 1), new Among("log\u00EDas", -1, 2),
              new Among("idades", -1, 7), new Among("uciones", -1, 3),
              new Among("adores", -1, 1), new Among("antes", -1, 1),
              new Among("a\u00E7o~es", -1, 1), new Among("icos", -1, 1),
              new Among("ismos", -1, 1), new Among("osos", -1, 1),
              new Among("amentos", -1, 1), new Among("imentos", -1, 1),
              new Among("ivos", -1, 8)
            ],
            a_6 = [new Among("ada", -1, 1),
              new Among("ida", -1, 1), new Among("ia", -1, 1),
              new Among("aria", 2, 1), new Among("eria", 2, 1),
              new Among("iria", 2, 1), new Among("ara", -1, 1),
              new Among("era", -1, 1), new Among("ira", -1, 1),
              new Among("ava", -1, 1), new Among("asse", -1, 1),
              new Among("esse", -1, 1), new Among("isse", -1, 1),
              new Among("aste", -1, 1), new Among("este", -1, 1),
              new Among("iste", -1, 1), new Among("ei", -1, 1),
              new Among("arei", 16, 1), new Among("erei", 16, 1),
              new Among("irei", 16, 1), new Among("am", -1, 1),
              new Among("iam", 20, 1), new Among("ariam", 21, 1),
              new Among("eriam", 21, 1), new Among("iriam", 21, 1),
              new Among("aram", 20, 1), new Among("eram", 20, 1),
              new Among("iram", 20, 1), new Among("avam", 20, 1),
              new Among("em", -1, 1), new Among("arem", 29, 1),
              new Among("erem", 29, 1), new Among("irem", 29, 1),
              new Among("assem", 29, 1), new Among("essem", 29, 1),
              new Among("issem", 29, 1), new Among("ado", -1, 1),
              new Among("ido", -1, 1), new Among("ando", -1, 1),
              new Among("endo", -1, 1), new Among("indo", -1, 1),
              new Among("ara~o", -1, 1), new Among("era~o", -1, 1),
              new Among("ira~o", -1, 1), new Among("ar", -1, 1),
              new Among("er", -1, 1), new Among("ir", -1, 1),
              new Among("as", -1, 1), new Among("adas", 47, 1),
              new Among("idas", 47, 1), new Among("ias", 47, 1),
              new Among("arias", 50, 1), new Among("erias", 50, 1),
              new Among("irias", 50, 1), new Among("aras", 47, 1),
              new Among("eras", 47, 1), new Among("iras", 47, 1),
              new Among("avas", 47, 1), new Among("es", -1, 1),
              new Among("ardes", 58, 1), new Among("erdes", 58, 1),
              new Among("irdes", 58, 1), new Among("ares", 58, 1),
              new Among("eres", 58, 1), new Among("ires", 58, 1),
              new Among("asses", 58, 1), new Among("esses", 58, 1),
              new Among("isses", 58, 1), new Among("astes", 58, 1),
              new Among("estes", 58, 1), new Among("istes", 58, 1),
              new Among("is", -1, 1), new Among("ais", 71, 1),
              new Among("eis", 71, 1), new Among("areis", 73, 1),
              new Among("ereis", 73, 1), new Among("ireis", 73, 1),
              new Among("\u00E1reis", 73, 1), new Among("\u00E9reis", 73, 1),
              new Among("\u00EDreis", 73, 1), new Among("\u00E1sseis", 73, 1),
              new Among("\u00E9sseis", 73, 1), new Among("\u00EDsseis", 73, 1),
              new Among("\u00E1veis", 73, 1), new Among("\u00EDeis", 73, 1),
              new Among("ar\u00EDeis", 84, 1), new Among("er\u00EDeis", 84, 1),
              new Among("ir\u00EDeis", 84, 1), new Among("ados", -1, 1),
              new Among("idos", -1, 1), new Among("amos", -1, 1),
              new Among("\u00E1ramos", 90, 1), new Among("\u00E9ramos", 90, 1),
              new Among("\u00EDramos", 90, 1), new Among("\u00E1vamos", 90, 1),
              new Among("\u00EDamos", 90, 1), new Among("ar\u00EDamos", 95, 1),
              new Among("er\u00EDamos", 95, 1), new Among("ir\u00EDamos", 95, 1),
              new Among("emos", -1, 1), new Among("aremos", 99, 1),
              new Among("eremos", 99, 1), new Among("iremos", 99, 1),
              new Among("\u00E1ssemos", 99, 1), new Among("\u00EAssemos", 99, 1),
              new Among("\u00EDssemos", 99, 1), new Among("imos", -1, 1),
              new Among("armos", -1, 1), new Among("ermos", -1, 1),
              new Among("irmos", -1, 1), new Among("\u00E1mos", -1, 1),
              new Among("ar\u00E1s", -1, 1), new Among("er\u00E1s", -1, 1),
              new Among("ir\u00E1s", -1, 1), new Among("eu", -1, 1),
              new Among("iu", -1, 1), new Among("ou", -1, 1),
              new Among("ar\u00E1", -1, 1), new Among("er\u00E1", -1, 1),
              new Among("ir\u00E1", -1, 1)
            ],
            a_7 = [new Among("a", -1, 1),
              new Among("i", -1, 1), new Among("o", -1, 1),
              new Among("os", -1, 1), new Among("\u00E1", -1, 1),
              new Among("\u00ED", -1, 1), new Among("\u00F3", -1, 1)
            ],
            a_8 = [
              new Among("e", -1, 1), new Among("\u00E7", -1, 2),
              new Among("\u00E9", -1, 1), new Among("\u00EA", -1, 1)
            ],
            g_v = [17,
              65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 19, 12, 2
            ],
            I_p2, I_p1, I_pV, sbp = new SnowballProgram();
          this.setCurrent = function(word) {
            sbp.setCurrent(word);
          };
          this.getCurrent = function() {
            return sbp.getCurrent();
          };

          function r_prelude() {
            var among_var;
            while (true) {
              sbp.bra = sbp.cursor;
              among_var = sbp.find_among(a_0, 3);
              if (among_var) {
                sbp.ket = sbp.cursor;
                switch (among_var) {
                  case 1:
                    sbp.slice_from("a~");
                    continue;
                  case 2:
                    sbp.slice_from("o~");
                    continue;
                  case 3:
                    if (sbp.cursor >= sbp.limit)
                      break;
                    sbp.cursor++;
                    continue;
                }
              }
              break;
            }
          }

          function habr2() {
            if (sbp.out_grouping(g_v, 97, 250)) {
              while (!sbp.in_grouping(g_v, 97, 250)) {
                if (sbp.cursor >= sbp.limit)
                  return true;
                sbp.cursor++;
              }
              return false;
            }
            return true;
          }

          function habr3() {
            if (sbp.in_grouping(g_v, 97, 250)) {
              while (!sbp.out_grouping(g_v, 97, 250)) {
                if (sbp.cursor >= sbp.limit)
                  return false;
                sbp.cursor++;
              }
            }
            I_pV = sbp.cursor;
            return true;
          }

          function habr4() {
            var v_1 = sbp.cursor,
              v_2, v_3;
            if (sbp.in_grouping(g_v, 97, 250)) {
              v_2 = sbp.cursor;
              if (habr2()) {
                sbp.cursor = v_2;
                if (habr3())
                  return;
              } else
                I_pV = sbp.cursor;
            }
            sbp.cursor = v_1;
            if (sbp.out_grouping(g_v, 97, 250)) {
              v_3 = sbp.cursor;
              if (habr2()) {
                sbp.cursor = v_3;
                if (!sbp.in_grouping(g_v, 97, 250) || sbp.cursor >= sbp.limit)
                  return;
                sbp.cursor++;
              }
              I_pV = sbp.cursor;
            }
          }

          function habr5() {
            while (!sbp.in_grouping(g_v, 97, 250)) {
              if (sbp.cursor >= sbp.limit)
                return false;
              sbp.cursor++;
            }
            while (!sbp.out_grouping(g_v, 97, 250)) {
              if (sbp.cursor >= sbp.limit)
                return false;
              sbp.cursor++;
            }
            return true;
          }

          function r_mark_regions() {
            var v_1 = sbp.cursor;
            I_pV = sbp.limit;
            I_p1 = I_pV;
            I_p2 = I_pV;
            habr4();
            sbp.cursor = v_1;
            if (habr5()) {
              I_p1 = sbp.cursor;
              if (habr5())
                I_p2 = sbp.cursor;
            }
          }

          function r_postlude() {
            var among_var;
            while (true) {
              sbp.bra = sbp.cursor;
              among_var = sbp.find_among(a_1, 3);
              if (among_var) {
                sbp.ket = sbp.cursor;
                switch (among_var) {
                  case 1:
                    sbp.slice_from("\u00E3");
                    continue;
                  case 2:
                    sbp.slice_from("\u00F5");
                    continue;
                  case 3:
                    if (sbp.cursor >= sbp.limit)
                      break;
                    sbp.cursor++;
                    continue;
                }
              }
              break;
            }
          }

          function r_RV() {
            return I_pV <= sbp.cursor;
          }

          function r_R1() {
            return I_p1 <= sbp.cursor;
          }

          function r_R2() {
            return I_p2 <= sbp.cursor;
          }

          function r_standard_suffix() {
            var among_var;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_5, 45);
            if (!among_var)
              return false;
            sbp.bra = sbp.cursor;
            switch (among_var) {
              case 1:
                if (!r_R2())
                  return false;
                sbp.slice_del();
                break;
              case 2:
                if (!r_R2())
                  return false;
                sbp.slice_from("log");
                break;
              case 3:
                if (!r_R2())
                  return false;
                sbp.slice_from("u");
                break;
              case 4:
                if (!r_R2())
                  return false;
                sbp.slice_from("ente");
                break;
              case 5:
                if (!r_R1())
                  return false;
                sbp.slice_del();
                sbp.ket = sbp.cursor;
                among_var = sbp.find_among_b(a_2, 4);
                if (among_var) {
                  sbp.bra = sbp.cursor;
                  if (r_R2()) {
                    sbp.slice_del();
                    if (among_var == 1) {
                      sbp.ket = sbp.cursor;
                      if (sbp.eq_s_b(2, "at")) {
                        sbp.bra = sbp.cursor;
                        if (r_R2())
                          sbp.slice_del();
                      }
                    }
                  }
                }
                break;
              case 6:
                if (!r_R2())
                  return false;
                sbp.slice_del();
                sbp.ket = sbp.cursor;
                among_var = sbp.find_among_b(a_3, 3);
                if (among_var) {
                  sbp.bra = sbp.cursor;
                  if (among_var == 1)
                    if (r_R2())
                      sbp.slice_del();
                }
                break;
              case 7:
                if (!r_R2())
                  return false;
                sbp.slice_del();
                sbp.ket = sbp.cursor;
                among_var = sbp.find_among_b(a_4, 3);
                if (among_var) {
                  sbp.bra = sbp.cursor;
                  if (among_var == 1)
                    if (r_R2())
                      sbp.slice_del();
                }
                break;
              case 8:
                if (!r_R2())
                  return false;
                sbp.slice_del();
                sbp.ket = sbp.cursor;
                if (sbp.eq_s_b(2, "at")) {
                  sbp.bra = sbp.cursor;
                  if (r_R2())
                    sbp.slice_del();
                }
                break;
              case 9:
                if (!r_RV() || !sbp.eq_s_b(1, "e"))
                  return false;
                sbp.slice_from("ir");
                break;
            }
            return true;
          }

          function r_verb_suffix() {
            var among_var, v_1;
            if (sbp.cursor >= I_pV) {
              v_1 = sbp.limit_backward;
              sbp.limit_backward = I_pV;
              sbp.ket = sbp.cursor;
              among_var = sbp.find_among_b(a_6, 120);
              if (among_var) {
                sbp.bra = sbp.cursor;
                if (among_var == 1)
                  sbp.slice_del();
                sbp.limit_backward = v_1;
                return true;
              }
              sbp.limit_backward = v_1;
            }
            return false;
          }

          function r_residual_suffix() {
            var among_var;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_7, 7);
            if (among_var) {
              sbp.bra = sbp.cursor;
              if (among_var == 1)
                if (r_RV())
                  sbp.slice_del();
            }
          }

          function habr6(c1, c2) {
            if (sbp.eq_s_b(1, c1)) {
              sbp.bra = sbp.cursor;
              var v_1 = sbp.limit - sbp.cursor;
              if (sbp.eq_s_b(1, c2)) {
                sbp.cursor = sbp.limit - v_1;
                if (r_RV())
                  sbp.slice_del();
                return false;
              }
            }
            return true;
          }

          function r_residual_form() {
            var among_var, v_1, v_2, v_3;
            sbp.ket = sbp.cursor;
            among_var = sbp.find_among_b(a_8, 4);
            if (among_var) {
              sbp.bra = sbp.cursor;
              switch (among_var) {
                case 1:
                  if (r_RV()) {
                    sbp.slice_del();
                    sbp.ket = sbp.cursor;
                    v_1 = sbp.limit - sbp.cursor;
                    if (habr6("u", "g"))
                      habr6("i", "c")
                  }
                  break;
                case 2:
                  sbp.slice_from("c");
                  break;
              }
            }
          }

          function habr1() {
            if (!r_standard_suffix()) {
              sbp.cursor = sbp.limit;
              if (!r_verb_suffix()) {
                sbp.cursor = sbp.limit;
                r_residual_suffix();
                return;
              }
            }
            sbp.cursor = sbp.limit;
            sbp.ket = sbp.cursor;
            if (sbp.eq_s_b(1, "i")) {
              sbp.bra = sbp.cursor;
              if (sbp.eq_s_b(1, "c")) {
                sbp.cursor = sbp.limit;
                if (r_RV())
                  sbp.slice_del();
              }
            }
          }
          this.stem = function() {
            var v_1 = sbp.cursor;
            r_prelude();
            sbp.cursor = v_1;
            r_mark_regions();
            sbp.limit_backward = v_1;
            sbp.cursor = sbp.limit;
            habr1();
            sbp.cursor = sbp.limit;
            r_residual_form();
            sbp.cursor = sbp.limit_backward;
            r_postlude();
            return true;
          }
        };

      /* and return a function that stems a word for the current locale */
      return function(token) {
        // for lunr version 2
        if (typeof token.update === "function") {
          return token.update(function(word) {
            st.setCurrent(word);
            st.stem();
            return st.getCurrent();
          })
        } else { // for lunr version <= 1
          st.setCurrent(token);
          st.stem();
          return st.getCurrent();
        }
      }
    })();

    lunr.Pipeline.registerFunction(lunr.pt.stemmer, 'stemmer-pt');

    lunr.pt.stopWordFilter = lunr.generateStopWordFilter('a ao aos aquela aquelas aquele aqueles aquilo as até com como da das de dela delas dele deles depois do dos e ela elas ele eles em entre era eram essa essas esse esses esta estamos estas estava estavam este esteja estejam estejamos estes esteve estive estivemos estiver estivera estiveram estiverem estivermos estivesse estivessem estivéramos estivéssemos estou está estávamos estão eu foi fomos for fora foram forem formos fosse fossem fui fôramos fôssemos haja hajam hajamos havemos hei houve houvemos houver houvera houveram houverei houverem houveremos houveria houveriam houvermos houverá houverão houveríamos houvesse houvessem houvéramos houvéssemos há hão isso isto já lhe lhes mais mas me mesmo meu meus minha minhas muito na nas nem no nos nossa nossas nosso nossos num numa não nós o os ou para pela pelas pelo pelos por qual quando que quem se seja sejam sejamos sem serei seremos seria seriam será serão seríamos seu seus somos sou sua suas são só também te tem temos tenha tenham tenhamos tenho terei teremos teria teriam terá terão teríamos teu teus teve tinha tinham tive tivemos tiver tivera tiveram tiverem tivermos tivesse tivessem tivéramos tivéssemos tu tua tuas tém tínhamos um uma você vocês vos à às éramos'.split(' '));

    lunr.Pipeline.registerFunction(lunr.pt.stopWordFilter, 'stopWordFilter-pt');
  };
}))
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var rh = global.rh;
var lunrlang = require('../../node_modules/lunr-languages/lunr.pt');
rh._.exports(lunrlang);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../node_modules/lunr-languages/lunr.pt":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbHVuci1sYW5ndWFnZXMvbHVuci5wdC5qcyIsInNyYy9sYW5ndWFnZXMvcHQuanM2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pqQkEsSUFBSSxLQUFLLE9BQU8sRUFBaEI7QUFDQSxJQUFJLFdBQVcsUUFBUSwyQ0FBUixDQUFmO0FBQ0EsR0FBRyxDQUFILENBQUssT0FBTCxDQUFjLFFBQWQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiFcbiAqIEx1bnIgbGFuZ3VhZ2VzLCBgUG9ydHVndWVzZWAgbGFuZ3VhZ2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWhhaVZhbGVudGluL2x1bnItbGFuZ3VhZ2VzXG4gKlxuICogQ29weXJpZ2h0IDIwMTQsIE1paGFpIFZhbGVudGluXG4gKiBodHRwOi8vd3d3Lm1vemlsbGEub3JnL01QTC9cbiAqL1xuLyohXG4gKiBiYXNlZCBvblxuICogU25vd2JhbGwgSmF2YVNjcmlwdCBMaWJyYXJ5IHYwLjNcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC91cmltL1xuICogaHR0cDovL3Nub3diYWxsLnRhcnRhcnVzLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgMjAxMCwgT2xlZyBNYXprb1xuICogaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9NUEwvXG4gKi9cblxuLyoqXG4gKiBleHBvcnQgdGhlIG1vZHVsZSB2aWEgQU1ELCBDb21tb25KUyBvciBhcyBhIGJyb3dzZXIgZ2xvYmFsXG4gKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICovXG47XG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShmYWN0b3J5KVxuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8qKlxuICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAqIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAqIGxpa2UgTm9kZS5cbiAgICAgKi9cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKVxuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgZmFjdG9yeSgpKHJvb3QubHVucik7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24oKSB7XG4gIC8qKlxuICAgKiBKdXN0IHJldHVybiBhIHZhbHVlIHRvIGRlZmluZSB0aGUgbW9kdWxlIGV4cG9ydC5cbiAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgKiBjYW4gcmV0dXJuIGEgZnVuY3Rpb24gYXMgdGhlIGV4cG9ydGVkIHZhbHVlLlxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uKGx1bnIpIHtcbiAgICAvKiB0aHJvdyBlcnJvciBpZiBsdW5yIGlzIG5vdCB5ZXQgaW5jbHVkZWQgKi9cbiAgICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBsdW5yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0x1bnIgaXMgbm90IHByZXNlbnQuIFBsZWFzZSBpbmNsdWRlIC8gcmVxdWlyZSBMdW5yIGJlZm9yZSB0aGlzIHNjcmlwdC4nKTtcbiAgICB9XG5cbiAgICAvKiB0aHJvdyBlcnJvciBpZiBsdW5yIHN0ZW1tZXIgc3VwcG9ydCBpcyBub3QgeWV0IGluY2x1ZGVkICovXG4gICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgbHVuci5zdGVtbWVyU3VwcG9ydCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdMdW5yIHN0ZW1tZXIgc3VwcG9ydCBpcyBub3QgcHJlc2VudC4gUGxlYXNlIGluY2x1ZGUgLyByZXF1aXJlIEx1bnIgc3RlbW1lciBzdXBwb3J0IGJlZm9yZSB0aGlzIHNjcmlwdC4nKTtcbiAgICB9XG5cbiAgICAvKiByZWdpc3RlciBzcGVjaWZpYyBsb2NhbGUgZnVuY3Rpb24gKi9cbiAgICBsdW5yLnB0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnBpcGVsaW5lLnJlc2V0KCk7XG4gICAgICB0aGlzLnBpcGVsaW5lLmFkZChcbiAgICAgICAgbHVuci5wdC50cmltbWVyLFxuICAgICAgICBsdW5yLnB0LnN0b3BXb3JkRmlsdGVyLFxuICAgICAgICBsdW5yLnB0LnN0ZW1tZXJcbiAgICAgICk7XG5cbiAgICAgIC8vIGZvciBsdW5yIHZlcnNpb24gMlxuICAgICAgLy8gdGhpcyBpcyBuZWNlc3Nhcnkgc28gdGhhdCBldmVyeSBzZWFyY2hlZCB3b3JkIGlzIGFsc28gc3RlbW1lZCBiZWZvcmVcbiAgICAgIC8vIGluIGx1bnIgPD0gMSB0aGlzIGlzIG5vdCBuZWVkZWQsIGFzIGl0IGlzIGRvbmUgdXNpbmcgdGhlIG5vcm1hbCBwaXBlbGluZVxuICAgICAgaWYgKHRoaXMuc2VhcmNoUGlwZWxpbmUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQaXBlbGluZS5yZXNldCgpO1xuICAgICAgICB0aGlzLnNlYXJjaFBpcGVsaW5lLmFkZChsdW5yLnB0LnN0ZW1tZXIpXG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qIGx1bnIgdHJpbW1lciBmdW5jdGlvbiAqL1xuICAgIGx1bnIucHQud29yZENoYXJhY3RlcnMgPSBcIkEtWmEtelxceEFBXFx4QkFcXHhDMC1cXHhENlxceEQ4LVxceEY2XFx4RjgtXFx1MDJCOFxcdTAyRTAtXFx1MDJFNFxcdTFEMDAtXFx1MUQyNVxcdTFEMkMtXFx1MUQ1Q1xcdTFENjItXFx1MUQ2NVxcdTFENkItXFx1MUQ3N1xcdTFENzktXFx1MURCRVxcdTFFMDAtXFx1MUVGRlxcdTIwNzFcXHUyMDdGXFx1MjA5MC1cXHUyMDlDXFx1MjEyQVxcdTIxMkJcXHUyMTMyXFx1MjE0RVxcdTIxNjAtXFx1MjE4OFxcdTJDNjAtXFx1MkM3RlxcdUE3MjItXFx1QTc4N1xcdUE3OEItXFx1QTdBRFxcdUE3QjAtXFx1QTdCN1xcdUE3RjctXFx1QTdGRlxcdUFCMzAtXFx1QUI1QVxcdUFCNUMtXFx1QUI2NFxcdUZCMDAtXFx1RkIwNlxcdUZGMjEtXFx1RkYzQVxcdUZGNDEtXFx1RkY1QVwiO1xuICAgIGx1bnIucHQudHJpbW1lciA9IGx1bnIudHJpbW1lclN1cHBvcnQuZ2VuZXJhdGVUcmltbWVyKGx1bnIucHQud29yZENoYXJhY3RlcnMpO1xuXG4gICAgbHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIucHQudHJpbW1lciwgJ3RyaW1tZXItcHQnKTtcblxuICAgIC8qIGx1bnIgc3RlbW1lciBmdW5jdGlvbiAqL1xuICAgIGx1bnIucHQuc3RlbW1lciA9IChmdW5jdGlvbigpIHtcbiAgICAgIC8qIGNyZWF0ZSB0aGUgd3JhcHBlZCBzdGVtbWVyIG9iamVjdCAqL1xuICAgICAgdmFyIEFtb25nID0gbHVuci5zdGVtbWVyU3VwcG9ydC5BbW9uZyxcbiAgICAgICAgU25vd2JhbGxQcm9ncmFtID0gbHVuci5zdGVtbWVyU3VwcG9ydC5Tbm93YmFsbFByb2dyYW0sXG4gICAgICAgIHN0ID0gbmV3IGZ1bmN0aW9uIFBvcnR1Z3Vlc2VTdGVtbWVyKCkge1xuICAgICAgICAgIHZhciBhXzAgPSBbbmV3IEFtb25nKFwiXCIsIC0xLCAzKSwgbmV3IEFtb25nKFwiXFx1MDBFM1wiLCAwLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBGNVwiLCAwLCAyKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFfMSA9IFtuZXcgQW1vbmcoXCJcIiwgLTEsIDMpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhflwiLCAwLCAxKSwgbmV3IEFtb25nKFwib35cIiwgMCwgMilcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhXzIgPSBbXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImljXCIsIC0xLCAtMSksIG5ldyBBbW9uZyhcImFkXCIsIC0xLCAtMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIm9zXCIsIC0xLCAtMSksIG5ldyBBbW9uZyhcIml2XCIsIC0xLCAxKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFfMyA9IFtcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYW50ZVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcImF2ZWxcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJcXHUwMEVEdmVsXCIsIC0xLCAxKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFfNCA9IFtuZXcgQW1vbmcoXCJpY1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFiaWxcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpdlwiLCAtMSwgMSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhXzUgPSBbXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImljYVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcIlxcdTAwRTJuY2lhXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFQW5jaWFcIiwgLTEsIDQpLCBuZXcgQW1vbmcoXCJpcmFcIiwgLTEsIDkpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhZG9yYVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcIm9zYVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzdGFcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpdmFcIiwgLTEsIDgpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlemFcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJsb2dcXHUwMEVEYVwiLCAtMSwgMiksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlkYWRlXCIsIC0xLCA3KSwgbmV3IEFtb25nKFwiYW50ZVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIm1lbnRlXCIsIC0xLCA2KSwgbmV3IEFtb25nKFwiYW1lbnRlXCIsIDEyLCA1KSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFMXZlbFwiLCAtMSwgMSksIG5ldyBBbW9uZyhcIlxcdTAwRUR2ZWxcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJ1Y2lcXHUwMEYzblwiLCAtMSwgMyksIG5ldyBBbW9uZyhcImljb1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzbW9cIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJvc29cIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhbWVudG9cIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpbWVudG9cIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpdm9cIiwgLTEsIDgpLCBuZXcgQW1vbmcoXCJhXFx1MDBFN2F+b1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFkb3JcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpY2FzXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFQW5jaWFzXCIsIC0xLCA0KSwgbmV3IEFtb25nKFwiaXJhc1wiLCAtMSwgOSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFkb3Jhc1wiLCAtMSwgMSksIG5ldyBBbW9uZyhcIm9zYXNcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpc3Rhc1wiLCAtMSwgMSksIG5ldyBBbW9uZyhcIml2YXNcIiwgLTEsIDgpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlemFzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwibG9nXFx1MDBFRGFzXCIsIC0xLCAyKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWRhZGVzXCIsIC0xLCA3KSwgbmV3IEFtb25nKFwidWNpb25lc1wiLCAtMSwgMyksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFkb3Jlc1wiLCAtMSwgMSksIG5ldyBBbW9uZyhcImFudGVzXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYVxcdTAwRTdvfmVzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaWNvc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzbW9zXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwib3Nvc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFtZW50b3NcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpbWVudG9zXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXZvc1wiLCAtMSwgOClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhXzYgPSBbbmV3IEFtb25nKFwiYWRhXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWRhXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiaWFcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhcmlhXCIsIDIsIDEpLCBuZXcgQW1vbmcoXCJlcmlhXCIsIDIsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcmlhXCIsIDIsIDEpLCBuZXcgQW1vbmcoXCJhcmFcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmFcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpcmFcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhdmFcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJhc3NlXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZXNzZVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcImlzc2VcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhc3RlXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiZXN0ZVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzdGVcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJlaVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFyZWlcIiwgMTYsIDEpLCBuZXcgQW1vbmcoXCJlcmVpXCIsIDE2LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXJlaVwiLCAxNiwgMSksIG5ldyBBbW9uZyhcImFtXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWFtXCIsIDIwLCAxKSwgbmV3IEFtb25nKFwiYXJpYW1cIiwgMjEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmlhbVwiLCAyMSwgMSksIG5ldyBBbW9uZyhcImlyaWFtXCIsIDIxLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXJhbVwiLCAyMCwgMSksIG5ldyBBbW9uZyhcImVyYW1cIiwgMjAsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcmFtXCIsIDIwLCAxKSwgbmV3IEFtb25nKFwiYXZhbVwiLCAyMCwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImVtXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiYXJlbVwiLCAyOSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImVyZW1cIiwgMjksIDEpLCBuZXcgQW1vbmcoXCJpcmVtXCIsIDI5LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXNzZW1cIiwgMjksIDEpLCBuZXcgQW1vbmcoXCJlc3NlbVwiLCAyOSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzc2VtXCIsIDI5LCAxKSwgbmV3IEFtb25nKFwiYWRvXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWRvXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiYW5kb1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImVuZG9cIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJpbmRvXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXJhfm9cIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJlcmF+b1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlyYX5vXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiYXJcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlclwiLCAtMSwgMSksIG5ldyBBbW9uZyhcImlyXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXNcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJhZGFzXCIsIDQ3LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaWRhc1wiLCA0NywgMSksIG5ldyBBbW9uZyhcImlhc1wiLCA0NywgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFyaWFzXCIsIDUwLCAxKSwgbmV3IEFtb25nKFwiZXJpYXNcIiwgNTAsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcmlhc1wiLCA1MCwgMSksIG5ldyBBbW9uZyhcImFyYXNcIiwgNDcsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmFzXCIsIDQ3LCAxKSwgbmV3IEFtb25nKFwiaXJhc1wiLCA0NywgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImF2YXNcIiwgNDcsIDEpLCBuZXcgQW1vbmcoXCJlc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFyZGVzXCIsIDU4LCAxKSwgbmV3IEFtb25nKFwiZXJkZXNcIiwgNTgsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcmRlc1wiLCA1OCwgMSksIG5ldyBBbW9uZyhcImFyZXNcIiwgNTgsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmVzXCIsIDU4LCAxKSwgbmV3IEFtb25nKFwiaXJlc1wiLCA1OCwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFzc2VzXCIsIDU4LCAxKSwgbmV3IEFtb25nKFwiZXNzZXNcIiwgNTgsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpc3Nlc1wiLCA1OCwgMSksIG5ldyBBbW9uZyhcImFzdGVzXCIsIDU4LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZXN0ZXNcIiwgNTgsIDEpLCBuZXcgQW1vbmcoXCJpc3Rlc1wiLCA1OCwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiYWlzXCIsIDcxLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZWlzXCIsIDcxLCAxKSwgbmV3IEFtb25nKFwiYXJlaXNcIiwgNzMsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlcmVpc1wiLCA3MywgMSksIG5ldyBBbW9uZyhcImlyZWlzXCIsIDczLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFMXJlaXNcIiwgNzMsIDEpLCBuZXcgQW1vbmcoXCJcXHUwMEU5cmVpc1wiLCA3MywgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIlxcdTAwRURyZWlzXCIsIDczLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFMXNzZWlzXCIsIDczLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFOXNzZWlzXCIsIDczLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFRHNzZWlzXCIsIDczLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFMXZlaXNcIiwgNzMsIDEpLCBuZXcgQW1vbmcoXCJcXHUwMEVEZWlzXCIsIDczLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiYXJcXHUwMEVEZWlzXCIsIDg0LCAxKSwgbmV3IEFtb25nKFwiZXJcXHUwMEVEZWlzXCIsIDg0LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiaXJcXHUwMEVEZWlzXCIsIDg0LCAxKSwgbmV3IEFtb25nKFwiYWRvc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlkb3NcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJhbW9zXCIsIC0xLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFMXJhbW9zXCIsIDkwLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFOXJhbW9zXCIsIDkwLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFRHJhbW9zXCIsIDkwLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFMXZhbW9zXCIsIDkwLCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFRGFtb3NcIiwgOTAsIDEpLCBuZXcgQW1vbmcoXCJhclxcdTAwRURhbW9zXCIsIDk1LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZXJcXHUwMEVEYW1vc1wiLCA5NSwgMSksIG5ldyBBbW9uZyhcImlyXFx1MDBFRGFtb3NcIiwgOTUsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJlbW9zXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiYXJlbW9zXCIsIDk5LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZXJlbW9zXCIsIDk5LCAxKSwgbmV3IEFtb25nKFwiaXJlbW9zXCIsIDk5LCAxKSxcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiXFx1MDBFMXNzZW1vc1wiLCA5OSwgMSksIG5ldyBBbW9uZyhcIlxcdTAwRUFzc2Vtb3NcIiwgOTksIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJcXHUwMEVEc3NlbW9zXCIsIDk5LCAxKSwgbmV3IEFtb25nKFwiaW1vc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImFybW9zXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiZXJtb3NcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpcm1vc1wiLCAtMSwgMSksIG5ldyBBbW9uZyhcIlxcdTAwRTFtb3NcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhclxcdTAwRTFzXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiZXJcXHUwMEUxc1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcImlyXFx1MDBFMXNcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJldVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIml1XCIsIC0xLCAxKSwgbmV3IEFtb25nKFwib3VcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJhclxcdTAwRTFcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJlclxcdTAwRTFcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpclxcdTAwRTFcIiwgLTEsIDEpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYV83ID0gW25ldyBBbW9uZyhcImFcIiwgLTEsIDEpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJpXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwib1wiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIm9zXCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFMVwiLCAtMSwgMSksXG4gICAgICAgICAgICAgIG5ldyBBbW9uZyhcIlxcdTAwRURcIiwgLTEsIDEpLCBuZXcgQW1vbmcoXCJcXHUwMEYzXCIsIC0xLCAxKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGFfOCA9IFtcbiAgICAgICAgICAgICAgbmV3IEFtb25nKFwiZVwiLCAtMSwgMSksIG5ldyBBbW9uZyhcIlxcdTAwRTdcIiwgLTEsIDIpLFxuICAgICAgICAgICAgICBuZXcgQW1vbmcoXCJcXHUwMEU5XCIsIC0xLCAxKSwgbmV3IEFtb25nKFwiXFx1MDBFQVwiLCAtMSwgMSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBnX3YgPSBbMTcsXG4gICAgICAgICAgICAgIDY1LCAxNiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMywgMTksIDEyLCAyXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgSV9wMiwgSV9wMSwgSV9wViwgc2JwID0gbmV3IFNub3diYWxsUHJvZ3JhbSgpO1xuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudCA9IGZ1bmN0aW9uKHdvcmQpIHtcbiAgICAgICAgICAgIHNicC5zZXRDdXJyZW50KHdvcmQpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5nZXRDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2JwLmdldEN1cnJlbnQoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZnVuY3Rpb24gcl9wcmVsdWRlKCkge1xuICAgICAgICAgICAgdmFyIGFtb25nX3ZhcjtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZyhhXzAsIDMpO1xuICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJhflwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9mcm9tKFwib35cIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2JwLmN1cnNvciA+PSBzYnAubGltaXQpXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIHNicC5jdXJzb3IrKztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGhhYnIyKCkge1xuICAgICAgICAgICAgaWYgKHNicC5vdXRfZ3JvdXBpbmcoZ192LCA5NywgMjUwKSkge1xuICAgICAgICAgICAgICB3aGlsZSAoIXNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTApKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNicC5jdXJzb3IgPj0gc2JwLmxpbWl0KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvcisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGhhYnIzKCkge1xuICAgICAgICAgICAgaWYgKHNicC5pbl9ncm91cGluZyhnX3YsIDk3LCAyNTApKSB7XG4gICAgICAgICAgICAgIHdoaWxlICghc2JwLm91dF9ncm91cGluZyhnX3YsIDk3LCAyNTApKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNicC5jdXJzb3IgPj0gc2JwLmxpbWl0KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHNicC5jdXJzb3IrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSV9wViA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYWJyNCgpIHtcbiAgICAgICAgICAgIHZhciB2XzEgPSBzYnAuY3Vyc29yLFxuICAgICAgICAgICAgICB2XzIsIHZfMztcbiAgICAgICAgICAgIGlmIChzYnAuaW5fZ3JvdXBpbmcoZ192LCA5NywgMjUwKSkge1xuICAgICAgICAgICAgICB2XzIgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoaGFicjIoKSkge1xuICAgICAgICAgICAgICAgIHNicC5jdXJzb3IgPSB2XzI7XG4gICAgICAgICAgICAgICAgaWYgKGhhYnIzKCkpXG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIElfcFYgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMTtcbiAgICAgICAgICAgIGlmIChzYnAub3V0X2dyb3VwaW5nKGdfdiwgOTcsIDI1MCkpIHtcbiAgICAgICAgICAgICAgdl8zID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgaWYgKGhhYnIyKCkpIHtcbiAgICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gdl8zO1xuICAgICAgICAgICAgICAgIGlmICghc2JwLmluX2dyb3VwaW5nKGdfdiwgOTcsIDI1MCkgfHwgc2JwLmN1cnNvciA+PSBzYnAubGltaXQpXG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvcisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIElfcFYgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGhhYnI1KCkge1xuICAgICAgICAgICAgd2hpbGUgKCFzYnAuaW5fZ3JvdXBpbmcoZ192LCA5NywgMjUwKSkge1xuICAgICAgICAgICAgICBpZiAoc2JwLmN1cnNvciA+PSBzYnAubGltaXQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICBzYnAuY3Vyc29yKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoIXNicC5vdXRfZ3JvdXBpbmcoZ192LCA5NywgMjUwKSkge1xuICAgICAgICAgICAgICBpZiAoc2JwLmN1cnNvciA+PSBzYnAubGltaXQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICBzYnAuY3Vyc29yKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX21hcmtfcmVnaW9ucygpIHtcbiAgICAgICAgICAgIHZhciB2XzEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgSV9wViA9IHNicC5saW1pdDtcbiAgICAgICAgICAgIElfcDEgPSBJX3BWO1xuICAgICAgICAgICAgSV9wMiA9IElfcFY7XG4gICAgICAgICAgICBoYWJyNCgpO1xuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMTtcbiAgICAgICAgICAgIGlmIChoYWJyNSgpKSB7XG4gICAgICAgICAgICAgIElfcDEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoaGFicjUoKSlcbiAgICAgICAgICAgICAgICBJX3AyID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX3Bvc3RsdWRlKCkge1xuICAgICAgICAgICAgdmFyIGFtb25nX3ZhcjtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZyhhXzEsIDMpO1xuICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJcXHUwMEUzXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJcXHUwMEY1XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNicC5jdXJzb3IgPj0gc2JwLmxpbWl0KVxuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBzYnAuY3Vyc29yKys7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX1JWKCkge1xuICAgICAgICAgICAgcmV0dXJuIElfcFYgPD0gc2JwLmN1cnNvcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX1IxKCkge1xuICAgICAgICAgICAgcmV0dXJuIElfcDEgPD0gc2JwLmN1cnNvcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX1IyKCkge1xuICAgICAgICAgICAgcmV0dXJuIElfcDIgPD0gc2JwLmN1cnNvcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiByX3N0YW5kYXJkX3N1ZmZpeCgpIHtcbiAgICAgICAgICAgIHZhciBhbW9uZ192YXI7XG4gICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIGFtb25nX3ZhciA9IHNicC5maW5kX2Ftb25nX2IoYV81LCA0NSk7XG4gICAgICAgICAgICBpZiAoIWFtb25nX3ZhcilcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICBzd2l0Y2ggKGFtb25nX3Zhcikge1xuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKCFyX1IyKCkpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKCFyX1IyKCkpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJsb2dcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcInVcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBpZiAoIXJfUjIoKSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImVudGVcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICBpZiAoIXJfUjEoKSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgYW1vbmdfdmFyID0gc2JwLmZpbmRfYW1vbmdfYihhXzIsIDQpO1xuICAgICAgICAgICAgICAgIGlmIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgaWYgKHJfUjIoKSkge1xuICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbW9uZ192YXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzYnAuZXFfc19iKDIsIFwiYXRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJfUjIoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGlmICghcl9SMigpKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZ19iKGFfMywgMyk7XG4gICAgICAgICAgICAgICAgaWYgKGFtb25nX3Zhcikge1xuICAgICAgICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyID09IDEpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGlmICghcl9SMigpKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZ19iKGFfNCwgMyk7XG4gICAgICAgICAgICAgICAgaWYgKGFtb25nX3Zhcikge1xuICAgICAgICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyID09IDEpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGlmICghcl9SMigpKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICBpZiAoc2JwLmVxX3NfYigyLCBcImF0XCIpKSB7XG4gICAgICAgICAgICAgICAgICBzYnAuYnJhID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgICAgIGlmIChyX1IyKCkpXG4gICAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAoIXJfUlYoKSB8fCAhc2JwLmVxX3NfYigxLCBcImVcIikpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2JwLnNsaWNlX2Zyb20oXCJpclwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHJfdmVyYl9zdWZmaXgoKSB7XG4gICAgICAgICAgICB2YXIgYW1vbmdfdmFyLCB2XzE7XG4gICAgICAgICAgICBpZiAoc2JwLmN1cnNvciA+PSBJX3BWKSB7XG4gICAgICAgICAgICAgIHZfMSA9IHNicC5saW1pdF9iYWNrd2FyZDtcbiAgICAgICAgICAgICAgc2JwLmxpbWl0X2JhY2t3YXJkID0gSV9wVjtcbiAgICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgIGFtb25nX3ZhciA9IHNicC5maW5kX2Ftb25nX2IoYV82LCAxMjApO1xuICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgICAgaWYgKGFtb25nX3ZhciA9PSAxKVxuICAgICAgICAgICAgICAgICAgc2JwLnNsaWNlX2RlbCgpO1xuICAgICAgICAgICAgICAgIHNicC5saW1pdF9iYWNrd2FyZCA9IHZfMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYnAubGltaXRfYmFja3dhcmQgPSB2XzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gcl9yZXNpZHVhbF9zdWZmaXgoKSB7XG4gICAgICAgICAgICB2YXIgYW1vbmdfdmFyO1xuICAgICAgICAgICAgc2JwLmtldCA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICBhbW9uZ192YXIgPSBzYnAuZmluZF9hbW9uZ19iKGFfNywgNyk7XG4gICAgICAgICAgICBpZiAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoYW1vbmdfdmFyID09IDEpXG4gICAgICAgICAgICAgICAgaWYgKHJfUlYoKSlcbiAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBoYWJyNihjMSwgYzIpIHtcbiAgICAgICAgICAgIGlmIChzYnAuZXFfc19iKDEsIGMxKSkge1xuICAgICAgICAgICAgICBzYnAuYnJhID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgICAgdmFyIHZfMSA9IHNicC5saW1pdCAtIHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgIGlmIChzYnAuZXFfc19iKDEsIGMyKSkge1xuICAgICAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQgLSB2XzE7XG4gICAgICAgICAgICAgICAgaWYgKHJfUlYoKSlcbiAgICAgICAgICAgICAgICAgIHNicC5zbGljZV9kZWwoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHJfcmVzaWR1YWxfZm9ybSgpIHtcbiAgICAgICAgICAgIHZhciBhbW9uZ192YXIsIHZfMSwgdl8yLCB2XzM7XG4gICAgICAgICAgICBzYnAua2V0ID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIGFtb25nX3ZhciA9IHNicC5maW5kX2Ftb25nX2IoYV84LCA0KTtcbiAgICAgICAgICAgIGlmIChhbW9uZ192YXIpIHtcbiAgICAgICAgICAgICAgc2JwLmJyYSA9IHNicC5jdXJzb3I7XG4gICAgICAgICAgICAgIHN3aXRjaCAoYW1vbmdfdmFyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgaWYgKHJfUlYoKSkge1xuICAgICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICB2XzEgPSBzYnAubGltaXQgLSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFicjYoXCJ1XCIsIFwiZ1wiKSlcbiAgICAgICAgICAgICAgICAgICAgICBoYWJyNihcImlcIiwgXCJjXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZnJvbShcImNcIik7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGhhYnIxKCkge1xuICAgICAgICAgICAgaWYgKCFyX3N0YW5kYXJkX3N1ZmZpeCgpKSB7XG4gICAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQ7XG4gICAgICAgICAgICAgIGlmICghcl92ZXJiX3N1ZmZpeCgpKSB7XG4gICAgICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdDtcbiAgICAgICAgICAgICAgICByX3Jlc2lkdWFsX3N1ZmZpeCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHNicC5saW1pdDtcbiAgICAgICAgICAgIHNicC5rZXQgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgaWYgKHNicC5lcV9zX2IoMSwgXCJpXCIpKSB7XG4gICAgICAgICAgICAgIHNicC5icmEgPSBzYnAuY3Vyc29yO1xuICAgICAgICAgICAgICBpZiAoc2JwLmVxX3NfYigxLCBcImNcIikpIHtcbiAgICAgICAgICAgICAgICBzYnAuY3Vyc29yID0gc2JwLmxpbWl0O1xuICAgICAgICAgICAgICAgIGlmIChyX1JWKCkpXG4gICAgICAgICAgICAgICAgICBzYnAuc2xpY2VfZGVsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdGVtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdl8xID0gc2JwLmN1cnNvcjtcbiAgICAgICAgICAgIHJfcHJlbHVkZSgpO1xuICAgICAgICAgICAgc2JwLmN1cnNvciA9IHZfMTtcbiAgICAgICAgICAgIHJfbWFya19yZWdpb25zKCk7XG4gICAgICAgICAgICBzYnAubGltaXRfYmFja3dhcmQgPSB2XzE7XG4gICAgICAgICAgICBzYnAuY3Vyc29yID0gc2JwLmxpbWl0O1xuICAgICAgICAgICAgaGFicjEoKTtcbiAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXQ7XG4gICAgICAgICAgICByX3Jlc2lkdWFsX2Zvcm0oKTtcbiAgICAgICAgICAgIHNicC5jdXJzb3IgPSBzYnAubGltaXRfYmFja3dhcmQ7XG4gICAgICAgICAgICByX3Bvc3RsdWRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgIC8qIGFuZCByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHN0ZW1zIGEgd29yZCBmb3IgdGhlIGN1cnJlbnQgbG9jYWxlICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgLy8gZm9yIGx1bnIgdmVyc2lvbiAyXG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4udXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW4udXBkYXRlKGZ1bmN0aW9uKHdvcmQpIHtcbiAgICAgICAgICAgIHN0LnNldEN1cnJlbnQod29yZCk7XG4gICAgICAgICAgICBzdC5zdGVtKCk7XG4gICAgICAgICAgICByZXR1cm4gc3QuZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7IC8vIGZvciBsdW5yIHZlcnNpb24gPD0gMVxuICAgICAgICAgIHN0LnNldEN1cnJlbnQodG9rZW4pO1xuICAgICAgICAgIHN0LnN0ZW0oKTtcbiAgICAgICAgICByZXR1cm4gc3QuZ2V0Q3VycmVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnB0LnN0ZW1tZXIsICdzdGVtbWVyLXB0Jyk7XG5cbiAgICBsdW5yLnB0LnN0b3BXb3JkRmlsdGVyID0gbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyKCdhIGFvIGFvcyBhcXVlbGEgYXF1ZWxhcyBhcXVlbGUgYXF1ZWxlcyBhcXVpbG8gYXMgYXTDqSBjb20gY29tbyBkYSBkYXMgZGUgZGVsYSBkZWxhcyBkZWxlIGRlbGVzIGRlcG9pcyBkbyBkb3MgZSBlbGEgZWxhcyBlbGUgZWxlcyBlbSBlbnRyZSBlcmEgZXJhbSBlc3NhIGVzc2FzIGVzc2UgZXNzZXMgZXN0YSBlc3RhbW9zIGVzdGFzIGVzdGF2YSBlc3RhdmFtIGVzdGUgZXN0ZWphIGVzdGVqYW0gZXN0ZWphbW9zIGVzdGVzIGVzdGV2ZSBlc3RpdmUgZXN0aXZlbW9zIGVzdGl2ZXIgZXN0aXZlcmEgZXN0aXZlcmFtIGVzdGl2ZXJlbSBlc3RpdmVybW9zIGVzdGl2ZXNzZSBlc3RpdmVzc2VtIGVzdGl2w6lyYW1vcyBlc3RpdsOpc3NlbW9zIGVzdG91IGVzdMOhIGVzdMOhdmFtb3MgZXN0w6NvIGV1IGZvaSBmb21vcyBmb3IgZm9yYSBmb3JhbSBmb3JlbSBmb3Jtb3MgZm9zc2UgZm9zc2VtIGZ1aSBmw7RyYW1vcyBmw7Rzc2Vtb3MgaGFqYSBoYWphbSBoYWphbW9zIGhhdmVtb3MgaGVpIGhvdXZlIGhvdXZlbW9zIGhvdXZlciBob3V2ZXJhIGhvdXZlcmFtIGhvdXZlcmVpIGhvdXZlcmVtIGhvdXZlcmVtb3MgaG91dmVyaWEgaG91dmVyaWFtIGhvdXZlcm1vcyBob3V2ZXLDoSBob3V2ZXLDo28gaG91dmVyw61hbW9zIGhvdXZlc3NlIGhvdXZlc3NlbSBob3V2w6lyYW1vcyBob3V2w6lzc2Vtb3MgaMOhIGjDo28gaXNzbyBpc3RvIGrDoSBsaGUgbGhlcyBtYWlzIG1hcyBtZSBtZXNtbyBtZXUgbWV1cyBtaW5oYSBtaW5oYXMgbXVpdG8gbmEgbmFzIG5lbSBubyBub3Mgbm9zc2Egbm9zc2FzIG5vc3NvIG5vc3NvcyBudW0gbnVtYSBuw6NvIG7Ds3MgbyBvcyBvdSBwYXJhIHBlbGEgcGVsYXMgcGVsbyBwZWxvcyBwb3IgcXVhbCBxdWFuZG8gcXVlIHF1ZW0gc2Ugc2VqYSBzZWphbSBzZWphbW9zIHNlbSBzZXJlaSBzZXJlbW9zIHNlcmlhIHNlcmlhbSBzZXLDoSBzZXLDo28gc2Vyw61hbW9zIHNldSBzZXVzIHNvbW9zIHNvdSBzdWEgc3VhcyBzw6NvIHPDsyB0YW1iw6ltIHRlIHRlbSB0ZW1vcyB0ZW5oYSB0ZW5oYW0gdGVuaGFtb3MgdGVuaG8gdGVyZWkgdGVyZW1vcyB0ZXJpYSB0ZXJpYW0gdGVyw6EgdGVyw6NvIHRlcsOtYW1vcyB0ZXUgdGV1cyB0ZXZlIHRpbmhhIHRpbmhhbSB0aXZlIHRpdmVtb3MgdGl2ZXIgdGl2ZXJhIHRpdmVyYW0gdGl2ZXJlbSB0aXZlcm1vcyB0aXZlc3NlIHRpdmVzc2VtIHRpdsOpcmFtb3MgdGl2w6lzc2Vtb3MgdHUgdHVhIHR1YXMgdMOpbSB0w61uaGFtb3MgdW0gdW1hIHZvY8OqIHZvY8OqcyB2b3Mgw6Agw6BzIMOpcmFtb3MnLnNwbGl0KCcgJykpO1xuXG4gICAgbHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIucHQuc3RvcFdvcmRGaWx0ZXIsICdzdG9wV29yZEZpbHRlci1wdCcpO1xuICB9O1xufSkpIiwibGV0IHJoID0gZ2xvYmFsLnJoXHJcbmxldCBsdW5ybGFuZyA9IHJlcXVpcmUoJy4uLy4uL25vZGVfbW9kdWxlcy9sdW5yLWxhbmd1YWdlcy9sdW5yLnB0JylcclxucmguXy5leHBvcnRzKCBsdW5ybGFuZykiXX0=
