
export interface Template {
    id: string;
    templateId: string;
    name: string;
    thumbUrl: string;
    thumbUrl_v2?: string;
    thumbUrl_v3?: string;
    vidUrl: string;
    category: string[];
    pro: boolean;
    isMultipleTemplate: boolean;
    widgetsDefinition: {
      URL: string;
      [key: string]: any;
    }[];
    [key: string]: any;
  }
  