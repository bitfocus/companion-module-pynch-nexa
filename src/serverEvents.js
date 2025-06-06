const websocket = require('ws')
const choices = require('./choices.js')

async function initEvents (subscribeUri) 
{
    let self = this

    const ws = new websocket(subscribeUri);

    ws.onopen = function(e) {
        self.log("debug", '[open]')
    }
        
    ws.onmessage = function(event) 
    {
//        self.log("debug", `[message] ${event.data}`)

        const content = JSON.parse(event.data)
        const server = content.server

        if (Object.keys(content).length === 0)
            return // alive message

        // We only care for event for this serverId
        if (server == self.config.serverId)
        {
            const topic  = content.topic
            const action = content.action
            const data   = content.data

            if (topic === undefined || action == undefined) 
            {
                self.log("error", `received message not valid. It does not contain a topic or action` )
                return;
            }

            switch (topic.name.toLowerCase())
            {
                case "clips":
                    let needsUpdate = false;
                    switch (action.toLowerCase())
                    {
                        case 'add':
                            for (const clip of data)
                            {
                                self.log("debug", `add ======> ${clip.id}` )
                                let index = choices.clipChoices.findIndex((item) => item.id == clip.id)
                                if (index < 0) {
                                    choices.clipChoices.push(clip.id)
                                    needsUpdate = true
                                }
                            }
                            break
                        case 'remove':
                            for (const clip of data)
                            {
                                self.log("debug", `remove ======> ${clip.id}` )
                                let index = choices.clipChoices.findIndex((item) => item.id == clip.id)
                                if (index >= 0) {
                                    choices.clipChoices.splice(index, 1)
                                    needsUpdate = true
                                }
                            }
                            break
                    }

                    if (needsUpdate)
                    {
                        this.setActionDefinitions(this.initActions(this))
                        this.setFeedbackDefinitions(this.initFeedbacks(this))
                        this.initPresets()
                        this.setVariableValues({
                            'clipCount': response.data.clipCount,
                        })
                    }

                    break

                case "output":
                    switch (action.toLowerCase())
                    {
                        case 'change':
                            if (data.state === undefined) return;

                            switch (data.state.toLowerCase())
                            {
                                case "play":
                                case "playing":
                                case "start":
                                {
                                        self.log("debug", `${topic.id} play` )
                                        const output = self.outputs.find(output => output.id === topic.id)
                                        output.status = 'play'
                                        self.checkFeedbacks()
                                    }
                                    break
                                case "stop":
                                case "stopped":
                                case "ready":
                                case "live":
                                {
                                        self.log("debug", `${topic.id} stop` )
                                        const output = self.outputs.find(output => output.id === topic.id)
                                        output.status = 'stop'
                                        self.checkFeedbacks()
                                    }
                                    break
                                default:
                                    break
                            }
                            break
                    }
                    break

                case "input":
                    break
            }
        }
    }
    
    ws.onclose = function(event) {
        if (event.wasClean) {
            self.log("info", `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            self.log("warning", '[close] Connection died')
        }
    }
    
    ws.onerror = function(error) {
        self.log("error", `error = ${error.data}`)
    }
    
}

module.exports = { initEvents }