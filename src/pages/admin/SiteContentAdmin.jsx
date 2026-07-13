import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSiteContent } from "../../context/SiteContentContext"

const defaultStats = [
  { label: "Brides styled", value: "300+" },
  { label: "Years of experience", value: "8" },
  { label: "Districts served", value: "12" }
]

const defaultTestimonials = [
  { quote: "Rose understood exactly what I wanted and made my Gaye Holud, mehndi, and wedding looks all feel distinct yet cohesive.", name: "Nusrat J." },
  { quote: "My makeup lasted through a 10-hour reception in the middle of monsoon season. Genuinely didn't need a single touch-up.", name: "Farhana R." }
]

export default function SiteContentAdmin() {
  const navigate = useNavigate()
  const { siteContent, refetch } = useSiteContent()
  const [activeTab, setActiveTab] = useState("homepage")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  
  // Initialize form data with current content or defaults
  const [formData, setFormData] = useState({
    homepage: {
      heroImage: "",
      heroTagline: "",
      heroTitle: "",
      introQuote: "",
      introText: "",
      ctaTitle: "",
      ctaSubtext: ""
    },
    about: {
      portraitImage: "",
      heading: "",
      bioParagraph1: "",
      bioParagraph2: "",
      stats: [],
      testimonials: []
    },
    contact: {
      whatsappNumber: "",
      phoneDisplay: "",
      email: "",
      locationText: "",
      instagramUrl: "",
      facebookUrl: ""
    },
    footer: {
      brandName: "",
      tagline: "",
      copyrightName: ""
    }
  })

  useEffect(() => {
    if (siteContent) {
      setFormData(prev => ({
        homepage: { ...prev.homepage, ...siteContent.homepage },
        about: { 
          ...prev.about, 
          ...siteContent.about,
          stats: siteContent.about?.stats || defaultStats,
          testimonials: siteContent.about?.testimonials || defaultTestimonials
        },
        contact: { ...prev.contact, ...siteContent.contact },
        footer: { ...prev.footer, ...siteContent.footer }
      }))
    }
  }, [siteContent])

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      navigate("/admin/login")
    }
  }, [navigate])

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    
    const token = localStorage.getItem("adminToken")
    
    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Save failed")
      }
      
      setMessage({ type: "success", text: "Changes saved successfully!" })
      refetch()
    } catch (error) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setSaving(false)
    }
  }

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        stats: [...(prev.about.stats || []), { label: "", value: "" }]
      }
    }))
  }

  const updateStat = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.map((stat, i) => 
          i === index ? { ...stat, [field]: value } : stat
        )
      }
    }))
  }

  const removeStat = (index) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.filter((_, i) => i !== index)
      }
    }))
  }

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        testimonials: [...(prev.about.testimonials || []), { quote: "", name: "" }]
      }
    }))
  }

  const updateTestimonial = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        testimonials: prev.about.testimonials.map((t, i) => 
          i === index ? { ...t, [field]: value } : t
        )
      }
    }))
  }

  const removeTestimonial = (index) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        testimonials: prev.about.testimonials.filter((_, i) => i !== index)
      }
    }))
  }

  const tabs = [
    { id: "homepage", label: "Homepage" },
    { id: "about", label: "About Page" },
    { id: "contact", label: "Contact & Footer" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-display text-2xl italic text-[#A62639]">
              Site Content Editor
            </h1>
            <p className="text-sm text-gray-600">Manage homepage, about, contact & footer content</p>
          </div>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-sm text-gray-600 hover:text-[#A62639]"
          >
            ← Back to Packages
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl gap-6 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#A62639] border-b-2 border-[#A62639]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {message && (
          <div className={`mb-6 rounded-lg p-4 ${
            message.type === "success" 
              ? "bg-green-50 text-green-700" 
              : "bg-red-50 text-red-700"
          }`}>
            {message.text}
          </div>
        )}

        {/* Homepage Tab */}
        {activeTab === "homepage" && (
          <div className="space-y-6 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-display italic text-[#A62639]">Homepage Content</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
              <input
                type="url"
                value={formData.homepage.heroImage}
                onChange={(e) => updateField("homepage", "heroImage", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="https://..."
              />
              {formData.homepage.heroImage && (
                <img src={formData.homepage.heroImage} alt="Preview" className="mt-2 h-32 w-full rounded object-cover" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Tagline</label>
              <input
                type="text"
                value={formData.homepage.heroTagline}
                onChange={(e) => updateField("homepage", "heroTagline", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Bridal Makeup Artist · Dhaka, Bangladesh"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Title</label>
              <input
                type="text"
                value={formData.homepage.heroTitle}
                onChange={(e) => updateField("homepage", "heroTitle", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Rose Bridal Studio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Intro Quote</label>
              <textarea
                value={formData.homepage.introQuote}
                onChange={(e) => updateField("homepage", "introQuote", e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Every bride deserves..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Intro Text</label>
              <textarea
                value={formData.homepage.introText}
                onChange={(e) => updateField("homepage", "introText", e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="I'm Rose, a Dhaka-based makeup artist..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CTA Title</label>
              <input
                type="text"
                value={formData.homepage.ctaTitle}
                onChange={(e) => updateField("homepage", "ctaTitle", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Ready to plan your bridal look?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CTA Subtext</label>
              <input
                type="text"
                value={formData.homepage.ctaSubtext}
                onChange={(e) => updateField("homepage", "ctaSubtext", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Let's create something beautiful..."
              />
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-6 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-display italic text-[#A62639]">About Page Content</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Portrait Image URL</label>
              <input
                type="url"
                value={formData.about.portraitImage}
                onChange={(e) => updateField("about", "portraitImage", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="https://..."
              />
              {formData.about.portraitImage && (
                <img src={formData.about.portraitImage} alt="Preview" className="mt-2 h-40 w-32 rounded object-cover" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input
                type="text"
                value={formData.about.heading}
                onChange={(e) => updateField("about", "heading", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Hi, I'm Rose"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio Paragraph 1</label>
              <textarea
                value={formData.about.bioParagraph1}
                onChange={(e) => updateField("about", "bioParagraph1", e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio Paragraph 2</label>
              <textarea
                value={formData.about.bioParagraph2}
                onChange={(e) => updateField("about", "bioParagraph2", e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
              />
            </div>

            {/* Stats */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Stats</label>
                <button
                  type="button"
                  onClick={addStat}
                  className="text-sm text-[#A62639] hover:underline"
                >
                  + Add Stat
                </button>
              </div>
              <div className="space-y-3">
                {(formData.about.stats || []).map((stat, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, "label", e.target.value)}
                      placeholder="Label (e.g., Brides styled)"
                      className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                    />
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", e.target.value)}
                      placeholder="Value (e.g., 300+)"
                      className="w-32 rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                    />
                    <button
                      type="button"
                      onClick={() => removeStat(index)}
                      className="px-3 text-red-600 hover:underline"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Testimonials</label>
                <button
                  type="button"
                  onClick={addTestimonial}
                  className="text-sm text-[#A62639] hover:underline"
                >
                  + Add Testimonial
                </button>
              </div>
              <div className="space-y-4">
                {(formData.about.testimonials || []).map((t, index) => (
                  <div key={index} className="rounded border border-gray-200 p-4">
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600">Quote</label>
                      <textarea
                        value={t.quote}
                        onChange={(e) => updateTestimonial(index, "quote", e.target.value)}
                        rows={3}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                        placeholder="Name"
                        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                      />
                      <button
                        type="button"
                        onClick={() => removeTestimonial(index)}
                        className="px-3 text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact & Footer Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-display italic text-[#A62639]">Contact & Footer Content</h2>
            
            <h3 className="border-b pb-2 font-medium text-gray-900">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input
                type="text"
                value={formData.contact.whatsappNumber}
                onChange={(e) => updateField("contact", "whatsappNumber", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Display</label>
              <input
                type="text"
                value={formData.contact.phoneDisplay}
                onChange={(e) => updateField("contact", "phoneDisplay", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => updateField("contact", "email", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="hello@rosebridalstudio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location Text</label>
              <input
                type="text"
                value={formData.contact.locationText}
                onChange={(e) => updateField("contact", "locationText", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Dhaka, Bangladesh — available for on-location bookings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
              <input
                type="url"
                value={formData.contact.instagramUrl}
                onChange={(e) => updateField("contact", "instagramUrl", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
              <input
                type="url"
                value={formData.contact.facebookUrl}
                onChange={(e) => updateField("contact", "facebookUrl", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="https://facebook.com/..."
              />
            </div>

            <h3 className="border-b pb-2 font-medium text-gray-900">Footer Content</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">Brand Name</label>
              <input
                type="text"
                value={formData.footer.brandName}
                onChange={(e) => updateField("footer", "brandName", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Rose Bridal Studio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Footer Tagline</label>
              <textarea
                value={formData.footer.tagline}
                onChange={(e) => updateField("footer", "tagline", e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Bridal & event makeup artistry..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Copyright Name</label>
              <input
                type="text"
                value={formData.footer.copyrightName}
                onChange={(e) => updateField("footer", "copyrightName", e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-[#A62639] focus:outline-none focus:ring-1 focus:ring-[#A62639]"
                placeholder="Rose Bridal Studio"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[#A62639] px-8 py-3 text-sm font-medium text-white hover:bg-[#8a1f2f] disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>
    </div>
  )
}
