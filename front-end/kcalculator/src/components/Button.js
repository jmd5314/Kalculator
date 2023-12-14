import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TRANSPARENT = 'transparents';

const Container = styled.TouchableOpacity`
    background-color: ${({ theme, isFilled }) => 
        (isFilled ? theme.buttonBackground : TRANSPARENT)};
    align-items: center;
    border-radius: 4px;
  height: 60px;
    width: 100%;
    padding: 10px;
`;

const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: ${({ theme, isFilled }) => 
    (isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle)};
`;

const Button = ({ containerStyle, title, onPress, isFilled }) => {
    return (
        <Container 
            style={containerStyle} 
            onPress={onPress} 
            isFilled={isFilled}
        >
            <Title isFilled={isFilled}>{title}</Title>
        </Container>
    );
};

//isFilled를 true로 기본값 지정
Button.defaultProps = {
    isFilled: true,
};

Button.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
}
export default Button;