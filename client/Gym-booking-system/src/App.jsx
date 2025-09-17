import { useState } from "react";
import TrainerForm from "./components/Trainer/TrainerForm";
import TrainersList from "./components/Trainer/TrainersList";

export default function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  function handleRefresh() {
    setRefreshFlag(!refreshFlag); // triggers TrainersList to reload
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Trainer Management</h1>
      <TrainerForm onAdded={handleRefresh} />
      <TrainersList refreshFlag={refreshFlag} onUpdated={handleRefresh} />
    </div>
  );
}
