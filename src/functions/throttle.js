/**
 * Source: https://github.com/emn178/js-throttle-debounce/blob/master/src/js-throttle-debounce.js
 *
 * Пропускать определённое кол-во вызовов функции для снижения нагрузки на браузер
 *
 * @param {int} delay
 * @param {bool} ignoreLast
 * @returns {Function}
 */
Function.prototype.throttle = function (delay = 100, ignoreLast = false) {
    var func = this;
    var lastTime = 0;
    var timer;

    return function () {
        var self = this, args = arguments;
        var exec = function () {
            lastTime = new Date();
            func.apply(self, args);
        };
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        var diff = new Date() - lastTime;

        if (diff > delay) {
            exec();
        } else if ( ! ignoreLast) {
            timer = setTimeout(exec, delay - diff);
        }
    };
};