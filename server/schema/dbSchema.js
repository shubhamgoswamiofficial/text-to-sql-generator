// `### Postgres SQL tables, with their properties:
// #
// # Employee(id, name, department_id)
// # Department(id, name, address)
// # Salary_Payments(id, employee_id, amount, date)
// #
// ### A query to list the names of the departments which employed more than 10 employees in the last 3 months
// SELECT
// `

const DbSchema = (text) => {
    return `### Postgres SQL tables, with their properties:
            #
            # employee(id,uuid,emp_code,full_name,dob,joined_date,experience,phone_number,last_month_present_days,last_month_salary)
            # attendance(id,employee_id,attendance_date,attendance_pkey)
            # holidays(id,title,holiday_date)
            #
            ### ${text}
            SELECT`
}
module.exports = {
    DbSchema
}