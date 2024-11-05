type OnlyChildren = {
    children: React.ReactNode
}

type IPost = {
    _id: string,
    creator: Creator,
    prompt: string
    tag: string
}

type Creator = {
    _id: string
    image: string,
    username: string,
    email: string
}

type IParams<T extends PropertyKey> = {
    params: Record<T, string>
}