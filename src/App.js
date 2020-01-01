import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect';

import { ConfigProvider, Root, View } from '@vkontakte/vkui';
import { FixedLayout, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { PromoBanner, Button, Placeholder } from '@vkontakte/vkui';

import Icon56ServicesOutline from '@vkontakte/icons/dist/56/services_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

import Icon28BugOutline from '@vkontakte/icons/dist/28/bug_outline';

export default class App extends Component {
	state = {
		activeView: "main",
		activePanel: "1",

		user: null,
		clicked: 0
	}

	async fetchData() {
		//console.log(await connect.sendPromise("VKWebAppGetAuthToken", { "app_id": 7265077, "scope": "messages" }));


		const user = await connect.sendPromise('VKWebAppGetUserInfo');
		this.setState({ user });


		/*const data = await connect.sendPromise("VKWebAppCallAPIMethod", {
			"method": "messages.getConversations", "request_id": "32test", "params": { "user_ids": "1", "v": "5.103", "access_token": "your_token" }
		});
		console.log(data);*/
	}

	render() {

		this.fetchData();

		return (
			<ConfigProvider isWebView={true}>
				<Root activeView={this.state.activeView}>
					<View id="main" activePanel={this.state.activePanel}>
						<Panel id="1">
							<div onMouseDown={() => {
								let clicked = this.state.clicked;
								++clicked < 5 || this.setState({ activePanel: "2" });
								this.setState({ clicked });
							}}>
								<Placeholder
									icon={<Icon56RecentOutline />}
									stretched>Скоро здесь будет<br /> новое мини-приложение!</Placeholder>
							</div>
						</Panel>
						<Panel id="2">
							<Placeholder
								icon={<Icon28BugOutline height={56} width={56} />}
								stretched>Режим отладки</Placeholder>
						</Panel>
					</View>
				</Root>
			</ConfigProvider>
		);

	}


}

