type Props = {
    title: string
    onClick?: () => void
}

export const Button = ({ title, onClick }: Props) => {
    return <button style={{marginLeft: '20px'}} onClick={onClick}>{title}</button>
}