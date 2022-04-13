import React from 'react';

interface SwitchInterface {
    switchStyles: object,
    switchColor: string,
};

const Switch = ({ switchStyles, switchColor }: SwitchInterface) => {
    const styles = {
        ...switchStyles,
        backgroundColor: switchColor
    }
    return (
        <span
            style={styles}
            className="question__answer-switch"
        />
    )
};

export default Switch;