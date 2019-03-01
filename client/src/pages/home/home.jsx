import React from 'react';

import Landing from './components/landing/landing';
import Classes from './components/classes/classes';
import Steps from './components/steps/steps';
import ClassFeatures from './components/class-features/class-features';
import Subscribe from './components/subscribe/subscribe';

function Home() {
    return (
        <>
            <Landing />
            <Classes />
            <Steps />
            <ClassFeatures />
            <Subscribe />
        </>
    );
}

export default Home