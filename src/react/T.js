import React, {createElement} from 'react'

export default class T extends React.Component {
    static propTypes = {
        t: React.PropTypes.func
    }

    static defaultProps = {
        t(message) {
            return [message]
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
