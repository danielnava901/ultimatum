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
        <div className="
        flex
        justify-center
        items-center relative">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div> : <>

    </>
}

export default Loading;