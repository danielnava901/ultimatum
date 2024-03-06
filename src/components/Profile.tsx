import React from 'react';

const Profile = () => {
    return <div className="w-full h-full">
        <div className="flex flex-col items-center p-4 ">
            <figure className="border">
                <img style={{height: "420px"}}
                    src="https://res.cloudinary.com/dnviveros/image/upload/v1707958733/dnviveros/ykt2xpwncicstj6k9ntt.jpg" alt="Daniel Nava Viveros"/>
            </figure>
        </div>
        <div className="mt-8 border-t h-36 pl-4 pt-3">
            <div className="bg-gray-500 text-white w-fit px-1"><span>Daniel Nava Viveros</span></div>
            <div className="w-fit px-1"><span>32 años</span></div>
            <div className="w-fit px-1"><span>Desarrollador Web</span></div>
            <div className="w-fit px-1"><span></span></div>
        </div>
    </div>
}

export default Profile;