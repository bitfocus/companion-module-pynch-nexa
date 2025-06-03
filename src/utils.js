module.exports = {
    
    getUriFromEvents(events, rel)
    {
        for (const event of events) 
            if (event.rel === rel) 
                return event.href
        return ""
    },

    getUriFromLinkHeader(response, relation) {
        const links = response.headers.link.split(",").map(function (value) { return value.trim();})
        for (const link of links) {
            const elements = link.split(";").map(function (value) { return value.trim(); })
            let index = elements.indexOf(`rel="${relation}"`)
            if (index >= 0) {
                index = elements.findIndex((element) => element.startsWith('<'))
                if (index >= 0)
                    return elements[index].slice(1,-1)
            }
        };
        return "";
    },
}