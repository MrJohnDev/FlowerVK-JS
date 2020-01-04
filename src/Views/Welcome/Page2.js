import React, { Component } from 'react';

//import connect from '@vkontakte/vk-connect';

import { PanelHeader, Placeholder, Button } from '@vkontakte/vkui';

export default class Page2 extends Component {
    render() {
        return (
            <div>
                <PanelHeader>
                    FlowerVK
                </PanelHeader>
                <Placeholder
                    action={<Button onClick={() => this.props.changePanel("Page3")} size="l">Далее</Button>}
                    title="Но это не всё!"
                    stretched
                >
                    В приложении есть и другие полезные функции, например, <b>очистка стены</b>
                </Placeholder>
            </div>
        )
    }
}