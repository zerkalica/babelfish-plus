babelfish-plus
==============

[Babelfish](https://github.com/nodeca/babelfish) react helpers. Can be used for rendering props as react widgets. All babelfish power accessible from helper. Returns array of translated strings and functions:

```js
t(message: string, params: ?Map<string, string|object|func>): Array<string|object|func>|string

t('Translated') // 'Translated'
t('Translated #{str}', {str: 'test'}) // 'Translated test'
t('Translated #{str} #{func} #{obj} #{arr}', {
    t: 'test',
    func: p => p,
    obj: {a: 1},
    arr: [1, 2, 3]
}) // ['Translated test', func, {a: 1}, [1, 2, 3]]
```

As library
----------

```js
import translator from 'babelfish-plus'

const options = {
    locale: 'ru',
    phrases: {
        user: {
            birthday: 'День рождения: #{date}'
        }
    }
}
const t = translator(options)

t('user.birthday', {date: '01.01.1970'}) // 'День рождения: 01.01.1970'
t('user.birthday', {date: p => new Date(p)}) // ['День рождения: ', Func]
t('not.existing.path') // 'not.existing.path'
```

React component
---------------

```js
import React, {PropTypes} from 'react'
import translator from 'babelfish-plus'
import T from 'babelfish-plus/react/T'
const {func, string} = PropTypes

class Date extends React.Component {
    static propTypes = {
        date: string.isRequired
    }

    render() {
        return (
            <span className="date">{this.props.date}</span>
        )
    }
}

class UserBirthday extends React.Component {
    static propTypes = {
        date: string.isRequired
    }

    render() {
        return (
            <div>
                <T>User info</T>
                <T date={<Date value={this.props.date} />}>user.birthday</T>
            </div>
        )
    }
}

class App extends React.Component {
    static propTypes = {
        t: func.isRequired,
        birthday: string.isRequired
    }

    static childContextTypes = {
        t: func
    }

    getChildContext() {
        return {
            t: this.props.t
        }
    }

    render() {
        return (
            <UserBirthday date={this.props.birthday} />
        )
    }
}

const options = {
    locale: 'ru',
    phrases: {
        'User info': 'О пользователе',
        user: {
            birthday: 'День рождения: #{date}'
        }
    }
}
const t = translator(options)

React.render(<App t={t} birthday="01.01.1970" />, document.geteElementById('root'))
```
