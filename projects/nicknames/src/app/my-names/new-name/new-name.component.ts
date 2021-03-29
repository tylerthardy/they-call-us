import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DagreSettings, Edge, Node, Orientation } from '@swimlane/ngx-graph';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-new-name',
    templateUrl: './new-name.component.html',
    styleUrls: ['./new-name.component.scss']
})
export class NewNameComponent {

    constructor(@Inject(DOCUMENT) document) {
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
        this.links = [];
        this.nodes = [];
        this.clusters = [];

        const isFirstLoad = !this.load();

        if (isFirstLoad) {
            let label: string = null;
            while (!label) {
                label = this.promptLabel();
            }
            const first = this.createNode(label);
            first.data.showDelete = false;
            this.nodes.push(first);
        }

        this.save();
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
        const label = this.promptLabel();
        this.setLabel(node, label);
    }

    promptLabel(): string {
        const out = prompt('Enter a name:');
        if (!out) {
            return;
        }
        return out;
    }

    setLabel(node: Node, label: string): void {
        node.label = label;
        node.dimension.width = this.getNodeWidth(label);
        this.save();
    }

    add(node: Node): void {
        const label = this.promptLabel();
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
        const jsonData =  JSON.stringify(data);
        localStorage.setItem('graph', jsonData);
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
