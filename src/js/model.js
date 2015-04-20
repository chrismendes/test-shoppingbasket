/* global $ */

(function() {

    'use strict';

    function BasketModel() {
        this.items = [];
        this.subtotal = 0;
        this.vat = 0;
        this.vatRate = 20;
        this.total = 0;
    }

    /**
    * Add new item to items array
    * @param {Number} itemID - Unique ID for new item
    * @param {String} name - Name of new item
    * @param {String} size - Descriptive size
    * @param {String} price - Properly formatted price (e.g. 1.99)
    * @param {Number} quantity - How many to add to basket
    */
    BasketModel.prototype.addItem = function(itemID, name, size, price, quantity) {
        this.items.push({
            id: itemID,
            name: name,
            size: size,
            price: price,
            quantity: quantity,
            cost: (price * quantity).toFixed(2)
        });
    };

    /**
    * Removes an item from items array
    * @param {Number} itemID - ID of item to be removed
    * @return {Boolean} False if specified item cannot be found, true if successfully removed
    */
    BasketModel.prototype.removeItem = function(itemID) {
        var i = this._findItem(itemID);
        if(i === false) {
            return false;
        }

        this.items.splice(i, 1);
        return true;
    };

    /**
    * Updates the quantity for the specified item
    * @param {Number} itemID - ID of item with quantity change
    * @param {Number} amount - New quantity value, or increment/decrement depending on last parameter
    * @param {Boolean} incremental - Describes how to apply amount parameter
    * @return {Boolean/Number} False if specified item cannot be found, or the new line item total if successful
    */
    BasketModel.prototype.setItemQuantity = function(itemID, amount, incremental) {
        var i = this._findItem(itemID);
        if(i === false) {
            return false;
        }

        var item = this.items[i];
        amount = parseInt(amount);
        this.items[i].quantity = (incremental === true) ? (item.quantity + amount) : amount;
        this.items[i].cost = (item.price * item.quantity).toFixed(2);

        return this.items[i].cost;
    };

    /**
    * Retrieves the quantity for the specified item
    * @param {Number} itemID - ID of item with quantity request
    * @return {Number} Item quantity value
    */
    BasketModel.prototype.getItemQuantity = function(itemID) {
        var i = this._findItem(itemID);
        if(i === false) {
            return false;
        }

        return this.items[i].quantity;
    };

    /**
    * Re-calculate sub-total, VAT, and grand total based on basket contents
    */
    BasketModel.prototype.updateFooterTotals = function() {
        var subtotal = 0;
        for(var i = 0; i < this.items.length; i++) {
            subtotal += parseFloat(this.items[i].cost);
        }
        this.subtotal = subtotal.toFixed(2);
        this.vat = this._calculateVAT();
        this.total = (parseFloat(this.subtotal) + parseFloat(this.vat)).toFixed(2);
    };

    /**
    * Retrieves all basket data including items and totals
    * @return {Object} Basket data
    */
    BasketModel.prototype.getBasketData = function() {
        return {
            items:      this.items,
            subtotal:   this.subtotal,
            vat:        this.vat,
            vatRate:    this.vatRate,
            total:      this.total
        };
    };

    /**
    * Retrieves the array index for a given item based on item ID
    * @param {Number} itemID - ID of item to find
    * @return {Number} Array index
    */
    BasketModel.prototype._findItem = function(itemID) {
        var index = $.map(this.items, function(i) {
            return i.id;
        }).indexOf(parseInt(itemID));
        return (index > -1) ? index : false;
    };

    /**
    * Re-calculate VAT based on pre-configured VAT rate and current sub-total
    * @return {Number} VAT amount propery formatted (e.g. 3.58)
    */
    BasketModel.prototype._calculateVAT = function() {
        if(this.vatRate) {
            var vat = this.subtotal * (this.vatRate / 100);
            return vat.toFixed(2);
        }
    };


    window.App = window.App || {};
    window.App.Models = window.App.Models || {};
    window.App.Models.Basket = BasketModel;

})();