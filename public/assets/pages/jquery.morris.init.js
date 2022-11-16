!function($) {
    "use strict";

    var MorrisCharts = function() {};

    /*creates Bar chart*/
    MorrisCharts.prototype.createBarChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            hideHover: 'auto',
            resize: true,
            gridLineColor: '#eeeeee',
            barSizeRatio: 0.4,
            barColors: lineColors
        });
    },
    
    MorrisCharts.prototype.init = function() {

        /*creating bar chart*/
        var $barData  = [
            { y: 'VENDOR ADVENTURE ACTIVITIES', a: parseInt(adventureActivitiesCount), b: parseInt(activeAdventureActivitiesCount) , c: parseInt(closeAdventureActivitiesCount), d: parseInt(approvedAdventureActivitiesCount), e: parseInt(unapprovedAdventureActivitiesCount) },
            { y: 'VENDOR RENTAL ACTIVITIES', a: parseInt(rentalActivitiesCount),  b: parseInt(activeRentalActivitiesCount) , c: parseInt(closeRentalActivitiesCount), d: parseInt(approvedRentalActivitiesCount), e: parseInt(unapprovedRentalActivitiesCount) },
            { y: 'TAXI DRIVERS', a: parseInt(taxiDriversCount),  b: parseInt(activeTaxiDriversCount) , c: parseInt(closeTaxiDriversCount), d: parseInt(approvedTaxiDriversCount), e: parseInt(unapprovedTaxiDriversCount) }
        ];
        this.createBarChart('morris-bar-example', $barData, 'y', ['a', 'b', 'c', 'd', 'e'], ['Total', 'Active', 'Close', 'Approved', 'Unapproved'], ['#5553ce','#297ef6', '#e52b4c', '#32c861', '#ffa91c']);

    },
    /*init*/
    $.MorrisCharts = new MorrisCharts, $.MorrisCharts.Constructor = MorrisCharts
}(window.jQuery),

/*initializing*/ 
function($) {
    "use strict";
    $.MorrisCharts.init();
}(window.jQuery);