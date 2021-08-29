import styled from 'styled-components';

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px
`;

export const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const MutedLink = styled.p`
    font-size: 18px;
    font-weight: light;
    margin: 0;
    cursor: default;
    color: black;
    text-decoration: none;
    font-family: 'Oswald';
`;

export const HighlightedText = styled.a`
    font-size: 18px;
    font-weight: bold;
    color: rgb(39,174,96);
    text-decoration: none;
    font-family: 'Oswald';
    cursor: pointer;
    
    &:hover {
        color: rgba(46,204,113,1);
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 42px;
    font-family: 'Oswald';
    outline: none;
    border: 1px solid rgba(200,200,200, 0.3);
    padding: 0 10px;    
    border-bottom: 1.4px solid transparent;
    margin: 5px;
    transition: all 200ms ease-in-out; 
    
    &:placeholder {
        color: rgba(200,200,200, 1);
    }
    
    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200,200,200, 0.4);
    }
    
    &:focus {
        outline: none;
        border-bottom: 2px solid rgb(39,174,96);
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 11px 40%;
    color: #fff;
    font-size: 18px;
    font-family: 'Oswald';
    font-weight: bold;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all 240ms ease-in-out;
    background: rgb(39,174,96);
    background: linear-gradient(90deg, rgba(39,174,96,1) 24%, rgba(46,204,113,1) 100%);  
    
     &:hover {
        filter: brightness(1.3);
        color: black;
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    font-weight: 50;
`;

