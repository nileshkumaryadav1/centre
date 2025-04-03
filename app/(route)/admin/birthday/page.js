"use client";

import { useState, useEffect } from "react";

export default function BirthdayPage() {
    const [birthdays, setBirthdays] = useState([]);
    const [formData, setFormData] = useState({ name: "", birthday: "", imageUrl: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchBirthdays();
    }, []);

    const fetchBirthdays = async () => {
        try {
            const res = await fetch("/api/members/birthday");
            const data = await res.json();
            setBirthdays(data);
        } catch (error) {
            console.error("Error fetching birthdays:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `/api/members/birthday/${editingId}` : "/api/members/birthday";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: "", birthday: "", imageUrl: "" });
                setEditingId(null);
                fetchBirthdays(); // Refresh list
            }
        } catch (error) {
            console.error("Error saving birthday:", error);
        }
    };

    const handleEdit = (birthday) => {
        setFormData({ name: birthday.name, birthday: birthday.birthday.split("T")[0], imageUrl: birthday.imageUrl || "" });
        setEditingId(birthday._id);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this?")) return;
        
        try {
            const res = await fetch(`/api/members/birthday/${id}`, { method: "DELETE" });
            if (res.ok) fetchBirthdays();
        } catch (error) {
            console.error("Error deleting birthday:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Birthday</h1>

            {/* Birthday Form */}
            <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded bg-gray-100 flex flex-col max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border p-2 bg-white"
                    required
                />
                <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="border p-2 bg-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="border p-2 mb-2 bg-white"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {editingId ? "Update" : "Add"}
                </button>
            </form>

            {/* List of Birthdays */}
            <p className="text-2xl font-bold text-center mb-2">Manage Birthday</p>
            <ul className="space-y-2">
                {birthdays.map((b) => (
                    <li key={b._id} className="border p-4 rounded flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{b.name}</p>
                            <p>{new Date(b.birthday).toLocaleDateString()}</p>
                            {b.imageUrl && <img src={b.imageUrl} alt={b.name} className="w-12 h-12 rounded-full" />}
                        </div>
                        <div>
                            <button onClick={() => handleEdit(b)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(b._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
