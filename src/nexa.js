const { InstanceStatus } = require('@companion-module/base')
const axios = require('axios')
const choices = require('./choices')

module.exports = {

	init_nexa: async function (self) {
		self.outputs = []
		self.inputs = []
		self.clips = []
		self.playlists = []

		if (self.config.serviceUrl && self.config.serverId)
		{
			self.updateStatus(InstanceStatus.Connecting)

			let serviceUrl = self.config.serviceUrl
			let serverId = self.config.serverId

			try {
				self.log('info', `connecting to nexa landingPage on uri: ${serviceUrl}`);

				var request = serviceUrl
				self.log("debug", `Request ${request}`)
				var response = await axios.get(`${serviceUrl}`)
				{
					var dataUri = self.getUriFromLinkHeader(response, "collection")
					self.log("debug", `uri to servers ${dataUri}`)
				};
	
				request = `${dataUri}/${serverId}`
				self.log("debug", `Request ${request}`)
				var response = await axios.get(request)
				{
					self.setVariableValues({
						'id': response.data.id,
						'name': response.data.name,
						'title': response.data.title,
						'description': response.data.description,
						'manufacturer': response.data.manufacturer,
						'model': response.data.model,
						'softwareVersion': response.data.softwareVersion,
						'hardwareVersion': response.data.hardwareVersion,
						'serial': response.data.serial,
						'host': response.data.host,
						'protocol': response.data.protocol,
						'uptime': response.data.uptime,
						'clipCount': response.data.clipCount,
						'playlistCount': response.data.playlistCount,
						'outputCount': response.data.outputCount,
						'inputCount': response.data.inputCount,
					})

					var clipsUri   = self.getUriFromLinkHeader(response, "clips")
					var playlistsUri   = self.getUriFromLinkHeader(response, "playlists")
					var outputsUri = self.getUriFromLinkHeader(response, "outputs")
					var inputsUri = self.getUriFromLinkHeader(response, "inputs")
	
					self.log("debug", `uri to clips ${clipsUri}`)
					self.log("debug", `uri to playlists ${playlistsUri}`)
					self.log("debug", `uri to outputs ${outputsUri}`)
					self.log("debug", `uri to inputs ${inputsUri}`)

					var eventsUri = self.getUriFromLinkHeader(response, "events")
					self.log("debug", `uri to events ${eventsUri}`)
				}
	
				if (eventsUri)
				{
					self.log("debug", `Request ${request}`)
					var response = await axios.get(eventsUri)
					{
						var subscribeUri = self.getUriFromEvents(response.data.events, "ws")
						self.log("debug", `uri to subscribe ${subscribeUri}`)

						self.initEvents(subscribeUri)
					} 
				}

				if (outputsUri)
				{
					request = `${outputsUri}?f=json&properties=id,name`
					self.log("debug", `Request ${request}`)
					response = await axios.get(request)
					self.outputs = response.data.outputs
	
					// Add status field per output
					for (const output of self.outputs)
						output.status = ''

					for (const output of self.outputs)
						choices.outputChoices.push({ id: output.id, label: output.id })
					
					for (const output of self.outputs)
						self.log("info", `${serverId} Outputs ${output.id}`)

					if (self.outputs.length == 0)
						self.log("info", `${serverId} No Outputs`)
				}

				if (inputsUri) 
				{
					request = `${inputsUri}?f=json&properties=id,name`
					self.log("debug", `Request ${request}`)
					response = await axios.get(request)
					self.inputs = response.data.inputs
	
					for (const input of self.inputs)
						input.status = ''

					for (const input of self.inputs)
						choices.inputChoices.push({ id: input.id, label: input.id})

					for (const input of self.inputs)
						self.log("info", `${serverId} Inputs ${input.id}`)

					if (self.inputs.length == 0)
						self.log("info", `${serverId} No Inputs`)
				}

				if (clipsUri)
				{
					request = `${clipsUri}?f=json&properties=id,name`
					self.log("debug", `Request ${request}`)
					response = await axios.get(request)
					self.clips = response.data.clips

					for (const clip of self.clips)
						choices.clipChoices.push({ id: clip.id, label: clip.id})

					for (const clip of self.clips)
						self.log("info", `${serverId} Clips ${clip.id}`)

					if (self.clips.length == 0)
						self.log("info", `${serverId} No Clips`)
				}

				if (playlistsUri)
				{
					request = `${playlistsUri}?f=json&properties=id,name`
					self.log("debug", `Request ${request}`)
					response = await axios.get(request)
					self.playlists = response.data.playlists

					self.log("warning", `${self.playlists.length}`)

					for (const playlist of self.playlists)
						choices.playlistChoices.push({ id: playlist.id, label: playlist.id})

					for (const playlist of self.playlists)
						self.log("info", `${serverId} Playlists ${playlist.id}`)

					if (self.playlists.length == 0)
						self.log("info", `${serverId} No Playlists`)
				}

				self.setActionDefinitions(self.initActions(this))
				self.setFeedbackDefinitions(self.initFeedbacks(this))
				self.initPresets()

				self.updateStatus(InstanceStatus.Ok)
			}
			catch (error)
			{
				//self.log("error", `${err}`)
	
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx			
					self.log("error", ` Error: ${error.response.status} Detail: ${error.response.data.detail}`) // detail, status, title
					self.updateStatus(InstanceStatus.BadConfig)
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					self.log("error", error.request)
					self.updateStatus(InstanceStatus.ConnectionFailure)
				} else {
					// Something happened in setting up the request that triggered an Error
					self.log("error", `Error ${error.message}`)
					self.updateStatus(InstanceStatus.ConnectionFailure)
				}
			  
			}
		}
		else
			self.updateStatus(InstanceStatus.BadConfig)
    }
}