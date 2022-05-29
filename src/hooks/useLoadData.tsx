import { useEffect, useState } from 'react'
import { getDataFromServer } from '../utilities';

function useLoadData(endpoint: string): [RunDataType[], boolean] {

    const [data, setData] = useState<RunDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getDataFromServer(endpoint)
            .then(data => {
                setData(data);
                setIsLoading(false)
            })
    }, [endpoint])

    return [data, isLoading]
}

export default useLoadData
