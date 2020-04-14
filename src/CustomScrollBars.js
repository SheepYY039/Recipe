import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./ScrollBar.css";

export default class CustomScrollbars extends Component {
  constructor(props, context, ...rest) {
    super(props, context, ...rest);
    this.state = { top: 0 };
    this.handleScrollFrame = this.handleScrollFrame.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderTrackVertical = this.renderTrackVertical.bind(this);
    this.renderThumbVertical = this.renderThumbVertical.bind(this);
  }

  renderTrackVertical({ style, ...props }) {
    const finalStyle = {
      ...style,
      display: "block",
      width: "16px",
    };
    return <div style={finalStyle} {...props} className="track-vertical" />;
  }

  renderThumbVertical({ style, ...props }) {
    const thumbStyle = {
      ...style,
      display: "block",
    };
    return <div style={{ thumbStyle }} {...props} className="thumb-vertical" />;
  }

  handleScrollFrame(values) {
    const { top } = values;
    this.setState({ top });
  }

  renderView({ style, ...props }) {
    const { top } = this.state;
    const color = top * 255;
    const customStyle = {
      backgroundColor: "#D6F7DE",
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  }

  render() {
    const Props = {
      renderView: this.renderView,
      onScrollFrame: this.handleScrollFrame,
      renderTrackVertical: this.renderTrackVertical,
      renderThumbVertical: this.renderThumbVertical,
      autoHide: false,
    };
    return <Scrollbars {...Props}>{this.props.children}</Scrollbars>;
  }
}
