import css from "dom-css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import "./ScrollBar.css";

export default class CustomScrollbars extends Component {
  constructor(props, context, ...rest) {
    super(props, context, ...rest);
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
      top: 0,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleScrollFrame = this.handleScrollFrame.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderTrackVertical = this.renderTrackVertical.bind(this);
    this.renderThumbVertical = this.renderThumbVertical.bind(this);
  }

  handleUpdate(values) {
    const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    css(shadowTop, { opacity: shadowTopOpacity });
    css(shadowBottom, { opacity: shadowBottomOpacity });
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
    const customStyle = {
      backgroundColor: "#D6F7DE",
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  }

  render() {
    const { style, ...props } = this.props;
    const Props = {
      ...props,
      ref: "scrollbars",
      renderView: this.renderView,
      onScrollFrame: this.handleScrollFrame,
      renderTrackVertical: this.renderTrackVertical,
      renderThumbVertical: this.renderThumbVertical,
      onUpdate: this.handleUpdate,
      autoHide: true,
    };
    return (
      <div className="containerStyle">
        <Scrollbars {...Props} />
        <div ref="shadowTop" className="shadowTopStyle" />
        <div ref="shadowBottom" className="shadowBottomStyle" />
      </div>
    );
  }
}

CustomScrollbars.propTypes = {
  style: PropTypes.object,
};
