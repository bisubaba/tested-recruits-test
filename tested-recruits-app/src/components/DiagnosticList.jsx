export default function DiagnosticList({ diagnostic_list }) {
  return (
    <div className="w-full bg-white p-3 rounded-xl flex flex-col h-100 mt-2 overflow-y-auto">
      <p className="card-title-24pt">Diagnostic List</p>
      <div className="grid grid-cols-12 gap-4 p-4 bg-[#F6F7F8] rounded-xl my-5">
        <p className="col-span-4 body-emphasized-14pt">Problem/Diagnosis</p>
        <p className="col-span-5 body-emphasized-14pt">Description</p>
        <p className="col-span-2 body-emphasized-14pt">Status</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {diagnostic_list.map((diagnostic_item) => {
          return (
            <div className="grid grid-cols-12 gap-4 p-2 border-b-1 border-black/10 items-center">
              <p className="col-span-4">{diagnostic_item.name}</p>
              <p className="col-span-5">{diagnostic_item.description}</p>
              <p className="col-span-2">{diagnostic_item.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
