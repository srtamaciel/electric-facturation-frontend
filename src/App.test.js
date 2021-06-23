import renderer from 'react-test-renderer';
import React from 'react'
import AllData from './components/AllData'

test('render All Data component', ()=>{
    const component = renderer.create(<AllData />)
   expect(component).toContain()
})


