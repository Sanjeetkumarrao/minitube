import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service.js";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "avatar") {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setCoverImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return toast.error("Avatar is required");
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    formData.append("avatar", avatar);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      await registerUser(formData);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-6 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">
          <Link to={"/"}>
            <span className="text-primary">Mini</span>Tube
          </Link>
        </h1>
        <p className="text-dark-muted mt-2">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-4">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-2">
          <label className="cursor-pointer group">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-dark-border flex items-center justify-center mb-2">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-dark-muted text-3xl">+</span>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "avatar")} />
            <p className="text-xs text-center text-blue-400">Upload Avatar *</p>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter yuor name" required className="input" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Username</label>
          <input name="username" value={form.username} onChange={handleChange} placeholder="username" required className="input" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="input" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="password" required className="input" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Cover Image <span className="text-dark-muted">(optional)</span></label>
          <input type="file" accept="image/*" className="input cursor-pointer" onChange={(e) => handleFileChange(e, "cover")} />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-60">
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-dark-muted text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
