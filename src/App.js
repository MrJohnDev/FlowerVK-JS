import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect';

import { ConfigProvider, Root, View } from '@vkontakte/vkui';
import { FixedLayout, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { PromoBanner, Button, Placeholder } from '@vkontakte/vkui';

import Icon56ServicesOutline from '@vkontakte/icons/dist/56/services_outline';
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

export default class App extends Component {

	state = {
		activeView: "main",
		activePanel: "home",

		user: null,
		promoBannerProps: {
			title: 'SwiftSoft',
			domain: 'Группа разработчиков приложения',
			ctaText: 'Перейти',
			advertisingLabel: 'Реклама',
			iconLink: 'https://sun9-45.userapi.com/c857216/v857216612/347b0/4IwKHKOgK-U.jpg?ava=1',
			trackingLink: 'https://vk.com/swiftof',
		}
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
					<View id="main" activePanel="1">
						<Panel id="1">
							<Placeholder
								icon={<Icon56RecentOutline />}
								stretched>Скоро здесь будет<br /> новое мини-приложение!</Placeholder>
							<FixedLayout vertical="bottom">
								<PromoBanner onClick={() => null} bannerData={this.state.promoBannerProps} />
							</FixedLayout>
						</Panel>
					</View>
				</Root>
			</ConfigProvider>
		);

	}


}

