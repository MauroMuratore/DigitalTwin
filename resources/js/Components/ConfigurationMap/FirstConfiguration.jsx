import UploadMap from '@/Components/ConfigurationMap/UploadMap';
import ProgressConfiguration from '@/Components/ConfigurationMap/ProgressConfiguration';
import ConfigurationAppliance from '@/Components/ConfigurationMap/ConfigurationAppliance';
import { useState } from 'react';
import { ThemeButton } from '@/Components/Commons/ThemeButton';
import ConfigurationEnergyPlan from './ConfigurationEnergyPlan';

const STATE_UPLOAD_MAP = 0
const STATE_CONFIGURATION_APPLIANCE = 1
const STATE_CONFIGURATION_ENERGY_PLAN = 2
const STATE_FINISH = 3


const FirstConfiguration = () => {
    const [progressState, setProgressState] = useState(STATE_UPLOAD_MAP)
    
    const renderCard = () =>{
        switch(progressState){
            case STATE_UPLOAD_MAP:
                return <UploadMap endSection={() => setProgressState(STATE_CONFIGURATION_APPLIANCE)}/>;
            case STATE_CONFIGURATION_APPLIANCE:
                return <ConfigurationAppliance editMode={true} endSection={() => setProgressState(STATE_CONFIGURATION_ENERGY_PLAN)}/>;
            case STATE_CONFIGURATION_ENERGY_PLAN:
                return <ConfigurationEnergyPlan endSection={() => setProgressState(STATE_FINISH)}/>;
            case STATE_FINISH:
                return  <div className="size-full">
                    <div className="h-5/6 flex justify-center items-center">
                        <h1>Configuration complete</h1>
                    </div>
                    <div className="w-full flex justify-center">
                        <ThemeButton href={route('configuration')}>Finish</ThemeButton>
                    </div>
                </div>
        } 
    }

    return(
        <div className="flex flex-col size-full p-5">
            <ProgressConfiguration state={progressState} setState={setProgressState}></ProgressConfiguration>
            <div className="w-full h-full p-5 my-2 bg-white shadow items-center flex flex-col w-fit">
                {renderCard()}
            </div>
        </div>
    )
} 


export default FirstConfiguration