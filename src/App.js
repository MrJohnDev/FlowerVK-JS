import React, { Component, createElement } from 'react';
import connect from '@vkontakte/vk-connect';

import { ConfigProvider, Root, View, Panel } from '@vkontakte/vkui';

import MainView from './Views/MainView'
import MessagesStats from './Views/MessagesStats'

export default class App extends Component {

	Views = [MainView, MessagesStats];

	state = {
		activeView: "MainView",
		activePanels: {
			MainView: "Main",
			MessagesStats: "Main"
		}
	}

	constructor() {
		super();
		this.fetchData();
	}

	async fetchData() {
		const user = await connect.sendPromise('VKWebAppGetUserInfo');
		this.setState({ user });
	}

	render() {

		return (
			<ConfigProvider isWebView={true}>
				<Root activeView={this.state.activeView}>
					{
						this.Views.map((v) => {
							let view = new v(
								(e) => { this.setState({ activeView: e }) },
								(e) => {
									//console.log([[view.constructor.name], e])
									this.setState({
										activePanels: {
											[view.constructor.name]: e
										}
									})
								}

							);

							return createElement(
								View,
								{ id: view.constructor.name, activePanel: `${view.constructor.name}_` + this.state.activePanels[view.constructor.name] },

								view.panels.map((p) => createElement(
									Panel,
									{ id: `${view.constructor.name}_${p.name}` },
									view[p.name]
								))


							)
						})
					}
				</Root>
			</ConfigProvider>
		);

	}


}

