const Loading = ({show}) => {
    return show ? <div className="fixed
        flex
        justify-center
        items-center
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