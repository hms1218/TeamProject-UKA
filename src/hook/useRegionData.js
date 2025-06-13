import { useState, useEffect } from "react";
import { fetchSavedAnimals } from "../api/AnimalApiData";

export default function useRegionData() {
    const [allRegionData, setAllRegionData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const allData = await fetchSavedAnimals();
                setAllRegionData(allData);
                
                if (!allData || Object.keys(allData).length === 0) {
                    setError({ type: "empty" });
                }
            } catch (e) {
                setError({ type: "server", detail: e.message });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

  return { allRegionData, loading, error };
}
