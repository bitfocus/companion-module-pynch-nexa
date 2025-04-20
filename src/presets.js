const { combineRgb } = require('@companion-module/base')
const choices = require('./choices.js')

module.exports = {
	initPresets: async function () {
		let self = this;
		let presets = []

		const foregroundColor = combineRgb(255, 255, 255) // White
		const foregroundColorBlack = combineRgb(0, 0, 0) // Black
		const backgroundColorRed = combineRgb(255, 0, 0) // Red
		const backgroundColorGreen = combineRgb(0, 255, 0) // Green
		const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

		if (self.outputs.length > 0)
		{
			self.log("debug", `Making output Presets` )
	
			presets[`loadPlay`] = {
				type: 'button', // This must be 'button' for now
				category: 'Output', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: `Load & Play`, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: `Load & Play`, // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: 'load',
								options: {
									outputId : choices.outputChoices[0].id,
									clipId : choices.clipChoices[0].id,
								},
							},
							{
								// add an action on down press
								actionId: 'play',
								options: {
									outputId : choices.outputChoices[0].id,
									speed: 100
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'outputState',
						options: {
							outputId : choices.outputChoices[0].id,
							status: 'play',
						},
						style: {
							// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					},
				], 
			}

			presets[`load`] = {
				type: 'button', // This must be 'button' for now
				category: 'Output', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: `Load`, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: `Load`, // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: 'load',
								options: {
									outputId : choices.outputChoices[0].id,
									clipId : choices.clipChoices[0].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'outputState',
						options: {
							outputId : choices.outputChoices[0].id,
							status: 'play',
						},
						style: {
							// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					},
				], 
			}

			presets[`play`] = {
				type: 'button', // This must be 'button' for now
				category: 'Output', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: `Play`, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: `Play`, // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: 'play',
								options: {
									outputId : choices.outputChoices[0].id,
									speed: 100
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'outputState',
						options: {
							outputId : choices.outputChoices[0].id,
							status: 'play',
						},
						style: {
							// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					},
				], 
			},

			presets[`stop`] = {
				type: 'button', // This must be 'button' for now
				category: 'Output', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: `Stop`, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: `Stop`, // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: 'stop',
								options: {
									outputId : choices.outputChoices[0].id,
									speed: 100
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'outputState',
						options: {
							outputId : choices.outputChoices[0].id,
							status: 'stop',
						},
						style: {
							// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					},
				], 
			}
			
		}
		else
			self.log("info", `No output Presets` )

		if (self.inputs.length > 0)
		{
			presets[`record`] = {
				type: 'button', // This must be 'button' for now
				category: 'Input', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
				name: `Record`, // A name for the preset. Shown to the user when they hover over it
				style: {
					// This is the minimal set of style properties you must define
					text: `Record`, // You can use variables from your module here
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								// add an action on down press
								actionId: 'record',
								options: {
									inputId : choices.inputChoices[0].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'inputState',
						options: {
							inputId : choices.inputChoices[0].id,
							status: 'record',
						},
						style: {
							// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(255, 0, 0),
						},
					},
				], 
			}
		}
		else
			self.log("info", `No input Presets` )
				
		self.setPresetDefinitions(presets);
	}
}	