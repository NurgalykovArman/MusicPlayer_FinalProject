
const AccessToken = "BQBEQyvkhaKjZ5QeGSy98bJaIjcO1tkFJeNUvBMNVj9cuN37g6sy5C-5Von8bCxoLcmkySexpcZRM3b9aHcIcXGDYJrGk5M8E5Oxjq8r-v8K4_t7XdAfanNtyTjBscYR9XMFnNh0OwIgMyLWjKh8vC6Wx7RkC2m7qFfHhn-0MBrBN6Tg2w2d0rErZQcjIutBY9dN5KwCRw";
const GET_TOKEN = "ListMusic";

export const tokenReducer = (state = { token: AccessToken }, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return { token: AccessToken }  
        default:
            return state
    }
}

export const tokenAction = () => ({ type: GET_TOKEN })

