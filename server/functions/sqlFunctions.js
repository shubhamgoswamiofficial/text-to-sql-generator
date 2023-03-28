const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
const { sendEmail } = require('../utils/emailSender')

const generateSql = async (params) => {
    let { speech } = params
    let DbSchema = "# employees(id,uuid,emp_code,full_name,dob,joined_date,experience,phone_number,last_month_present_days,last_month_salary) \n # attendance(id,employee_id,attendance_date,attendance_pkey) \n #holidays(id,title,holiday_date) \n"

    let openAiObj = {
        //model: "code-davinci-003",
        prompt: DbSchema + speech,
        //temperature: 0,
        // max_tokens: 150,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        // stop: ["#", ";"],

        model: "text-davinci-003",
        // prompt: "Create a SQL request to find all users who live in California and have over 1000 credits:",
        temperature: 0.3,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }


    return openai.createCompletion(openAiObj)
        .then(res => res?.data)
        .catch(err => { throw err })
}

module.exports = {
    generateSql
}