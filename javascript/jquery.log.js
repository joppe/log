/*global jQuery, window*/

/**
 * This function is used to log messages
 */
(function ($) {
    'use strict';

    var Settings,
        Logger,
        Console;

    Console = (function () {
        var log_function;

        if (typeof window.console === 'undefined') {
            window.console = {};
            window.console.log = function () {};
        }

        log_function = window.console.log;

        return {
            /**
             * @return {Function}
             */
            getLogFunction: function () {
                return log_function;
            }
        };
    }());

    Settings = (function () {
        var log_function;

        return {
            /**
             * @param {Function} callback
             */
            setLogFunction: function (callback) {
                log_function = callback;
            },

            /**
             * @return {Function}
             */
            getLogFunction: function () {
                if (typeof log_function === 'undefined') {
                    log_function = Console.getLogFunction();
                }

                return log_function;
            }
        };
    }());

    Logger = (function () {
        return {
            log: function () {
                var log_function = Settings.getLogFunction();

                log_function.apply(this, arguments);
            }
        };
    }());

    /**
     * The log function
     */
    $.log = function () {
        Logger.log.apply(this, arguments);
    };

    /**
     * Settings
     */
    $.log.settings = (function () {
        return {
            /**
             * @param {Function} log_function
             */
            setLogFunction: function (log_function) {
                Settings.setLogFunction(log_function);
            },

            /**
             * @param {Boolean} override
             */
            overrideConsoleLog: function (override) {
                if (override === true) {
                    window.console.log = function () {
                        Logger.log.apply(this, arguments);
                    };
                } else {
                    window.console.log = function () {
                        var log_function = Console.getLogFunction();

                        log_function.apply(this, arguments);
                    };
                }
            }
        };
    }());
}(jQuery));