import React, {Component} from 'react';

export default class EditorTest extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // window['CKEDITOR'].inline('editor1');
        console.log(window['CKEDITOR'].config);

        window['CKEDITOR'].on('instanceCreated', function (e) {
            console.log(e);
            let editor = e.editor;
            let element = editor.element;

            editor.on('configLoaded', function () {
                editor.config.toolbarGroups = [
                    {
                        name: 'document',
                        groups: ['mode', 'document', 'doctools']
                    }, {
                        name: 'clipboard',
                        groups: ['clipboard', 'undo']
                    }, {
                        name: 'editing',
                        groups: ['find', 'selection', 'spellchecker', 'editing']
                    }, {
                        name: 'forms',
                        groups: ['forms']
                    }, {
                        name: 'basicstyles',
                        groups: ['basicstyles', 'cleanup']
                    }, {
                        name: 'paragraph',
                        groups: [
                            'list',
                            'indent',
                            'blocks',
                            'align',
                            'bidi',
                            'paragraph'
                        ]
                    }, {
                        name: 'links',
                        groups: ['links']
                    }, {
                        name: 'insert',
                        groups: ['insert']
                    }, {
                        name: 'styles',
                        groups: ['styles']
                    }, {
                        name: 'colors',
                        groups: ['colors']
                    }, {
                        name: 'tools',
                        groups: ['tools']
                    }, {
                        name: 'others',
                        groups: ['others']
                    }, {
                        name: 'about',
                        groups: ['about']
                    }
                ]

                editor.config.removeButtons = 'Source,Save,NewPage,Print,Templates,Form,Checkbox,Radio,TextField,Textarea,Selec' +
                        't,Button,ImageButton,HiddenField,Language,BidiRtl,BidiLtr,Flash,Smiley,PageBreak' +
                        ',Iframe';

            });
        });
    }
    componentWillUpdate() {
        return false;
    }
    render() {
        return (
            <div>
                <div id="editor1" contentEditable="true">
                    <p>
                        Text Goes Here
                    </p>
                </div>
                <div id="editor2" contentEditable="true">
                    <p>
                        Text 2 Goes Here
                    </p>
                </div>
            </div>
        )
    }
};