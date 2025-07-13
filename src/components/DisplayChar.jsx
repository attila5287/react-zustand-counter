import { useCounter } from "../store/useCounter";

export default function DisplayChar() {
  const apiData = useCounter((state) => state.apiData);
  
  console.log(apiData);
  
  if (apiData) {
    return (
      <>
        <h5 className="text-center mb-3">Char {apiData.id}: {apiData.name}</h5>
        <img src={apiData.image} alt="Character" className="img-thumbnail w-50" />
        <ul className="list-group">
          <li className="list-group-item">Name: {apiData.name}</li>
          <li className="list-group-item">Status: {apiData.status}</li>
          <li className="list-group-item">Species: {apiData.species}</li>
          <li className="list-group-item">Gender: {apiData.gender}</li>
          <li className="list-group-item">Origin: {apiData.origin.name}</li>
          <li className="list-group-item">Location: {apiData.location.name}</li>
        </ul>
        <pre className="mb-0 text-wrap">
        {JSON.stringify(apiData, null, 2)}
        </pre>
      </>
    );
  } else {
    return (
      <div className="mt-4">
        <h5 className="text-center mb-3">Character Details</h5>
        <div className="bg-light p-3 rounded">
          <p className="mb-0">No data loaded yet</p>
        </div>
      </div>
    );
  }
}