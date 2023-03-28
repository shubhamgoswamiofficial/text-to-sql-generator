const { Configuration, OpenAIApi } = require("openai");
const { DbSchema } = require("../schema/dbSchema");
const Pool = require('pg').Pool
const { sendEmail } = require('../utils/emailSender')


const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const CORE_DB = new Pool({
    host: 'localhost',
    database: 'code-ninja',
    port: 5432
})

const constError = `This question cannot be answered without more information.`

const getQueryData = async (params) => {
    try {
        let { query } = params
        console.log("query::::::::", DbSchema(query))
        const openaiRes = await openai.createCompletion({
            prompt: DbSchema(query),
            model: "text-davinci-003",
            temperature: 0.3,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
        if (openaiRes.data && openaiRes.data.choices && openaiRes.data.choices[0] && openaiRes.data.choices[0].text) {
            if (openaiRes.data.choices[0].text.includes(constError)) {
                return constError
            }
            if (openaiRes.data.choices[0].text.includes('CURDATE()')) {
                openaiRes.data.choices[0].text.replace('CURDATE()', 'CURRENT_DATE;')
            }
            console.log("query: ", `Select${openaiRes.data.choices[0].text}`)
            const data = await CORE_DB.query(`Select${openaiRes.data.choices[0].text}`)
            if (data.rows.length) {
                console.log("data:", data.rows)
                const answerFromQueryAndRecords = await getAnswerFromQueryAndRecords(query, data.rows)
                console.log("answerFromQueryAndRecords:", answerFromQueryAndRecords)
                return answerFromQueryAndRecords.length ? answerFromQueryAndRecords : constError
            } else if (data.rows.length == 0) {
                return 'No record found'
            }
        }
        throw constError

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.log("error: ", error.response.data.error)
        } else {
            console.log("error: ", error)
        }
        throw "Sorry! We are facing some issue. Please try after sometime."
    }
}


const getAnswerFromQueryAndRecords = async (query, records) => {
    // generate answer using GPT-3
    const openaiRes = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Generate answer for the question ${query} based on the following object records:\n` + JSON.stringify(records),
        max_tokens: 100
    })
    if (openaiRes.data && openaiRes.data.choices && openaiRes.data.choices.length) {
        console.log("getAnswerFromQueryAndRecords openaiRes: ", openaiRes.data.choices)

        await sendEmail({data: openaiRes?.data?.choices[0]?.text?.trim()?.split("\n") })

        return openaiRes.data.choices[0].text.trim().split("\n");
    }
    return ""
}

module.exports = {
    getQueryData
}