

export type Action1Type = {
    type: '1'
    id: string
}

export type Action2Type = {
    type: '1'
    id: string
}

type ActionType = Action1Type | Action2Type;


export const taskReducer = (state: State, action: ActionType): State => {
    switch (action.type) {
        case '1': {
            return {...state}
        }
        case '2': {
            return {...state}
        }
        default:
            throw new Error('Unknown action')
    }
}

export const action1AC = (todolistId: string): Action1Type => {
    return { type: '1', id: todolistId }
}

export const action2AC = (title: string) : Action2Type => {
    return { type: '2', title: title }
}