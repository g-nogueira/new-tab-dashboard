export type WidgetStyle = {
    backgroundColor: boolean;
};

export type WidgetConfig = {
    display: boolean;
    name: string;
    description: string;
    style: WidgetStyle;
    header: {
        display: boolean;
        displayTemplate: string;
        style: WidgetStyle;
    };
    body: {
        display: boolean;
        displayTemplate: string;
        data?: any;
    };
    footer: {
        display: boolean;
        displayTemplate: string;
    };
    apiCall?: {
        url: string;
        method: string;
        headers: any;
    };
};