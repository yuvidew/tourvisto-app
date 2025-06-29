export type ModalCompPropsType = {
    visible: boolean;
    onBackDropPress: () => void;
    responseMsg: {
        success: boolean;
        message: string;
    };
};

export type AuthFormType = {
    email : string,
    password : string,
    username? : string,
    role : string
}

export type UseAuthReturnType = {
    onSignUp: (baseurl: string, form: AuthFormType) => Promise<void>;
    onSignIn: (baseurl: string, form: AuthFormType) => Promise<void>;
    loading: boolean;
    showModal: boolean;
    responseMsg: { success: boolean; message: string };
};