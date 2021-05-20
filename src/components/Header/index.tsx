import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';
import React from 'react';

interface HeaderProps{
    onOpenNewTransactionModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({onOpenNewTransactionModal}) => {
    return(
        <Container>
            <Content>
                <img src={logoImg} alt="dtmoney" />
                <button onClick={onOpenNewTransactionModal}>Nova transação</button>
            </Content>
        </Container>
    )
}