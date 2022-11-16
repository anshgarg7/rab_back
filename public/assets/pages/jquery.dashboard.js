jQuery(function($) {
  'use strict';
  var AdminoxAdmin = window.AdminoxAdmin || {};

  /*--------------------------------
   Window Based Layout
   --------------------------------*/
  AdminoxAdmin.dashboardEcharts = function() {

    /*-------------- Chart 2 ---------------*/
    if($("#user_type_bar").length){
      /* Initialize after dom ready */
      var myChart = echarts.init(document.getElementById('user_type_bar'));
      var dateLabels = [];
      for (let index = 1; index <= 12; index++) {
        dateLabels.push( moment('2022-'+("0" + index).slice(-2)).format('MMM YYYY'));
      }
      var option = {
        /* Setup grid */
        grid: {
          zlevel: 0,
          x: 50,
          x2: 50,
          y: 20,
          y2: 20,
          borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgba(0,0,0,0)',
        },

        /* Add tooltip */
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', 
            lineStyle:{color: 'rgba(0,0,0,.5)', width: 1},
            shadowStyle:{color: 'rgba(0,0,0,.1)'}
          }
        },

        /* Add legend */
        legend: {
          data: []
        },

        toolbox: {
          orient: 'vertical',
          show : true,
          showTitle: true,
          color : ['#bdbdbd','#bdbdbd','#bdbdbd','#bdbdbd'],
          feature : {
            mark : {show: false},
            dataView : {show: false, readOnly: true},
            restore : {show: false},
            /* saveAsImage : {show: true,title:'Save as Image'}*/
          }
        },

        /* Enable drag recalculate */
        calculable: true,

        /* Horizontal axis */
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          data: dateLabels,
          axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
              color: '#64c5b1',
              type: 'solid',
              width: '2',
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 5,
              shadowOffsetX: 3,
              shadowOffsetY: 3,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#fff',
              type: 'solid',
              width: 0,
              shadowColor: 'rgba(0,0,0,0)',
            },
          },
        }],

        /* Vertical axis */
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false,
            lineStyle: {
              color: 'fff',
              type: 'solid',
              width: 0,
              shadowColor: 'rgba(0,0,0,0)',
            },
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            onZero: true,
            lineStyle: {
              color: '#dddddd',
              type: 'solid',
              width: '0',
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 5,
              shadowOffsetX: 3,
              shadowOffsetY: 3,
            },
          },
        }],

        /* Add series */
        series: [
          {
            name: 'Payment',
            type: 'bar',
            smooth: true,
            symbol:'none',
            symbolSize:2,
            showAllSymbol: true,
            barWidth:35,
            barGap:'10%',
            itemStyle: {
              normal: {
                color:'#64c5b1',
                borderWidth:2, borderColor:'#64c5b1',
                areaStyle: {color:'#64c5b1', type: 'default'}
              }
            },
            data: finalPayment
          },

          {
            name: 'Refund',
            type: 'bar',
            smooth: true,
            symbol:'none',
            symbolSize:2,
            showAllSymbol: true,
            barWidth:35,
            barGap:'10%',
            itemStyle: {
              normal: {
                color:'#dddddd',
                borderWidth:2, borderColor:'#dddddd',
                areaStyle: {color:'#dddddd', type: 'default'}
              }
            },
            data: finalRefund
          },
        ]
      };

      /* Load data into the ECharts instance */
      myChart.setOption(option);

    }

  }

  /******************************
   initialize respective scripts
   *****************************/
  $(document).ready(function() {
    AdminoxAdmin.dashboardEcharts();
  });

  $(window).load(function() {});

});



!function($) {
  "use strict";

  var ChartC3 = function() {};

  ChartC3.prototype.init = function () {
    /* Donut Chart */
    c3.generate({
      bindto: '#donut-chart',
      data: {
        columns: [
          ['Male', parseInt(uniqueVisitorCount[0].unique_visitor_count)],
          ['Female', parseInt(uniqueVisitorCount[1].unique_visitor_count)],
          ['Other', parseInt(uniqueVisitorCount[2].unique_visitor_count)]
        ],
        type : 'donut'
      },
      donut: {
        title: "USERS",
        width: 30,
        label: {
          show:false
        }
      },
      color: {
        pattern: ["#1a53ff", "#ff1aff", "#99994d"]
      }
    });

    /* Pie Chart */
    c3.generate({
      bindto: '#pie-chart',
      data: {
        columns: [
          ['Pending', parseInt(bookingsStatusCount[0].booking_status_count)],
          ['In Progress', parseInt(bookingsStatusCount[1].booking_status_count)],
          ['Abandoned', parseInt(bookingsStatusCount[2].booking_status_count)],
          ['Completed', parseInt(bookingsStatusCount[3].booking_status_count)],
          ['Cancelled', parseInt(bookingsStatusCount[4].booking_status_count)]
        ],
        type : 'pie'
      },
      color: {
        pattern: ["#1a53ff", "#ffc107", "#595959", "#32c861", "#dc3545"]
      },
      pie: {
        label: {
          show: false
        }
      }
    });

    /* Pie Chart */
    c3.generate({
      bindto: '#pie-chart1',
      data: {
        columns: [
          ['Pending', parseInt(taxiBookingsStatusCount[0].taxi_booking_status_count)],
          ['In Progress', parseInt(taxiBookingsStatusCount[1].taxi_booking_status_count)],
          ['Abandoned', parseInt(taxiBookingsStatusCount[2].taxi_booking_status_count)],
          ['Completed', parseInt(taxiBookingsStatusCount[3].taxi_booking_status_count)],
          ['Cancelled', parseInt(taxiBookingsStatusCount[4].taxi_booking_status_count)]
        ],
        type : 'pie'
      },
      color: {
        pattern: ["#1a53ff", "#ffc107", "#595959", "#32c861", "#dc3545"]
      },
      pie: {
        label: {
          show: false
        }
      }
    });

  },
      $.ChartC3 = new ChartC3, $.ChartC3.Constructor = ChartC3

}(window.jQuery),

/* initializing */
function($) {
  "use strict";
  $.ChartC3.init()
}(window.jQuery);
