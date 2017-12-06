import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';

function ToggleOn({on, children}) {
    return on
        ? <span>{children}</span>
        : null;
}
function ToggleOff({on, children}) {
    return on
        ? null
        : <span>{children}</span>;
}
function ToggleButton({
    on,
    toggle,
    ...props
}) {
    return (<Toggle toggled={on} onToggle={toggle} {...props}/>);
}

class MyToggle extends Component {
    static On = ToggleOn;
    static Off = ToggleOff;
    static Button = ToggleButton;
    static defaultProps = {
        onToggle: (arg) => {}
    }
    props;
    state = {
        on: false
    };
    setState;
    constructor(props) {
        super(props);
        this.toggle = this
            .toggle
            .bind(this);
    }

    toggle() {
        const {on} = this.state;
        this.setState(({on}) => ({
            on: !on
        }), () => {
            this
                .props
                .onToggle(on);
        });

    }
    render() {
        const children = React
            .Children
            .map(this.props.children, (child) => {
                return React.cloneElement(child, {
                    on: this.state.on,
                    toggle: this.toggle
                });
            });
        const {on} = this.state;
        return (
            <div>{children}</div>
        );
    }
}

export default class EditorTest extends Component {
    props;
    state = {};
    setState;
    constructor(props) {
        super(props);

    }

    componentDidMount() {}

    render() {
        return (
            <div
                className="container"
                style={{
                "paddingTop": "50px"
            }}>
                <div className="row">
                    <div className="col">
                        <MyToggle
                            onToggle={(on) => {
                            console.log(on)
                        }}>

                            <MyToggle.On>
                                The button is on</MyToggle.On>
                            <MyToggle.Button/>
                            <MyToggle.Off>
                                The button is off</MyToggle.Off>
                        </MyToggle>
                    </div>
                </div>
            </div>
        )
    }
};