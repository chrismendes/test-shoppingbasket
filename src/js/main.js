/* global App */

(function() {

    'use strict';

    function BasketApp() {
        this.init = function() {
            this.model = new App.Models.Basket();
            this.view = new App.Views.Basket();

            // Add initial basket contents here (retrieved from session/cookie in practice)
            this.model.addItem(1, 'Cotton T-Shirt', 'Medium', 1.99, 1);
            this.model.addItem(2, 'Baseball Cap', 'One Size', 2.99, 1);
            this.model.addItem(3, 'Swim Shorts', 'Medium', 3.99, 1);

            this.controller = new App.Controller(this.model, this.view);
        };
    }

    var app = new BasketApp();

    if(typeof window.addEventListener !== 'undefined') {
        window.addEventListener('load', app.init());
    } else {
        window.attachEvent('onload', app.init); // IE8
    }

})();