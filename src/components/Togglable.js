import React from 'react'
import { Button } from 'semantic-ui-react';

class Togglable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <Button primary onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    
                    <Button negative onClick={this.toggleVisibility}>Cancel</Button>
                </div>
            </div>
        )
    }
}

export default Togglable
