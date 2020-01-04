import React, { Component } from 'react';

//import connect from '@vkontakte/vk-connect';

import { PanelHeader, PanelHeaderClose, FixedLayout, Search, Placeholder } from '@vkontakte/vkui';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';

export default class Main extends Component {
    render() {
        return (
            <div>
                <PanelHeader left={<PanelHeaderClose onClick={() => this.props.changeView("MainView")} />}>
                    Выбор диалога
                </PanelHeader>
                <FixedLayout vertical="top">
                    <Search />
                </FixedLayout>
                <Placeholder
                    icon={<Icon56UsersOutline />}
                    stretched
                >
                    Здесь будут отображаться<br />Ваши диалоги
                </Placeholder>
            </div>
        )
    }
}