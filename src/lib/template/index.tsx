import React from 'react';
import Wrapper from './wrapper/wrapper';

export default ({config, otherparams = {}, hasorglist = false}) => {
    return <Wrapper config={config} otherparams={otherparams} hasorglist={hasorglist}/>
}