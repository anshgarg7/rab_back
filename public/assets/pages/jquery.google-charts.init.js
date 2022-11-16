! function($) {
    "use strict";

    var GoogleChart = function() {
        this.$body = $("body")
    };

    /*creates donut chart*/
    GoogleChart.prototype.createDonutChart = function(selector, data, colors) {
        var options = {
            fontName: 'Open Sans',
            fontSize: 12,
            height: 280,
            pieHole: 0.45,
            width: 350,
            chartArea: {
                left: 25,
                width: '90%',
                height: '70%'
            },
            colors: colors
        };

        var google_chart_data = google.visualization.arrayToDataTable(data);
        var pie_chart = new google.visualization.PieChart(selector);
        pie_chart.draw(google_chart_data, options);
        return pie_chart;
    },
    /*init*/
    GoogleChart.prototype.init = function () {
        var $this = this;

        /*creating pie chart*/
        var pie_data = [
            ['Task', ''],
            ['Android', parseInt(visitorDeviceType[1].visitor_type_count)],
            ['IOS', parseInt(visitorDeviceType[2].visitor_type_count)],
            ['Web', parseInt(visitorDeviceType[0].visitor_type_count)]
        ];

        /*creating donut chart*/
        $this.createDonutChart($('#donut-chart1')[0], pie_data, ['#28a745','#297ef6', '#e52b4c']);

        /*on window resize - redrawing all charts*/
        $(window).on('resize', function() {
            $this.createDonutChart($('#donut-chart1')[0], pie_data, ['#28a745', '#4bd396', '#f9c851']);
        });
    },
    /*init GoogleChart*/
    $.GoogleChart = new GoogleChart, $.GoogleChart.Constructor = GoogleChart
}(window.jQuery),

/*initializing GoogleChart*/
function($) {
    "use strict";
    /*loading visualization lib - don't forget to include this*/
    google.load("visualization", "1", {packages:["corechart"]});
    /*after finished load, calling init method*/
    google.setOnLoadCallback(function() {$.GoogleChart.init();});
}(window.jQuery);
