export interface DatagridColumn {
    Id: string;
    Type: 'number' | 'string' | 'date';
    Name: string;
    Filter?: boolean;
    Computed?: (row: any) => string;
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
