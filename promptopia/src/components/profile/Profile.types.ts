export interface ProfilePropTypes {
    name: string,
    description: string,
    data: IPost[],
    handleEdit: (arg0: IPost) => void,
    handleDelete: (arg0:IPost) => void,
}