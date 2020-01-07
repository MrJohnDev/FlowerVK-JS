import React, { Component, createElement } from 'react';
import connect from '@vkontakte/vk-connect';

import { ConfigProvider, Root, View, Panel, platform } from '@vkontakte/vkui';
import { OS } from '@vkontakte/vkui/dist/lib/platform';

import MainView from './Views/MainView'
import MessagesStats from './Views/MessagesStats'
import Auth from './Views/Auth'
import Loading from './Views/Loading'

export default class App extends Component {

	Views = [MainView, MessagesStats, Auth, Loading];

	v = 5.103;

	state = {
		token: null,

		activeView: "Loading",
		activePanels: []
	}

	constructor() {
		super();
		this.getMainView();
	}

	async checkToken() {
		const storage = await connect.sendPromise("VKWebAppStorageGet", { keys: ['token'] });

		if (!storage || !storage.keys) return false;

		this.setState({token: storage.keys[0].value})

		const rawResponse = await fetch('https://swiftof.ru/checkToken.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				platform: platform === OS.IOS ? "IPHONE" : (platform === OS.ANDROID ? "ANDROID" : null),
				token: this.state.token
            })
        });
        const content = await rawResponse.json();

        if (content.response && content.response.success) 
			return true
			
		return false	
	}

	async getMainView() {
		let activeView = "Auth"

		const ver = await connect.sendPromise("VKWebAppGetClientVersion", {}).catch(e=>console.error(e));

		if (ver && await this.checkToken())
			activeView = "MainView";

		this.setState({ activeView })
	}

	render() {

		return (
			<ConfigProvider isWebView={true}>
				<Root activeView={this.state.activeView}>
					{
						this.Views.map((v, i) => {
							let view = new v({
								view: (e) => { this.setState({ activeView: e }) },
								panel: (e) => {
									this.setState({
										activePanels: {
											[view.constructor.name]: e
										}
									})
								},
								token: this.state.token

							});

							return createElement(
								View,
								{ key: i, id: view.constructor.name, activePanel: `${view.constructor.name}_` + (this.state.activePanels[view.constructor.name] ?? "Main") },

								view.panels.map((p, i) => {
									return createElement(
										Panel,
										{ key: i, id: `${view.constructor.name}_${p.name}` },
										view[p.name]
									)
								})


							)
						})
					}
				</Root>
			</ConfigProvider>
		);

	}


}

