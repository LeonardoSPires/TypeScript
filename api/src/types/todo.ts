export type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export type CreateTodoDTO = {
    title: string;
};

export type UpdateTodoDTO = {
    title?: string;
    completed?: boolean;
}

