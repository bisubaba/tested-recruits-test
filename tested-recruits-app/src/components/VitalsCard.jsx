export default function VitalsCard({ data }) {
  return (
    <div
      className={`vitals-card ${data.class} p-4 rounded-xl flex flex-col justify-between`}
    >
      <img src={data.icon} alt={data.title} className="w-20 h-20 mb-2" />
      <div>
        <p className="vital-title">{data.title}</p>
        <p className="vital-value pb-3">
          {data.value} {data.unit}
        </p>
      </div>
      <p className="vital-levels">{data.level}</p>
    </div>
  );
}
