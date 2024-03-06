import {useEffect, useMemo, useState} from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadSlim} from "tsparticles-slim";
import {ISourceOptions} from "@tsparticles/engine";


const ParticlesWrapper = ({id, conf} : {id: string, conf: any}) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine : any) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(() => (conf), [])

    if (init) {
        return (
            <Particles
                id={id}
                options={options}
            />
        );
    }

    return <></>
}
export default ParticlesWrapper;