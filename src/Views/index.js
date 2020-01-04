import React from 'react';

export default class Views {
    panels = [];

    constructor(view, panel) {
        this.view = view;
        this.panel = panel;
    }

    set Panels(Panels) {
        Panels.map((c) => {
            this.panels.push(c);
            this[c.name] = React.createElement(c, { changeView: this.view, changePanel: this.panel })
        });
    }
}