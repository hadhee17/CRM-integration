export default function CustomerItem({ customer, onView, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center border p-3 rounded shadow-sm">
      <div>
        <p className="font-semibold">{customer.name}</p>
        <p className="text-sm text-gray-600">{customer.email}</p>
        <p className="text-sm text-gray-600">{customer.phone}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onView(customer)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => onEdit(customer)}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(customer._id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
