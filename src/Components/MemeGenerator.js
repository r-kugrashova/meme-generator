import React, {Component} from 'react'
import Canvas from './Canvas'

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state={
            topText:"",
            topTextSave:"",
            bottomText:"",
            bottomTextSave:"",
            imgSrc: null

    }}

    componentDidMount() {
        fetch("https://picsum.photos/v2/list")
            .then(response => response.json())
            .then(response => {
                const memes = response;
                var rand = Math.random()*(memes.length + 1);
                rand = Math.floor(rand);
                const mass = memes[rand];
                if(mass){
                this.setState({
                    imgSrc: mass.download_url
                })}
                else{
                    this.refreshPage();
                }
            })
        this.handleKeyDown=this.handleKeyDown.bind(this)
        this.refreshPage=this.refreshPage.bind(this)
    }

    handleKeyDown(event){
        if(event.key === 'Enter'){
            this.setState({
                [event.target.name]:event.target.value
            });
            event.target.value = ''
        }
    }

    refreshPage(){
        window.location.reload();
    }

    render() {

        return(
            <div className="meme">
                <div className="meme-form">
                    <input type="text" name="topText" onKeyDown={this.handleKeyDown}/>
                    <input type="text" name="bottomText" onKeyDown={this.handleKeyDown}/>
                    <button onClick={this.refreshPage}>NewPic!</button>
                </div>
                <p style={
                    {lineHeight: "1.5",
                    color: "#24292e",
                    textAlign: "center"}}>Press enter to send text to picture!</p>
                <Canvas text1={this.state.topText} text2={this.state.bottomText} backImg={this.state.imgSrc}/>

            </div>
        )
    }
}
export default MemeGenerator