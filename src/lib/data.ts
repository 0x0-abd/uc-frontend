export const userData = [
    {
        id: 1,
        messages: [
            {
                id: 1,
                name: 'Jane Doe',
                message: 'Hey, Jakob',
                username: 'jane@doe',
                role: 'USER'
            },
            {
                id: 2,
                name: 'Jakob Hoeg',
                message: 'Hey!',
                username: 'jakob@coolio',
                role: 'USER'
            },
            {
                id : 3,
                name: 'Jane Doe',
                message: 'How are you?',
                username: 'jane@doe',
                role: 'USER'
            },
            {
                id: 4,
                name: 'Test User',
                message: 'I am good, you?',
                username: 'demo',
                role: 'ADMIN'
            },
            {
                id: 5,
                name: 'Jane Doe',
                message: 'I am good too!',
                username: 'jane@doe',
                role: 'USER'
            },
            {
                id: 6,
                name: 'Jakob Hoeg',
                message: 'That is good to hear!',
                username: 'jakob@coolio',
                role: 'USER'
            },
            {
                id: 7,
                name: 'Jane Doe',
                message: 'How has your day been so far?',
                username: 'jane@doe',
                role: 'USER'
            },
            {
                id: 8,
                name: 'Test User',
                message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
                username: 'demo',
                role: 'ADMIN'
            },
            {
                id: 9,
                name: 'Jane Doe',
                message: 'I had a relaxing day. Just catching up on some reading.',
                username: 'jane@doe',
                role: 'USER'
            },
            {
                id: 10,
                name: 'Jakob Hoeg',
                message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
                username: 'jakob@coolio',
                role: 'USER'
            },
            {
                id: 11,
                name: 'Jane Doe',
                message: 'I had a relaxing day. Just catching up on some reading.',
                username: 'jane@doe',
                role: 'USER'
            },
            {
                id: 12,
                name: 'Jakob Hoeg',
                message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
                username: 'jakob@coolio',
                role: 'USER'
            },
            {
                id: 13,
                name: 'Jane Doe',
                message: 'I had a relaxing day. Just catching up on some reading.',
                username: 'jane@doe',
                role: 'USER'
            }
        ],
        name: 'Jane Doe',
    },
];

export type UserData = (typeof userData)[number];


export interface Message {
    id: number;
    name: string;
    username: string,
    role: string,
    message: string;
    time: string;
}

const loggedInUserData = {
    id: 5,
    name: 'Jakob Hoeg',
    username: 'jokobcoolio',
    role: "USER"
}

export interface MessageWithoutID {
    name: string;
    username: string;
    role: string;
    message: string;
};

export type LoggedInUserData = (typeof loggedInUserData);