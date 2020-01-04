import React, { Component } from 'react';

//import connect from '@vkontakte/vk-connect';

import { PanelHeader, Placeholder, Button } from '@vkontakte/vkui';
import Icon56LockOutline from '@vkontakte/icons/dist/56/lock_outline';

export default class Page3 extends Component {
    render() {
        return (
            <div>
                <PanelHeader>
                    FlowerVK
                </PanelHeader>
                <Placeholder
                    action={<Button onClick={() => this.props.changeView("MainView")} size="l">Разрешить доступ</Button>}
                    title="Доступ к сообщениям"
                    icon={<Icon56LockOutline />}
                    stretched
                >
                    К сожалению, ВК не дает напрямую получать Ваши сообщения,<br /> поэтому для его использования нужно дать доступ к диалогам.
                </Placeholder>
            </div>
        )
    }
}