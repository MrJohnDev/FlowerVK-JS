import React, { Component, createElement } from 'react';
import connect from '@vkontakte/vk-connect';

import { ConfigProvider, Root, View, Panel } from '@vkontakte/vkui';

import MainView from './Views/MainView'
import MessagesStats from './Views/MessagesStats'
import Welcome from './Views/Welcome'

export default class App extends Component {

	Views = [MainView, MessagesStats, Welcome];

	state = {
		activeView: null,
		activePanels: []
	}

	constructor() {
		super();

		this.state.activeView = "Welcome";

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
							let view = new v({
								view: (e) => { this.setState({ activeView: e }) },
								panel: (e) => {
									this.setState({
										activePanels: {
											[view.constructor.name]: e
										}
									})
								},
								user: this.user

							});

							return createElement(
								View,
								{ id: view.constructor.name, activePanel: `${view.constructor.name}_` + (this.state.activePanels[view.constructor.name] ?? "Main") },

								view.panels.map((p) => {
									this.state.activePanels[p.name] = "Main";

									return createElement(
										Panel,
										{ id: `${view.constructor.name}_${p.name}` },
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

