odoo.define('meta_sale_dashboard.Dashboard', function (require) {
    'use strict';

    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var web_client = require('web.web_client');
    var session = require('web.session');
    var _t = core._t;
    var ajax = require('web.ajax');
    var QWeb = core.qweb;
    var self = this;

    var posDashBoard = AbstractAction.extend({
        template: 'Dashboard',
        events: {
            'click .total_quotation': 'total_quotation',
            'click .cancl_order': 'cancl_order',
            'click .sale_ordr': 'sale_ordr',
            'change #time_range_values': function(e) {
                e.stopPropagation();
                var $target = $(e.target);
                var value = $target.val();
                if (value=="this_year"){
                    this.onclick_this_year($target.val());
                }else if (value=="this_month"){
                    this.onclick_this_month($target.val());
                }else if (value=="this_week"){
                    this.onclick_this_week($target.val());
                }else if (value=="one_day"){
                    this.onclick_24_hours($target.val());
                }
            },
        },

        init: function (parent, context) {
            this._super(parent, context);
            this.dashboards_templates = ['Time', 'DashboardOrder'];
            this.login_employee = [];
        },

        willStart: function(){
            var self = this;
            this.login_employee = {};
            return this._super()
            .then(function() {
                var def0 = self._rpc({
                    model: "sale.order",
                    method: "get_top_deals",
                })
                .then(function (res) {
                    self.top_deals = res['deals'];
                });
                return $.when(def0)
            });
        },

        onclick_this_year: function (ev) {
            var self = this;
            rpc.query({
                model: 'sale.order',
                method: 'get_year_details',
                args: [],
            })
            .then(function (result) {
                $('#quotations_this_month').hide(); $('#cancelled_this_month').hide();
                $('#ordered_this_month').hide(); $('#customer_this_month').hide();

                $('#quotations_this_week').hide(); $('#cancelled_this_week').hide();
                $('#ordered_this_week').hide(); $('#customer_this_week').hide();

                $('#quotations_one_day').hide(); $('#cancelled_one_day').hide();
                $('#ordered_one_day').hide(); $('#customer_one_day').hide();

                $('#quotations_this_year').show(); $('#cancelled_this_year').show();
                $('#ordered_this_year').show(); $('#customer_this_year').show();

                $('#quotations_this_year').empty(); $('#cancelled_this_year').empty();
                $('#ordered_this_year').empty(); $('#customer_this_year').empty();

                $('#quotations_this_year').append('<span>' + result.quotation_value + '</span>');
                $('#cancelled_this_year').append('<span>' + result.cancelled_value + '</span>');
                $('#ordered_this_year').append('<span>' + result.ordered_value + '</span>');
                $('#customer_this_year').append('<span>' + result.customer_value + '</span>');

            })
        },

        onclick_this_month: function (ev) {
            var self = this;
            rpc.query({
                model: 'sale.order',
                method: 'get_month_details',
                args: [],
            })
            .then(function (result) {
                $('#quotations_this_year').hide(); $('#cancelled_this_year').hide();
                $('#ordered_this_year').hide(); $('#customer_this_year').hide();

                $('#quotations_this_week').hide(); $('#cancelled_this_week').hide();
                $('#ordered_this_week').hide(); $('#customer_this_week').hide();

                $('#quotations_one_day').hide(); $('#cancelled_one_day').hide();
                $('#ordered_one_day').hide(); $('#customer_one_day').hide();

                $('#quotations_this_month').show(); $('#cancelled_this_month').show();
                $('#ordered_this_month').show(); $('#customer_this_month').show();

                $('#quotations_this_month').empty(); $('#cancelled_this_month').empty();
                $('#ordered_this_month').empty(); $('#customer_this_month').empty();

                $('#quotations_this_month').append('<span>' + result.quotation_value + '</span>');
                $('#cancelled_this_month').append('<span>' + result.cancelled_value + '</span>');
                $('#ordered_this_month').append('<span>' + result.ordered_value + '</span>');
                $('#customer_this_month').append('<span>' + result.customer_value + '</span>');

            })
        },

        onclick_this_week: function (ev) {
            var self = this;
            rpc.query({
                model: 'sale.order',
                method: 'get_week_details',
                args: [],
            })
            .then(function (result) {
                $('#quotations_this_year').hide(); $('#cancelled_this_year').hide();
                $('#ordered_this_year').hide(); $('#customer_this_year').hide();

                $('#quotations_one_day').hide(); $('#cancelled_one_day').hide();
                $('#ordered_one_day').hide(); $('#customer_one_day').hide();

                $('#quotations_this_month').hide(); $('#cancelled_this_month').hide();
                $('#ordered_this_month').hide(); $('#customer_this_month').hide();

                $('#quotations_this_week').show(); $('#cancelled_this_week').show();
                $('#ordered_this_week').show(); $('#customer_this_week').show();

                $('#quotations_this_week').empty(); $('#cancelled_this_week').empty();
                $('#ordered_this_week').empty(); $('#customer_this_week').empty();

                $('#quotations_this_week').append('<span>' + result.quotation_value + '</span>');
                $('#cancelled_this_week').append('<span>' + result.cancelled_value + '</span>');
                $('#ordered_this_week').append('<span>' + result.ordered_value + '</span>');
                $('#customer_this_week').append('<span>' + result.customer_value + '</span>');

            })
        },

        onclick_24_hours: function (ev) {
            var self = this;
            rpc.query({
                model: 'sale.order',
                method: 'get_day_details',
                args: [],
            })
            .then(function (result) {
                $('#quotations_this_year').hide(); $('#cancelled_this_year').hide();
                $('#ordered_this_year').hide(); $('#customer_this_year').hide();

                $('#quotations_this_week').hide(); $('#cancelled_this_week').hide();
                $('#ordered_this_week').hide(); $('#customer_this_week').hide();

                $('#quotations_this_month').hide(); $('#cancelled_this_month').hide();
                $('#ordered_this_month').hide(); $('#customer_this_month').hide();

                $('#quotations_one_day').show(); $('#cancelled_one_day').show();
                $('#ordered_one_day').show(); $('#customer_one_day').show();

                $('#quotations_one_day').empty(); $('#cancelled_one_day').empty();
                $('#ordered_one_day').empty(); $('#customer_one_day').empty();

                $('#quotations_one_day').append('<span>' + result.quotation_value + '</span>');
                $('#cancelled_one_day').append('<span>' + result.cancelled_value + '</span>');
                $('#ordered_one_day').append('<span>' + result.ordered_value + '</span>');
                $('#customer_one_day').append('<span>' + result.customer_value + '</span>');

            })
        },

        renderElement: function (ev) {
            var self = this;
            $.when(this._super())
            .then(function (ev) {
                rpc.query({
                    model: "sale.order",
                    method: "get_week_details",
                    
                    args: [],
                })
                .then(function (result) {
                    $('#quotations_this_week').append('<span>' + result.quotation_value + '</span>');
                    $('#cancelled_this_week').append('<span>' + result.cancelled_value + '</span>');
                    $('#ordered_this_week').append('<span>' + result.ordered_value + '</span>');
                    $('#customer_this_week').append('<span>' + result.customer_value + '</span>');
                })
            });
        },


        //Quotaion
        total_quotation: function(e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Total Quotations"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form,calendar',
                views: [[false, 'list'],[false, 'form']],
                domain: [['state', '=', 'draft']],
                target: 'current',
            }, options)
        },

        //Cancelled Orders
        cancl_order: function(e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Cancelled Orders"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form,calendar',
                views: [[false, 'list'],[false, 'form']],
                domain: [['state', '=', 'cancel']],
                target: 'current',
            }, options)
        },

        //Ordered Sales
        sale_ordr: function(e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Sale Orders"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form,calendar',
                views: [[false, 'list'],[false, 'form']],
                domain: [['state', '=', 'sale']],
                target: 'current',
            }, options)
        },

        start: function () {
            var self = this;
            this.set("title", 'Dashboard');
            return this._super().then(function () {
                self.update_cp();
                self.render_dashboards();
                self.render_graphs();
            });
        },

        render_graphs: function(){
            var self = this;
            self.render_quotations_month_graph();
            self.render_total_amount_bar();
            self.render_month_amount_graph();
            self.render_quotations_status_graph();
            self.render_order_status_graph();
            self.render_invoice_status_graph();
        },


        render_month_amount_graph:function(){
            var self = this
            var ctx = self.$(".prdct_qntty_pr_mnth");
            rpc.query({
                model: "sale.order",
                method: "get_month_qntty_bar",
            }).then(function (arrays) {
                var data = {
                    labels : arrays[1],
                    datasets: [{
                        label: "",
                        data: arrays[0],
                        backgroundColor:[
                            "#09422E", "#6B238F", "#23628F", "#8F6A23", "#8F2323",
                            "#B9EDE0", "#DCB9ED", "#E7E9B9", "#B9D7ED", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23", 
                            "#BFFF00", "#6B238F", "#8F6A23", "#23628F", "#8F2323",
                            "#B9EDE0", "#DCB9ED", "#E7E9B9", "#B9D7ED", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderColor: [
                            "#09422E", "#6B238F", "#23628F", "#8F6A23", "#8F2323",
                            "#B9EDE0", "#DCB9ED", "#E7E9B9", "#B9D7ED", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",  
                            "#BFFF00", "#6B238F", "#8F6A23", "#23628F", "#8F2323",
                            "#B9EDE0", "#DCB9ED", "#E7E9B9", "#B9D7ED", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",  
                        ],
                        borderWidth: 1
                    },]
                };
                //options
                var options = {
                    responsive: true,
                    title: false,
                    legend: {
                        display: false,
                        position: "right",
                        labels: {
                            fontColor: "#333",
                            fontSize: 8
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: false,
                            },
                            ticks: {
                                min: 0,
                                display: true,
                            }
                        }]
                    }
                };

                //create Chart class object
                var chart = new Chart(ctx, {
                    type: "bar",
                    data: data,
                    options: options
                });
            });
        },


        //PRODUCT AMOUNT Horizontal BAR
        render_total_amount_bar:function(){
            var self = this
            var ctx = self.$(".amount_per_month");
            rpc.query({
                model: "sale.order",
                method: "get_amount_bar",
            }).then(function (arrays) {
                var data = {
                    labels : arrays[1],
                    datasets: [{
                        label: "",
                        data: arrays[0],
                        backgroundColor: [
                            "#09422E", "#6B238F", "#23628F", "#8F6A23", "#8F2323",
                            "#B9EDE0", "#DCB9ED", "#E7E9B9", "#B9D7ED", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderColor: [
                            "#09422E", "#6B238F", "#23628F", "#8F6A23", "#8F2323",
                            "#B9EDE0", "#DCB9ED", "#E7E9B9", "#B9D7ED", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",  
                        ],
                        borderWidth: 1
                    },]
                };
                //options
                var options = {
                    responsive: true,
                    title: false,
                    legend: {
                        display: false,
                        position: "right",
                        labels: {
                            fontColor: "#333",
                            fontSize: 10
                        }
                    },
                    layout: {
                        padding: {
                            left: 180,
                            right: 20,
                            top: 20,
                            bottom: 20
                        }
                    },

                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: true,
                            },
                            ticks: {
                                z_index: 100,
                                min: 0,
                                display: true,
                            }
                        }]
                    },
                };

                //create Chart class object
                var chart = new Chart(ctx, {
                    type: "horizontalBar",
                    data: data,
                    options: options
                });
            });
        },



        //QUOTATION PER MONTH PIE
        render_quotations_month_graph:function(){
            var self = this
            var ctx = self.$(".quotation_month");
            rpc.query({
                model: "sale.order",
                method: "get_quotation_month_pie",
            }).then(function (arrays) {
                var data = {
                    labels : arrays[1],
                    datasets: [{
                        label: "",
                        data: arrays[0],
                        backgroundColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderColor:[
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderWidth: 1
                    },]
                };
                //options
                var options = {
                    responsive: true,
                    title: false,
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            fontColor: "#333",
                            fontSize: 10
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: false,
                            },
                            ticks: {
                                min: 0,
                                display: false,
                            }
                        }]
                    }
                };

                //create Chart class object
                var chart = new Chart(ctx, {
                    type: "pie",
                    data: data,
                    options: options
                });
            });
        },
        




        // SALES STATE PIE
        render_quotations_status_graph:function(){
            var self = this
            var ctx = self.$(".quotation_status");
            rpc.query({
                model: "sale.order",
                method: "get_quotation_status",
            }).then(function (arrays) {
                var data = {
                    labels : arrays[1],
                    datasets: [{
                        label: "",
                        data: arrays[0],
                        backgroundColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191",
                            "#d45087", "#ff7c43", "#ffa600", "#a05195",
                            "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderWidth: 1
                    },]
                };
                //options
                var options = {
                    responsive: true,
                    title: false,
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            fontColor: "#333",
                            fontSize: 10
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: false,
                            },
                            ticks: {
                                min: 0,
                                display: false,
                            }
                        }]
                    }
                };

                //create Chart class object
                var chart = new Chart(ctx, {
                    type: "pie",
                    data: data,
                    options: options
                });
            });
        },




        // INVOICE STATE PIE
        render_order_status_graph:function(){
            var self = this
            var ctx = self.$(".sale_order_status");
            rpc.query({
                model: "sale.order",
                method: "get_order_status",
            }).then(function (arrays) {
                var data = {
                    labels : arrays[1],
                    datasets: [{
                        label: "",
                        data: arrays[0],
                        backgroundColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],

                        borderColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderWidth: 1
                    },]
                };
                //options
                var options = {
                    responsive: true,
                    title: false,
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            fontColor: "#333",
                            fontSize: 8
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: false,
                            },
                            ticks: {
                                min: 0,
                                display: false,
                            }
                        }]
                    }
                };

                //create Chart class object
                var chart = new Chart(ctx, {
                    type: "pie",
                    data: data,
                    options: options
                });
            });
        },



        // INVOICE STATE PIE
        render_invoice_status_graph:function(){
            var self = this
            var ctx = self.$(".invoice_status");
            rpc.query({
                model: "sale.order",
                method: "get_invoice_status",
            }).then(function (arrays) {
                var data = {
                    labels : arrays[1],
                    datasets: [{
                        label: "",
                        data: arrays[0],
                        backgroundColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],

                        borderColor: [
                            "#003f5c", "#2f4b7c", "#f95d6a", "#665191", "#d45087",
                            "#ff7c43", "#ffa600", "#a05195", "#6d5c16", "#EDB9B9",
                            "#6AFF00", "#FFD400", "#FF00AA", "#0095FF", "#BFFF00",
                            "#FF7F00", "#AA00FF", "#00EAFF", "#FFFF00", "#4F8F23",   
                        ],
                        borderWidth: 1
                    },]
                };
                //options
                var options = {
                    responsive: true,
                    title: false,
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            fontColor: "#333",
                            fontSize: 10
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                                display: false,
                            },
                            ticks: {
                                min: 0,
                                display: false,
                            }
                        }]
                    }
                };

                //create Chart class object
                var chart = new Chart(ctx, {
                    type: "pie",
                    data: data,
                    options: options
                });
            });
        },




        fetch_data: function() {
            var self = this;
            var def0 = self._rpc({
                model: "sale.order",
                method: "get_top_deals",
            })
            .then(function (res) {
                self.top_deals = res['deals'];
            });
            return $.when(def0);
        },

        render_dashboards: function() {
            var self = this;
                _.each(this.dashboards_templates, function(template) {
                    self.$('.o_hr_dashboard').append(QWeb.render(template, {widget: self}));
                });
        },

        on_reverse_breadcrumb: function() {
            var self = this;
            web_client.do_push_state({});
            this.update_cp();
            this.fetch_data().then(function() {
                self.$('.o_hr_dashboard').reload();
                self.render_dashboards();
            });
        },

        update_cp: function() {
            var self = this;
        },
    });
    core.action_registry.add('custom_dashboard_tag', posDashBoard);
    return posDashBoard;

});