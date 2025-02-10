const API_URL = "https://task-manger-jr3n.onrender.com/api/v1/task"

export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/create-task`;
    console.log('url ', url)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}
export const GetAllTasks = async () => {
    const url = `${API_URL}/get-task`;
    console.log('url ', url)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/delete-task/${id}`;
    console.log('url ', url)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}
export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/update-Tasks/${id}`;
    console.log('url ', url)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}