const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const generateSql = async (params) => {
    let { speech } = params

    let openAiObj = {
        model: "code-davinci-002",
        prompt: speech,
        temperature: 0,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["#", ";"],
    }

    return openai.createCompletion(openAiObj)
        .then(res => res?.data)
        .catch(err => { throw err })
}

module.exports = {
    generateSql
}