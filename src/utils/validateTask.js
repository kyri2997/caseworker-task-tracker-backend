
export function validateTask(task){
    const requiredFields = ['title', 'status', 'dueDate']
    for (let field of requiredFields){
        if (!task[field]){
            return { valid: false, message: `${field} is required`}
        }
    }
    // Check dueDate is a date
    if (isNaN(Date.parse(task.dueDate))){
        return { valid: false, message: `Due date must be a date`}
    }

    return {valid:true}
}