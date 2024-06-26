import React from 'react'
import { marked } from 'marked'
import { createContext, useContext, useEffect, useState } from 'react'
import defaultText from './markdowntext.js'


/* Set options for marked parser */
marked.use({
    breaks: true,
    gfm: true
})

// global input state using useContext
const InputContext = createContext();

/** REACT COMPONENTS */
const EditorComponent = () => {
    // global input state using useContext
    const { inputState, setInputState } = useContext(InputContext);

    const handleChange = (event) => {
        setInputState(event.target.value);
    }
    return (
        <div>
            <textarea id='editor' onChange={(e)=>handleChange(e)} className="form-control" aria-label="With textarea" value={inputState}></textarea>
        </div>
    );
}

const PreviewComponent = () => {
    // global input state using useContext
    const { inputState } = useContext(InputContext);

    return (
        
        <div>
            <div className='card'>
                <div id='preview' dangerouslySetInnerHTML={{__html:marked.parse(inputState)}}/>
            </div>
        </div>
    )
}

const MarkDownPreviewer = () => {
    const [inputState, setInputState] = useState(defaultText);
    return (
        <InputContext.Provider value={{inputState, setInputState}}>
            <section id='markdown-previewer'>
                <EditorComponent />
                <PreviewComponent />
            </section>

        </InputContext.Provider>

    )
}

export default MarkDownPreviewer
