import React from 'react';
const ViewerRight = ({children, onClickClose}) => {
    return <div className="fixed right-0 top-0" style={{zIndex: 2}}>
        <div className="flex relative">
            <div className="w-12 h-12 p-2 flex justify-center items-center
            border border-r-0 border-t-0 cursor-pointer profile-bg"
                 onClick={onClickClose}
            >
                X
            </div>
            <div className="w-[600px] h-screen border-l profile-bg">
                {children}
            </div>
        </div>
    </div>
}
export default ViewerRight;