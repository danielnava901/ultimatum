const Loading = ({show} : {show: boolean}) => {

    return show ? <div className="
        w-screen
        h-screen
        top-0
        right-0
        left-0
        bottom-0
        flex
        justify-center
        items-center
        fixed
    " style={{zIndex: 100, width: "inherit"}}>
        <div className="w-48
        h-48
        bg-gray-400
        border
        border-gray-200
        flex
        justify-center
        items-center">
            Cargando
        </div>
    </div> : <>

    </>
}

export default Loading;