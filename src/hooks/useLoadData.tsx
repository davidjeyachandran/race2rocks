import { useEffect, useState } from 'react'
import { getDataFromServer } from '../utilities';

function useLoadData(endpoint: string): [RunDataType[], boolean, string | null, () => void] {

    const [data, setData] = useState<RunDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [reloadCount, setReloadCount] = useState(0)

    useEffect(() => {
        let isCancelled = false

        async function run() {
            setIsLoading(true)
            setError(null)
            try {
                const result = await getDataFromServer(endpoint)
                if (!isCancelled) setData(result)
            } catch (e) {
                const message = e instanceof Error ? e.message : String(e)
                if (!isCancelled) setError(message)
            } finally {
                if (!isCancelled) setIsLoading(false)
            }
        }

        run()
        return () => { isCancelled = true }
    }, [endpoint, reloadCount])

    const reload = () => setReloadCount(c => c + 1)
    return [data, isLoading, error, reload]
}

export default useLoadData
