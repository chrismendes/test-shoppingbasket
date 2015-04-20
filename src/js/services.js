/* global $, alert, Handlebars */

(function() {

    'use strict';

    window.App = window.App || {};
    window.App.Services = window.App.Services || {};
    
    /**
    * Dispatches specified data to specified URL with a POST request via AJAX
    * @param {Object} data - Data to be sent
    * @param {String} url - Destination
    */
    window.App.Services.httpSendJSON = function(data, url) {
        var json = JSON.stringify(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: json,
            dataType: 'json',
            error: function() {
                // Success implementation here for demo purposes (will always fail due to blank URL)
                window.console && console.info('Basket data sent as follows:\n' + json);
                alert('Basket data sent as follows:\n\n' + json);
            },
            success: function() {
                // Success implementation here in practice
            }
        });
    };

    /**
    * Handlebar helper to present numbers with two decimal places, e.g. 4.98
    * @param {Number} number - Number to format
    * @return {String} Formatted number
    */
    Handlebars.registerHelper('decimalPlaces', function(number) {
        if(typeof number === 'string') {
            number = parseFloat(number);
        }
        return number.toFixed(2);
    });

    /**
    * Handlebar helper to help alternate between list items
    * @description Intended for adding grey background to alternate basket item rows (todo)
    */
    Handlebars.registerHelper('everyOther', function(index, amount, scope) {
        if(++index % amount) {
            return scope.inverse(this);
        } else {
            return scope.fn(this);
        }
    });

})();