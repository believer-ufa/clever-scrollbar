(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.CleverScrollbar = global.CleverScrollbar || {})));
}(this, (function (exports) { 'use strict';

if (typeof Symbol !== 'undefined') {
    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
}

var head = document.querySelector('head');

var styleElement = document.createElement('style');

styleElement.appendChild(document.createTextNode('\n.cleverscroll--container {\n    position: fixed;\n    right: 0;\n    top: 0;\n    width: 10px;\n    height: 100%;\n    z-index: 1;\n\n    transition: width .2s ease;\n}\n\n.cleverscroll--container:hover {\n    width: 100px;\n}\n\n.cleverscroll--block {\n    width: 10px;\n    position: fixed;\n    text-align: center;\n    font-size: 12px;\n    color: transparent;\n    overflow: hidden;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    transition: width .2s ease;\n}\n\n.cleverscroll--container:hover .cleverscroll--block {\n    color: #444;\n    width: 100px;\n}\n\n.cleverscroll--block-1 {\n    background: rgba(200,0,0,0.5);\n}\n\n.cleverscroll--block-2 {\n    background: rgba(84, 175, 241, 0.5);\n}\n\n.cleverscroll--block-3 {\n    background: rgba(126, 234, 124, 0.5);\n}\n\n.cleverscroll--block-4 {\n    background: rgba(154, 46, 210, 0.5);\n}\n\n.cleverscroll--block-5 {\n    background: rgba(76, 65, 82, 0.5);\n}\n'));

head.appendChild(styleElement);

/**
 * Узнать координаты элемента
 */
function getElementPosition(elem) {
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;

    var l = 0;
    var t = 0;

    while (elem) {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return {
        left: l,
        top: t,
        width: w,
        height: h
    };
}

// Desc: http://stackoverflow.com/a/1147768/2035123
function getDocumentHeight() {
    var body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

/**
 * Класс, который занимается отображением HTML контента скроллбара
 */
var HTMLRender = new function () {
    var _this = this;

    this.container = undefined;

    /**
     * Блоки навигации
     */
    this.blocks = [];

    this.entered = false;

    this.container = document.createElement('div');
    this.container.classList.add('cleverscroll--container');

    // На мобильных устройствах нам необходимо первый "тык" отфильтровать, так как
    // он лишь позволяет развернуть панельку и не должен перекидывать человека в другое место
    this.container.addEventListener('mouseenter', function (event) {
        if (_this.entered === false) {
            setTimeout(function () {
                _this.entered = true;
            }, 10);
        }
    });

    this.container.addEventListener('mouseleave', function (event) {
        _this.entered = false;
    });

    /**
     * Загрузить блоки
     */
    this.load = function () {
        _this.blocks = [];
        _this.container.innerHTML = '';

        var contentBlocks = document.querySelectorAll('[data-content-block]');

        if (contentBlocks.length) {
            document.body.appendChild(_this.container);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = contentBlocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var contentBlock = _step.value;

                    _this.addNavigationBlock(contentBlock);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _this.setCoords();
        } else {
            console.log('CleverScroll disabled because nothing content blocks');
        }
    };

    this.reload = function () {
        _this.stop();
        _this.load();
    };

    /**
     * Остановить работу компонента
     */
    this.stop = function () {
        document.body.removeChild(_this.container);
    };

    /**
     * Добавить блок в панель навигации
     * @param {HTMLElement} block
     */
    this.addNavigationBlock = function (block) {
        var scroll = document.createElement('div');
        var blockTitle = block.getAttribute('data-content-block');
        var blockClasses = block.getAttribute('data-content-block-classes');

        if (blockClasses) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = blockClasses.split(' ')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var className = _step2.value;

                    scroll.classList.add(className);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        scroll.classList.add('cleverscroll--block');
        scroll.classList.add('cleverscroll--block-' + (_this.blocks.length + 1));
        scroll.appendChild(document.createTextNode(blockTitle));

        _this.container.appendChild(scroll);

        scroll.addEventListener('click', function (event) {
            if (_this.entered) {
                _this.scrollToBlock(block);
            }
        });

        _this.blocks.push({
            content: block,
            scroll: scroll,
            title: blockTitle
        });
    };

    /**
     * Установить координаты текущим блокам в соответствии с текущим скроллом
     */
    this.setCoords = function () {
        var documentHeight = getDocumentHeight();
        var top = 0;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = _this.blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var block = _step3.value;

                var blockPos = getElementPosition(block.content);

                var marginTop = parseFloat(getComputedStyle(block.content).marginTop);
                var marginBottom = parseFloat(getComputedStyle(block.content).marginBottom);
                var topPos = top > 0 ? top : Math.round((blockPos.top - marginTop) / documentHeight * 100);

                var heightPos = Math.round((blockPos.height + marginBottom) / documentHeight * 100);

                // Если это последний элемент - заберём всё оставшееся пространство
                // под себя, для красоты
                if (_this.blocks.indexOf(block) === _this.blocks.length - 1) {
                    heightPos = 100 - topPos;
                }

                block.scroll.style.top = topPos + '%';
                block.scroll.style.height = heightPos + '%';

                top = topPos + heightPos;
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    };

    this.scrollToBlock = function (block) {
        var pos = getElementPosition(block);

        window.scrollTo(0, pos.top);
    };
}();

//import './css/main.css!'
var load = HTMLRender.load;
var reload = HTMLRender.reload;
var stop = HTMLRender.stop;

exports['default'] = HTMLRender;
exports.load = load;
exports.reload = reload;
exports.stop = stop;

Object.defineProperty(exports, '__esModule', { value: true });

})));
