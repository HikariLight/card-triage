import { useEffect, useState } from "react"
import Column from "./components/Column"
import SearchBar from "./components/SearchBar"
import { filterData, filterDataByInequality, filterPatientData } from "./utils"

const App = () => {
    const apiURL = "http://localhost:3000/cards"

    const [patientData, setPatientData] = useState()
    const [filter, setFilter] = useState()

    const getPatientData = () => {
        fetch(apiURL)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setPatientData(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }

    useEffect(() => {
        getPatientData()
    }, [])

    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-50">
            <h1 className="my-2 text-center text-3xl text-purple-800">
                Card Triage
            </h1>
            <SearchBar setFilter={setFilter} />
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <h1 className="my-2 text-center text-2xl text-purple-800">
                        Todo (Pending - Rejected)
                    </h1>

                    {patientData && (
                        <Column
                            data={filterPatientData(
                                filterDataByInequality(
                                    patientData,
                                    "status",
                                    "DONE",
                                ),
                                filter,
                            )}
                            setPatientData={setPatientData}
                        />
                    )}
                </div>

                <div>
                    <h1 className="my-2 text-center text-2xl text-purple-800">
                        Done
                    </h1>
                    {patientData && (
                        <Column
                            data={filterPatientData(
                                filterData(patientData, "status", "DONE"),
                                filter,
                            )}
                            setPatientData={setPatientData}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
