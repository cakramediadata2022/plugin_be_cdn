function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var litepicker_umd = { exports: {} };
/*!
 * 
 * litepicker.umd.js
 * Litepicker v2.0.12 (https://github.com/wakirin/Litepicker)
 * Package: litepicker (https://www.npmjs.com/package/litepicker)
 * License: MIT (https://github.com/wakirin/Litepicker/blob/master/LICENCE.md)
 * Copyright 2019-2021 Rinat G.
 *     
 * Hash: 504eef9c08cb42543660
 * 
 */
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(window, function() {
    return function(t) {
      var e = {};
      function i(n) {
        if (e[n])
          return e[n].exports;
        var o = e[n] = { i: n, l: false, exports: {} };
        return t[n].call(o.exports, o, o.exports, i), o.l = true, o.exports;
      }
      return i.m = t, i.c = e, i.d = function(t2, e2, n) {
        i.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
      }, i.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, i.t = function(t2, e2) {
        if (1 & e2 && (t2 = i(t2)), 8 & e2)
          return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
          return t2;
        var n = /* @__PURE__ */ Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var o in t2)
            i.d(n, o, (function(e3) {
              return t2[e3];
            }).bind(null, o));
        return n;
      }, i.n = function(t2) {
        var e2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return i.d(e2, "a", e2), e2;
      }, i.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, i.p = "", i(i.s = 4);
    }([function(t, e, i) {
      Object.defineProperty(e, "__esModule", { value: true });
      var n = function() {
        function t2(e2, i2, n2) {
          void 0 === e2 && (e2 = null), void 0 === i2 && (i2 = null), void 0 === n2 && (n2 = "en-US"), this.dateInstance = "object" == typeof i2 && null !== i2 ? i2.parse(e2 instanceof t2 ? e2.clone().toJSDate() : e2) : "string" == typeof i2 ? t2.parseDateTime(e2, i2, n2) : e2 ? t2.parseDateTime(e2) : t2.parseDateTime(/* @__PURE__ */ new Date()), this.lang = n2;
        }
        return t2.parseDateTime = function(e2, i2, n2) {
          if (void 0 === i2 && (i2 = "YYYY-MM-DD"), void 0 === n2 && (n2 = "en-US"), !e2)
            return /* @__PURE__ */ new Date(NaN);
          if (e2 instanceof Date)
            return new Date(e2);
          if (e2 instanceof t2)
            return e2.clone().toJSDate();
          if (/^-?\d{10,}$/.test(e2))
            return t2.getDateZeroTime(new Date(Number(e2)));
          if ("string" == typeof e2) {
            for (var o = [], s = null; null != (s = t2.regex.exec(i2)); )
              "\\" !== s[1] && o.push(s);
            if (o.length) {
              var r = { year: null, month: null, shortMonth: null, longMonth: null, day: null, value: "" };
              o[0].index > 0 && (r.value += ".*?");
              for (var a = 0, l = Object.entries(o); a < l.length; a++) {
                var c = l[a], h = c[0], p = c[1], d = Number(h), u = t2.formatPatterns(p[0], n2), m = u.group, f = u.pattern;
                r[m] = d + 1, r.value += f, r.value += ".*?";
              }
              var g = new RegExp("^" + r.value + "$");
              if (g.test(e2)) {
                var v = g.exec(e2), y = Number(v[r.year]), b = null;
                r.month ? b = Number(v[r.month]) - 1 : r.shortMonth ? b = t2.shortMonths(n2).indexOf(v[r.shortMonth]) : r.longMonth && (b = t2.longMonths(n2).indexOf(v[r.longMonth]));
                var k = Number(v[r.day]) || 1;
                return new Date(y, b, k, 0, 0, 0, 0);
              }
            }
          }
          return t2.getDateZeroTime(new Date(e2));
        }, t2.convertArray = function(e2, i2) {
          return e2.map(function(e3) {
            return e3 instanceof Array ? e3.map(function(e4) {
              return new t2(e4, i2);
            }) : new t2(e3, i2);
          });
        }, t2.getDateZeroTime = function(t3) {
          return new Date(t3.getFullYear(), t3.getMonth(), t3.getDate(), 0, 0, 0, 0);
        }, t2.shortMonths = function(e2) {
          return t2.MONTH_JS.map(function(t3) {
            return new Date(2019, t3).toLocaleString(e2, { month: "short" });
          });
        }, t2.longMonths = function(e2) {
          return t2.MONTH_JS.map(function(t3) {
            return new Date(2019, t3).toLocaleString(e2, { month: "long" });
          });
        }, t2.formatPatterns = function(e2, i2) {
          switch (e2) {
            case "YY":
            case "YYYY":
              return { group: "year", pattern: "(\\d{" + e2.length + "})" };
            case "M":
              return { group: "month", pattern: "(\\d{1,2})" };
            case "MM":
              return { group: "month", pattern: "(\\d{2})" };
            case "MMM":
              return { group: "shortMonth", pattern: "(" + t2.shortMonths(i2).join("|") + ")" };
            case "MMMM":
              return { group: "longMonth", pattern: "(" + t2.longMonths(i2).join("|") + ")" };
            case "D":
              return { group: "day", pattern: "(\\d{1,2})" };
            case "DD":
              return { group: "day", pattern: "(\\d{2})" };
          }
        }, t2.prototype.toJSDate = function() {
          return this.dateInstance;
        }, t2.prototype.toLocaleString = function(t3, e2) {
          return this.dateInstance.toLocaleString(t3, e2);
        }, t2.prototype.toDateString = function() {
          return this.dateInstance.toDateString();
        }, t2.prototype.getSeconds = function() {
          return this.dateInstance.getSeconds();
        }, t2.prototype.getDay = function() {
          return this.dateInstance.getDay();
        }, t2.prototype.getTime = function() {
          return this.dateInstance.getTime();
        }, t2.prototype.getDate = function() {
          return this.dateInstance.getDate();
        }, t2.prototype.getMonth = function() {
          return this.dateInstance.getMonth();
        }, t2.prototype.getFullYear = function() {
          return this.dateInstance.getFullYear();
        }, t2.prototype.setMonth = function(t3) {
          return this.dateInstance.setMonth(t3);
        }, t2.prototype.setHours = function(t3, e2, i2, n2) {
          void 0 === t3 && (t3 = 0), void 0 === e2 && (e2 = 0), void 0 === i2 && (i2 = 0), void 0 === n2 && (n2 = 0), this.dateInstance.setHours(t3, e2, i2, n2);
        }, t2.prototype.setSeconds = function(t3) {
          return this.dateInstance.setSeconds(t3);
        }, t2.prototype.setDate = function(t3) {
          return this.dateInstance.setDate(t3);
        }, t2.prototype.setFullYear = function(t3) {
          return this.dateInstance.setFullYear(t3);
        }, t2.prototype.getWeek = function(t3) {
          var e2 = new Date(this.timestamp()), i2 = (this.getDay() + (7 - t3)) % 7;
          e2.setDate(e2.getDate() - i2);
          var n2 = e2.getTime();
          return e2.setMonth(0, 1), e2.getDay() !== t3 && e2.setMonth(0, 1 + (4 - e2.getDay() + 7) % 7), 1 + Math.ceil((n2 - e2.getTime()) / 6048e5);
        }, t2.prototype.clone = function() {
          return new t2(this.toJSDate());
        }, t2.prototype.isBetween = function(t3, e2, i2) {
          switch (void 0 === i2 && (i2 = "()"), i2) {
            default:
            case "()":
              return this.timestamp() > t3.getTime() && this.timestamp() < e2.getTime();
            case "[)":
              return this.timestamp() >= t3.getTime() && this.timestamp() < e2.getTime();
            case "(]":
              return this.timestamp() > t3.getTime() && this.timestamp() <= e2.getTime();
            case "[]":
              return this.timestamp() >= t3.getTime() && this.timestamp() <= e2.getTime();
          }
        }, t2.prototype.isBefore = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              return t3.getTime() > this.getTime();
            case "day":
            case "days":
              return new Date(t3.getFullYear(), t3.getMonth(), t3.getDate()).getTime() > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
            case "month":
            case "months":
              return new Date(t3.getFullYear(), t3.getMonth(), 1).getTime() > new Date(this.getFullYear(), this.getMonth(), 1).getTime();
            case "year":
            case "years":
              return t3.getFullYear() > this.getFullYear();
          }
          throw new Error("isBefore: Invalid unit!");
        }, t2.prototype.isSameOrBefore = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              return t3.getTime() >= this.getTime();
            case "day":
            case "days":
              return new Date(t3.getFullYear(), t3.getMonth(), t3.getDate()).getTime() >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
            case "month":
            case "months":
              return new Date(t3.getFullYear(), t3.getMonth(), 1).getTime() >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
          }
          throw new Error("isSameOrBefore: Invalid unit!");
        }, t2.prototype.isAfter = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              return this.getTime() > t3.getTime();
            case "day":
            case "days":
              return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() > new Date(t3.getFullYear(), t3.getMonth(), t3.getDate()).getTime();
            case "month":
            case "months":
              return new Date(this.getFullYear(), this.getMonth(), 1).getTime() > new Date(t3.getFullYear(), t3.getMonth(), 1).getTime();
            case "year":
            case "years":
              return this.getFullYear() > t3.getFullYear();
          }
          throw new Error("isAfter: Invalid unit!");
        }, t2.prototype.isSameOrAfter = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              return this.getTime() >= t3.getTime();
            case "day":
            case "days":
              return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >= new Date(t3.getFullYear(), t3.getMonth(), t3.getDate()).getTime();
            case "month":
            case "months":
              return new Date(this.getFullYear(), this.getMonth(), 1).getTime() >= new Date(t3.getFullYear(), t3.getMonth(), 1).getTime();
          }
          throw new Error("isSameOrAfter: Invalid unit!");
        }, t2.prototype.isSame = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              return this.getTime() === t3.getTime();
            case "day":
            case "days":
              return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() === new Date(t3.getFullYear(), t3.getMonth(), t3.getDate()).getTime();
            case "month":
            case "months":
              return new Date(this.getFullYear(), this.getMonth(), 1).getTime() === new Date(t3.getFullYear(), t3.getMonth(), 1).getTime();
          }
          throw new Error("isSame: Invalid unit!");
        }, t2.prototype.add = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              this.setSeconds(this.getSeconds() + t3);
              break;
            case "day":
            case "days":
              this.setDate(this.getDate() + t3);
              break;
            case "month":
            case "months":
              this.setMonth(this.getMonth() + t3);
          }
          return this;
        }, t2.prototype.subtract = function(t3, e2) {
          switch (void 0 === e2 && (e2 = "seconds"), e2) {
            case "second":
            case "seconds":
              this.setSeconds(this.getSeconds() - t3);
              break;
            case "day":
            case "days":
              this.setDate(this.getDate() - t3);
              break;
            case "month":
            case "months":
              this.setMonth(this.getMonth() - t3);
          }
          return this;
        }, t2.prototype.diff = function(t3, e2) {
          void 0 === e2 && (e2 = "seconds");
          switch (e2) {
            default:
            case "second":
            case "seconds":
              return this.getTime() - t3.getTime();
            case "day":
            case "days":
              return Math.round((this.timestamp() - t3.getTime()) / 864e5);
            case "month":
            case "months":
          }
        }, t2.prototype.format = function(e2, i2) {
          if (void 0 === i2 && (i2 = "en-US"), "object" == typeof e2)
            return e2.output(this.clone().toJSDate());
          for (var n2 = "", o = [], s = null; null != (s = t2.regex.exec(e2)); )
            "\\" !== s[1] && o.push(s);
          if (o.length) {
            o[0].index > 0 && (n2 += e2.substring(0, o[0].index));
            for (var r = 0, a = Object.entries(o); r < a.length; r++) {
              var l = a[r], c = l[0], h = l[1], p = Number(c);
              n2 += this.formatTokens(h[0], i2), o[p + 1] && (n2 += e2.substring(h.index + h[0].length, o[p + 1].index)), p === o.length - 1 && (n2 += e2.substring(h.index + h[0].length));
            }
          }
          return n2.replace(/\\/g, "");
        }, t2.prototype.timestamp = function() {
          return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
        }, t2.prototype.formatTokens = function(e2, i2) {
          switch (e2) {
            case "YY":
              return String(this.getFullYear()).slice(-2);
            case "YYYY":
              return String(this.getFullYear());
            case "M":
              return String(this.getMonth() + 1);
            case "MM":
              return ("0" + (this.getMonth() + 1)).slice(-2);
            case "MMM":
              return t2.shortMonths(i2)[this.getMonth()];
            case "MMMM":
              return t2.longMonths(i2)[this.getMonth()];
            case "D":
              return String(this.getDate());
            case "DD":
              return ("0" + this.getDate()).slice(-2);
            default:
              return "";
          }
        }, t2.regex = /(\\)?(Y{2,4}|M{1,4}|D{1,2}|d{1,4})/g, t2.MONTH_JS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], t2;
      }();
      e.DateTime = n;
    }, function(t, e, i) {
      var n, o = this && this.__extends || (n = function(t2, e2) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
          t3.__proto__ = e3;
        } || function(t3, e3) {
          for (var i2 in e3)
            e3.hasOwnProperty(i2) && (t3[i2] = e3[i2]);
        })(t2, e2);
      }, function(t2, e2) {
        function i2() {
          this.constructor = t2;
        }
        n(t2, e2), t2.prototype = null === e2 ? Object.create(e2) : (i2.prototype = e2.prototype, new i2());
      }), s = this && this.__spreadArrays || function() {
        for (var t2 = 0, e2 = 0, i2 = arguments.length; e2 < i2; e2++)
          t2 += arguments[e2].length;
        var n2 = Array(t2), o2 = 0;
        for (e2 = 0; e2 < i2; e2++)
          for (var s2 = arguments[e2], r2 = 0, a2 = s2.length; r2 < a2; r2++, o2++)
            n2[o2] = s2[r2];
        return n2;
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var r = i(5), a = i(0), l = i(3), c = i(2), h = function(t2) {
        function e2(e3) {
          var i2 = t2.call(this, e3) || this;
          return i2.preventClick = false, i2.bindEvents(), i2;
        }
        return o(e2, t2), e2.prototype.scrollToDate = function(t3) {
          if (this.options.scrollToDate) {
            var e3 = this.options.startDate instanceof a.DateTime ? this.options.startDate.clone() : null, i2 = this.options.endDate instanceof a.DateTime ? this.options.endDate.clone() : null;
            !this.options.startDate || t3 && t3 !== this.options.element ? t3 && this.options.endDate && t3 === this.options.elementEnd && (i2.setDate(1), this.options.numberOfMonths > 1 && i2.isAfter(e3) && i2.setMonth(i2.getMonth() - (this.options.numberOfMonths - 1)), this.calendars[0] = i2.clone()) : (e3.setDate(1), this.calendars[0] = e3.clone());
          }
        }, e2.prototype.bindEvents = function() {
          document.addEventListener("click", this.onClick.bind(this), true), this.ui = document.createElement("div"), this.ui.className = l.litepicker, this.ui.style.display = "none", this.ui.addEventListener("mouseenter", this.onMouseEnter.bind(this), true), this.ui.addEventListener("mouseleave", this.onMouseLeave.bind(this), false), this.options.autoRefresh ? (this.options.element instanceof HTMLElement && this.options.element.addEventListener("keyup", this.onInput.bind(this), true), this.options.elementEnd instanceof HTMLElement && this.options.elementEnd.addEventListener("keyup", this.onInput.bind(this), true)) : (this.options.element instanceof HTMLElement && this.options.element.addEventListener("change", this.onInput.bind(this), true), this.options.elementEnd instanceof HTMLElement && this.options.elementEnd.addEventListener("change", this.onInput.bind(this), true)), this.options.parentEl ? this.options.parentEl instanceof HTMLElement ? this.options.parentEl.appendChild(this.ui) : document.querySelector(this.options.parentEl).appendChild(this.ui) : this.options.inlineMode ? this.options.element instanceof HTMLInputElement ? this.options.element.parentNode.appendChild(this.ui) : this.options.element.appendChild(this.ui) : document.body.appendChild(this.ui), this.updateInput(), this.init(), "function" == typeof this.options.setup && this.options.setup.call(this, this), this.render(), this.options.inlineMode && this.show();
        }, e2.prototype.updateInput = function() {
          if (this.options.element instanceof HTMLInputElement) {
            var t3 = this.options.startDate, e3 = this.options.endDate;
            if (this.options.singleMode && t3)
              this.options.element.value = t3.format(this.options.format, this.options.lang);
            else if (!this.options.singleMode && t3 && e3) {
              var i2 = t3.format(this.options.format, this.options.lang), n2 = e3.format(this.options.format, this.options.lang);
              this.options.elementEnd instanceof HTMLInputElement ? (this.options.element.value = i2, this.options.elementEnd.value = n2) : this.options.element.value = "" + i2 + this.options.delimiter + n2;
            }
            t3 || e3 || (this.options.element.value = "", this.options.elementEnd instanceof HTMLInputElement && (this.options.elementEnd.value = ""));
          }
        }, e2.prototype.isSamePicker = function(t3) {
          return t3.closest("." + l.litepicker) === this.ui;
        }, e2.prototype.shouldShown = function(t3) {
          return !t3.disabled && (t3 === this.options.element || this.options.elementEnd && t3 === this.options.elementEnd);
        }, e2.prototype.shouldResetDatePicked = function() {
          return this.options.singleMode || 2 === this.datePicked.length;
        }, e2.prototype.shouldSwapDatePicked = function() {
          return 2 === this.datePicked.length && this.datePicked[0].getTime() > this.datePicked[1].getTime();
        }, e2.prototype.shouldCheckLockDays = function() {
          return this.options.disallowLockDaysInRange && 2 === this.datePicked.length;
        }, e2.prototype.onClick = function(t3) {
          var e3 = t3.target;
          if (t3.target.shadowRoot && (e3 = t3.composedPath()[0]), e3 && this.ui)
            if (this.shouldShown(e3))
              this.show(e3);
            else if (e3.closest("." + l.litepicker) || !this.isShowning()) {
              if (this.isSamePicker(e3))
                if (this.emit("before:click", e3), this.preventClick)
                  this.preventClick = false;
                else {
                  if (e3.classList.contains(l.dayItem)) {
                    if (t3.preventDefault(), e3.classList.contains(l.isLocked))
                      return;
                    if (this.shouldResetDatePicked() && (this.datePicked.length = 0), this.datePicked[this.datePicked.length] = new a.DateTime(e3.dataset.time), this.shouldSwapDatePicked()) {
                      var i2 = this.datePicked[1].clone();
                      this.datePicked[1] = this.datePicked[0].clone(), this.datePicked[0] = i2.clone();
                    }
                    if (this.shouldCheckLockDays())
                      c.rangeIsLocked(this.datePicked, this.options) && (this.emit("error:range", this.datePicked), this.datePicked.length = 0);
                    return this.render(), this.emit.apply(this, s(["preselect"], s(this.datePicked).map(function(t4) {
                      return t4.clone();
                    }))), void (this.options.autoApply && (this.options.singleMode && this.datePicked.length ? (this.setDate(this.datePicked[0]), this.hide()) : this.options.singleMode || 2 !== this.datePicked.length || (this.setDateRange(this.datePicked[0], this.datePicked[1]), this.hide())));
                  }
                  if (e3.classList.contains(l.buttonPreviousMonth)) {
                    t3.preventDefault();
                    var n2 = 0, o2 = this.options.switchingMonths || this.options.numberOfMonths;
                    if (this.options.splitView) {
                      var r2 = e3.closest("." + l.monthItem);
                      n2 = c.findNestedMonthItem(r2), o2 = 1;
                    }
                    return this.calendars[n2].setMonth(this.calendars[n2].getMonth() - o2), this.gotoDate(this.calendars[n2], n2), void this.emit("change:month", this.calendars[n2], n2);
                  }
                  if (e3.classList.contains(l.buttonNextMonth)) {
                    t3.preventDefault();
                    n2 = 0, o2 = this.options.switchingMonths || this.options.numberOfMonths;
                    if (this.options.splitView) {
                      r2 = e3.closest("." + l.monthItem);
                      n2 = c.findNestedMonthItem(r2), o2 = 1;
                    }
                    return this.calendars[n2].setMonth(this.calendars[n2].getMonth() + o2), this.gotoDate(this.calendars[n2], n2), void this.emit("change:month", this.calendars[n2], n2);
                  }
                  e3.classList.contains(l.buttonCancel) && (t3.preventDefault(), this.hide(), this.emit("button:cancel")), e3.classList.contains(l.buttonApply) && (t3.preventDefault(), this.options.singleMode && this.datePicked.length ? this.setDate(this.datePicked[0]) : this.options.singleMode || 2 !== this.datePicked.length || this.setDateRange(this.datePicked[0], this.datePicked[1]), this.hide(), this.emit("button:apply", this.options.startDate, this.options.endDate));
                }
            } else
              this.hide();
        }, e2.prototype.showTooltip = function(t3, e3) {
          var i2 = this.ui.querySelector("." + l.containerTooltip);
          i2.style.visibility = "visible", i2.innerHTML = e3;
          var n2 = this.ui.getBoundingClientRect(), o2 = i2.getBoundingClientRect(), s2 = t3.getBoundingClientRect(), r2 = s2.top, a2 = s2.left;
          if (this.options.inlineMode && this.options.parentEl) {
            var c2 = this.ui.parentNode.getBoundingClientRect();
            r2 -= c2.top, a2 -= c2.left;
          } else
            r2 -= n2.top, a2 -= n2.left;
          r2 -= o2.height, a2 -= o2.width / 2, a2 += s2.width / 2, i2.style.top = r2 + "px", i2.style.left = a2 + "px", this.emit("tooltip", i2, t3);
        }, e2.prototype.hideTooltip = function() {
          this.ui.querySelector("." + l.containerTooltip).style.visibility = "hidden";
        }, e2.prototype.shouldAllowMouseEnter = function(t3) {
          return !this.options.singleMode && !t3.classList.contains(l.isLocked);
        }, e2.prototype.shouldAllowRepick = function() {
          return this.options.elementEnd && this.options.allowRepick && this.options.startDate && this.options.endDate;
        }, e2.prototype.isDayItem = function(t3) {
          return t3.classList.contains(l.dayItem);
        }, e2.prototype.onMouseEnter = function(t3) {
          var e3 = this, i2 = t3.target;
          if (this.isDayItem(i2) && this.shouldAllowMouseEnter(i2)) {
            if (this.shouldAllowRepick() && (this.triggerElement === this.options.element ? this.datePicked[0] = this.options.endDate.clone() : this.triggerElement === this.options.elementEnd && (this.datePicked[0] = this.options.startDate.clone())), 1 !== this.datePicked.length)
              return;
            var n2 = this.ui.querySelector("." + l.dayItem + '[data-time="' + this.datePicked[0].getTime() + '"]'), o2 = this.datePicked[0].clone(), s2 = new a.DateTime(i2.dataset.time), r2 = false;
            if (o2.getTime() > s2.getTime()) {
              var c2 = o2.clone();
              o2 = s2.clone(), s2 = c2.clone(), r2 = true;
            }
            if (Array.prototype.slice.call(this.ui.querySelectorAll("." + l.dayItem)).forEach(function(t4) {
              var i3 = new a.DateTime(t4.dataset.time), n3 = e3.renderDay(i3);
              i3.isBetween(o2, s2) && n3.classList.add(l.isInRange), t4.className = n3.className;
            }), i2.classList.add(l.isEndDate), r2 ? (n2 && n2.classList.add(l.isFlipped), i2.classList.add(l.isFlipped)) : (n2 && n2.classList.remove(l.isFlipped), i2.classList.remove(l.isFlipped)), this.options.showTooltip) {
              var h2 = s2.diff(o2, "day") + 1;
              if ("function" == typeof this.options.tooltipNumber && (h2 = this.options.tooltipNumber.call(this, h2)), h2 > 0) {
                var p = this.pluralSelector(h2), d = h2 + " " + (this.options.tooltipText[p] ? this.options.tooltipText[p] : "[" + p + "]");
                this.showTooltip(i2, d);
                var u = window.navigator.userAgent, m = /(iphone|ipad)/i.test(u), f = /OS 1([0-2])/i.test(u);
                m && f && i2.dispatchEvent(new Event("click"));
              } else
                this.hideTooltip();
            }
          }
        }, e2.prototype.onMouseLeave = function(t3) {
          t3.target;
          this.options.allowRepick && (!this.options.allowRepick || this.options.startDate || this.options.endDate) && (this.datePicked.length = 0, this.render());
        }, e2.prototype.onInput = function(t3) {
          var e3 = this.parseInput(), i2 = e3[0], n2 = e3[1], o2 = this.options.format;
          if (this.options.elementEnd ? i2 instanceof a.DateTime && n2 instanceof a.DateTime && i2.format(o2) === this.options.element.value && n2.format(o2) === this.options.elementEnd.value : this.options.singleMode ? i2 instanceof a.DateTime && i2.format(o2) === this.options.element.value : i2 instanceof a.DateTime && n2 instanceof a.DateTime && "" + i2.format(o2) + this.options.delimiter + n2.format(o2) === this.options.element.value) {
            if (n2 && i2.getTime() > n2.getTime()) {
              var s2 = i2.clone();
              i2 = n2.clone(), n2 = s2.clone();
            }
            this.options.startDate = new a.DateTime(i2, this.options.format, this.options.lang), n2 && (this.options.endDate = new a.DateTime(n2, this.options.format, this.options.lang)), this.updateInput(), this.render();
            var r2 = i2.clone(), l2 = 0;
            (this.options.elementEnd ? i2.format(o2) === t3.target.value : t3.target.value.startsWith(i2.format(o2))) || (r2 = n2.clone(), l2 = this.options.numberOfMonths - 1), this.emit("selected", this.getStartDate(), this.getEndDate()), this.gotoDate(r2, l2);
          }
        }, e2;
      }(r.Calendar);
      e.Litepicker = h;
    }, function(t, e, i) {
      Object.defineProperty(e, "__esModule", { value: true }), e.findNestedMonthItem = function(t2) {
        for (var e2 = t2.parentNode.childNodes, i2 = 0; i2 < e2.length; i2 += 1) {
          if (e2.item(i2) === t2)
            return i2;
        }
        return 0;
      }, e.dateIsLocked = function(t2, e2, i2) {
        var n = false;
        return e2.lockDays.length && (n = e2.lockDays.filter(function(i3) {
          return i3 instanceof Array ? t2.isBetween(i3[0], i3[1], e2.lockDaysInclusivity) : i3.isSame(t2, "day");
        }).length), n || "function" != typeof e2.lockDaysFilter || (n = e2.lockDaysFilter.call(this, t2.clone(), null, i2)), n;
      }, e.rangeIsLocked = function(t2, e2) {
        var i2 = false;
        return e2.lockDays.length && (i2 = e2.lockDays.filter(function(i3) {
          if (i3 instanceof Array) {
            var n = t2[0].toDateString() === i3[0].toDateString() && t2[1].toDateString() === i3[1].toDateString();
            return i3[0].isBetween(t2[0], t2[1], e2.lockDaysInclusivity) || i3[1].isBetween(t2[0], t2[1], e2.lockDaysInclusivity) || n;
          }
          return i3.isBetween(t2[0], t2[1], e2.lockDaysInclusivity);
        }).length), i2 || "function" != typeof e2.lockDaysFilter || (i2 = e2.lockDaysFilter.call(this, t2[0].clone(), t2[1].clone(), t2)), i2;
      };
    }, function(t, e, i) {
      var n = i(8);
      "string" == typeof n && (n = [[t.i, n, ""]]);
      var o = { insert: function(t2) {
        var e2 = document.querySelector("head"), i2 = window._lastElementInsertedByStyleLoader;
        window.disableLitepickerStyles || (i2 ? i2.nextSibling ? e2.insertBefore(t2, i2.nextSibling) : e2.appendChild(t2) : e2.insertBefore(t2, e2.firstChild), window._lastElementInsertedByStyleLoader = t2);
      }, singleton: false };
      i(10)(n, o);
      n.locals && (t.exports = n.locals);
    }, function(t, e, i) {
      Object.defineProperty(e, "__esModule", { value: true });
      var n = i(1);
      e.Litepicker = n.Litepicker, i(11), window.Litepicker = n.Litepicker, e.default = n.Litepicker;
    }, function(t, e, i) {
      var n, o = this && this.__extends || (n = function(t2, e2) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
          t3.__proto__ = e3;
        } || function(t3, e3) {
          for (var i2 in e3)
            e3.hasOwnProperty(i2) && (t3[i2] = e3[i2]);
        })(t2, e2);
      }, function(t2, e2) {
        function i2() {
          this.constructor = t2;
        }
        n(t2, e2), t2.prototype = null === e2 ? Object.create(e2) : (i2.prototype = e2.prototype, new i2());
      });
      Object.defineProperty(e, "__esModule", { value: true });
      var s = i(6), r = i(0), a = i(3), l = i(2), c = function(t2) {
        function e2(e3) {
          return t2.call(this, e3) || this;
        }
        return o(e2, t2), e2.prototype.render = function() {
          var t3 = this;
          this.emit("before:render", this.ui);
          var e3 = document.createElement("div");
          e3.className = a.containerMain;
          var i2 = document.createElement("div");
          i2.className = a.containerMonths, a["columns" + this.options.numberOfColumns] && (i2.classList.remove(a.columns2, a.columns3, a.columns4), i2.classList.add(a["columns" + this.options.numberOfColumns])), this.options.splitView && i2.classList.add(a.splitView), this.options.showWeekNumbers && i2.classList.add(a.showWeekNumbers);
          for (var n2 = this.calendars[0].clone(), o2 = n2.getMonth(), s2 = n2.getMonth() + this.options.numberOfMonths, r2 = 0, l2 = o2; l2 < s2; l2 += 1) {
            var c2 = n2.clone();
            c2.setDate(1), c2.setHours(0, 0, 0, 0), this.options.splitView ? c2 = this.calendars[r2].clone() : c2.setMonth(l2), i2.appendChild(this.renderMonth(c2, r2)), r2 += 1;
          }
          if (this.ui.innerHTML = "", e3.appendChild(i2), this.options.resetButton) {
            var h = void 0;
            "function" == typeof this.options.resetButton ? h = this.options.resetButton.call(this) : ((h = document.createElement("button")).type = "button", h.className = a.resetButton, h.innerHTML = this.options.buttonText.reset), h.addEventListener("click", function(e4) {
              e4.preventDefault(), t3.clearSelection();
            }), e3.querySelector("." + a.monthItem + ":last-child").querySelector("." + a.monthItemHeader).appendChild(h);
          }
          this.ui.appendChild(e3), this.options.autoApply && !this.options.footerHTML || this.ui.appendChild(this.renderFooter()), this.options.showTooltip && this.ui.appendChild(this.renderTooltip()), this.ui.dataset.plugins = (this.options.plugins || []).join("|"), this.emit("render", this.ui);
        }, e2.prototype.renderMonth = function(t3, e3) {
          var i2 = this, n2 = t3.clone(), o2 = 32 - new Date(n2.getFullYear(), n2.getMonth(), 32).getDate(), s2 = document.createElement("div");
          s2.className = a.monthItem;
          var c2 = document.createElement("div");
          c2.className = a.monthItemHeader;
          var h = document.createElement("div");
          if (this.options.dropdowns.months) {
            var p = document.createElement("select");
            p.className = a.monthItemName;
            for (var d = 0; d < 12; d += 1) {
              var u = document.createElement("option"), m = new r.DateTime(new Date(t3.getFullYear(), d, 2, 0, 0, 0)), f = new r.DateTime(new Date(t3.getFullYear(), d, 1, 0, 0, 0));
              u.value = String(d), u.text = m.toLocaleString(this.options.lang, { month: "long" }), u.disabled = this.options.minDate && f.isBefore(new r.DateTime(this.options.minDate), "month") || this.options.maxDate && f.isAfter(new r.DateTime(this.options.maxDate), "month"), u.selected = f.getMonth() === t3.getMonth(), p.appendChild(u);
            }
            p.addEventListener("change", function(t4) {
              var e4 = t4.target, n3 = 0;
              if (i2.options.splitView) {
                var o3 = e4.closest("." + a.monthItem);
                n3 = l.findNestedMonthItem(o3);
              }
              i2.calendars[n3].setMonth(Number(e4.value)), i2.render(), i2.emit("change:month", i2.calendars[n3], n3, t4);
            }), h.appendChild(p);
          } else {
            (m = document.createElement("strong")).className = a.monthItemName, m.innerHTML = t3.toLocaleString(this.options.lang, { month: "long" }), h.appendChild(m);
          }
          if (this.options.dropdowns.years) {
            var g = document.createElement("select");
            g.className = a.monthItemYear;
            var v = this.options.dropdowns.minYear, y = this.options.dropdowns.maxYear ? this.options.dropdowns.maxYear : (/* @__PURE__ */ new Date()).getFullYear();
            if (t3.getFullYear() > y)
              (u = document.createElement("option")).value = String(t3.getFullYear()), u.text = String(t3.getFullYear()), u.selected = true, u.disabled = true, g.appendChild(u);
            for (d = y; d >= v; d -= 1) {
              var u = document.createElement("option"), b = new r.DateTime(new Date(d, 0, 1, 0, 0, 0));
              u.value = String(d), u.text = String(d), u.disabled = this.options.minDate && b.isBefore(new r.DateTime(this.options.minDate), "year") || this.options.maxDate && b.isAfter(new r.DateTime(this.options.maxDate), "year"), u.selected = t3.getFullYear() === d, g.appendChild(u);
            }
            if (t3.getFullYear() < v)
              (u = document.createElement("option")).value = String(t3.getFullYear()), u.text = String(t3.getFullYear()), u.selected = true, u.disabled = true, g.appendChild(u);
            if ("asc" === this.options.dropdowns.years) {
              var k = Array.prototype.slice.call(g.childNodes).reverse();
              g.innerHTML = "", k.forEach(function(t4) {
                t4.innerHTML = t4.value, g.appendChild(t4);
              });
            }
            g.addEventListener("change", function(t4) {
              var e4 = t4.target, n3 = 0;
              if (i2.options.splitView) {
                var o3 = e4.closest("." + a.monthItem);
                n3 = l.findNestedMonthItem(o3);
              }
              i2.calendars[n3].setFullYear(Number(e4.value)), i2.render(), i2.emit("change:year", i2.calendars[n3], n3, t4);
            }), h.appendChild(g);
          } else {
            var w = document.createElement("span");
            w.className = a.monthItemYear, w.innerHTML = String(t3.getFullYear()), h.appendChild(w);
          }
          var D = document.createElement("button");
          D.type = "button", D.className = a.buttonPreviousMonth, D.innerHTML = this.options.buttonText.previousMonth;
          var x = document.createElement("button");
          x.type = "button", x.className = a.buttonNextMonth, x.innerHTML = this.options.buttonText.nextMonth, c2.appendChild(D), c2.appendChild(h), c2.appendChild(x), this.options.minDate && n2.isSameOrBefore(new r.DateTime(this.options.minDate), "month") && s2.classList.add(a.noPreviousMonth), this.options.maxDate && n2.isSameOrAfter(new r.DateTime(this.options.maxDate), "month") && s2.classList.add(a.noNextMonth);
          var M = document.createElement("div");
          M.className = a.monthItemWeekdaysRow, this.options.showWeekNumbers && (M.innerHTML = "<div>W</div>");
          for (var _ = 1; _ <= 7; _ += 1) {
            var T = 3 + this.options.firstDay + _, L = document.createElement("div");
            L.innerHTML = this.weekdayName(T), L.title = this.weekdayName(T, "long"), M.appendChild(L);
          }
          var E = document.createElement("div");
          E.className = a.containerDays;
          var S = this.calcSkipDays(n2);
          this.options.showWeekNumbers && S && E.appendChild(this.renderWeekNumber(n2));
          for (var I = 0; I < S; I += 1) {
            var P = document.createElement("div");
            E.appendChild(P);
          }
          for (I = 1; I <= o2; I += 1)
            n2.setDate(I), this.options.showWeekNumbers && n2.getDay() === this.options.firstDay && E.appendChild(this.renderWeekNumber(n2)), E.appendChild(this.renderDay(n2));
          return s2.appendChild(c2), s2.appendChild(M), s2.appendChild(E), this.emit("render:month", s2, t3), s2;
        }, e2.prototype.renderDay = function(t3) {
          t3.setHours();
          var e3 = document.createElement("div");
          if (e3.className = a.dayItem, e3.innerHTML = String(t3.getDate()), e3.dataset.time = String(t3.getTime()), t3.toDateString() === (/* @__PURE__ */ new Date()).toDateString() && e3.classList.add(a.isToday), this.datePicked.length)
            this.datePicked[0].toDateString() === t3.toDateString() && (e3.classList.add(a.isStartDate), this.options.singleMode && e3.classList.add(a.isEndDate)), 2 === this.datePicked.length && this.datePicked[1].toDateString() === t3.toDateString() && e3.classList.add(a.isEndDate), 2 === this.datePicked.length && t3.isBetween(this.datePicked[0], this.datePicked[1]) && e3.classList.add(a.isInRange);
          else if (this.options.startDate) {
            var i2 = this.options.startDate, n2 = this.options.endDate;
            i2.toDateString() === t3.toDateString() && (e3.classList.add(a.isStartDate), this.options.singleMode && e3.classList.add(a.isEndDate)), n2 && n2.toDateString() === t3.toDateString() && e3.classList.add(a.isEndDate), i2 && n2 && t3.isBetween(i2, n2) && e3.classList.add(a.isInRange);
          }
          if (this.options.minDate && t3.isBefore(new r.DateTime(this.options.minDate)) && e3.classList.add(a.isLocked), this.options.maxDate && t3.isAfter(new r.DateTime(this.options.maxDate)) && e3.classList.add(a.isLocked), this.options.minDays > 1 && 1 === this.datePicked.length) {
            var o2 = this.options.minDays - 1, s2 = this.datePicked[0].clone().subtract(o2, "day"), c2 = this.datePicked[0].clone().add(o2, "day");
            t3.isBetween(s2, this.datePicked[0], "(]") && e3.classList.add(a.isLocked), t3.isBetween(this.datePicked[0], c2, "[)") && e3.classList.add(a.isLocked);
          }
          if (this.options.maxDays && 1 === this.datePicked.length) {
            var h = this.options.maxDays;
            s2 = this.datePicked[0].clone().subtract(h, "day"), c2 = this.datePicked[0].clone().add(h, "day");
            t3.isSameOrBefore(s2) && e3.classList.add(a.isLocked), t3.isSameOrAfter(c2) && e3.classList.add(a.isLocked);
          }
          (this.options.selectForward && 1 === this.datePicked.length && t3.isBefore(this.datePicked[0]) && e3.classList.add(a.isLocked), this.options.selectBackward && 1 === this.datePicked.length && t3.isAfter(this.datePicked[0]) && e3.classList.add(a.isLocked), l.dateIsLocked(t3, this.options, this.datePicked) && e3.classList.add(a.isLocked), this.options.highlightedDays.length) && (this.options.highlightedDays.filter(function(e4) {
            return e4 instanceof Array ? t3.isBetween(e4[0], e4[1], "[]") : e4.isSame(t3, "day");
          }).length && e3.classList.add(a.isHighlighted));
          return e3.tabIndex = e3.classList.contains("is-locked") ? -1 : 0, this.emit("render:day", e3, t3), e3;
        }, e2.prototype.renderFooter = function() {
          var t3 = document.createElement("div");
          if (t3.className = a.containerFooter, this.options.footerHTML ? t3.innerHTML = this.options.footerHTML : t3.innerHTML = '\n      <span class="' + a.previewDateRange + '"></span>\n      <button type="button" class="' + a.buttonCancel + '">' + this.options.buttonText.cancel + '</button>\n      <button type="button" class="' + a.buttonApply + '">' + this.options.buttonText.apply + "</button>\n      ", this.options.singleMode) {
            if (1 === this.datePicked.length) {
              var e3 = this.datePicked[0].format(this.options.format, this.options.lang);
              t3.querySelector("." + a.previewDateRange).innerHTML = e3;
            }
          } else if (1 === this.datePicked.length && t3.querySelector("." + a.buttonApply).setAttribute("disabled", ""), 2 === this.datePicked.length) {
            e3 = this.datePicked[0].format(this.options.format, this.options.lang);
            var i2 = this.datePicked[1].format(this.options.format, this.options.lang);
            t3.querySelector("." + a.previewDateRange).innerHTML = "" + e3 + this.options.delimiter + i2;
          }
          return this.emit("render:footer", t3), t3;
        }, e2.prototype.renderWeekNumber = function(t3) {
          var e3 = document.createElement("div"), i2 = t3.getWeek(this.options.firstDay);
          return e3.className = a.weekNumber, e3.innerHTML = 53 === i2 && 0 === t3.getMonth() ? "53 / 1" : i2, e3;
        }, e2.prototype.renderTooltip = function() {
          var t3 = document.createElement("div");
          return t3.className = a.containerTooltip, t3;
        }, e2.prototype.weekdayName = function(t3, e3) {
          return void 0 === e3 && (e3 = "short"), new Date(1970, 0, t3, 12, 0, 0, 0).toLocaleString(this.options.lang, { weekday: e3 });
        }, e2.prototype.calcSkipDays = function(t3) {
          var e3 = t3.getDay() - this.options.firstDay;
          return e3 < 0 && (e3 += 7), e3;
        }, e2;
      }(s.LPCore);
      e.Calendar = c;
    }, function(t, e, i) {
      var n, o = this && this.__extends || (n = function(t2, e2) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
          t3.__proto__ = e3;
        } || function(t3, e3) {
          for (var i2 in e3)
            e3.hasOwnProperty(i2) && (t3[i2] = e3[i2]);
        })(t2, e2);
      }, function(t2, e2) {
        function i2() {
          this.constructor = t2;
        }
        n(t2, e2), t2.prototype = null === e2 ? Object.create(e2) : (i2.prototype = e2.prototype, new i2());
      }), s = this && this.__assign || function() {
        return (s = Object.assign || function(t2) {
          for (var e2, i2 = 1, n2 = arguments.length; i2 < n2; i2++)
            for (var o2 in e2 = arguments[i2])
              Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
          return t2;
        }).apply(this, arguments);
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var r = i(7), a = i(0), l = i(1), c = function(t2) {
        function e2(e3) {
          var i2 = t2.call(this) || this;
          i2.datePicked = [], i2.calendars = [], i2.options = { element: null, elementEnd: null, parentEl: null, firstDay: 1, format: "YYYY-MM-DD", lang: "en-US", delimiter: " - ", numberOfMonths: 1, numberOfColumns: 1, startDate: null, endDate: null, zIndex: 9999, position: "auto", selectForward: false, selectBackward: false, splitView: false, inlineMode: false, singleMode: true, autoApply: true, allowRepick: false, showWeekNumbers: false, showTooltip: true, scrollToDate: true, mobileFriendly: true, resetButton: false, autoRefresh: false, lockDaysFormat: "YYYY-MM-DD", lockDays: [], disallowLockDaysInRange: false, lockDaysInclusivity: "[]", highlightedDaysFormat: "YYYY-MM-DD", highlightedDays: [], dropdowns: { minYear: 1990, maxYear: null, months: false, years: false }, buttonText: { apply: "Apply", cancel: "Cancel", previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>', nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>', reset: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">\n        <path d="M0 0h24v24H0z" fill="none"/>\n        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>\n      </svg>' }, tooltipText: { one: "day", other: "days" } }, i2.options = s(s({}, i2.options), e3.element.dataset), Object.keys(i2.options).forEach(function(t3) {
            "true" !== i2.options[t3] && "false" !== i2.options[t3] || (i2.options[t3] = "true" === i2.options[t3]);
          });
          var n2 = s(s({}, i2.options.dropdowns), e3.dropdowns), o2 = s(s({}, i2.options.buttonText), e3.buttonText), r2 = s(s({}, i2.options.tooltipText), e3.tooltipText);
          i2.options = s(s({}, i2.options), e3), i2.options.dropdowns = s({}, n2), i2.options.buttonText = s({}, o2), i2.options.tooltipText = s({}, r2), i2.options.elementEnd || (i2.options.allowRepick = false), i2.options.lockDays.length && (i2.options.lockDays = a.DateTime.convertArray(i2.options.lockDays, i2.options.lockDaysFormat)), i2.options.highlightedDays.length && (i2.options.highlightedDays = a.DateTime.convertArray(i2.options.highlightedDays, i2.options.highlightedDaysFormat));
          var l2 = i2.parseInput(), c2 = l2[0], h = l2[1];
          i2.options.startDate && (i2.options.singleMode || i2.options.endDate) && (c2 = new a.DateTime(i2.options.startDate, i2.options.format, i2.options.lang)), c2 && i2.options.endDate && (h = new a.DateTime(i2.options.endDate, i2.options.format, i2.options.lang)), c2 instanceof a.DateTime && !isNaN(c2.getTime()) && (i2.options.startDate = c2), i2.options.startDate && h instanceof a.DateTime && !isNaN(h.getTime()) && (i2.options.endDate = h), !i2.options.singleMode || i2.options.startDate instanceof a.DateTime || (i2.options.startDate = null), i2.options.singleMode || i2.options.startDate instanceof a.DateTime && i2.options.endDate instanceof a.DateTime || (i2.options.startDate = null, i2.options.endDate = null);
          for (var p = 0; p < i2.options.numberOfMonths; p += 1) {
            var d = i2.options.startDate instanceof a.DateTime ? i2.options.startDate.clone() : new a.DateTime();
            if (!i2.options.startDate && (0 === p || i2.options.splitView)) {
              var u = i2.options.maxDate ? new a.DateTime(i2.options.maxDate) : null, m = i2.options.minDate ? new a.DateTime(i2.options.minDate) : null, f = i2.options.numberOfMonths - 1;
              m && u && d.isAfter(u) ? (d = m.clone()).setDate(1) : !m && u && d.isAfter(u) && ((d = u.clone()).setDate(1), d.setMonth(d.getMonth() - f));
            }
            d.setDate(1), d.setMonth(d.getMonth() + p), i2.calendars[p] = d;
          }
          if (i2.options.showTooltip)
            if (i2.options.tooltipPluralSelector)
              i2.pluralSelector = i2.options.tooltipPluralSelector;
            else
              try {
                var g = new Intl.PluralRules(i2.options.lang);
                i2.pluralSelector = g.select.bind(g);
              } catch (t3) {
                i2.pluralSelector = function(t4) {
                  return 0 === Math.abs(t4) ? "one" : "other";
                };
              }
          return i2;
        }
        return o(e2, t2), e2.add = function(t3, e3) {
          l.Litepicker.prototype[t3] = e3;
        }, e2.prototype.DateTime = function(t3, e3) {
          return t3 ? new a.DateTime(t3, e3) : new a.DateTime();
        }, e2.prototype.init = function() {
          var t3 = this;
          this.options.plugins && this.options.plugins.length && this.options.plugins.forEach(function(e3) {
            l.Litepicker.prototype.hasOwnProperty(e3) ? l.Litepicker.prototype[e3].init.call(t3, t3) : console.warn("Litepicker: plugin «" + e3 + "» not found.");
          });
        }, e2.prototype.parseInput = function() {
          var t3 = this.options.delimiter, e3 = new RegExp("" + t3), i2 = this.options.element instanceof HTMLInputElement ? this.options.element.value.split(t3) : [];
          if (this.options.elementEnd) {
            if (this.options.element instanceof HTMLInputElement && this.options.element.value.length && this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length)
              return [new a.DateTime(this.options.element.value, this.options.format), new a.DateTime(this.options.elementEnd.value, this.options.format)];
          } else if (this.options.singleMode) {
            if (this.options.element instanceof HTMLInputElement && this.options.element.value.length)
              return [new a.DateTime(this.options.element.value, this.options.format)];
          } else if (this.options.element instanceof HTMLInputElement && e3.test(this.options.element.value) && i2.length && i2.length % 2 == 0) {
            var n2 = i2.slice(0, i2.length / 2).join(t3), o2 = i2.slice(i2.length / 2).join(t3);
            return [new a.DateTime(n2, this.options.format), new a.DateTime(o2, this.options.format)];
          }
          return [];
        }, e2.prototype.isShowning = function() {
          return this.ui && "none" !== this.ui.style.display;
        }, e2.prototype.findPosition = function(t3) {
          var e3 = t3.getBoundingClientRect(), i2 = this.ui.getBoundingClientRect(), n2 = this.options.position.split(" "), o2 = window.scrollX || window.pageXOffset, s2 = window.scrollY || window.pageYOffset, r2 = 0, a2 = 0;
          if ("auto" !== n2[0] && /top|bottom/.test(n2[0]))
            r2 = e3[n2[0]] + s2, "top" === n2[0] && (r2 -= i2.height);
          else {
            r2 = e3.bottom + s2;
            var l2 = e3.bottom + i2.height > window.innerHeight, c2 = e3.top + s2 - i2.height >= i2.height;
            l2 && c2 && (r2 = e3.top + s2 - i2.height);
          }
          if (/left|right/.test(n2[0]) || n2[1] && "auto" !== n2[1] && /left|right/.test(n2[1]))
            a2 = /left|right/.test(n2[0]) ? e3[n2[0]] + o2 : e3[n2[1]] + o2, "right" !== n2[0] && "right" !== n2[1] || (a2 -= i2.width);
          else {
            a2 = e3.left + o2;
            l2 = e3.left + i2.width > window.innerWidth;
            var h = e3.right + o2 - i2.width >= 0;
            l2 && h && (a2 = e3.right + o2 - i2.width);
          }
          return { left: a2, top: r2 };
        }, e2;
      }(r.EventEmitter);
      e.LPCore = c;
    }, function(t, e, i) {
      var n, o = "object" == typeof Reflect ? Reflect : null, s = o && "function" == typeof o.apply ? o.apply : function(t2, e2, i2) {
        return Function.prototype.apply.call(t2, e2, i2);
      };
      n = o && "function" == typeof o.ownKeys ? o.ownKeys : Object.getOwnPropertySymbols ? function(t2) {
        return Object.getOwnPropertyNames(t2).concat(Object.getOwnPropertySymbols(t2));
      } : function(t2) {
        return Object.getOwnPropertyNames(t2);
      };
      var r = Number.isNaN || function(t2) {
        return t2 != t2;
      };
      function a() {
        a.init.call(this);
      }
      t.exports = a, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
      var l = 10;
      function c(t2) {
        return void 0 === t2._maxListeners ? a.defaultMaxListeners : t2._maxListeners;
      }
      function h(t2, e2, i2, n2) {
        var o2, s2, r2, a2;
        if ("function" != typeof i2)
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof i2);
        if (void 0 === (s2 = t2._events) ? (s2 = t2._events = /* @__PURE__ */ Object.create(null), t2._eventsCount = 0) : (void 0 !== s2.newListener && (t2.emit("newListener", e2, i2.listener ? i2.listener : i2), s2 = t2._events), r2 = s2[e2]), void 0 === r2)
          r2 = s2[e2] = i2, ++t2._eventsCount;
        else if ("function" == typeof r2 ? r2 = s2[e2] = n2 ? [i2, r2] : [r2, i2] : n2 ? r2.unshift(i2) : r2.push(i2), (o2 = c(t2)) > 0 && r2.length > o2 && !r2.warned) {
          r2.warned = true;
          var l2 = new Error("Possible EventEmitter memory leak detected. " + r2.length + " " + String(e2) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          l2.name = "MaxListenersExceededWarning", l2.emitter = t2, l2.type = e2, l2.count = r2.length, a2 = l2, console && console.warn && console.warn(a2);
        }
        return t2;
      }
      function p() {
        for (var t2 = [], e2 = 0; e2 < arguments.length; e2++)
          t2.push(arguments[e2]);
        this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = true, s(this.listener, this.target, t2));
      }
      function d(t2, e2, i2) {
        var n2 = { fired: false, wrapFn: void 0, target: t2, type: e2, listener: i2 }, o2 = p.bind(n2);
        return o2.listener = i2, n2.wrapFn = o2, o2;
      }
      function u(t2, e2, i2) {
        var n2 = t2._events;
        if (void 0 === n2)
          return [];
        var o2 = n2[e2];
        return void 0 === o2 ? [] : "function" == typeof o2 ? i2 ? [o2.listener || o2] : [o2] : i2 ? function(t3) {
          for (var e3 = new Array(t3.length), i3 = 0; i3 < e3.length; ++i3)
            e3[i3] = t3[i3].listener || t3[i3];
          return e3;
        }(o2) : f(o2, o2.length);
      }
      function m(t2) {
        var e2 = this._events;
        if (void 0 !== e2) {
          var i2 = e2[t2];
          if ("function" == typeof i2)
            return 1;
          if (void 0 !== i2)
            return i2.length;
        }
        return 0;
      }
      function f(t2, e2) {
        for (var i2 = new Array(e2), n2 = 0; n2 < e2; ++n2)
          i2[n2] = t2[n2];
        return i2;
      }
      Object.defineProperty(a, "defaultMaxListeners", { enumerable: true, get: function() {
        return l;
      }, set: function(t2) {
        if ("number" != typeof t2 || t2 < 0 || r(t2))
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t2 + ".");
        l = t2;
      } }), a.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
      }, a.prototype.setMaxListeners = function(t2) {
        if ("number" != typeof t2 || t2 < 0 || r(t2))
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t2 + ".");
        return this._maxListeners = t2, this;
      }, a.prototype.getMaxListeners = function() {
        return c(this);
      }, a.prototype.emit = function(t2) {
        for (var e2 = [], i2 = 1; i2 < arguments.length; i2++)
          e2.push(arguments[i2]);
        var n2 = "error" === t2, o2 = this._events;
        if (void 0 !== o2)
          n2 = n2 && void 0 === o2.error;
        else if (!n2)
          return false;
        if (n2) {
          var r2;
          if (e2.length > 0 && (r2 = e2[0]), r2 instanceof Error)
            throw r2;
          var a2 = new Error("Unhandled error." + (r2 ? " (" + r2.message + ")" : ""));
          throw a2.context = r2, a2;
        }
        var l2 = o2[t2];
        if (void 0 === l2)
          return false;
        if ("function" == typeof l2)
          s(l2, this, e2);
        else {
          var c2 = l2.length, h2 = f(l2, c2);
          for (i2 = 0; i2 < c2; ++i2)
            s(h2[i2], this, e2);
        }
        return true;
      }, a.prototype.addListener = function(t2, e2) {
        return h(this, t2, e2, false);
      }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(t2, e2) {
        return h(this, t2, e2, true);
      }, a.prototype.once = function(t2, e2) {
        if ("function" != typeof e2)
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e2);
        return this.on(t2, d(this, t2, e2)), this;
      }, a.prototype.prependOnceListener = function(t2, e2) {
        if ("function" != typeof e2)
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e2);
        return this.prependListener(t2, d(this, t2, e2)), this;
      }, a.prototype.removeListener = function(t2, e2) {
        var i2, n2, o2, s2, r2;
        if ("function" != typeof e2)
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e2);
        if (void 0 === (n2 = this._events))
          return this;
        if (void 0 === (i2 = n2[t2]))
          return this;
        if (i2 === e2 || i2.listener === e2)
          0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : (delete n2[t2], n2.removeListener && this.emit("removeListener", t2, i2.listener || e2));
        else if ("function" != typeof i2) {
          for (o2 = -1, s2 = i2.length - 1; s2 >= 0; s2--)
            if (i2[s2] === e2 || i2[s2].listener === e2) {
              r2 = i2[s2].listener, o2 = s2;
              break;
            }
          if (o2 < 0)
            return this;
          0 === o2 ? i2.shift() : function(t3, e3) {
            for (; e3 + 1 < t3.length; e3++)
              t3[e3] = t3[e3 + 1];
            t3.pop();
          }(i2, o2), 1 === i2.length && (n2[t2] = i2[0]), void 0 !== n2.removeListener && this.emit("removeListener", t2, r2 || e2);
        }
        return this;
      }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(t2) {
        var e2, i2, n2;
        if (void 0 === (i2 = this._events))
          return this;
        if (void 0 === i2.removeListener)
          return 0 === arguments.length ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : void 0 !== i2[t2] && (0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : delete i2[t2]), this;
        if (0 === arguments.length) {
          var o2, s2 = Object.keys(i2);
          for (n2 = 0; n2 < s2.length; ++n2)
            "removeListener" !== (o2 = s2[n2]) && this.removeAllListeners(o2);
          return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
        }
        if ("function" == typeof (e2 = i2[t2]))
          this.removeListener(t2, e2);
        else if (void 0 !== e2)
          for (n2 = e2.length - 1; n2 >= 0; n2--)
            this.removeListener(t2, e2[n2]);
        return this;
      }, a.prototype.listeners = function(t2) {
        return u(this, t2, true);
      }, a.prototype.rawListeners = function(t2) {
        return u(this, t2, false);
      }, a.listenerCount = function(t2, e2) {
        return "function" == typeof t2.listenerCount ? t2.listenerCount(e2) : m.call(t2, e2);
      }, a.prototype.listenerCount = m, a.prototype.eventNames = function() {
        return this._eventsCount > 0 ? n(this._events) : [];
      };
    }, function(t, e, i) {
      (e = i(9)(false)).push([t.i, ':root{--litepicker-container-months-color-bg: #fff;--litepicker-container-months-box-shadow-color: #ddd;--litepicker-footer-color-bg: #fafafa;--litepicker-footer-box-shadow-color: #ddd;--litepicker-tooltip-color-bg: #fff;--litepicker-month-header-color: #333;--litepicker-button-prev-month-color: #9e9e9e;--litepicker-button-next-month-color: #9e9e9e;--litepicker-button-prev-month-color-hover: #2196f3;--litepicker-button-next-month-color-hover: #2196f3;--litepicker-month-width: calc(var(--litepicker-day-width) * 7);--litepicker-month-weekday-color: #9e9e9e;--litepicker-month-week-number-color: #9e9e9e;--litepicker-day-width: 38px;--litepicker-day-color: #333;--litepicker-day-color-hover: #2196f3;--litepicker-is-today-color: #f44336;--litepicker-is-in-range-color: #bbdefb;--litepicker-is-locked-color: #9e9e9e;--litepicker-is-start-color: #fff;--litepicker-is-start-color-bg: #2196f3;--litepicker-is-end-color: #fff;--litepicker-is-end-color-bg: #2196f3;--litepicker-button-cancel-color: #fff;--litepicker-button-cancel-color-bg: #9e9e9e;--litepicker-button-apply-color: #fff;--litepicker-button-apply-color-bg: #2196f3;--litepicker-button-reset-color: #909090;--litepicker-button-reset-color-hover: #2196f3;--litepicker-highlighted-day-color: #333;--litepicker-highlighted-day-color-bg: #ffeb3b}.show-week-numbers{--litepicker-month-width: calc(var(--litepicker-day-width) * 8)}.litepicker{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-size:0.8em;display:none}.litepicker button{border:none;background:none}.litepicker .container__main{display:-webkit-box;display:-ms-flexbox;display:flex}.litepicker .container__months{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:var(--litepicker-container-months-color-bg);border-radius:5px;-webkit-box-shadow:0 0 5px var(--litepicker-container-months-box-shadow-color);box-shadow:0 0 5px var(--litepicker-container-months-box-shadow-color);width:calc(var(--litepicker-month-width) + 10px);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months.columns-2{width:calc((var(--litepicker-month-width) * 2) + 20px)}.litepicker .container__months.columns-3{width:calc((var(--litepicker-month-width) * 3) + 30px)}.litepicker .container__months.columns-4{width:calc((var(--litepicker-month-width) * 4) + 40px)}.litepicker .container__months.split-view .month-item-header .button-previous-month,.litepicker .container__months.split-view .month-item-header .button-next-month{visibility:visible}.litepicker .container__months .month-item{padding:5px;width:var(--litepicker-month-width);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months .month-item-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-weight:500;padding:10px 5px;text-align:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--litepicker-month-header-color)}.litepicker .container__months .month-item-header div{-webkit-box-flex:1;-ms-flex:1;flex:1}.litepicker .container__months .month-item-header div>.month-item-name{margin-right:5px}.litepicker .container__months .month-item-header div>.month-item-year{padding:0}.litepicker .container__months .month-item-header .reset-button{color:var(--litepicker-button-reset-color)}.litepicker .container__months .month-item-header .reset-button>svg{fill:var(--litepicker-button-reset-color)}.litepicker .container__months .month-item-header .reset-button *{pointer-events:none}.litepicker .container__months .month-item-header .reset-button:hover{color:var(--litepicker-button-reset-color-hover)}.litepicker .container__months .month-item-header .reset-button:hover>svg{fill:var(--litepicker-button-reset-color-hover)}.litepicker .container__months .month-item-header .button-previous-month,.litepicker .container__months .month-item-header .button-next-month{visibility:hidden;text-decoration:none;padding:3px 5px;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__months .month-item-header .button-previous-month *,.litepicker .container__months .month-item-header .button-next-month *{pointer-events:none}.litepicker .container__months .month-item-header .button-previous-month{color:var(--litepicker-button-prev-month-color)}.litepicker .container__months .month-item-header .button-previous-month>svg,.litepicker .container__months .month-item-header .button-previous-month>img{fill:var(--litepicker-button-prev-month-color)}.litepicker .container__months .month-item-header .button-previous-month:hover{color:var(--litepicker-button-prev-month-color-hover)}.litepicker .container__months .month-item-header .button-previous-month:hover>svg{fill:var(--litepicker-button-prev-month-color-hover)}.litepicker .container__months .month-item-header .button-next-month{color:var(--litepicker-button-next-month-color)}.litepicker .container__months .month-item-header .button-next-month>svg,.litepicker .container__months .month-item-header .button-next-month>img{fill:var(--litepicker-button-next-month-color)}.litepicker .container__months .month-item-header .button-next-month:hover{color:var(--litepicker-button-next-month-color-hover)}.litepicker .container__months .month-item-header .button-next-month:hover>svg{fill:var(--litepicker-button-next-month-color-hover)}.litepicker .container__months .month-item-weekdays-row{display:-webkit-box;display:-ms-flexbox;display:flex;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;color:var(--litepicker-month-weekday-color)}.litepicker .container__months .month-item-weekdays-row>div{padding:5px 0;font-size:85%;-webkit-box-flex:1;-ms-flex:1;flex:1;width:var(--litepicker-day-width);text-align:center}.litepicker .container__months .month-item:first-child .button-previous-month{visibility:visible}.litepicker .container__months .month-item:last-child .button-next-month{visibility:visible}.litepicker .container__months .month-item.no-previous-month .button-previous-month{visibility:hidden}.litepicker .container__months .month-item.no-next-month .button-next-month{visibility:hidden}.litepicker .container__days{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;text-align:center;-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__days>div,.litepicker .container__days>a{padding:5px 0;width:var(--litepicker-day-width)}.litepicker .container__days .day-item{color:var(--litepicker-day-color);text-align:center;text-decoration:none;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__days .day-item:hover{color:var(--litepicker-day-color-hover);-webkit-box-shadow:inset 0 0 0 1px var(--litepicker-day-color-hover);box-shadow:inset 0 0 0 1px var(--litepicker-day-color-hover)}.litepicker .container__days .day-item.is-today{color:var(--litepicker-is-today-color)}.litepicker .container__days .day-item.is-locked{color:var(--litepicker-is-locked-color)}.litepicker .container__days .day-item.is-locked:hover{color:var(--litepicker-is-locked-color);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-in-range{background-color:var(--litepicker-is-in-range-color);border-radius:0}.litepicker .container__days .day-item.is-start-date{color:var(--litepicker-is-start-color);background-color:var(--litepicker-is-start-color-bg);border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-flipped{border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date{color:var(--litepicker-is-end-color);background-color:var(--litepicker-is-end-color-bg);border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date.is-flipped{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-end-date{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-highlighted{color:var(--litepicker-highlighted-day-color);background-color:var(--litepicker-highlighted-day-color-bg)}.litepicker .container__days .week-number{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:var(--litepicker-month-week-number-color);font-size:85%}.litepicker .container__footer{text-align:right;padding:10px 5px;margin:0 5px;background-color:var(--litepicker-footer-color-bg);-webkit-box-shadow:inset 0px 3px 3px 0px var(--litepicker-footer-box-shadow-color);box-shadow:inset 0px 3px 3px 0px var(--litepicker-footer-box-shadow-color);border-bottom-left-radius:5px;border-bottom-right-radius:5px}.litepicker .container__footer .preview-date-range{margin-right:10px;font-size:90%}.litepicker .container__footer .button-cancel{background-color:var(--litepicker-button-cancel-color-bg);color:var(--litepicker-button-cancel-color);border:0;padding:3px 7px 4px;border-radius:3px}.litepicker .container__footer .button-cancel *{pointer-events:none}.litepicker .container__footer .button-apply{background-color:var(--litepicker-button-apply-color-bg);color:var(--litepicker-button-apply-color);border:0;padding:3px 7px 4px;border-radius:3px;margin-left:10px;margin-right:10px}.litepicker .container__footer .button-apply:disabled{opacity:0.7}.litepicker .container__footer .button-apply *{pointer-events:none}.litepicker .container__tooltip{position:absolute;margin-top:-4px;padding:4px 8px;border-radius:4px;background-color:var(--litepicker-tooltip-color-bg);-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.25);box-shadow:0 1px 3px rgba(0,0,0,0.25);white-space:nowrap;font-size:11px;pointer-events:none;visibility:hidden}.litepicker .container__tooltip:before{position:absolute;bottom:-5px;left:calc(50% - 5px);border-top:5px solid rgba(0,0,0,0.12);border-right:5px solid transparent;border-left:5px solid transparent;content:""}.litepicker .container__tooltip:after{position:absolute;bottom:-4px;left:calc(50% - 4px);border-top:4px solid var(--litepicker-tooltip-color-bg);border-right:4px solid transparent;border-left:4px solid transparent;content:""}\n', ""]), e.locals = { showWeekNumbers: "show-week-numbers", litepicker: "litepicker", containerMain: "container__main", containerMonths: "container__months", columns2: "columns-2", columns3: "columns-3", columns4: "columns-4", splitView: "split-view", monthItemHeader: "month-item-header", buttonPreviousMonth: "button-previous-month", buttonNextMonth: "button-next-month", monthItem: "month-item", monthItemName: "month-item-name", monthItemYear: "month-item-year", resetButton: "reset-button", monthItemWeekdaysRow: "month-item-weekdays-row", noPreviousMonth: "no-previous-month", noNextMonth: "no-next-month", containerDays: "container__days", dayItem: "day-item", isToday: "is-today", isLocked: "is-locked", isInRange: "is-in-range", isStartDate: "is-start-date", isFlipped: "is-flipped", isEndDate: "is-end-date", isHighlighted: "is-highlighted", weekNumber: "week-number", containerFooter: "container__footer", previewDateRange: "preview-date-range", buttonCancel: "button-cancel", buttonApply: "button-apply", containerTooltip: "container__tooltip" }, t.exports = e;
    }, function(t, e, i) {
      t.exports = function(t2) {
        var e2 = [];
        return e2.toString = function() {
          return this.map(function(e3) {
            var i2 = function(t3, e4) {
              var i3 = t3[1] || "", n = t3[3];
              if (!n)
                return i3;
              if (e4 && "function" == typeof btoa) {
                var o = (r = n, a = btoa(unescape(encodeURIComponent(JSON.stringify(r)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), "/*# ".concat(l, " */")), s = n.sources.map(function(t4) {
                  return "/*# sourceURL=".concat(n.sourceRoot || "").concat(t4, " */");
                });
                return [i3].concat(s).concat([o]).join("\n");
              }
              var r, a, l;
              return [i3].join("\n");
            }(e3, t2);
            return e3[2] ? "@media ".concat(e3[2], " {").concat(i2, "}") : i2;
          }).join("");
        }, e2.i = function(t3, i2, n) {
          "string" == typeof t3 && (t3 = [[null, t3, ""]]);
          var o = {};
          if (n)
            for (var s = 0; s < this.length; s++) {
              var r = this[s][0];
              null != r && (o[r] = true);
            }
          for (var a = 0; a < t3.length; a++) {
            var l = [].concat(t3[a]);
            n && o[l[0]] || (i2 && (l[2] ? l[2] = "".concat(i2, " and ").concat(l[2]) : l[2] = i2), e2.push(l));
          }
        }, e2;
      };
    }, function(t, e, i) {
      var n, o = {}, s = function() {
        return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)), n;
      }, r = function() {
        var t2 = {};
        return function(e2) {
          if (void 0 === t2[e2]) {
            var i2 = document.querySelector(e2);
            if (window.HTMLIFrameElement && i2 instanceof window.HTMLIFrameElement)
              try {
                i2 = i2.contentDocument.head;
              } catch (t3) {
                i2 = null;
              }
            t2[e2] = i2;
          }
          return t2[e2];
        };
      }();
      function a(t2, e2) {
        for (var i2 = [], n2 = {}, o2 = 0; o2 < t2.length; o2++) {
          var s2 = t2[o2], r2 = e2.base ? s2[0] + e2.base : s2[0], a2 = { css: s2[1], media: s2[2], sourceMap: s2[3] };
          n2[r2] ? n2[r2].parts.push(a2) : i2.push(n2[r2] = { id: r2, parts: [a2] });
        }
        return i2;
      }
      function l(t2, e2) {
        for (var i2 = 0; i2 < t2.length; i2++) {
          var n2 = t2[i2], s2 = o[n2.id], r2 = 0;
          if (s2) {
            for (s2.refs++; r2 < s2.parts.length; r2++)
              s2.parts[r2](n2.parts[r2]);
            for (; r2 < n2.parts.length; r2++)
              s2.parts.push(g(n2.parts[r2], e2));
          } else {
            for (var a2 = []; r2 < n2.parts.length; r2++)
              a2.push(g(n2.parts[r2], e2));
            o[n2.id] = { id: n2.id, refs: 1, parts: a2 };
          }
        }
      }
      function c(t2) {
        var e2 = document.createElement("style");
        if (void 0 === t2.attributes.nonce) {
          var n2 = i.nc;
          n2 && (t2.attributes.nonce = n2);
        }
        if (Object.keys(t2.attributes).forEach(function(i2) {
          e2.setAttribute(i2, t2.attributes[i2]);
        }), "function" == typeof t2.insert)
          t2.insert(e2);
        else {
          var o2 = r(t2.insert || "head");
          if (!o2)
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          o2.appendChild(e2);
        }
        return e2;
      }
      var h, p = (h = [], function(t2, e2) {
        return h[t2] = e2, h.filter(Boolean).join("\n");
      });
      function d(t2, e2, i2, n2) {
        var o2 = i2 ? "" : n2.css;
        if (t2.styleSheet)
          t2.styleSheet.cssText = p(e2, o2);
        else {
          var s2 = document.createTextNode(o2), r2 = t2.childNodes;
          r2[e2] && t2.removeChild(r2[e2]), r2.length ? t2.insertBefore(s2, r2[e2]) : t2.appendChild(s2);
        }
      }
      function u(t2, e2, i2) {
        var n2 = i2.css, o2 = i2.media, s2 = i2.sourceMap;
        if (o2 && t2.setAttribute("media", o2), s2 && btoa && (n2 += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s2)))), " */")), t2.styleSheet)
          t2.styleSheet.cssText = n2;
        else {
          for (; t2.firstChild; )
            t2.removeChild(t2.firstChild);
          t2.appendChild(document.createTextNode(n2));
        }
      }
      var m = null, f = 0;
      function g(t2, e2) {
        var i2, n2, o2;
        if (e2.singleton) {
          var s2 = f++;
          i2 = m || (m = c(e2)), n2 = d.bind(null, i2, s2, false), o2 = d.bind(null, i2, s2, true);
        } else
          i2 = c(e2), n2 = u.bind(null, i2, e2), o2 = function() {
            !function(t3) {
              if (null === t3.parentNode)
                return false;
              t3.parentNode.removeChild(t3);
            }(i2);
          };
        return n2(t2), function(e3) {
          if (e3) {
            if (e3.css === t2.css && e3.media === t2.media && e3.sourceMap === t2.sourceMap)
              return;
            n2(t2 = e3);
          } else
            o2();
        };
      }
      t.exports = function(t2, e2) {
        (e2 = e2 || {}).attributes = "object" == typeof e2.attributes ? e2.attributes : {}, e2.singleton || "boolean" == typeof e2.singleton || (e2.singleton = s());
        var i2 = a(t2, e2);
        return l(i2, e2), function(t3) {
          for (var n2 = [], s2 = 0; s2 < i2.length; s2++) {
            var r2 = i2[s2], c2 = o[r2.id];
            c2 && (c2.refs--, n2.push(c2));
          }
          t3 && l(a(t3, e2), e2);
          for (var h2 = 0; h2 < n2.length; h2++) {
            var p2 = n2[h2];
            if (0 === p2.refs) {
              for (var d2 = 0; d2 < p2.parts.length; d2++)
                p2.parts[d2]();
              delete o[p2.id];
            }
          }
        };
      };
    }, function(t, e, i) {
      var n = this && this.__assign || function() {
        return (n = Object.assign || function(t2) {
          for (var e2, i2 = 1, n2 = arguments.length; i2 < n2; i2++)
            for (var o2 in e2 = arguments[i2])
              Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
          return t2;
        }).apply(this, arguments);
      };
      Object.defineProperty(e, "__esModule", { value: true });
      var o = i(0), s = i(1), r = i(2);
      s.Litepicker.prototype.show = function(t2) {
        void 0 === t2 && (t2 = null), this.emit("before:show", t2);
        var e2 = t2 || this.options.element;
        if (this.triggerElement = e2, !this.isShowning()) {
          if (this.options.inlineMode)
            return this.ui.style.position = "relative", this.ui.style.display = "inline-block", this.ui.style.top = null, this.ui.style.left = null, this.ui.style.bottom = null, void (this.ui.style.right = null);
          this.scrollToDate(t2), this.render(), this.ui.style.position = "absolute", this.ui.style.display = "block", this.ui.style.zIndex = this.options.zIndex;
          var i2 = this.findPosition(e2);
          this.ui.style.top = i2.top + "px", this.ui.style.left = i2.left + "px", this.ui.style.right = null, this.ui.style.bottom = null, this.emit("show", t2);
        }
      }, s.Litepicker.prototype.hide = function() {
        this.isShowning() && (this.datePicked.length = 0, this.updateInput(), this.options.inlineMode ? this.render() : (this.ui.style.display = "none", this.emit("hide")));
      }, s.Litepicker.prototype.getDate = function() {
        return this.getStartDate();
      }, s.Litepicker.prototype.getStartDate = function() {
        return this.options.startDate ? this.options.startDate.clone() : null;
      }, s.Litepicker.prototype.getEndDate = function() {
        return this.options.endDate ? this.options.endDate.clone() : null;
      }, s.Litepicker.prototype.setDate = function(t2, e2) {
        void 0 === e2 && (e2 = false);
        var i2 = new o.DateTime(t2, this.options.format, this.options.lang);
        r.dateIsLocked(i2, this.options, [i2]) && !e2 ? this.emit("error:date", i2) : (this.setStartDate(t2), this.options.inlineMode && this.render(), this.emit("selected", this.getDate()));
      }, s.Litepicker.prototype.setStartDate = function(t2) {
        t2 && (this.options.startDate = new o.DateTime(t2, this.options.format, this.options.lang), this.updateInput());
      }, s.Litepicker.prototype.setEndDate = function(t2) {
        t2 && (this.options.endDate = new o.DateTime(t2, this.options.format, this.options.lang), this.options.startDate.getTime() > this.options.endDate.getTime() && (this.options.endDate = this.options.startDate.clone(), this.options.startDate = new o.DateTime(t2, this.options.format, this.options.lang)), this.updateInput());
      }, s.Litepicker.prototype.setDateRange = function(t2, e2, i2) {
        void 0 === i2 && (i2 = false), this.triggerElement = void 0;
        var n2 = new o.DateTime(t2, this.options.format, this.options.lang), s2 = new o.DateTime(e2, this.options.format, this.options.lang);
        (this.options.disallowLockDaysInRange ? r.rangeIsLocked([n2, s2], this.options) : r.dateIsLocked(n2, this.options, [n2, s2]) || r.dateIsLocked(s2, this.options, [n2, s2])) && !i2 ? this.emit("error:range", [n2, s2]) : (this.setStartDate(n2), this.setEndDate(s2), this.options.inlineMode && this.render(), this.updateInput(), this.emit("selected", this.getStartDate(), this.getEndDate()));
      }, s.Litepicker.prototype.gotoDate = function(t2, e2) {
        void 0 === e2 && (e2 = 0);
        var i2 = new o.DateTime(t2);
        i2.setDate(1), this.calendars[e2] = i2.clone(), this.render();
      }, s.Litepicker.prototype.setLockDays = function(t2) {
        this.options.lockDays = o.DateTime.convertArray(t2, this.options.lockDaysFormat), this.render();
      }, s.Litepicker.prototype.setHighlightedDays = function(t2) {
        this.options.highlightedDays = o.DateTime.convertArray(t2, this.options.highlightedDaysFormat), this.render();
      }, s.Litepicker.prototype.setOptions = function(t2) {
        delete t2.element, delete t2.elementEnd, delete t2.parentEl, t2.startDate && (t2.startDate = new o.DateTime(t2.startDate, this.options.format, this.options.lang)), t2.endDate && (t2.endDate = new o.DateTime(t2.endDate, this.options.format, this.options.lang));
        var e2 = n(n({}, this.options.dropdowns), t2.dropdowns), i2 = n(n({}, this.options.buttonText), t2.buttonText), s2 = n(n({}, this.options.tooltipText), t2.tooltipText);
        this.options = n(n({}, this.options), t2), this.options.dropdowns = n({}, e2), this.options.buttonText = n({}, i2), this.options.tooltipText = n({}, s2), !this.options.singleMode || this.options.startDate instanceof o.DateTime || (this.options.startDate = null, this.options.endDate = null), this.options.singleMode || this.options.startDate instanceof o.DateTime && this.options.endDate instanceof o.DateTime || (this.options.startDate = null, this.options.endDate = null);
        for (var r2 = 0; r2 < this.options.numberOfMonths; r2 += 1) {
          var a = this.options.startDate ? this.options.startDate.clone() : new o.DateTime();
          a.setDate(1), a.setMonth(a.getMonth() + r2), this.calendars[r2] = a;
        }
        this.options.lockDays.length && (this.options.lockDays = o.DateTime.convertArray(this.options.lockDays, this.options.lockDaysFormat)), this.options.highlightedDays.length && (this.options.highlightedDays = o.DateTime.convertArray(this.options.highlightedDays, this.options.highlightedDaysFormat)), this.render(), this.options.inlineMode && this.show(), this.updateInput();
      }, s.Litepicker.prototype.clearSelection = function() {
        this.options.startDate = null, this.options.endDate = null, this.datePicked.length = 0, this.updateInput(), this.isShowning() && this.render(), this.emit("clear:selection");
      }, s.Litepicker.prototype.destroy = function() {
        this.ui && this.ui.parentNode && (this.ui.parentNode.removeChild(this.ui), this.ui = null), this.emit("destroy");
      };
    }]);
  });
})(litepicker_umd);
var litepicker_umdExports = litepicker_umd.exports;
const Litepicker = /* @__PURE__ */ getDefaultExportFromCjs(litepicker_umdExports);
const litepicker = "";
class CkhBookingEngine {
  /**
   * Creates a new instance of the CKH Booking Engine
   * @param options Configuration options for the booking engine
   */
  constructor(options) {
    this.container = null;
    this.isInitialized = false;
    this.currentBookingContext = {};
    this.baseUrl = "https://chsres.com/api/plugin/v1";
    this.options = { ...this.getDefaultOptions(), ...options };
    this.validateOptions();
    this.init();
  }
  /**
   * Get default configuration options
   */
  getDefaultOptions() {
    return {
      theme: {
        primaryColor: "#007bff",
        secondaryColor: "#6c757d",
        fontFamily: "Arial, sans-serif",
        borderRadius: "4px"
      },
      locale: "en-US",
      currency: "USD",
      dateFormat: "MM/dd/yyyy",
      autoSearch: true,
      debug: false
    };
  }
  /**
   * Validate the provided options
   */
  validateOptions() {
    if (!this.options.target) {
      throw new Error("CkhBookingEngine: target option is required");
    }
  }
  /**
   * Initialize the booking engine
   */
  init() {
    var _a;
    try {
      this.setupContainer();
      this.renderBookingForm();
      this.attachEventListeners();
      this.isInitialized = true;
      if (this.options.debug) {
        console.log("CkhBookingEngine initialized successfully");
        console.log("API Key:", this.options.apiKey ? `${this.options.apiKey.substring(0, 8)}...` : "Not provided");
        console.log("Options:", { ...this.options, apiKey: "[HIDDEN]" });
      }
      if (this.options.autoSearch !== false) {
        this.performInitialSearch();
      }
    } catch (error) {
      console.error("Failed to initialize CkhBookingEngine:", error);
      if ((_a = this.options.callbacks) == null ? void 0 : _a.onBookingError) {
        this.options.callbacks.onBookingError(error);
      }
    }
  }
  /**
   * Setup the container element
   */
  setupContainer() {
    var _a;
    if (typeof this.options.target === "string") {
      this.container = document.getElementById(this.options.target);
      if (!this.container) {
        this.container = document.querySelector(this.options.target);
      }
    } else {
      this.container = this.options.target;
    }
    if (!this.container) {
      throw new Error(`CkhBookingEngine: Could not find target element: ${this.options.target}`);
    }
    this.container.classList.add("ckh-booking-engine");
    if ((_a = this.options.customClasses) == null ? void 0 : _a.container) {
      this.container.classList.add(this.options.customClasses.container);
    }
  }
  /**
   * Render the booking form HTML
   */
  renderBookingForm() {
    var _a, _b;
    if (!this.container)
      return;
    this.setCSSCustomProperties();
    const html = `
    <div class="ckh-booking-form">

  <div class="ckh-form-body">
    <!-- Side by side row -->
    <div class="ckh-form-row flex gap-4">
      <!-- Date -->
      <div class="ckh-form-group flex-1">
        <label for="ckh-daterange">Check in / Check Out Date</label>
        <input
          type="text"
          id="ckh-daterange"
          class="ckh-input ${((_a = this.options.customClasses) == null ? void 0 : _a.input) || ""}"
          readonly
        />
      </div>

      <!-- Guests Dropdown -->
      <div class="ckh-form-group flex-1 relative">
        <label>Guests & Rooms</label>
        <div
          id="ckh-guests-toggle"
          class="ckh-input cursor-pointer bg-white border rounded px-3 py-2"
        >
          <span id="ckh-guests-summary">1 Adult, 0 Children, 1 Room</span>
        </div>

        <!-- Dropdown Panel -->
        <div
          id="ckh-guests-dropdown"
          class="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg p-4 space-y-3 hidden"
        >
          <!-- Adults -->
          <div class="flex items-center justify-between">
            <span>Adults</span>
            <div class="flex items-center gap-2">
              <button type="button" id="ckh-adults-minus" class="px-2 py-1 border rounded">-</button>
              <span id="ckh-adults-count">1</span>
              <button type="button" id="ckh-adults-plus" class="px-2 py-1 border rounded">+</button>
            </div>
          </div>

          <!-- Children -->
          <div class="flex items-center justify-between">
            <span>Children</span>
            <div class="flex items-center gap-2">
              <button type="button" id="ckh-children-minus" class="px-2 py-1 border rounded">-</button>
              <span id="ckh-children-count">0</span>
              <button type="button" id="ckh-children-plus" class="px-2 py-1 border rounded">+</button>
            </div>
          </div>

          <!-- Rooms -->
          <div class="flex items-center justify-between">
            <span>Rooms</span>
            <div class="flex items-center gap-2">
              <button type="button" id="ckh-rooms-minus" class="px-2 py-1 border rounded">-</button>
              <span id="ckh-rooms-count">1</span>
              <button type="button" id="ckh-rooms-plus" class="px-2 py-1 border rounded">+</button>
            </div>
          </div>

          <!-- Pets -->
          <hr class="my-2 border-gray-200" />
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="ckh-pets" class="w-4 h-4 text-blue-600 border-gray-300 rounded" />
              <span>Pet friendly</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="ckh-form-actions mt-4">
      <button
        type="button"
        id="ckh-search-btn"
        class="ckh-btn w-full rounded-lg ckh-btn-primary ${((_b = this.options.customClasses) == null ? void 0 : _b.button) || ""}"
      >
        Search
      </button>
    </div>
  </div>
</div>

<!-- Room Results Container -->
<div id="ckh-room-preview" class="mt-6"></div>

<!-- Booking Form Modal -->
<div id="ckh-booking-modal" class="fixed inset-0 z-50 hidden bg-black bg-opacity-50">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 w-full max-h-[90vh] overflow-y-auto">
      <!-- Close Button -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-bold text-gray-800">Hotel Booking Form</h2>
        <button id="ckh-close-booking" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>

      <!-- Room Type (readonly) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Room Type</label>
          <input type="text" id="ckh-booking-room-type" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Room Price</label>
          <input type="text" id="ckh-booking-room-price" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      <!-- Guest Info -->
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-sm font-medium text-gray-600">Full Name</label>
          <input type="text" id="ckh-booking-full-name" placeholder="Enter your name" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-gray-600">Email Address</label>
            <input type="email" id="ckh-booking-email" placeholder="you@example.com" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Phone Number</label>
            <input type="tel" id="ckh-booking-phone" placeholder="+62 812 3456 7890" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Check-In</label>
          <input type="date" id="ckh-booking-checkin" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Check-Out</label>
          <input type="date" id="ckh-booking-checkout" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      <!-- Guests -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Adults</label>
          <input type="number" id="ckh-booking-adults" min="1" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Children</label>
          <input type="number" id="ckh-booking-children" min="0" readonly class="w-full border rounded-lg py-2 text-sm outline-none bg-gray-100 cursor-not-allowed" />
        </div>
      </div>

      <!-- Address -->
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Country</label>
          <input type="text" id="ckh-booking-country" placeholder="Enter country" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">State</label>
          <input type="text" id="ckh-booking-state" placeholder="Enter state" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">City</label>
          <input type="text" id="ckh-booking-city" placeholder="Enter city" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-600">Post Code</label>
          <input type="text" id="ckh-booking-postcode" placeholder="Enter post code" class="w-full border rounded-lg py-2 text-sm outline-none focus:border-blue-500" />
        </div>
      </div>

      <!-- Submit -->
      <button id="ckh-submit-booking" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all mb-4">Book Now</button>
    </div>
  </div>
</div>

<!-- Payment Modal -->
<div id="ckh-payment-modal" class="fixed inset-0 bg-black bg-opacity-75 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-2 md:p-4">
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden w-full max-h-[98vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b bg-gray-50 sticky top-0 z-10">
        <div>
          <h2 class="text-xl font-bold text-gray-800">Complete Your Payment</h2>
          <p class="text-sm text-gray-600">Booking Code: <span id="ckh-booking-code-display" class="font-mono font-semibold text-blue-600"></span></p>
        </div>
        <button id="ckh-close-payment" class="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2">&times;</button>
      </div>

      <!-- Payment Iframe Container -->
      <div class="relative" style="height: 80vh; min-height: 600px;">
        <iframe id="ckh-payment-iframe" src="about:blank" class="w-full h-full border-0" style="height: 100%; min-height: 600px;" allow="payment" scrolling="yes" frameborder="0" sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups allow-modals"></iframe>
        <div id="ckh-payment-loading" class="absolute inset-0 bg-white flex items-center justify-center">
          <div class="text-center">
            <svg class="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p class="text-gray-600">Loading payment gateway...</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t bg-gray-50 text-center">
        <p class="text-xs text-gray-500">Secure payment powered by Midtrans. Your payment information is encrypted and secure.</p>
      </div>
    </div>
  </div>
</div>

  `;
    this.container.innerHTML = html;
  }
  /**
   * Set CSS custom properties for dynamic theming
   */
  setCSSCustomProperties() {
    var _a, _b, _c, _d;
    if (!this.container)
      return;
    const style = this.container.style;
    if ((_a = this.options.theme) == null ? void 0 : _a.primaryColor) {
      style.setProperty("--ckh-primary-color", this.options.theme.primaryColor);
    }
    if ((_b = this.options.theme) == null ? void 0 : _b.secondaryColor) {
      style.setProperty("--ckh-secondary-color", this.options.theme.secondaryColor);
    }
    if ((_c = this.options.theme) == null ? void 0 : _c.fontFamily) {
      style.setProperty("--ckh-font-family", this.options.theme.fontFamily);
    }
    if ((_d = this.options.theme) == null ? void 0 : _d.borderRadius) {
      style.setProperty("--ckh-border-radius", this.options.theme.borderRadius);
    }
  }
  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const searchBtn = document.getElementById("ckh-search-btn");
    const dateRangeInput = document.getElementById("ckh-daterange");
    searchBtn == null ? void 0 : searchBtn.addEventListener("click", () => this.handleSearch());
    if (dateRangeInput) {
      const today = /* @__PURE__ */ new Date();
      const tomorrow = /* @__PURE__ */ new Date();
      tomorrow.setDate(today.getDate() + 1);
      const picker = new Litepicker({
        element: dateRangeInput,
        singleMode: false,
        format: "DD/MM/YYYY",
        autoApply: false,
        mobileFriendly: true,
        resetButton: true,
        numberOfMonths: window.innerWidth < 640 ? 1 : 2,
        numberOfColumns: window.innerWidth < 640 ? 1 : 2,
        startDate: today,
        endDate: tomorrow
      });
      const todayFormatted = today.toISOString().split("T")[0];
      const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
      dateRangeInput.dataset.checkin = todayFormatted;
      dateRangeInput.dataset.checkout = tomorrowFormatted;
      dateRangeInput.value = `${today.toLocaleDateString("en-GB")} - ${tomorrow.toLocaleDateString("en-GB")}`;
      picker.on("selected", (start, end) => {
        const displayFormat = "DD/MM/YYYY";
        const isoFormat = "YYYY-MM-DD";
        dateRangeInput.dataset.checkin = start.format(isoFormat);
        dateRangeInput.dataset.checkout = end.format(isoFormat);
        dateRangeInput.value = `${start.format(displayFormat)} - ${end.format(displayFormat)}`;
      });
      const toggle = document.getElementById("ckh-guests-toggle");
      const dropdown = document.getElementById("ckh-guests-dropdown");
      const summary = document.getElementById("ckh-guests-summary");
      let adults = 1, children = 0, rooms = 1;
      const updateSummary = () => {
        summary.textContent = `${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${children > 1 ? "ren" : ""}, ${rooms} Room${rooms > 1 ? "s" : ""}`;
      };
      toggle == null ? void 0 : toggle.addEventListener("click", () => {
        dropdown == null ? void 0 : dropdown.classList.toggle("hidden");
      });
      document.addEventListener("click", (e) => {
        if (!(dropdown == null ? void 0 : dropdown.contains(e.target)) && !(toggle == null ? void 0 : toggle.contains(e.target))) {
          dropdown == null ? void 0 : dropdown.classList.add("hidden");
        }
      });
      const setCounter = (idMinus, idPlus, get, set, min) => {
        const minus = document.getElementById(idMinus);
        const plus = document.getElementById(idPlus);
        const el = document.getElementById(idMinus.replace("-minus", "-count"));
        minus == null ? void 0 : minus.addEventListener("click", () => {
          const val = Math.max(min, get() - 1);
          set(val);
          el.textContent = val.toString();
          updateSummary();
        });
        plus == null ? void 0 : plus.addEventListener("click", () => {
          const val = get() + 1;
          set(val);
          el.textContent = val.toString();
          updateSummary();
        });
      };
      setCounter("ckh-adults-minus", "ckh-adults-plus", () => adults, (v) => adults = v, 1);
      setCounter("ckh-children-minus", "ckh-children-plus", () => children, (v) => children = v, 0);
      setCounter("ckh-rooms-minus", "ckh-rooms-plus", () => rooms, (v) => rooms = v, 1);
      updateSummary();
    }
    const closeBookingBtn = document.getElementById("ckh-close-booking");
    const submitBookingBtn = document.getElementById("ckh-submit-booking");
    const closePaymentBtn = document.getElementById("ckh-close-payment");
    closeBookingBtn == null ? void 0 : closeBookingBtn.addEventListener("click", () => this.closeBookingForm());
    submitBookingBtn == null ? void 0 : submitBookingBtn.addEventListener("click", () => this.submitBooking());
    closePaymentBtn == null ? void 0 : closePaymentBtn.addEventListener("click", () => this.closePaymentModal());
    document.addEventListener("click", (e) => {
      const bookingModal = document.getElementById("ckh-booking-modal");
      const paymentModal = document.getElementById("ckh-payment-modal");
      if (e.target === bookingModal) {
        this.closeBookingForm();
      }
      if (e.target === paymentModal) {
        this.closePaymentModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeBookingForm();
        this.closePaymentModal();
      }
    });
    const paymentIframe = document.getElementById("ckh-payment-iframe");
    const loadingOverlay = document.getElementById("ckh-payment-loading");
    paymentIframe == null ? void 0 : paymentIframe.addEventListener("load", function() {
      if (this.src !== "about:blank" && loadingOverlay) {
        loadingOverlay.style.display = "none";
      } else if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
      }
    });
    window.ckhBookingEngine = this;
  }
  /**
   * Handle search button click
   */
  handleSearch() {
    var _a, _b, _c, _d;
    try {
      const bookingData = this.getBookingData();
      if ((_a = this.options.callbacks) == null ? void 0 : _a.onBookingStart) {
        this.options.callbacks.onBookingStart();
      }
      const startDate = bookingData.checkIn.toISOString().split("T")[0];
      const endDate = bookingData.checkOut.toISOString().split("T")[0];
      const adults = parseInt(((_b = document.getElementById("ckh-adults-count")) == null ? void 0 : _b.textContent) || "1");
      const children = parseInt(((_c = document.getElementById("ckh-children-count")) == null ? void 0 : _c.textContent) || "0");
      this.requestToBookingEngine(startDate, endDate, adults, children);
    } catch (error) {
      console.error("Booking search failed:", error);
      if ((_d = this.options.callbacks) == null ? void 0 : _d.onBookingError) {
        this.options.callbacks.onBookingError(error);
      }
    }
  }
  /**
   * Perform initial search automatically with default dates
   */
  performInitialSearch() {
    var _a;
    try {
      setTimeout(() => {
        var _a2;
        if (this.options.debug) {
          console.log("Performing initial search with default dates...");
        }
        const today = /* @__PURE__ */ new Date();
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(today.getDate() + 1);
        const startDate = today.toISOString().split("T")[0];
        const endDate = tomorrow.toISOString().split("T")[0];
        const adults = 1;
        const children = 0;
        this.requestToBookingEngine(startDate, endDate, adults, children);
        if ((_a2 = this.options.callbacks) == null ? void 0 : _a2.onBookingStart) {
          this.options.callbacks.onBookingStart();
        }
      }, 100);
    } catch (error) {
      console.error("Initial search failed:", error);
      if ((_a = this.options.callbacks) == null ? void 0 : _a.onBookingError) {
        this.options.callbacks.onBookingError(error);
      }
    }
  }
  /**
   * Get current booking data from form
   */
  getBookingData() {
    var _a, _b, _c, _d;
    const dateRangeInput = document.getElementById("ckh-daterange");
    const adults = parseInt(((_a = document.getElementById("ckh-adults-count")) == null ? void 0 : _a.textContent) || "1");
    const children = parseInt(((_b = document.getElementById("ckh-children-count")) == null ? void 0 : _b.textContent) || "0");
    const rooms = parseInt(((_c = document.getElementById("ckh-rooms-count")) == null ? void 0 : _c.textContent) || "1");
    const pets = ((_d = document.getElementById("ckh-pets")) == null ? void 0 : _d.checked) || false;
    if (!dateRangeInput.dataset.checkin || !dateRangeInput.dataset.checkout) {
      throw new Error("Please select check-in and check-out dates");
    }
    if (this.options.debug) {
      console.log("Date parsing debug:", {
        checkinRaw: dateRangeInput.dataset.checkin,
        checkoutRaw: dateRangeInput.dataset.checkout,
        inputValue: dateRangeInput.value
      });
    }
    const checkInDate = new Date(dateRangeInput.dataset.checkin);
    const checkOutDate = new Date(dateRangeInput.dataset.checkout);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      console.error("Date parsing failed:", {
        checkinRaw: dateRangeInput.dataset.checkin,
        checkoutRaw: dateRangeInput.dataset.checkout,
        checkinParsed: checkInDate,
        checkoutParsed: checkOutDate
      });
      throw new Error("Invalid date format. Please select valid dates.");
    }
    return {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: adults + children,
      rooms,
      propertyId: pets ? "pet-friendly" : void 0
    };
  }
  /**
   * Request room availability from the booking engine API
   */
  async requestToBookingEngine(startDate, endDate, adults, children) {
    var _a;
    if (!this.options.apiKey) {
      this.displayDemoRooms();
      return;
    }
    try {
      if (this.options.debug) {
        console.log("Requesting room availability:", { startDate, endDate, adults, children });
      }
      const headers = new Headers();
      headers.append("token", this.options.apiKey);
      headers.append("Origin", window.location.origin);
      const params = new URLSearchParams({
        "StartDate": startDate,
        "EndDate": endDate,
        "Adults": adults.toString(),
        "Children": children.toString()
      });
      const apiUrl = `${this.baseUrl}/roomavailability?${params.toString()}`;
      if (this.options.debug) {
        console.log("API Request URL:", apiUrl);
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers,
        redirect: "follow"
      });
      const data = await response.json();
      if (this.options.debug) {
        console.log("API Response:", data);
      }
      this.displayRooms(data);
    } catch (error) {
      console.error("API Error:", error);
      this.displayError("Error loading rooms. Please try again.");
      if ((_a = this.options.callbacks) == null ? void 0 : _a.onBookingError) {
        this.options.callbacks.onBookingError(error);
      }
    }
  }
  /**
   * Display demo rooms when no API key is provided
   */
  displayDemoRooms() {
    const demoRooms = [
      {
        room_code: "DLX",
        room_name: "Deluxe Room",
        room_description: "Spacious deluxe room with city view and modern amenities.",
        room_max_adult: 2,
        room_max_children: 1,
        room_bed: 1,
        room_size: 35,
        number_of_rooms: 5,
        image_details: [{ image_name: "https://picsum.photos/400/300?random=1" }],
        rate_details: [
          {
            rate_code: "STDRRO",
            rate_name: "Standard Rate - Room Only",
            rate_description: "Best flexible rate without breakfast",
            rate_price: 85e4,
            is_close: 0
          },
          {
            rate_code: "STDBB",
            rate_name: "Standard Rate with Breakfast",
            rate_description: "Includes daily breakfast for 2 persons",
            rate_price: 95e4,
            is_close: 0
          }
        ]
      },
      {
        room_code: "SUP",
        room_name: "Superior Room",
        room_description: "Elegant superior room with premium facilities and garden view.",
        room_max_adult: 3,
        room_max_children: 2,
        room_bed: 2,
        room_size: 42,
        number_of_rooms: 3,
        image_details: [{ image_name: "https://picsum.photos/400/300?random=2" }],
        rate_details: [
          {
            rate_code: "SUPRO",
            rate_name: "Superior Rate - Room Only",
            rate_description: "Premium room without meals",
            rate_price: 12e5,
            is_close: 0
          },
          {
            rate_code: "SUPBB",
            rate_name: "Superior with Breakfast",
            rate_description: "Includes breakfast and welcome drink",
            rate_price: 135e4,
            is_close: 0
          }
        ]
      }
    ];
    const demoResponse = {
      StatusCode: 0,
      Result: demoRooms
    };
    this.displayRooms(demoResponse);
  }
  /**
   * Display rooms in the UI
   */
  displayRooms(data) {
    const roomPreview = document.getElementById("ckh-room-preview");
    if (!roomPreview)
      return;
    if (data.StatusCode === 0 && data.Result && data.Result.length > 0) {
      roomPreview.innerHTML = "";
      data.Result.forEach((room) => {
        const roomCard = this.createRoomCard(room);
        roomPreview.appendChild(roomCard);
      });
    } else {
      roomPreview.innerHTML = '<div class="text-center py-8 text-gray-500">No rooms available for the selected dates.</div>';
    }
  }
  /**
   * Create a room card element
   */
  createRoomCard(room) {
    const roomDiv = document.createElement("div");
    const imageUrl = room.image_details && room.image_details[0] ? room.image_details[0].image_name : "https://picsum.photos/400/300";
    const rates = room.rate_details || [];
    const availableRates = rates.filter((rate) => rate.is_close === 0);
    const cheapestRate = availableRates.length > 0 ? availableRates.reduce((min, rate) => rate.rate_price < min.rate_price ? rate : min) : null;
    const roomId = `ckh-room-${room.room_code}-${Math.random().toString(36).substr(2, 9)}`;
    roomDiv.innerHTML = `
      <div id="${roomId}" class="flex flex-col mb-3 md:flex-row max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-all-rates='${JSON.stringify(availableRates)}' data-current-rate='${cheapestRate ? cheapestRate.rate_code : ""}' data-room-code='${room.room_code}'>
        <!-- Image -->
        <img src="${imageUrl}" alt="${room.room_name}" class="w-full md:w-72 h-64 md:h-auto object-cover" />

        <!-- Content -->
        <div class="flex flex-col justify-between p-4 flex-1">
          <!-- Title -->
          <h2 class="text-lg md:text-xl font-semibold leading-snug">${room.room_name}</h2>

          <!-- Rating -->
          <div class="flex items-center gap-2 mt-1">
            <div class="text-yellow-500 text-sm">★★★★★</div>
            <span class="text-xs md:text-sm text-gray-500">Available Rooms: ${room.number_of_rooms}</span>
          </div>

          <!-- Room Details -->
          <p class="text-xs md:text-sm text-gray-500">Max Adults: ${room.room_max_adult} | Max Children: ${room.room_max_children}</p>

          <!-- Categories -->
          <div class="flex flex-wrap gap-1 mt-1">
            <span class="px-2 py-0.5 rounded-full border-solid border-gray-300 text-[11px] md:text-xs">${room.room_bed} Bed${room.room_bed > 1 ? "s" : ""}</span>
            <span class="px-2 py-0.5 rounded-full border-solid border-gray-300 text-[11px] md:text-xs">Room Size: ${room.room_size}sqm</span>
            <span class="px-2 py-0.5 rounded-full border-solid border-gray-300 text-[11px] md:text-xs">${room.room_code}</span>
          </div>

          <!-- Description -->
          <p class="text-xs md:text-sm text-gray-600 mt-2 line-clamp-2">${room.room_description || "Comfortable room with excellent amenities."}</p>

          <!-- Rate Selection -->
          <div class="mt-3">
            ${cheapestRate ? `
            <!-- Cheapest Rate Display -->
            <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div>
                <p class="text-sm font-medium text-gray-800">${cheapestRate.rate_name}</p>
                <p class="text-xs text-gray-500">${cheapestRate.rate_description}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-blue-600">IDR ${cheapestRate.rate_price.toLocaleString()}</p>
                <p class="text-xs text-gray-500">per night</p>
              </div>
            </div>

            <!-- Show All Rates Button -->
            ${availableRates.length > 1 ? `
            <button onclick="window.ckhBookingEngine.toggleRates('${roomId}')" class="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">
              <span>View ${availableRates.length - 1} more rate${availableRates.length > 2 ? "s" : ""}</span>
              <svg class="w-4 h-4 transition-transform" id="${roomId}-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- All Rates Dropdown -->
            <div id="${roomId}-rates" class="hidden mt-2 space-y-2">
              ${availableRates.slice(1).map((rate) => `
                <div class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onclick="window.ckhBookingEngine.selectRate('${roomId}', '${rate.rate_code}', '${rate.rate_name}', ${rate.rate_price}, '${rate.rate_description}')">
                  <div>
                    <p class="text-sm font-medium text-gray-800">${rate.rate_name}</p>
                    <p class="text-xs text-gray-500">${rate.rate_description}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-800">IDR ${rate.rate_price.toLocaleString()}</p>
                    <p class="text-xs text-gray-500">per night</p>
                  </div>
                </div>
              `).join("")}
            </div>
            ` : ""}
            ` : `
            <div class="p-2 bg-red-50 rounded-lg">
              <p class="text-sm text-red-600">No rates available</p>
            </div>
            `}
          </div>

          <!-- Book Now Button -->
          <div class="mt-3">
            <button onclick="window.ckhBookingEngine.openBookingForm('${roomId}', '${room.room_name}', '${cheapestRate ? cheapestRate.rate_name : ""}', '${cheapestRate ? cheapestRate.rate_price : 0}')" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" ${!cheapestRate ? "disabled" : ""}>
              ${cheapestRate ? "Book Now" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    `;
    return roomDiv;
  }
  /**
   * Display error message
   */
  displayError(message) {
    const roomPreview = document.getElementById("ckh-room-preview");
    if (roomPreview) {
      roomPreview.innerHTML = `<div class="text-center py-8 text-red-500">${message}</div>`;
    }
  }
  /**
   * Toggle rates dropdown for a room
   */
  toggleRates(roomId) {
    const ratesDiv = document.getElementById(roomId + "-rates");
    const arrow = document.getElementById(roomId + "-arrow");
    if (ratesDiv && arrow) {
      if (ratesDiv.classList.contains("hidden")) {
        ratesDiv.classList.remove("hidden");
        arrow.style.transform = "rotate(180deg)";
      } else {
        ratesDiv.classList.add("hidden");
        arrow.style.transform = "rotate(0deg)";
      }
    }
  }
  /**
   * Select a specific rate for a room
   */
  selectRate(roomId, rateCode, rateName, ratePrice, rateDescription) {
    const roomCard = document.getElementById(roomId);
    if (!roomCard) {
      console.error("Room card not found for ID:", roomId);
      return;
    }
    const mainRateDisplay = roomCard.querySelector(".bg-gray-50");
    if (!mainRateDisplay) {
      console.error("Rate display not found in room card:", roomId);
      return;
    }
    mainRateDisplay.innerHTML = `
      <div>
        <p class="text-sm font-medium text-gray-800">${rateName}</p>
        <p class="text-xs text-gray-500">${rateDescription}</p>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-blue-600">IDR ${ratePrice.toLocaleString()}</p>
        <p class="text-xs text-gray-500">per night</p>
      </div>
    `;
    const allRates = JSON.parse(roomCard.dataset.allRates || "[]");
    const otherRates = allRates.filter((rate) => rate.rate_code !== rateCode);
    const ratesDropdown = document.getElementById(roomId + "-rates");
    if (ratesDropdown) {
      ratesDropdown.innerHTML = otherRates.map((rate) => `
        <div class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onclick="window.ckhBookingEngine.selectRate('${roomId}', '${rate.rate_code}', '${rate.rate_name}', ${rate.rate_price}, '${rate.rate_description}')">
          <div>
            <p class="text-sm font-medium text-gray-800">${rate.rate_name}</p>
            <p class="text-xs text-gray-500">${rate.rate_description}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-gray-800">IDR ${rate.rate_price.toLocaleString()}</p>
            <p class="text-xs text-gray-500">per night</p>
          </div>
        </div>
      `).join("");
    }
    const viewMoreButton = roomCard.querySelector(`[onclick*="toggleRates('${roomId}')"] span`);
    const remainingCount = otherRates.length;
    if (remainingCount > 0 && viewMoreButton) {
      viewMoreButton.textContent = `View ${remainingCount} more rate${remainingCount > 1 ? "s" : ""}`;
    }
    roomCard.dataset.currentRate = rateCode;
    this.toggleRates(roomId);
    if (this.options.debug) {
      console.log("Selected rate:", { roomId, rateCode, rateName, ratePrice, rateDescription });
    }
  }
  /**
   * Open booking form modal
   */
  openBookingForm(roomId, roomName, rateName, ratePrice) {
    var _a, _b;
    const adults = ((_a = document.getElementById("ckh-adults-count")) == null ? void 0 : _a.textContent) || "1";
    const children = ((_b = document.getElementById("ckh-children-count")) == null ? void 0 : _b.textContent) || "0";
    const roomCard = document.getElementById(roomId);
    let selectedRate = rateName;
    let selectedPrice = ratePrice;
    let roomCode = "";
    let rateCode = "";
    if (roomCard) {
      const currentRateCode = roomCard.dataset.currentRate;
      const allRates = JSON.parse(roomCard.dataset.allRates || "[]");
      const currentRate = allRates.find((rate) => rate.rate_code === currentRateCode);
      if (currentRate) {
        selectedRate = currentRate.rate_name;
        selectedPrice = currentRate.rate_price.toString();
        rateCode = currentRate.rate_code;
      }
      roomCode = roomCard.dataset.roomCode || "";
    }
    this.currentBookingContext = {
      roomId,
      roomCode,
      rateCode,
      roomName,
      rateName: selectedRate,
      ratePrice: parseFloat(selectedPrice)
    };
    const dateRangeInput = document.getElementById("ckh-daterange");
    const checkInISO = (dateRangeInput == null ? void 0 : dateRangeInput.dataset.checkin) || "";
    const checkOutISO = (dateRangeInput == null ? void 0 : dateRangeInput.dataset.checkout) || "";
    document.getElementById("ckh-booking-room-type").value = roomName + " - " + selectedRate;
    document.getElementById("ckh-booking-room-price").value = "IDR " + parseInt(selectedPrice).toLocaleString() + " / night";
    document.getElementById("ckh-booking-checkin").value = checkInISO;
    document.getElementById("ckh-booking-checkout").value = checkOutISO;
    document.getElementById("ckh-booking-adults").value = adults;
    document.getElementById("ckh-booking-children").value = children;
    const modal = document.getElementById("ckh-booking-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }
  /**
   * Close booking form modal
   */
  closeBookingForm() {
    const modal = document.getElementById("ckh-booking-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }
  /**
   * Submit booking form
   */
  async submitBooking() {
    var _a, _b;
    const formData = {
      fullName: document.getElementById("ckh-booking-full-name").value,
      email: document.getElementById("ckh-booking-email").value,
      phone: document.getElementById("ckh-booking-phone").value,
      country: document.getElementById("ckh-booking-country").value,
      state: document.getElementById("ckh-booking-state").value,
      city: document.getElementById("ckh-booking-city").value,
      postCode: document.getElementById("ckh-booking-postcode").value,
      checkIn: document.getElementById("ckh-booking-checkin").value,
      checkOut: document.getElementById("ckh-booking-checkout").value,
      adults: parseInt(document.getElementById("ckh-booking-adults").value),
      children: parseInt(document.getElementById("ckh-booking-children").value),
      roomCode: this.currentBookingContext.roomCode || "DLX",
      rateCode: this.currentBookingContext.rateCode || "STDRRO",
      roomPrice: this.currentBookingContext.ratePrice || 0
    };
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields (Name, Email, Phone)");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!this.options.apiKey) {
      setTimeout(() => {
        this.closeBookingForm();
        alert(`Demo Booking Submitted!

Room: ${this.currentBookingContext.roomName}
Guest: ${formData.fullName}
Email: ${formData.email}

Note: Add API key for real booking processing.`);
      }, 1e3);
      return;
    }
    const submitButton = document.getElementById("ckh-submit-booking");
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("token", this.options.apiKey);
      const bookingPayload = {
        booking_form: {
          room_code: formData.roomCode,
          rate_code: formData.rateCode,
          room_price: formData.roomPrice,
          arrival_date: formData.checkIn,
          arrival_time: "14:00",
          departure_date: formData.checkOut,
          guest_detail: {
            name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            address: {
              area: formData.city,
              country: formData.country,
              city: formData.city,
              state: formData.state,
              postCode: formData.postCode
            }
          },
          guests: formData.adults,
          rooms: 1
        },
        payment_info: {
          redirect_url: this.options.redirectUrl || "https://cakrasoft.net/confirmation-payment",
          send_url_to_email: true
        }
      };
      if (this.options.debug) {
        console.log("Booking payload:", bookingPayload);
      }
      const response = await fetch(`${this.baseUrl}/createbooking`, {
        method: "POST",
        headers,
        body: JSON.stringify(bookingPayload),
        redirect: "follow"
      });
      const result = await response.json();
      if (this.options.debug) {
        console.log("Booking API Response:", result);
      }
      if (result.StatusCode === 0 && result.Result && result.Result.payment_url && result.Result.payment_url.redirect_url) {
        const bookingCode = result.Result.booking_code;
        const paymentUrl = result.Result.payment_url.redirect_url;
        if (this.options.debug) {
          console.log("Booking successful:", {
            bookingCode,
            paymentId: result.Result.payment_id,
            paymentToken: result.Result.payment_token,
            paymentUrl
          });
        }
        this.closeBookingForm();
        this.openPaymentModal(paymentUrl, bookingCode);
        this.resetBookingForm();
        if ((_a = this.options.callbacks) == null ? void 0 : _a.onBookingComplete) {
          this.options.callbacks.onBookingComplete({
            ...formData,
            checkIn: new Date(formData.checkIn),
            checkOut: new Date(formData.checkOut),
            guests: formData.adults + formData.children,
            rooms: 1,
            bookingCode,
            paymentUrl
          });
        }
      } else {
        alert("Booking submission failed. Please try again or contact support.");
        console.error("Booking failed:", result);
      }
    } catch (error) {
      console.error("Booking API Error:", error);
      alert("An error occurred while submitting your booking. Please try again.");
      if ((_b = this.options.callbacks) == null ? void 0 : _b.onBookingError) {
        this.options.callbacks.onBookingError(error);
      }
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  }
  /**
   * Reset booking form fields
   */
  resetBookingForm() {
    document.getElementById("ckh-booking-full-name").value = "";
    document.getElementById("ckh-booking-email").value = "";
    document.getElementById("ckh-booking-phone").value = "";
    document.getElementById("ckh-booking-country").value = "";
    document.getElementById("ckh-booking-state").value = "";
    document.getElementById("ckh-booking-city").value = "";
    document.getElementById("ckh-booking-postcode").value = "";
  }
  /**
   * Open payment modal
   */
  openPaymentModal(paymentUrl, bookingCode) {
    document.getElementById("ckh-payment-iframe").src = paymentUrl;
    const bookingCodeDisplay = document.getElementById("ckh-booking-code-display");
    if (bookingCodeDisplay) {
      bookingCodeDisplay.textContent = bookingCode;
    }
    const modal = document.getElementById("ckh-payment-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }
  /**
   * Close payment modal
   */
  closePaymentModal() {
    const modal = document.getElementById("ckh-payment-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
    document.getElementById("ckh-payment-iframe").src = "about:blank";
  }
  /**
   * Update booking engine options
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    if (this.isInitialized) {
      this.renderBookingForm();
      this.attachEventListeners();
    }
  }
  /**
   * Destroy the booking engine instance
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = "";
      this.container.classList.remove("ckh-booking-engine");
    }
    this.isInitialized = false;
  }
  /**
   * Get current booking engine version
   */
  static getVersion() {
    return "1.0.0";
  }
}
const styles = "";
if (typeof window !== "undefined") {
  window.CkhBookingEngine = CkhBookingEngine;
}
export {
  CkhBookingEngine,
  CkhBookingEngine as default
};
//# sourceMappingURL=ckh-booking-engine.es.js.map
