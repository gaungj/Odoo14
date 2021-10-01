odoo.define('multi_measure_line_chart.CustomLineChart', function (require) {
    'use strict';

    var view_registry = require('web.view_registry');
    var rpc = require('web.rpc');
    var qweb = require('web.qweb');

    var CustomLineChart = qweb.Renderer.extend({
        async _render() {
            await this._super.apply(this, arguments);
            this.active_id = this.state.context.active_id;
            this.render_custom_line_chart(this.active_id);
        },

        render_custom_line_chart: function (active_id) {
            rpc.query({
                model: 'sharing.monitoring',
                method: 'get_sistole_diastole_data',
                args: [active_id],
            }).then(function (result) {
                var ctx = document.getElementById("canvas").getContext('2d');
                var sistole = result.sistole;
                var diastole = result.diastole;

                var labels = result.labels; // Add labels to array
                // End Defining data

                // Create Chart 
                if (window.myCharts1 != undefined)
                    window.myCharts1.destroy();
                window.myCharts1 = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Sistole', // Name the series
                            data: sistole, // Specify the data values array
                            backgroundColor: '#FF5C58',
                            borderColor: '#FF5C58',

                            borderWidth: 1, // Specify bar border width
                            type: 'line', // Set this data to a line chart
                            fill: false
                        },
                        {
                            label: 'Diastole', // Name the series
                            data: diastole, // Specify the data values array
                            backgroundColor: '#14279B',
                            borderColor: '#14279B',

                            borderWidth: 1, // Specify bar border width
                            type: 'line', // Set this data to a line chart
                            fill: false
                        },
                        ]
                    },
                    options: {
                        responsive: true, // Instruct chart js to respond nicely.
                        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
                        title: {
                            display: true,
                            text: result.title,
                        },
                    }
                });
            });
        },

    });

    var QwebMonitoringView = qweb.View.extend({
        config: _.extend({}, qweb.View.prototype.config, {
            Renderer: CustomLineChart,
        }),
        withSearchBar: false,
    })

    view_registry.add('custom_line_chart', QwebMonitoringView);

    return CustomLineChart;

});