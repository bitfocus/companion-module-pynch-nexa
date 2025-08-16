const axios = require('axios')
const asyncLock = require('./asyncLock')
const choices = require('./choices')

module.exports = {
	  
	initActions: function (self) {
	
		const maxShuttle = 5000

		const lock = new asyncLock()

		const actions = [];
	/*
		for (var key in self.config) 
			if (self.config.hasOwnProperty(key)) 
				self.log("debug", `action Key: ${key} Value: ${self.config[key]}` )
	*/

		if (self.outputs.length > 0)
		{
			self.log("debug", `Making output Actions` )

			actions['load'] = {
				name: 'Load Clip',
				description: 'Loads a clip on an Output',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'textinput',
						label: 'Clip Id',
						id: 'clipId',
					},
				],
				callback: async (event) => {

					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId

					const outputId = event.options.outputId
					const clipId = event.options.clipId

					self.log("info", `Action Load Ur i: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Load Body: clipId ${clipId}` )

					try {
						await lock.promise
						lock.enable()

						body = { "clip" : { "id": clipId } }
						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
						self.log("info", `Load response ${response.status}` )

						lock.disable()
					}
					catch (err)
					{
						console.log(err)
					}

					self.log("info", `Action Load done` )
				},
			}
 
			actions['play'] = {
				name: 'Play',
				description: 'Play the currently loaded clip',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'number',
						label: 'Speed %',
						id: 'speed',
						default: 100,
						min: 0 - maxShuttle,
						max: maxShuttle,
						range: true,
					},
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const status = "play"
					const speed = event.options.speed
		
					self.log("info", `Action Play: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Play: Status ${status} Speed: ${speed}` )
		
					try {
						await lock.promise
						lock.enable()

						body = { "status" : status, "speed": speed }
						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
						self.log("info", `Play response ${response.status}` )

						lock.disable()
					}
					catch (err)
					{
						self.log("error", err)
					}

					self.log("info", `Action Play done` )
				},
			},
		
			actions['stop'] = {
				name: 'Stop',
				description: 'Stop the running clip',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
					}
					catch (err)
					{
						console.log(err)
					}
				},
			},

			actions['shuttle'] = {
				name: 'Shuttle',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'number',
						label: 'Speed %',
						id: 'speed',
						default: 100,
						min: -400,
						max: 400
					},
			],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
					}
					catch (err)
					{
						console.log(err)
					}
				},
			},

			actions['jog'] = {
				name: 'Jog',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'number',
						label: 'TC',
						id: 'tc',
						default: "00:00:00:01"
					},
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
					}
					catch (err)
					{
						console.log(err)
					}
				},
			},

			actions['goto'] = {
				name: 'Goto',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'number',
						label: 'TC',
						id: 'tc',
						default: "00:00:00:01"
					},
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
					}
					catch (err)
					{
						console.log(err)
					}
				},
			},

			actions['osdEnable'] = {
				name: 'OSD Enable',
				description: 'Turn on or off the OSD of the Output',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'checkbox',
						label: 'Enable',
						id: 'enable',
						default: true,
					}
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const enable = event.options.enable
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}/osd` )
		
					try {
						await lock.promise
						lock.enable()

						body = { "osd": enable }
						const response = await axios.put(`${serviceUrl}/servers/${serverId}/outputs/${outputId}/osd`, body)
						self.log("info", `Load response ${response.status}` )

						lock.disable()
					}
					catch (err)
					{
						console.log(err)
					}
				},
			}

			actions['osd'] = {
				name: 'OSD Set Line',
				description: 'Display a Line on the OSD of the Output',
				options: [
					{
						type: 'dropdown',
						label: 'Output',
						id: 'outputId',
						choices: choices.outputChoices,
						default: choices.outputChoices[0].id,
					},
					{
						type: 'number',
						label: 'LineNr',
						id: 'lineNr',
						default: 11,
						min: 0,
						max: 11
					},
					{
						type: 'textinput',
						label: 'Value',
						id: 'value',
						default: ""
					},
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId
		
					const outputId = event.options.outputId
					const lineNr = event.options.lineNr
					const value = event.options.value
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}/osd/lines/${lineNr}` )
		
					try {
						await lock.promise
						lock.enable()

						body = { "line" : value }
						const response = await axios.put(`${serviceUrl}/servers/${serverId}/outputs/${outputId}/osd/lines/${lineNr}`, body)
						self.log("info", `Load response ${response.status}` )

						lock.disable()
					}
					catch (err)
					{
						console.log(err)
					}
				},
			}
		}
		else
		self.log("info", `No output Actions` )

		if (self.inputs.length > 0)
		{
			self.log("debug", `Making input Actions` )

			var inputChoices = []
			self.inputs.forEach(input => {
				inputChoices.push({ id: input.id, label: input.id})
			});

			actions['record'] = {
				name: 'Record',
				options: [
					{
						type: 'dropdown',
						label: 'Input',
						id: 'inputId',
						choices: choices.inputChoices,
						default: choices.inputChoices[0].id,
					},
				],
				callback: async (event) => {
					const serviceUrl = self.config.serviceUrl
					const serverId = self.config.serverId

					const inputId = event.options.inputId

					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/inputs/${inputId}` )

					try {
						body = { "status" : "record" }
//						const response = await axios.patch(`${serviceUrl}/servers/${serverId}/inputs/${inputId}`, body)
					}
					catch (err)
					{
						console.log(err)
					}
				},
			}
		}
		else
			self.log("info", `No input Actions` )

		return actions
	}
}
