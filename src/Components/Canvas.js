import React from "react";

import './Canvas.css';


class Canvas extends React.Component {

    componentDidMount() {
        this.drawText=this.drawText.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.backImg !== this.props.backImg || nextProps.text1 !== this.props.text1 || nextProps.text2 !== this.props.text2) {
            this.img = new Image();
            this.img.src = nextProps.backImg;
            this.img.onload = this.drawText;
        }
    }

    drawText = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 800 * this.img.height / this.img.width;
        ctx.drawImage(this.img, 0,0, canvas.width, canvas.height);
        ctx.font = "40px Roboto";
        ctx.textAlign = 'center';
        ctx.fillText(this.props.text1 ? this.props.text1 : '', 400, 75, 500);
        ctx.fillText(this.props.text2 ? this.props.text2 : '', 400, 375, 500);
    }

    render() {
        return (
            <div>
                <canvas className="canCan" ref="canvas"/>
            </div>
        );
    }
}
export default Canvas;