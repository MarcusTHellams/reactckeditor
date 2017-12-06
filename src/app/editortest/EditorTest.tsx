import React, {Component} from 'react';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = withToggle(({children, on}) => {
    return on
        ? <span>{children}</span>
        : null;
})

const ToggleOff = withToggle(({children, on}) => {
    return on
        ? null
        : <span>{children}</span>;
})

const ToggleButton = withToggle(({on, toggle, ...props}) => {
    console.log(props);
    return (<Toggle toggled={on} onToggle={toggle} {...props}/>);
})


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

const YourToggle = withToggle(({on, toggle}) => {
    return (
        <button onClick={toggle}>
            {on
                ? 'On'
                : 'Off'}
        </button>
    );
})

function withToggle(Component) {
    function Wrapper(props, context) {
        const toggleContext = context[TOGGLE_CONTEXT];
        return (
            <div>
                <Component {...toggleContext} {...props}/>
            </div>
        );
    }

    Wrapper['contextTypes'] = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired
    };

    return Wrapper;
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
                                <MyToggle.Button name="Marcus"/>
                                <YourToggle/>
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