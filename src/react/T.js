import React, {PropTypes, createElement} from 'react'
const {func} = PropTypes

function pass(message) {
    return [message]
}

export default class T extends React.Component {
    _t: func = null

    static propTypes = {
        t: func
    }

    static contextTypes = {
        t: func
    }

    constructor(props, context) {
        super(props, context)
        this._t = props.t || context.t || pass
    }

    render() {
        const {children, message, tagName, ...params} = this.props
        const parts = this._t(message || children, params)
        const p = Array.isArray(parts) ? parts : [parts]

        return createElement(tagName || 'span', null, ...p)
    }
}
