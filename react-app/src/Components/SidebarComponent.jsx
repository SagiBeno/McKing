import { useState } from "react";

export default function SidebarComponent(props) {
    const [sidebarWidth, setSidebarWidth] = useState(0)
    const [closeButton, setCloseButton] = useState('block')
    const [openButton, setOpenButton] = useState('block')

    const open = () => {
        setSidebarWidth(250)
        setOpenButton('none')
        
    }

    const close = () => {
        setSidebarWidth(0)
        setTimeout(() => { setOpenButton('block') }, 480);
    }

    const filter = e => {
        const value = e.target.value
        props.onClick(e.target.value)
        setSidebarWidth(0)
        setTimeout(() => { setOpenButton('block') }, 480);
    }

    return (
        <>
            <div className="sidebar" style={{width: `${sidebarWidth}px`}}>
                <span id="sidebarCloseButton" onClick={close} style={{display: closeButton}}><i className="fa-solid fa-xmark fa-3x" style={{color: '#ab1700'}}></i></span>
                <div className="sidebarContent">
                    <button type="button" onClick={filter} value='Szendvicsek'>Szendvicsek</button>
                    <button type="button" onClick={filter} value='Italok'>Italok</button>
                    <button type="button" onClick={filter} value='Desszertek'>Desszertek</button>
                    <button type="button" onClick={filter} value='Köretek'>Köretek</button>
                    <button type="button" onClick={filter} value="Harapnivalók">Harapnivalók</button>
                </div>
                <span id="sidebarOpenButton" onClick={open} style={{display: openButton}}><i className="fa-solid fa-magnifying-glass fa-2x" style={{color: '#ab1700'}}></i></span>
            </div>
        </>
    )
}