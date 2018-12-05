(function(document, app, JSONEditor) {
    'use strict';

    function View() {
        var editor,
            session;
        this.render = function() {

            var container = document.getElementById("json-result-editor");
            var options = {mode: 'code', indentation: 4, mainMenuBar: false, statusBar: false};
            editor = new JSONEditor(container, options);
            editor.aceEditor.setReadOnly(true);
        };

        this.destory = function() {
            editor.destroy();
            editor.container.remove();
        };
    };
    app.resultJSONView = View;
}(window.document, jsonQuery, JSONEditor));