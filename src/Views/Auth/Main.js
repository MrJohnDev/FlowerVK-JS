import React, { Component } from 'react';

import connect from '@vkontakte/vk-connect';

import { FormLayoutGroup, Button, Input, FormLayout, platform, FormStatus, Placeholder } from '@vkontakte/vkui';
import { OS } from '@vkontakte/vkui/dist/lib/platform';

export default class Main extends Component {

    onChange = (e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
        // eslint-disable-next-line
    }).bind(this)

    auth = (async () => {

        if (!this.state || !this.state.username || !this.state.password) return this.setState({ error: { description: "Заполните все поля!" } });

        const rawResponse = await fetch('https://swiftof.ru/auth.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                platform: platform === OS.IOS ? "IPHONE" : (platform === OS.ANDROID ? "ANDROID" : null)
            })
        });
        const content = await rawResponse.json();

        if (content.error)
            return this.setState({ error: { description: content.error_description } })

        if (content.access_token) {
            await connect.sendPromise("VKWebAppStorageSet", { "key": "token", "value": content.access_token });
            this.props.changeView("MainView");
        }
        // eslint-disable-next-line
    }).bind(this)

    render() {
        return (
            <div>

                <Placeholder stretched>
                    <div style={{ padding: "30px" }}>
                        <h1 style={{ fontSize: "2.5em", lineHeight: 0, margin: "30px" }}>FlowerVK</h1>
                        <p style={{opacity: 0.7}}>Авторизация</p>
                    </div>
                    <FormLayout>
                        {this.state && this.state.error &&
                            <FormStatus state="error">
                                {this.state.error.description}
                            </FormStatus>}
                        <FormLayoutGroup>
                            <Input onChange={this.onChange} name="username" type="text" placeholder="Телефон или EMail" />
                            <Input onChange={this.onChange} name="password" type="password" placeholder="Пароль" />
                        </FormLayoutGroup>
                        <Button onClick={this.auth} size="xl">Войти</Button>
                    </FormLayout>
                </Placeholder>
            </div>
        )
    }
}