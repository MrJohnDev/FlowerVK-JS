import React, { Component } from 'react';

import { Placeholder } from '@vkontakte/vkui';

import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';

export default class Error extends Component {
    render() {
        return (<Placeholder icon={<Icon56DoNotDisturbOutline />} stretched>Версия не поддерживается</Placeholder>)
    }
}