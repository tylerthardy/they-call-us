import { Edge, Node } from '@swimlane/ngx-graph';

export class Name {
    id: string;
    rootName: string;
    createdOn: Date;
    links?: Edge[];
    nodes?: Node[];
    clusters?: [];
}
