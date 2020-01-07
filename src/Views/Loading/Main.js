import React, { Component } from 'react';

import { PanelSpinner, Placeholder } from '@vkontakte/vkui';

export default class Main extends Component {
    render() {
        return (
            <Placeholder stretched><PanelSpinner size="large"/></Placeholder>
        )
    }
}