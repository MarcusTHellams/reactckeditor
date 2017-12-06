import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
const TOGGLE_CONTEXT = '__toggle__';

function ToggleOn({
    children
}, context) {
    const {on} = context[TOGGLE_CONTEXT];
    return on
        ? <span>{children}</span>
        : null;
}

ToggleOn['contextTypes'] = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};
function ToggleOff({
    children
}, context) {
    const {on} = context[TOGGLE_CONTEXT];
    return on
        ? null
        : <span>{children}</span>;
}

ToggleOff['contextTypes'] = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};
function ToggleButton(props, context) {
    const {on, toggle} = context[TOGGLE_CONTEXT];
    return (<Toggle toggled={on} onToggle={toggle} {...props}/>);
}
ToggleButton['contextTypes'] = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};


class MyToggle extends Component {
    static On = ToggleOn;
    static Off = ToggleOff;
    static Button = ToggleButton;
    static defaultProps = {
        onToggle: (arg) => {}
    }
    static childContextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired
    };
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
    getChildContext() {
        return {
            [TOGGLE_CONTEXT]: {
                on: this.state.on,
                toggle: this.toggle
            }
        }
    }
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const YourToggle = ({on, toggle})=>{
    return (
        <button onClick={toggle}>
            {on ? 'On': 'Off'}
        </button>
    );
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

                            <div>
                                <MyToggle.On>
                                    The button is on</MyToggle.On>
                                <MyToggle.Button/>
                                <MyToggle.Off>
                                    The button is off</MyToggle.Off>
                            </div>

                        </MyToggle>
                    </div>
                </div>
            </div>
        )
    }
};