// window.onload = function () {
//     var link = document.createElement('link');
//     link.src = '/css/simplemde.min.css';
//     link.stylesheet = 'text/css';
//     var head = document.getElementsByTagName('head')[0];
//     head.appendChild(link);
//     link.onload = function () {
//         simplemdeJS();
//     }
// };

~function simplemdeJS() {
    var simplemde = new SimpleMDE({
        autofocus: true,
        autosave: {
            enabled: true,
            uniqueId: "MyUniqueID",
            delay: 1000,
        },
        element: document.getElementById("myTextArea"),
        forceSync: true,
        hideIcons: ["guide", "heading"],
        indentWithTabs: false,
        initialValue: "",
        insertTexts: {
            horizontalRule: ["", "\n\n-----\n\n"],
            image: ["![](http://", ")"],
            link: ["[", "](http://)"],
            table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
        },
        lineWrapping: true,
        parsingConfig: {
            allowAtxHeaderWithoutSpace: true,
            strikethrough: false,
            underscoresBreakWords: true,
        },
        placeholder: "尽情的码字吧，享受码字的乐趣。",
        promptURLs: true,
        renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true,
        },
        shortcuts: {
            drawTable: "Cmd-Alt-T"
        },
        showIcons: ["code", "table"],
        spellChecker: false,
        status: ["autosave", "lines", "words", "cursor", {
            className: "keystrokes",
            defaultValue: function (el) {
                this.keystrokes = 0;
                el.innerHTML = "0 Keystrokes";
            },
            onUpdate: function (el) {
                el.innerHTML = ++this.keystrokes + " Keystrokes";
            }
        }],
        styleSelectedText: false,
        tabSize: 4
    });
}();

