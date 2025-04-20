const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {

		return [
			{
				type: 'static-text',
				id: 'filler1',
				width: 12,
				label: 'Information',
				value: "This modules requires a Nexa service on the network. Nexa serves as an abtraction between this module and the EVS XT's. More info: https://pynch.tv",
			},
			{
				type: 'static-text',
				id: 'filler2',
				width: 12,
				value: "The service path is the landingpage of the Nexa service (found in the titlebar of the Nexa application). " +
				       "Example: http://192.168.0.144/v1 or with a different root (see the Nexa config)  http://192.168.0.144/car/23/v1 " +
					   " Note: url always end with the major version number (/v1) and no trailing /"
			},
			{
				type: 'textinput',
				id: 'serviceUrl',
				width: 6,
				label: 'ServiceUrl path',
			},
			{
				type: 'static-text',
				id: 'filler3',
				width: 6,
				label: '',
			},
			{
				type: 'checkbox',
				id: 'usernamePassword',
				label: 'Nexa requires credentials',
				width: 6,
				default: false,
			},
			{
				type: 'static-text',
				id: 'require-filler',
				width: 6,
				label: '',
				value: '',
			},
			{
				type: 'textinput',
				id: 'username',
				width: 6,
				label: 'Username',
				value: '',
				isVisible: (options) => options['usernamePassword'],
			},
			{
				type: 'textinput',
				id: 'password',
				width: 6,
				label: 'Password',
				value: '',
				isVisible: (options) => options['usernamePassword'],
			},
			{
				type: 'textinput',
				id: 'serverId',
				width: 6,
				label: 'AudioVideo Server identifier',
			},

		]
	},
}