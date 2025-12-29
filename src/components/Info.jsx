/* ========================== COMPONENT INFO ========================== */
export default function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-sm text-gray-900 sm:text-base">{value || "-"}</p>
    </div>
  );
}
