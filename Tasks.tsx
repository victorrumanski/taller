import { useState, useEffect, useMemo, memo } from 'react'

type Task = {
    id: number;
    title: string;
    completed: boolean;
}



// Memoized table component that only re-renders when tasks change
const TaskTable = memo(({ tasks, isLoading }: { tasks: Task[], isLoading: boolean }) => {
    const renderedRows = useMemo(() => {
        return tasks.map(t => {
            return <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>
                    <input type="checkbox" checked={t.completed} />
                </td>
            </tr>
        });
    }, [tasks]);

    console.log("TaskTable rendering");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Completed?</th>
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    );
});

export default function Tasks() {

    const [title, setTitle] = useState("");
    const [validationErrors, setValidationErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:8080/api/tasks");
            setTasks(await response.json() as any);
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function addTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const taskRequest = { title };
        try {
            const response = await fetch("http://localhost:8080/api/tasks", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskRequest),
            });
            console.log("addtask response", await response.json());
            fetchData();
        } catch (err: any) {
            if (err.status == 400) {
                setValidationErrors(err.errors[0].message);
            }
        }

    }

    return (
        <div style={{ padding: "10px" }}>
            <form onSubmit={addTask}>
                <h2>Add new Task</h2>
                <label>Title:</label>
                <input  name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <span style={{ color: "red" }}>{validationErrors}</span>
                <button type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add Task"}</button>
            </form>

            <hr />

            <TaskTable tasks={tasks} isLoading={isLoading} />
        </div>
    );
}
