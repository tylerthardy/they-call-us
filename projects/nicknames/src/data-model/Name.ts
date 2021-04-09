import { Edge } from '@swimlane/ngx-graph';

export class Name {
    id: string;
    rootName: string;
    createdOn: Date;
    link?: Edge[];
    nodes?: Node[];
    clusters?: [];
}
