module.exports = {

	initVariables: async function () {
		let self = this;
		const variables = []; 

		variables.push({
			name: 'Id',
			variableId: 'id',
		});
		
		variables.push({
			name: 'Name',
			variableId: 'name',
		});
		
		variables.push({
			name: 'Title',
			variableId: 'title',
		});
		
		variables.push({
			name: 'Description',
			variableId: 'description',
		});
		
		variables.push({
			name: 'Manufacturer',
			variableId: 'manufacturer',
		});
		
		variables.push({
			name: 'Model',
			variableId: 'model',
		});
		
		variables.push({
			name: 'SoftwareVersion',
			variableId: 'softwareVersion',
		});
		
		variables.push({
			name: 'HardwareVersion',
			variableId: 'hardwareVersion',
		});
		
		variables.push({
			name: 'Serial',
			variableId: 'serial',
		});
		
		variables.push({
			name: 'Host',
			variableId: 'host',
		});
		
		variables.push({
			name: 'Protocol',
			variableId: 'protocol',
		});
		
		variables.push({
			name: 'Uptime',
			variableId: 'uptime',
		});
		
		variables.push({
			name: 'ClipCount',
			variableId: 'clipCount',
		});
		
		variables.push({
			name: 'PlaylistCount',
			variableId: 'playlistCount',
		});
		
		variables.push({
			name: 'OutputCount',
			variableId: 'outputCount',
		});
		
		variables.push({
			name: 'InputCount',
			variableId: 'inputCount',
		});

		self.setVariableDefinitions(variables)

		await self.checkVariables();
	},

	checkVariables: async function () {
		let self = this;
	}
}
