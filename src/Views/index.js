import React from 'react';

export default class Views {
    panels = [];

    constructor(props) {
        this.props = props;
    }

    set Panels(Panels) {
        Panels.map((c, i) => {
            this.panels.push(c);
            this[c.name] = React.createElement(c, { key: i, changeView: this.props.view, changePanel: this.props.panel, token: this.props.token })
            return true;
        });
    }
}