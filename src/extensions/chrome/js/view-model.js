(function(app) {
    'use strict';

    function ViewModel() {
        var vm = this;

        vm.init = function() {
            app.sourceView = new app.sourceView(vm);
            app.resultJSONView = new app.resultJSONView(vm);
            app.resultView = new app.resultView(vm);

            app.sourceView.render();
            app.resultView.render();
            app.resultJSONView.render();
        };

        vm.sourceChanged = function(source) {
            console.log(source);
        };

        vm.init();
    };
    app.viewModel = new ViewModel();
}(jsonQuery));