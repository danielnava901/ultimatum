import React from 'react';

export const ViewOuter = ({url}) => {
    return <div className="w-[300px] h-[330px]
        border
        shadow
        fixed
        top-1
        right-1
        bg-white
        rounded
        ">
        <iframe src={url}
                className="w-full h-full "
                frameborder="0" />
    </div>
}