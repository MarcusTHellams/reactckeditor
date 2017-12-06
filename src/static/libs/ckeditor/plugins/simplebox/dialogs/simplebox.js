(function () {

    function GridContainer(grids) {
        this.el = new CKEDITOR
            .dom
            .element('div');

        for(; grids > 0; grids--){
            new ChildGrids(this.el);
        }
        console.log(this.el.getOuterHtml());
        this.el.on('mouseover', function(e){
            console.log(e);
        });

        return this;
    }

    GridContainer.prototype.getOuterHtml = function(){
        return this.el.getOuterHtml();
    };

    function ChildGrids(parent) {
        this.parent = parent;
        this.el = new CKEDITOR
            .dom
            .element('div');
        this
            .el
            .setStyle('height', '50px')
            .setStyle('width', '50px')
            .setStyle('float', 'left')
            .setStyle('background-color', 'blue');

            this.parent.append(this.el);
    }

   

    CKEDITOR
        .dialog
        .add('simplebox', function (editor) {
            const gridContainer = new GridContainer(5);
            return {
                title: 'Edit Simple Box',
                minWidth: 200,
                minHeight: 100,
                contents: [
                    {
                        id: 'info',
                        elements: [
                            //Dialog window UI elements
                            {
                                id: 'align',
                                type: 'select',
                                label: 'Align',
                                items: [
                                    [
                                        editor.lang.common.notSet, ''
                                    ],
                                    [
                                        editor.lang.common.alignLeft, 'left'
                                    ],
                                    [
                                        editor.lang.common.alignRight, 'right'
                                    ],
                                    [
                                        editor.lang.common.alignCenter, 'center'
                                    ],
                                    [
                                        '1 Column', 'col-1', {}
                                    ],
                                    ['col-2', 'col-2']
                                ],
                                setup: function (widget) {
                                    console.log(widget.data, 'alignnnnnnnnn');
                                    this.setValue(widget.data.align);
                                },
                                commit: function (widget) {
                                    widget.setData('align', this.getValue());
                                }
                            }, {
                                id: 'width',
                                type: 'text',
                                label: 'width',
                                width: '50px',
                                setup: function (widget) {
                                    this.setValue(widget.data.width);
                                },
                                commit: function (widget) {
                                    widget.setData('width', this.getValue());
                                }
                            }, {
                                id: 'grids',
                                type: 'html',
                                html:  gridContainer.getOuterHtml(),
                                setup: function (widget) {
                                    console.log(this);
                                    this.setValue(widget.data.grids);
                                },
                                commit: function (widget) {
                                    widget.setData('width', this.getValue());
                                },
                                onLoad: function (a) {
                                    // console.log(CKEDITOR.document.getById( this.domId
                                    // ).find('[data-grid-id="blue-grid"]').toArray().forEach(function(ele){
                                    // console.log(ele.siblings)}));
                                    CKEDITOR
                                        .document
                                        .getById(this.domId)
                                        .on('mouseover', function (e) {
                                            const container = e.sender;
                                            console.log(container.getChildren().toArray().forEach(function ($) {
                                                console.log($)
                                            }));
                                        }, this);
                                }
                            }

                        ]

                    }
                ]
            };
        });
})();