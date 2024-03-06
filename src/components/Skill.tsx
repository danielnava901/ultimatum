import React, {useEffect, useState} from 'react';

const Skill = ({skill}) => {
    const skills = [
        'PHP',
        'Javascript',
        'Python',
        'HTML',
        'CSS',
        'NextJS',
        'ReactJs',
        'Symfony'
    ];

    const [index, setIndex] = useState(0);
    const body = document.getElementsByTagName("body")[0];

    const keyHandler = (ev) => {
        setIndex(prev => {
            if(ev.code === 'ArrowDown') {
                return (prev + 1) > 7 ? 0 : prev + 1;
            }else if(ev.code === 'ArrowUp') {
                return (prev - 1) < 0 ? 7 : prev - 1;
            }
        });
    }

    useEffect(() => {
        body.addEventListener("keydown", keyHandler);
        return () => {
            body.removeEventListener("keydown", keyHandler)
        }
    }, []);

    return <div className="w-full h-full" style={{zIndex: 9}}>
        <div className="flex flex-col">
            <div className="p-2">Lenguajes</div>
            <span className={`px-8 py-2 w-fit 
                ${index === 0 ? 'bg-violet-500 text-white' : ''}`}>PHP</span>
            <span className={`px-8 py-2 w-fit 
                ${index === 1 ? 'bg-green-500 text-white' : ''}`}>Javascript</span>
            <span className={`px-8 py-2 w-fit 
                ${index === 2 ? 'bg-yellow-500 text-white' : ''}`}>Python</span>
            <span className={`px-8 py-2 w-fit 
                ${index === 3 ? 'bg-gray-500 text-white' : ''}`}>HTML</span>
            <span className={`px-8 py-2 w-fit 
                ${index === 4 ? 'bg-rose-500 text-white' : ''}`}>CSS</span>
            <hr/>
            <div className="p-2">Frameworks</div>
            <span className={`px-8 py-2 w-fit 
                ${index === 5 ? 'bg-green-400 text-white' : ''}`}>NextJS</span>
            <span className={`px-8 py-2 w-fit 
                ${index === 6 ? 'bg-blue-500 text-white' : ''}`}>ReactJs</span>
            <span className={`px-8 py-2 w-fit 
                ${index === 7 ? 'bg-yellow-500 text-white' : ''}`}>Symfony</span>
        </div>
    </div>
};

export default Skill