import { useEffect, useState } from "react";
import {
  getCustomers,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} from "../services/customerService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    phoneNo: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadCustomers();
  };

  const handleView = (id) => {
    setExpandedCustomerId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (customer) => {
    setEditingCustomerId(customer._id);
    setFormData({
      name: customer.name,
      contactInfo: customer.contactInfo || "",
      phoneNo: customer.phoneNo || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(editingCustomerId, {
        name: formData.name,
        contactInfo: formData.contactInfo,
        phoneNo: formData.phoneNo,
      });
      setEditingCustomerId(null);
      loadCustomers();
    } catch (err) {
      console.error("Failed to update customer:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createCustomer({
        name: formData.name,
        contactInfo: formData.contactInfo,
        phoneNo: formData.phoneNo,
      });
      setShowRegisterForm(false);
      setFormData({ name: "", contactInfo: "", phoneNo: "" });
      loadCustomers();
    } catch (err) {
      console.error("Failed to create customer:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <button
          onClick={() => setShowRegisterForm((prev) => !prev)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          + Register
        </button>
      </div>

      {/* Register Form */}
      {showRegisterForm && (
        <form
          onSubmit={handleRegister}
          className="mb-6 space-y-3 border p-4 rounded shadow"
        >
          <h2 className="text-lg font-bold">Register New Customer</h2>
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({ ...formData, contactInfo: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="text"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowRegisterForm(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <ol className="list-decimal list-inside space-y-3">
        {customers.map((c) => (
          <li key={c._id} className="border p-3 rounded shadow-sm">
            {editingCustomerId === c._id ? (
              // Edit form
              <form onSubmit={handleUpdate} className="space-y-3">
                <div>
                  <label className="block font-semibold">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Email</label>
                  <input
                    type="email"
                    value={formData.contactInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, contactInfo: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Phone</label>
                  <input
                    type="text"
                    value={formData.phoneNo}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNo: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCustomerId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : expandedCustomerId === c._id ? (
              // Expanded card view
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold mb-2">Customer Details</h2>
                <p>
                  <span className="font-semibold">Name:</span> {c.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {c.contactInfo}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {c.phoneNo}
                </p>
                <div className="mt-3 space-x-2">
                  <button
                    onClick={() => setExpandedCustomerId(null)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              // Compact row view
              <div className="flex justify-between items-center">
                <div className="flex gap-6">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-gray-600">📧 {c.contactInfo}</span>
                  <span className="text-gray-600">📞 {c.phoneNo}</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleView(c._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
