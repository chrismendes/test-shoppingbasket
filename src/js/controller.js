/* global App */

(function() {

    'use strict';

    function Controller(model, view) {
        this.model = model;
        this.view = view;

        this.error = false;
        this.basketDisabled = false;
        this.dataSubmitURL = ''; // Intentionally blank (demo only)

        if(this.model.items.length > 0) {
            this.model.updateFooterTotals();
        }

        this.view.render(this.model.getBasketData());

        this.bindEvents();
    }

   /**
    * Binds controller functions to view driven events
    */
    Controller.prototype.bindEvents = function() {
        var self = this;

        this.view.bind('removeItem', function(itemID) {
            self.removeItem(itemID);
        });
        this.view.bind('quantityUp', function(itemID) {
            self.quantityUpDown(itemID, 1);
        });
        this.view.bind('quantityDown', function(itemID) {
            self.quantityUpDown(itemID, -1);
        });
        this.view.bind('editQuantity', function(itemID, value) {
            self.editQuantity(itemID, value);
        });
        this.view.bind('checkout', function() {
            self.checkout();
        });
    };


    /**
    * Respond to basket item removal
    * @param {Number} itemID - ID of item to be removed
    * @return {Boolean} False if action is currently forbidden
    */
    Controller.prototype.removeItem = function(itemID) {
        if(this.basketDisabled || this.error) {
            return false;
        }

        var removed = this.model.removeItem(itemID);
        if(removed !== false) {
            this.view.removeItem(itemID);
            this._updateFooterTotals();

            if(this.model.items.length === 0) {
                this.view.setBasketEmptyState(true);
            } else {
                this.view.setBasketEmptyState(false);
            }
        }
    };

    /**
    * Respond to item quantity edit via keyboard
    * @param {Number} itemID - ID of item with changed quantity
    * @param {Number} amount - New quantity value specified
    * @return {Boolean} False if action is currently forbidden, or input is invalid
    */
    Controller.prototype.editQuantity = function(itemID, amount) {
        if(this.basketDisabled) {
            return false;
        }

        // Validate custom input (numbers only)
        var rule = new RegExp('^[0-9]+$');
        var valid = rule.test(amount);

        if(valid === false || amount < 1 || amount > 10) {
            this.error = true;
            this.view.setQuantityErrorState(itemID, 'on');
            return false;
        } else {
            this.error = false;
            this.view.setQuantityErrorState(itemID, 'off');
        }

        var lineItemTotal = this.model.setItemQuantity(itemID, amount);
        this.view.setItemCost(itemID, lineItemTotal);

        this._updateFooterTotals();
    };

    /**
    * Respond to item quantity change via up/down button clicks
    * @param {Number} itemID - ID of item with changed quantity
    * @param {Number} diff - Up or down (+1 or -1)
    * @return {Boolean} False if action is currently forbidden, or input is invalid
    */
    Controller.prototype.quantityUpDown = function(itemID, diff) {
        if(this.basketDisabled) {
            return false;
        }

        var currentQty = this.model.getItemQuantity(itemID);

        // Enforce 1-10 rule
        if((diff < 0 && currentQty < 2) || (diff > 0 && currentQty > 9)) {
            return false;
        }

        this.error = false;
        this.view.setQuantityErrorState(itemID, 'off');
        this.view.quantityUpDown(itemID, currentQty, diff);

        var lineItemTotal = this.model.setItemQuantity(itemID, diff, true);
        this.view.setItemCost(itemID, lineItemTotal);

        this._updateFooterTotals();
    };

    /**
    * Respond to checkout button click
    * @return {Boolean} False if action is currently forbidden
    */
    Controller.prototype.checkout = function() {
        if(this.basketDisabled || this.error) {
            return false;
        }
        if(this.model.items.length > 0) {
            this.basketDisabled = true;
            this.view.setCheckoutProcessingState('on');

            var basketData = this.model.getBasketData();
            App.Services.httpSendJSON(basketData, this.dataSubmitURL);
        }
    };

    /**
    * Trigger view/model responses to basket change, i.e. re-calculate totals and display
    */
    Controller.prototype._updateFooterTotals = function() {
        this.model.updateFooterTotals();
        this.view.updateFooterTotals({
            subtotal: this.model.subtotal,
            vat: this.model.vat,
            total: this.model.total
        });
    };


    window.App = window.App || {};
    window.App.Controller = Controller;

})();