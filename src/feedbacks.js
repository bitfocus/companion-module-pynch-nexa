const { combineRgb } = require('@companion-module/base')
const choices = require('./choices.js')

module.exports = {

	initFeedbacks: function (self) {

		var outputChoices = []
		self.outputs.forEach(output => {
			outputChoices.push({ id: output.id, label: output.id})
		});

		const feedbacks = [];

		if (self.outputs.length > 0)
		{
			self.log("debug", `Making output Feedbacks` )

			feedbacks['outputState'] =
			{
				name: 'Output status',
				type: 'boolean',
				description: 'Set feedback based on output status',
				defaultStyle: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(0, 0, 0),
				},
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
						label: 'Status',
						id: 'status',
						choices: choices.outputStatusChoices,
						default: choices.outputStatusChoices[0].id,
					},
				],
				callback: ({options}) => {
					const output = this.outputs.find(item => item.id === options.outputId)
					self.log("debug", `---=====---- ${options.status} ${options.outputId} ${choices.outputChoices[0].id} ${output.id} ${output.status}` )
					return options.status === output.status
				},
			}
		}
		else
			self.log("info", `Feedbacks, No outputs` )

		if (self.inputs.length > 0)
		{
			self.log("debug", `Making input Feedbacks` )

			feedbacks['inputState'] =
			{
				name: 'Input status',
				type: 'boolean',
				description: 'Set feedback based on input status',
				defaultStyle: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(0, 0, 0),
				},
				options: [
					{
						type: 'dropdown',
						label: 'Input',
						id: 'inputId',
						choices: choices.inputChoices,
						default: choices.inputChoices[0].id,
					},
					{
						type: 'dropdown',
						label: 'Status',
						id: 'status',
						choices: choices.inputStatusChoices,
						default: choices.inputStatusChoices[0].id,
					},
				],
				callback: ({options}) => {
					const input = this.inputs.find(item => item.id === options.inputId)
					self.log("debug", `---=====---- ${options.status} ${options.inputId} ${choices.inputChoices[0].id} ${input.id} ${input.status}` )
					return options.status === input.status
				},
			}
		}
		else
			self.log("info", `Feedbacks, No inputs` )
		
		return feedbacks
	}
}