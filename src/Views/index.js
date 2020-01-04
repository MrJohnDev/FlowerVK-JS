import React from 'react';

export default class Views {
    panels = [];

    constructor(props) {
        this.props = props;
    }

    set Panels(Panels) {
        Panels.map((c) => {
            this.panels.push(c);
            this[c.name] = React.createElement(c, { changeView: this.props.view, changePanel: this.props.panel, user: this.props.user })
            return true;
        });
    }
}