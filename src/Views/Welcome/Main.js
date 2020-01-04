import React, { Component } from 'react';

//import connect from '@vkontakte/vk-connect';

import { PanelHeader, Placeholder, Button } from '@vkontakte/vkui';

export default class Main extends Component {
    render() {
        return (
            <div>
                <PanelHeader>
                    FlowerVK
                </PanelHeader>
                <Placeholder
                    action={<Button onClick={() => this.props.changePanel("Page2")} size="l">Далее</Button>}
                    title="Добро пожаловать!"
                    stretched
                >
                    <b>FlowerVK</b> - мини-приложение, <br />которое позволит Вам смотреть <b>статистику</b> Ваших диалогов
                </Placeholder>
            </div>
        )
    }
}