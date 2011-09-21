// This is the VoIP Services base application
winkstart.module('voip', 'voip', {
        css: {
            voip: 'voip.css'
        },

        templates: {
            voip: 'voip.html'
        },

        subscribe: {
            'voip.activate' : 'activate',
            'voip.initialized' : 'initialized',
            'voip.module_activate': 'module_activate'
        }
    },
    /* The code in this initialization function is required for
     * loading routine.
     */
    function() {
        var THIS = this;

        if('modules' in winkstart.apps[THIS.__module]) {
            if('whitelist' in winkstart.apps[THIS.__module].modules) {
                THIS.modules = {};

                $.each(winkstart.apps[THIS.__module].modules.whitelist, function(k, v) {
                    THIS.modules[v] = false;
                });
            }

            if('blacklist' in winkstart.apps[THIS.__module].modules) {
                $.each(winkstart.apps[THIS.__module].modules.blacklist, function(k, v) {
                    if(v in THIS.modules) {
                        delete THIS.modules[v];
                    }
                });
            }
        }

        THIS.uninitialized_count = THIS._count(THIS.modules);

        winkstart.publish ('auth.shared_auth', {
            app_name: THIS.__module,
            callback: function() {
                winkstart.publish('appnav.add', { 'name' : THIS.__module });
            }
        });
    },
    {
        /* A modules object is required for the loading routine.
         * The format is as follows:
         * <module name>: <initialization status> 
         */
        modules: {
            'account': false, 
            'media': false, 
            'device': false, 
            'callflow': false, 
            'conference': false, 
            'user': false, 
            'vmbox': false, 
            'menu': false, 
            'registration': false, 
            'resource': false, 
            'timeofday': false
        },

        /* The following code is generic and should be abstracted.
         * For the time being, you can just copy and paste this
         * into other whapps.
         *
         * BEGIN COPY AND PASTE CODE
         */
        is_initialized: false,

        uninitialized_count: 1337,

        initialized: function() {
            var THIS = this;

            THIS.is_initialized = true;

            winkstart.publish('subnav.show', THIS.__module);

            THIS.setup_page();
        },
            
        activate: function() {
            var THIS = this;

            THIS.whapp_auth(function() {
                THIS.initialization_check();
            });
        },

        initialization_check: function() {
            var THIS = this;

            if (!THIS.is_initialized) {
                // Load the modules
                $.each(THIS.modules, function(k, v) {
                    if(!v) {
                        THIS.modules[k] = true;
                        winkstart.module.loadModule(THIS.__module, k, function() {
                            this.init(function() {
                                winkstart.log(THIS.__module + ': Initialized ' + k);

                                if(!(--THIS.uninitialized_count)) {
                                    winkstart.publish(THIS.__module + '.initialized', {});
                                }
                            });
                        });
                    }
                });
            } else {
                THIS.setup_page();
            }
            
        },

        module_activate: function(args) {
            var THIS = this;

            THIS.whapp_auth(function() {
                winkstart.publish(args.name + '.activate');
            });
        },

        whapp_auth: function(callback) {
            var THIS = this;

            if('auth_token' in winkstart.apps[THIS.__module] && !winkstart.apps[THIS.__module].auth_token) {
                winkstart.publish('auth.shared_auth', {
                    app_name: THIS.__module,
                    callback: (typeof callback == 'function') ? callback : undefined
                });
            }
            else {
                callback();
            }
        },

        _count: function(obj) {
            var count = 0;

            $.each(obj, function() {
                count++;
            });

            return count;
        },
        /* END COPY AND PASTE CODE
         * (Really need to figure out a better way...)
         */

        // A setup_page function is required for the copy and paste code
        setup_page: function() {
            var THIS = this; 

            $('#ws-content').empty();
            THIS.templates.voip.tmpl({}).appendTo( $('#ws-content') );
            
            $('#cur_api_url').append('You are currently using the API on: <b>'+ winkstart.apps['voip'].api_url +'</b>');

            // Link the main buttons
            $('.options #users').click(function() {
                winkstart.publish('user.activate');
            });

            $('.options #devices').click(function() {
                winkstart.publish('device.activate');
            });

            $('.options #users').click(function() {
                winkstart.publish('user.activate');
            });

            $('.options #auto_attendant').click(function() {
                winkstart.publish('menu.activate');
            });

            $('.options #ring_groups').click(function() {
                winkstart.publish('callflow.activate');
            });

            $('.options #conferences').click(function() {
                winkstart.publish('conference.activate');
            });

            $('.options #registrations').click(function() {
                winkstart.publish('registration.activate');
            });

            $('.options #stats').click(function() {
                winkstart.publish('stats.activate');
            });

            $('.options #time_of_day').click(function() {
                winkstart.publish('timeofday.activate');
            });
        }
    }
);
