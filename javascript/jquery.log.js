/*global jQuery, window*/

(function ($) {
    'use strict';

    var log_function,
        getLogger;

    /**
     * Set the function that will handle console.log and $.log calls.
     *
     * @param {Function} callback
     */
    $.setLogFunction = function (callback) {
        log_function = callback;
    };

    /**
     * Get the console.log function if provided by the browser. If ot does not exist a mock function
     * is used.
     *
     * @return {Function}
     */
    function getConsoleLogFunction() {
        if (typeof window.console === 'undefined') {
            window.console = {};
            window.console.log = function () {};
        }

        return window.console.log;
    }

    /**
     * Get the function that will handle the log requests.
     * If no function is set, console.log is used
     *
     * @return {Function}
     */
    function getLogFunction() {
        if (typeof log_function === 'undefined') {
            log_function = getConsoleLogFunction();
        }

        return log_function;
    }

    getLogger = (function () {
        var logger;

        return function () {
            var log_function;

            if (typeof logger === 'undefined') {
                log_function = getLogFunction();

                logger = function (message, level) {
                    log_function.apply(this, [message]);
                };

                // replace the window.console.log
                getConsoleLogFunction();
                window.console.log = function (message) {
                    logger(message, 0);
                };
            }

            return logger;
        };
    }());

    /**
     * @param {String} message
     * @param {Number} [level]
     */
    $.log = function (message, level) {
        var logger = getLogger();

        if (typeof level === 'undefined') {
            level = 0;
        }

        logger(message, parseInt(level, 10));
    };
}(jQuery));