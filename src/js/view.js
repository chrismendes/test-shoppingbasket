/* global $, Handlebars */

(function () {

    'use strict';

    function BasketView() {
        // Cache UI element selectors
        this.selectors = {
            template:           '#template-basket',
            stage:              '.js-basket',
            basketItem:         '.js-item',
            itemQuantity:       '.js-item-quantity',
            quantityUpBtn:      '.js-item-quantity-plus',
            quantityDownBtn:    '.js-item-quantity-minus',
            itemCost:           '.js-item-cost',
            removeItemBtn:      '.js-item-remove',
            subtotal:           '.js-subtotal',
            vat:                '.js-vat',
            total:              '.js-total',
            msgQuantityError:   '.js-msg-quantity-error',
            helpTextDefault:    '.js-helptext-default',
            helpTextEmpty:      '.js-helptext-empty',
            checkoutBtn:        '.js-continue'
        };
        this.currencySymbol = '&pound;'; // £
    }

    /**
    * Compile handlebars template based on basket data and print output
    * @param {Number} data - Basket data including items and totals
    */
    BasketView.prototype.render = function(data) {
        var template = $(this.selectors.template).html();
        var compiled = Handlebars.compile(template)(data);
        $(this.selectors.stage).html(compiled);
    };

    /**
    * Bind controller provided functions and attach to view driven events
    * @param {String} event - Descriptive alias for UI event
    * @param {Function} handler - Function from controller
    */
    BasketView.prototype.bind = function(event, handler) {
        /* jshint maxcomplexity:6 */
        var self = this;

        if(event === 'removeItem') {
            $(this.selectors.removeItemBtn).click(function(e) {
                e.preventDefault();
                var itemID = self._getClickedItemID(this);
                handler(itemID);
            });
        }
        if(event === 'editQuantity') {
            $(this.selectors.itemQuantity).change(function() {
                var itemID = self._getClickedItemID(this);
                var quantity = self.getItemQuantity(itemID);
                handler(itemID, quantity);
            });
        }
        if(event === 'quantityUp') {
            $(this.selectors.quantityUpBtn).click(function(e) {
                e.preventDefault();
                var itemID = self._getClickedItemID(this);
                handler(itemID);
            });
        }
        if(event === 'quantityDown') {
            $(this.selectors.quantityDownBtn).click(function(e) {
                e.preventDefault();
                var itemID = self._getClickedItemID(this);
                handler(itemID);
            });
        }
        if(event === 'checkout') {
            $(this.selectors.checkoutBtn).click(function(e) {
                e.preventDefault();
                handler();
            });
        }
    };


    /**
    * Visibly remove an item from the items list
    * @param {Number} itemID - ID of item to be removed/hidden
    */
    BasketView.prototype.removeItem = function(itemID) {
        if(typeof itemID !== 'undefined') {
            var lineItem = $(this.selectors.basketItem + '[data-id="'+itemID+'"]');
            lineItem.addClass('is-removed');
        }
    };

    /**
    * Update item quantity box with increased/decreased value
    * @param {Number} itemID - ID of item to be updated
    * @param {Number} prevValue - Quantity before update
    * @param {Number} diff - Difference to apply, i.e. +1 or -1
    */
    BasketView.prototype.quantityUpDown = function(itemID, prevValue, diff) {
        if(typeof itemID !== 'undefined' && typeof diff !== 'undefined') {
            var quantityInput = this._getItemUIElement(itemID, 'quantity');
            var newValue = prevValue + diff;
            quantityInput.val(newValue);
        }
    };

    /**
    * Update item quantity box with specified value
    * @param {Number} itemID - ID of item to be updated
    * @param {Number} value - New quantity
    */
    BasketView.prototype.setQuantity = function(itemID, value) {
        if(typeof itemID !== 'undefined' && typeof value !== 'undefined') {
            var quantityInput = this._getItemUIElement(itemID, 'quantity');
            quantityInput.val(value);
        }
    };

    /**
    * Show or hide item quantity error message
    * @param {Number} itemID - ID of item with or without error
    * @param {String} state - 'on' or 'off'
    */
    BasketView.prototype.setQuantityErrorState = function(itemID, state) {
        if(typeof itemID !== 'undefined') {
            var quantityInput = this._getItemUIElement(itemID, 'quantity');
            if(state === 'on') {
                quantityInput.addClass('is-error');
                $(this.selectors.msgQuantityError).removeClass('is-hidden');
                this._setCheckoutButton('off');
            } else if(state === 'off') {
                quantityInput.removeClass('is-error');
                $(this.selectors.msgQuantityError).addClass('is-hidden');
                this._setCheckoutButton('on');
            }
        }
    };

    /**
    * Retrieve currently displayed quantity value for specified item
    * @param {Number} itemID - ID for item of interest
    * @return {Number} Quantity value
    */
    BasketView.prototype.getItemQuantity = function(itemID) {
        if(typeof itemID !== 'undefined') {
            var quantityInput = this._getItemUIElement(itemID, 'quantity');
            return quantityInput.val();
        }
    };

    /**
    * Update the displayed line item total for specified item
    * @param {Number} itemID - ID for item of interest
    * @param {Number} cost - New total value
    */
    BasketView.prototype.setItemCost = function(itemID, cost) {
        if(typeof itemID !== 'undefined' && typeof cost !== 'undefined') {
            var costLabel = this._getItemUIElement(itemID, 'cost');
            costLabel.html(this.currencySymbol + cost);
        }
    };

    /**
    * Update sub-total, VAT, and grand total with specified new values
    * @param {Object} update - New values
    */
    BasketView.prototype.updateFooterTotals = function(update) {
        if(typeof update.subtotal !== 'undefined') {
            $(this.selectors.subtotal).html(this.currencySymbol + update.subtotal);
        }
        if(typeof update.vat !== 'undefined') {
            $(this.selectors.vat).html(this.currencySymbol + update.vat);
        }
        if(typeof update.total !== 'undefined') {
            $(this.selectors.total).html(this.currencySymbol + update.total);
        }
    };

    /**
    * Show or hide empty basket user friendly message, and prevent/allow checkout
    * @param {String} state - 'on' or 'off'
    */
    BasketView.prototype.setBasketEmptyState = function(state) {
        if(typeof state !== 'undefined') {
            if(state === true) {
                $(this.selectors.helpTextDefault).addClass('is-hidden');
                $(this.selectors.helpTextEmpty).removeClass('is-hidden');
                this._setCheckoutButton('off');
            } else if(state === false) {
                $(this.selectors.helpTextDefault).removeClass('is-hidden');
                $(this.selectors.helpTextEmpty).addClass('is-hidden');
                this._setCheckoutButton('on');
            }
        }
    };

    /**
    * Show or hide checkout processing user friendly message
    * @param {String} state - 'on' or 'off'
    */
    BasketView.prototype.setCheckoutProcessingState = function(state) {
        if(typeof state !== 'undefined') {
            if(state === 'on') {
                this._setCheckoutButton('loading');
                $(this.selectors.stage).addClass('is-disabled');
                $(this.selectors.itemQuantity).attr('disabled', true);
            }
        }
    };

    /**
    * Shortcut function for changing state of checkout button
    * @param {String} state - 'on', 'off' or 'loading'
    */
    BasketView.prototype._setCheckoutButton = function(state) {
        if(typeof state !== 'undefined') {
            if(state === 'on') {
                $(this.selectors.checkoutBtn).removeClass('is-disabled');
            } else if(state === 'off') {
                $(this.selectors.checkoutBtn).addClass('is-disabled');
            } else if(state === 'loading') {
                $(this.selectors.checkoutBtn).addClass('is-disabled');
                $(this.selectors.checkoutBtn).html('Processing...');
            }
        }
    };

    /**
    * Determine which item is related to the item specific UI element clicked
    * @param {Object} element - jQuery context object as a means to navigate the DOM tree and find 'data-id' attribute
    * @return {Boolean/Number} False if item ID could not be found, otherwise the item ID
    */
    BasketView.prototype._getClickedItemID = function(element) {
        var itemID = $(element).parents(this.selectors.basketItem).attr('data-id');
        if(typeof itemID === 'undefined') {
            return false;
        }
        return itemID;
    };

    /**
    * Shortcut function to retrieve specified UI element
    * @param {Number} itemID - ID for item whose UI element is of interest
    * @return {Object/Boolean} False if UI element could not be found, otherwise the jQuery object for element
    */
    BasketView.prototype._getItemUIElement = function(itemID, element) {
        var lineItem = $(this.selectors.basketItem + '[data-id="'+itemID+'"]');
        if(element === 'quantity') {
            element = lineItem.find(this.selectors.itemQuantity);
        }
        if(element === 'cost') {
            element = lineItem.find(this.selectors.itemCost);
        }
        return (element.length) ? element : false;
    };


    window.App = window.App || {};
    window.App.Views = window.App.Views || {};
    window.App.Views.Basket = BasketView;

})();