import React from "react";
import ReactDom from "react-dom";
import styles from './private.css';

class Container extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inputText : ""
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        //console.log(e.target.value);
        this.setState({inputText:e.target.value})
    }

    render(){
        return <div>
            <InputBox 
            handleChange={this.handleChange}/>
            <ItemContainer 
            inputText={this.state.inputText}/>
        </div>
    }
}

class InputBox extends React.Component{


    render(){
        return <div className={styles.inputBox}>
            <input type="text" onInput={this.props.handleChange}/>
        </div>
    }
}

class ItemContainer extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            itemsInfo : {},
            inputText:""
        }
        //格式
        /*        fengsaolvshi : {
                    img : "private_items_fengsaolvshi",
                    name : "美剧-风骚律师"
                  } 
        */

        this.getItems = this.getItems.bind(this)
    }

    componentDidMount(){
        
        this.getItems()
    }

    getItems(){
        var ajaxXHR = new XMLHttpRequest()
        ajaxXHR.open("get","/ajax/private_items")
        ajaxXHR.onreadystatechange = () => {
            if(ajaxXHR.readyState == 4){
                if(ajaxXHR.status == 200){
                    
                    this.setState({
                        itemsInfo : JSON.parse(ajaxXHR.response)
                    })
                }
            }
        }
        ajaxXHR.send()
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(this.props != nextProps){
            this.setState(nextProps)
        }
    }


    render(){
        
        var itemsArr = []
        for(let i in this.state.itemsInfo){
            if (this.state.itemsInfo[i].text.includes(this.state.inputText) ) {
                itemsArr.push(<Items key={i} name={this.state.itemsInfo[i].name} text={this.state.itemsInfo[i].text}/>)
            }

        }
        //console.log(itemsArr)
        return <ul className={styles.items_ul}>
            {itemsArr}
        </ul>
    }
}

class Items extends React.Component{
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        
    }

    render(){
        return <li className={styles.items_li}>
        <a href={"private/" + this.props.name}>           
            <ItemsPic name={this.props.name}/>
            <ItemsText text={this.props.text}/>
        </a>
        </li>
    }
}

class ItemsPic extends React.Component{

    componentDidMount(){
    }


    render(){
        return <img src={"private_items_" + this.props.name + ".jpg"} className={styles.items_img} alt="风骚律师" ref={(img)=>{this.img = img}} />
    }
}
class ItemsText extends React.Component{
    componentDidMount(){
    }
    render(){
        return  <p>
            {this.props.text}
        </p>
    }
}
ReactDom.render(
    <Container />,
    document.getElementById("react-container")
)