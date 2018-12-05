(function(document, app, JSONEditor) {
    'use strict';

    function View(vm) {
        var editor,
            session;
        this.render = function() {

            var container = document.getElementById("json-source-editor");
            var options = {
                mode: 'code',
                indentation: 4,
                onChange: function() {
                    try {
                        vm.sourceChanged(editor.get());
                    } catch {}
                }
            };
            editor = new JSONEditor(container, options);
            editor.aceEditor.setReadOnly(false);

            var elem = editor.menu.getElementsByClassName("jsoneditor-poweredBy")[0]
            editor.menu.removeChild(elem);
        };

        this.destory = function() {
            editor.destroy();
            editor.container.remove();
        };
    };
    app.sourceView = View;
}(window.document, jsonQuery, JSONEditor));