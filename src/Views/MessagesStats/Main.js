import React, { Component } from 'react';

//import connect from '@vkontakte/vk-connect';

import { PanelHeader, Group, Cell, List, Button } from '@vkontakte/vkui';

export default class Main extends Component {
    render() {
        return (
            <div>
                <PanelHeader>
                    FlowerVK 2
                </PanelHeader>
                <Button onClick={() => this.props.changePanel("TwoStep")}>
                    Lol
                </Button>
            </div>
        )
    }
}