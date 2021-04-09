import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { DagreSettings, Edge, Node, Orientation } from '@swimlane/ngx-graph';
import { Guid } from 'guid-typescript';
import { ModalService } from 'lib';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss']
})
export class NameComponent {

    constructor(@Inject(DOCUMENT) document: Document, private modalService: ModalService) {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.initialize();
    }

    MIN_WIDTH = 100;
    MIN_HEIGHT = 50;
    PADDING = 10;
    DEFAULT_LABEL = '?';
    DEFAULT_FONT = '15px Metropolis';
    DEFAULT_BACKGROUND = '#aae3f5';
    DEFAULT_NODE: Node = {
        id: 'default',
        label: this.DEFAULT_LABEL,
        data: {
            customColor: this.DEFAULT_BACKGROUND
        },
        dimension: {
            height: this.MIN_HEIGHT,
            width: this.MIN_WIDTH
        }
    };

    canvas: HTMLCanvasElement;

    update$: Subject<boolean> = new Subject();
    center$: Subject<boolean> = new Subject();
    panToNode$: Subject<string> = new Subject();

    layoutSettings: DagreSettings = {
        orientation: Orientation.TOP_TO_BOTTOM
    };
    links: Edge[] = [];
    nodes: Node[] = [];
    clusters = [];

    initialize(): void {
        const isFirstLoad = !this.load();
        if (isFirstLoad) {
            this.promptLabel('What\'s the original name?').subscribe((label) => {
                if (!label) {
                    this.initialize();
                    return;
                }
                const first = this.createNode(label);
                first.data.showDelete = false;
                this.nodes = [first];

                this.save();
            });
        }

    }

    updateGraph(): void {
        this.update$.next(true);
    }

    panToNode(nodeId: string): void {
        this.panToNode$.next(nodeId);
    }

    center(): void {
        this.center$.next(true);
    }

    createNode(label?: string): Node {
        const newNode = JSON.parse(JSON.stringify(this.DEFAULT_NODE));
        newNode.id = 'n-' + Guid.create().toString();
        newNode.label = label ?? '?';
        newNode.data.showDelete = true;
        newNode.dimension = {
            height: this.MIN_HEIGHT,
            width: this.getNodeWidth(label)
        };

        return newNode;
    }

    getNodeWidth(text: string, font?: string): number {
        font = font ?? this.DEFAULT_FONT;
        return Math.max(this.MIN_WIDTH, this.getTextWidth(text, font) + 2 * this.PADDING);
    }

    getTextWidth(text: string, font: string): number {
        // re-use canvas object for better performance
        const context = this.canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }

    clickLabel(node: Node): void {
        this.promptLabel('Edit the name', node.label).subscribe((label) => this.setLabel(node, label));
    }

    promptLabel(title: string, existingValue?: string): Observable<string> {
        const observable = this.modalService.open({
            Title: title,
            Form: { Fields: [{ Id: 'name', Label: 'Name', Type: 'text', Value: existingValue, Validators: [Validators.required] }] }
        }).pipe(
            map((result: any) => {
                if (!result) {
                    return null;
                }
                return result.name as string;
            })
        );

        return observable;
    }

    setLabel(node: Node, label: string): void {
        node.label = label;
        node.dimension.width = this.getNodeWidth(label);
        this.save();
    }

    add(node: Node): void {
        this.promptLabel('What name came next?').subscribe((label) => {
            if (!label) {
                return;
            }

            const newNode = this.createNode(label);
            this.nodes.push(newNode);

            const newLink: Edge = {
                id: `${node.id}_${newNode.id}`,
                target: newNode.id,
                source: node.id
            };

            this.links.push(newLink);
            this.links = [...this.links];

            this.save();
        });
    }

    remove(node: Node): void {
        const childrenLinks = this.links.filter(l => l.source === node.id);
        const childrenNodeIds = childrenLinks.map(l => l.target);

        // Remove children's children
        if (childrenNodeIds.length > 0) {
            const childrenNodes = this.nodes.filter(n => childrenNodeIds.find(cni => cni === n.id));
            childrenNodes.forEach(cn => this.remove(cn));
        }

        // Filter out the node, its children, and links to its children
        this.links = this.links.filter(l => l.target !== node.id && l.source !== node.id);
        this.nodes = this.nodes.filter(n => n.id !== node.id && !childrenNodeIds.find(cni => cni === n.id));

        this.save();
    }

    save(): void {
        const data = {
            nodes: this.nodes,
            links: this.links,
            clusters: this.clusters
        };
        const jsonData = JSON.stringify(data);
        localStorage.setItem('graph', jsonData);

        this.updateGraph();
    }

    load(): boolean {
        const jsonData = localStorage.getItem('graph');
        const data = JSON.parse(jsonData);
        if (!data) {
            return false;
        }
        this.nodes = data.nodes;
        this.links = data.links;
        this.clusters = data.clusters;
        return true;
    }

    reset(): void {
        localStorage.setItem('graph', null);
        this.initialize();
        this.updateGraph();
    }
}
