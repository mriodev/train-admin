
import Listoftrains from "../components/Listoftrains";
import BaseLayout from "../utils/BaseLayout";

const TrainList = () => {

    return (
        <div>
            <BaseLayout children={<Listoftrains />} />
        </div>
    );
}

export default TrainList