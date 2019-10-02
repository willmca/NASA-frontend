import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";

const photoInfoURL = "https://great-beyond-photos.herokuapp.com/apod/"

const StyledArticle = styled.article`
    background-color: black;
    border: 3px solid #F9D31C;
    display: flex;
    justify-content: center;
    margin: 53px auto;
    max-width: 800px;
    padding: 20px;
`

const StyledPhoto = styled.img`
    box-shadow: 10px 10px 5px #262952;
    max-height: 500px;
    margin: 10px;
    text-decoration: none;
    width: auto;
`

const StyledInfoSection = styled.section`
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 10px;
    text-shadow: 5px 1px 4px #3359A5;
    text-align: center;
`

const StyledInfoField = styled.span`
    color: #F9D31C;
    font-weight: bolder;
`

const StyledChangeKeys = styled.section`
    background: rgb(161,161,161);
    background: linear-gradient(180deg, 
                rgba(161,161,161,1) 0%, 
                rgba(225,21,43,1) 0%, 
                rgba(149,22,33,1) 53%);
    border: 4px solid #262952;
    color: white;
    font-weight: bolder;
    margin: 10px;
    padding: 3px;
    width: 250px;
    text-align: center;
    text-shadow: 1px 1px 1px black;
`

export default class ShowPhoto extends Component {
    constructor(props){
        super(props)
        this.state = {
          photoInfo: {}
        }
        
        this.fetchPhotoInfo = this.fetchPhotoInfo.bind(this)
    }

    componentDidMount() {
        this.fetchPhotoInfo()
    }

    fetchPhotoInfo() {
        fetch(photoInfoURL + this.props.match.params.title)
          .then( response => response.json()
          .then( (parsedJson) => {
            this.setState({
                photoInfo: parsedJson
            })
        }))
    }

    render() {
        const photoInfo = this.state.photoInfo;
        return (
            <StyledArticle>
                    <StyledPhoto src={photoInfo.hdurl} alt={photoInfo.title}/>
                    <StyledInfoSection>
                        <section>
                            <p><StyledInfoField>{"Title: "}</StyledInfoField>{photoInfo.title}</p>
                            <p><StyledInfoField>{"Copyright: "}</StyledInfoField>{photoInfo.copyright}</p>
                            <p><StyledInfoField>{"Date: "}</StyledInfoField>{photoInfo.date}</p>
                            <p><StyledInfoField>{"Explanation: "}</StyledInfoField>{photoInfo.explanation}</p>
                        </section>
                    </StyledInfoSection>
                </StyledArticle>
        )
    }
}
