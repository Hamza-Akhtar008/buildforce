'use client'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import { Loader2, Building } from "lucide-react"; // add Building icon import

const AddCompanyPage = () => {
  // User creation fields
  const [userForm, setUserForm] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    password: "",
    role: "Company",
  });

  // Company creation fields
  const [companyForm, setCompanyForm] = useState({
    name: "",
    about: "",
    location: "",
    logo: null as File | null, // <-- fix: logo is File or null
  });

  const [loading, setLoading] = useState(false); // loader for modal
  const [pageLoading, setPageLoading] = useState(true); // loader for initial page
  const [companies, setCompanies] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://192.168.1.20:5000/";
      try {
        const res = await fetch(`${backendUrl}company-profile`);
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        toast.error("Error fetching companies");
      } finally {
        setPageLoading(false); // hide page loader after fetch
      }
    };
    fetchCompanies();
  }, []);

  const handleUserInputChange = (field: keyof typeof userForm, value: string) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyInputChange = (field: keyof typeof companyForm, value: string) => {
    setCompanyForm(prev => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // show loader

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://192.168.1.20:5000/";

    const formDataToSend = new FormData();

    // User object as JSON string
    formDataToSend.append("user", JSON.stringify({
      name: userForm.name,
      location: userForm.location,
      email: userForm.email,
      phone: userForm.phone,
      password: userForm.password,
      role: userForm.role,
    }));

    // CompanyProfile object as JSON string, including logo as a placeholder string if file exists
    const companyProfilePayload: any = {
      name: companyForm.name,
      about: companyForm.about,
      location: companyForm.location,
      logo: companyForm.logo ? companyForm.logo.name : "",
    };

    formDataToSend.append("companyProfile", JSON.stringify(companyProfilePayload));
    if (companyForm.logo) {
      formDataToSend.append("logo", companyForm.logo);
    }

    try {
      const res = await fetch(`${backendUrl}company-profile`, {
        method: "POST",
        body: formDataToSend,
      });

      // Check for valid JSON response
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        toast.error("Invalid JSON response from server");
        setLoading(false);
        return;
      }

      toast.success("User and company profile created successfully");
      setUserForm({
        name: "",
        location: "",
        email: "",
        phone: "",
        password: "",
        role: "Company",
      });
      setCompanyForm({
        name: "",
        about: "",
        location: "",
        logo: null,
      });
      setModalOpen(false);

      // Refresh company list
      const resCompanies = await fetch(`${backendUrl}company-profile`);
      const companiesData = await resCompanies.json();
      setCompanies(companiesData);

      console.log("API response:", data);
    } catch (err) {
      toast.error("Error creating company profile");
      console.error("Error creating company profile:", err);
    } finally {
      setLoading(false); // hide loader
    }
  };

  // Lock body scroll when modal is open + close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen]);

  return (
    <>
      <Toaster position="top-right" richColors />
      {pageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}
      <div className="max-w-6xl mx-auto py-10 space-y-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Building className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Companies</h1>
          </div>
          <Button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground font-semibold">
            Create Company
          </Button>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Logo</th>
                <th className="px-4 py-2 text-left font-semibold">About</th>
                <th className="px-4 py-2 text-left font-semibold">Location</th>
                <th className="px-4 py-2 text-left font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b">
                  <td className="px-4 py-2">{company.name}</td>
                  <td className="px-4 py-2">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt="Logo" className="h-10 w-10 object-contain rounded" />
                    ) : (
                      <span className="text-muted-foreground text-xs">No Logo</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{company.about}</td>
                  <td className="px-4 py-2">{company.location}</td>
                  <td className="px-4 py-2">{company.createdAt?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Create Company & User */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }} // hide scrollbar for Firefox
            onClick={() => setModalOpen(false)} // close on overlay click
          >
            <div
              className="bg-card rounded-lg shadow-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button
                className="absolute top-3 right-3 text-xl font-bold"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>

              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Create Company</h2>
                <div className="space-y-2">
                  <Label htmlFor="user-name">Name</Label>
                  <Input
                    id="user-name"
                    type="text"
                    placeholder="Enter name"
                    value={userForm.name}
                    onChange={e => handleUserInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-location">Location</Label>
                  <Input
                    id="user-location"
                    type="text"
                    placeholder="Enter location"
                    value={userForm.location}
                    onChange={e => handleUserInputChange("location", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="Enter email"
                    value={userForm.email}
                    onChange={e => handleUserInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-phone">Phone</Label>
                  <Input
                    id="user-phone"
                    type="text"
                    placeholder="Enter phone number"
                    value={userForm.phone}
                    onChange={e => handleUserInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="Enter password"
                    value={userForm.password}
                    onChange={e => handleUserInputChange("password", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    type="text"
                    placeholder="Enter company name"
                    value={companyForm.name}
                    onChange={e => handleCompanyInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-about">About</Label>
                  <Textarea
                    id="company-about"
                    placeholder="Enter company description"
                    value={companyForm.about}
                    onChange={e => handleCompanyInputChange("about", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-location">Location</Label>
                  <Input
                    id="company-location"
                    type="text"
                    placeholder="Enter location"
                    value={companyForm.location}
                    onChange={e => handleCompanyInputChange("location", e.target.value)}
                    required
                  />
                </div>
                {/* <div className="space-y-2"> */}
                  {/* <Label htmlFor="company-logo">Company Logo</Label>
                  <Input
                    id="company-logo"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0] || null;
                      setCompanyForm(prev => ({
                        ...prev,
                        logo: file, // File | null
                      }));
                    }}
                  />
                  {companyForm.logo && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Selected file: {companyForm.logo.name}
                    </div>
                  )}
                </div> */}

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddCompanyPage;
