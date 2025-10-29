import { useState } from "react";

export default function SidebarComponent() {
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
        setSidebarWidth(0)
        setTimeout(() => { setOpenButton('block') }, 480);
        console.log('filter: ', e.target.value)
    }

    return (
        <>
            <div className="sidebar" style={{width: `${sidebarWidth}px`}}>
                <span id="sidebarCloseButton" onClick={close} style={{display: closeButton}}><i className="fa-solid fa-xmark fa-3x" style={{color: '#ab1700'}}></i></span>
                <div className="sidebarContent">
                    <button type="button" onClick={filter} value='hamburgers'>Hamburgerek</button>
                    <button type="button" onClick={filter} value='drinks'>Üdítők</button>
                    <button type="button" onClick={filter} value='desserts'>Desszertek</button>
                    <button type="button" onClick={filter} calue="hotDrinks">Forró italok</button>
                    <button type="button" onClick={filter} value='sideDishes'>Köretek</button>
                    <button type="button" onClick={filter} value='sauces'>Mártások</button>
                </div>
                <span id="sidebarOpenButton" onClick={open} style={{display: openButton}}><i className="fa-solid fa-magnifying-glass fa-2x" style={{color: '#ab1700'}}></i></span>
            </div>
        </>
    )
}