const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')

const config = require('./config');
const actions = require('./actions')
const feedbacks = require('./feedbacks')
const variables = require('./variables')
const presets = require('./presets')
const choices = require('./choices')

const utils = require('./utils');
const events = require('./serverEvents')
const nexa = require('./nexa')

class ModuleInstance extends InstanceBase {

	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...variables,
			...actions,
			...presets,
			...feedbacks,
			...utils,
			...events,
			...nexa,
		})
	}

	async init(config) {
		this.config = config

		this.initVariables()

		await this.configUpdated(config)
	}

	// When module gets deleted 
	async destroy() {
		this.updateStatus(InstanceStatus.Disconnected, 'Disabled')
		this.log('debug', 'Destroyed')
	}

	async configUpdated(config) {
		this.config = config
		await this.init_nexa(this)
	}

}

runEntrypoint(ModuleInstance, UpgradeScripts)
