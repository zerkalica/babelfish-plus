import React, {PropTypes, createElement} from 'react'
const {func} = PropTypes

function pass(message) {
    return [message]
}

export default class T extends React.Component {
    static propTypes = {
        t: func
    }

    static contextTypes = {
        t: func
    }

    getDefaultProps() {
        return {
            t: this.props.t || this.context.t || pass
        }
    }

    _t(message, params) {
        return this.props.t(message, params)
    }

    render() {
        const {children, message, tagName, ...params} = this.props
        const parts = this._t(message || children, params)
        const p = Array.isArray(parts) ? parts : [parts]

        return createElement(tagName || 'span', null, ...p)
    }
}
