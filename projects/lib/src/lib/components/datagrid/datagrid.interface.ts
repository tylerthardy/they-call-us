export interface DatagridColumn {
    Id: string;
    Type: 'number' | 'string' | 'date' | 'button' | 'icon-button';
    Icon?: string;
    Name: string;
    Filter?: boolean;
    Computed?: (row: any) => string;
    Click?: (row: any) => void;
}

export interface DatagridOptions {
    click?: (row: any) => any;
}

export enum ColumnType {
    String,
    Number,
    Date,
    Button
}
