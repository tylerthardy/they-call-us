export interface DatagridColumn {
    Id: string;
    Type: 'number' | 'string' | 'date';
    Name: string;
    Filter?: boolean;
    CustomTemplate?: string;
}

export interface DatagridOptions {
    Test: boolean;
}

export enum ColumnType {
    String,
    Number,
    Date
}
