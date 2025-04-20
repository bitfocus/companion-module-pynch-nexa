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
						type: 'dropdown',
						label: 'Clip',
						id: 'clipId',
						choices: choices.clipChoices,
						default: choices.clipChoices[0].id,
					},
				],
				callback: async (event) => {

					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId

					var outputId = event.options.outputId
					var clipId = event.options.clipId

					self.log("info", `Action Load: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Load: clipId ${clipId}` )

					try {
						await lock.promise
						lock.enable()

						body = { "clip" : { "id": clipId } }
						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
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
					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId
		
					var outputId = event.options.outputId
					var status = "play"
					var speed = event.options.speed
		
					self.log("info", `Action Play: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Play: Status ${status} Speed: ${speed}` )
		
					try {
						await lock.promise
						lock.enable()

						body = { "status" : status, "speed": speed }
						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
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
					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId
		
					var outputId = event.options.outputId
					var status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
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
					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId
		
					var outputId = event.options.outputId
					var status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
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
					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId
		
					var outputId = event.options.outputId
					var status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
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
					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId
		
					var outputId = event.options.outputId
					var status = "stop"
		
					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/outputs/${outputId}` )
					self.log("info", `Action Status: Status ${status} ` )
		
					try {
						body = { "status" : status }
//						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/outputs/${outputId}`, body)
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
					var serviceUrl = self.config.serviceUrl
					var serverId = self.config.serverId

					var inputId = event.options.inputId

					self.log("info", `Action Status: ${serviceUrl}/servers/${serverId}/inputs/${inputId}` )

					try {
						body = { "status" : "record" }
//						var response = await axios.patch(`${serviceUrl}/servers/${serverId}/inputs/${inputId}`, body)
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
