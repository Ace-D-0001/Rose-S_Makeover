import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const emptyPackage = {
  id: "",
  name: "",
  price: "",
  coverImage: "",
  shortDesc: "",
  fullDesc: "",
  includes: [],
  gallery: [],
}

export default function AdminDashboard() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyPackage)
  const [includesInput, setIncludesInput] = useState("")
  const [galleryInput, setGalleryInput] = useState("")
  const navigate = useNavigate()

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      navigate("/admin/login")
      return
    }
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages")
      if (!res.ok) throw new Error("Failed to fetch packages")
      const data = await res.json()
      setPackages(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    navigate("/admin/login")
  }

  const openAddForm = () => {
    setEditingId(null)
    setFormData(emptyPackage)
    setIncludesInput("")
    setGalleryInput("")
    setShowForm(true)
  }

  const openEditForm = (pkg) => {
    setEditingId(pkg.id)
    setFormData(pkg)
    setIncludesInput(pkg.includes.join("\n"))
    setGalleryInput(pkg.gallery.join("\n"))
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return

    const token = localStorage.getItem("adminToken")
    try {
      const res = await fetch(`/api/packages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Delete failed")
      }

      fetchPackages()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("adminToken")
    const includes = includesInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s)
    const gallery = galleryInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s)

    const payload = { ...formData, includes, gallery }

    try {
      const url = editingId
        ? `/api/packages/${editingId}`
        : "/api/packages"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Save failed")
      }

      setShowForm(false)
      fetchPackages()
    } catch (err) {
      alert(err.message)
    }
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyPackage)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-display text-2xl italic text-[#A62639]">
              Rose Bridal Studio
            </h1>
            <p className="text-sm text-gray-600">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openAddForm}
              className="rounded-full bg-[#A62639] px-5 py-2 text-sm font-medium text-white hover:bg-[#8a1f2f]"
            >
              + Add Package
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-[#A62639]"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            Error: {error}
          </div>
        )}

        {packages.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-600">No packages yet.</p>
            <button
              onClick={openAddForm}
              className="mt-4 rounded-full bg-[#A62639] px-5 py-2 text-sm font-medium text-white hover:bg-[#8a1f2f]"
            >
              Add your first package
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={pkg.coverImage}
                          alt={pkg.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {pkg.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pkg.shortDesc?.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {pkg.price}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <button
                        onClick={() => openEditForm(pkg)}
                        className="mr-3 text-[#A62639] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-display italic text-[#A62639]">
              {editingId ? "Edit Package" : "Add New Package"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package ID (unique, lowercase, no spaces)
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  required
                  disabled={!!editingId}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639] disabled:bg-gray-100"
                  placeholder="e.g., wedding-day-bridal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="e.g., Wedding Day Bridal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (with ৳ symbol)
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="e.g., ৳28,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  value={formData.shortDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDesc: e.target.value })
                  }
                  required
                  rows={2}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="Brief description for the card view"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Description
                </label>
                <textarea
                  value={formData.fullDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDesc: e.target.value })
                  }
                  required
                  rows={4}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="Detailed description for the detail page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Includes (one item per line)
                </label>
                <textarea
                  value={includesInput}
                  onChange={(e) => setIncludesInput(e.target.value)}
                  rows={5}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="Skin prep&#10;HD makeup&#10;Hair styling"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gallery Images (one URL per line)
                </label>
                <textarea
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#A62639] px-5 py-2 text-sm font-medium text-white hover:bg-[#8a1f2f]"
                >
                  {editingId ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
