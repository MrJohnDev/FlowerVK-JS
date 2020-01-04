import React, { Component } from 'react';

//import connect from '@vkontakte/vk-connect';

import { PanelHeader, Group, Cell, List } from '@vkontakte/vkui';

export default class Main extends Component {
    render() {
        return (
            <div>
                <PanelHeader>
                    FlowerVK
                </PanelHeader>
                <Group>
                    <List>
                        <Cell expandable onClick={() => this.props.changeView("MessagesStats")}>Статистика диалога</Cell>
                    </List>
                </Group>
            </div>
        )
    }
}