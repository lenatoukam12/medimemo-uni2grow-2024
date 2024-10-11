export interface IMoreDelete {
    icon?: React.ReactNode;
    open: boolean;
    title: string;
    body: string;
    agreeMessage?:string;
    disagreeMessage:string;
    agreeIcon?: React.ReactNode;
    disagreeIcon?: React.ReactNode;
    onAgree?: () => void;
    onDisagree: () => void;
}


export interface EModal{
    openM: boolean;
    onExit : () => void;
}