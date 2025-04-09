import react from "react";
import styled, {keyframes} from "styled-components";


const Flicker = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const loadingBar = keyframes`
    0% {
        width: 0;
        opacity: 0;
    }
    90%{
        width: 100%;
        opacity: 1;
    }
    100%{
        width: 100%;
        opacity: 0;
    }
`
const Section = styled.section`
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 220px;
`

const H1 = styled.h1`
    font-size: 30px;
    font-weight: 400;
    line-height: 1.3333333333;
    color: #151B26;
    text-align: center;
    animation-name: ${Flicker};
    animation-duration: 1600ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    margin-bottom: 20px;
`

const Bar = styled.div`
    width: 300px;
    height: 12px;
    background-color: #e5eaef;
    border-radius: 100px;
    position: relative;
    overflow: hidden;
`
const Gauge = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 12px;
    border-radius: 100px;
    background-color: #9DBDED;
    animation-name: ${loadingBar};
    animation-duration: 1600ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
`

const Loading = () => {
    return(
        <Section>
            <H1>Loading....</H1>
            <Bar aria-hidden="true">
                <Gauge></Gauge>
            </Bar>
        </Section>
    )
}

export default Loading;