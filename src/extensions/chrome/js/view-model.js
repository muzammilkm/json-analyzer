
(function(jsonQ) {
    'use strict';

    function ViewModel() {
        jsonQ.rawView = new jsonQ.rawView();

        jsonQ.rawView.render();
    };
    jsonQ.viewModel = new ViewModel();
}(jsonQuery));