CKEDITOR
    .plugins
    .add('simplebox', {
        requires: 'widget',
        icons: 'simplebox',
        init: function (editor) {
            editor
                .widgets
                .add('simplebox', {
                    button: 'Create a simple box',
                    template: `<div class="simplebox">
                <h2 class="simplebox-title">Title</h2>
                <div class="simplebox-content"><p>Content...</p></div>
            </div>`,
                    editables: {
                        title: {
                            selector: '.simplebox-title'
                        },
                        content: {
                            selector: '.simplebox-content'
                        }
                    },
                    upcast: function (element) {
                        return element.name == 'div' && element.hasClass('simplebox');
                    },
                    dialog: 'simplebox',
                    init: function(){
                        console.log(this.element, 'mmmmmmmmmm');
                    },
                    data: function(arguments){
                        console.log(this.element,'I have data!!!!!!!!!');
                        if(this.data.width === ''){
                            this.element.removeClass('col-6');
                        } else {
                            this.element.addClass('col-6');
                        }
                    }
                    //Widget code
                });

            CKEDITOR
                .dialog
                .add('simplebox', `${this.path}dialogs/simplebox.js`);
            }
    });